<?php
// Create this as: app/Console/Commands/PaddleDebugTest.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Laravel\Paddle\Paddle;

class PaddleDebugTest extends Command
{
    protected $signature = 'paddle:debug';
    protected $description = 'Debug Paddle API connection issues';

    public function handle()
    {
        $this->info('🔍 Debugging Paddle API Connection');
        $this->info('==================================');

        $config = config('services.paddle');

        if (!$config) {
            $this->error('❌ Paddle configuration missing');
            return 1;
        }

        // Test 1: Basic Configuration
        $this->newLine();
        $this->info('1. Configuration Values:');
        $this->info("   Auth Code: " . substr($config['vendor_auth_code'], 0, 15) . "...");
        $this->info("   Sandbox: " . ($config['sandbox'] ? 'true' : 'false'));

        // Test 2: Direct cURL test
        $this->newLine();
        $this->info('2. Direct cURL API Test:');

        $url = $config['sandbox']
            ? 'https://sandbox-api.paddle.com/products'
            : 'https://vendors.paddle.com/api/2.0/user/auth';

        $this->info("   Testing URL: {$url}");

        $postData = [
            'vendor_auth_code' => $config['vendor_auth_code']
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Laravel Paddle Debug/1.0');
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
            'Accept: application/json'
        ]);

        // Enable verbose output for debugging
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        $verboseHandle = fopen('php://temp', 'w+');
        curl_setopt($ch, CURLOPT_STDERR, $verboseHandle);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);

        // Get verbose output
        rewind($verboseHandle);
        $verboseLog = stream_get_contents($verboseHandle);
        fclose($verboseHandle);

        $this->info("   HTTP Code: {$httpCode}");

        if ($error) {
            $this->error("   cURL Error: {$error}");
        }

        if ($response) {
            $this->info("   Response Length: " . strlen($response) . " bytes");

            $data = json_decode($response, true);
            if ($data) {
                if (isset($data['success']) && $data['success']) {
                    $this->info("   ✅ API Response: Success");
                    if (isset($data['response']['vendor_name'])) {
                        $this->info("   📊 Vendor: " . $data['response']['vendor_name']);
                    }
                } else {
                    $this->error("   ❌ API Response: Failed");
                    if (isset($data['error'])) {
                        $errorCode = $data['error']['code'] ?? 'Unknown';
                        $errorMessage = $data['error']['message'] ?? 'Unknown';

                        // Handle array values properly
                        if (is_array($errorCode)) {
                            $errorCode = json_encode($errorCode);
                        }
                        if (is_array($errorMessage)) {
                            $errorMessage = json_encode($errorMessage);
                        }

                        $this->error("   Error Code: " . $errorCode);
                        $this->error("   Error Message: " . $errorMessage);
                    }
                }

                $this->newLine();
                $this->info('   Full Response:');
                $this->line('   ' . json_encode($data, JSON_PRETTY_PRINT));
            } else {
                $this->error("   ❌ Invalid JSON response");
                $this->info("   Raw Response: " . substr($response, 0, 200) . "...");
            }
        } else {
            $this->error("   ❌ No response received");
        }

        // Test 3: Using Laravel HTTP Client
        $this->newLine();
        $this->info('3. Laravel HTTP Client Test:');

        try {
            $response = Http::timeout(30)
                ->asForm()
                ->post($url, $postData);

            $this->info("   HTTP Status: " . $response->status());

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['success']) && $data['success']) {
                    $this->info("   ✅ Laravel HTTP: Success");
                } else {
                    $this->error("   ❌ Laravel HTTP: API returned error");
                    $this->error("   Error: " . ($data['error']['message'] ?? 'Unknown'));
                }
            } else {
                $this->error("   ❌ Laravel HTTP: Request failed");
                $this->error("   Response: " . $response->body());
            }

        } catch (\Exception $e) {
            $this->error("   ❌ Laravel HTTP Exception: " . $e->getMessage());
        }

        // Test 4: Check environment and dependencies
        $this->newLine();
        $this->info('4. Environment Check:');

        $this->info("   PHP Version: " . PHP_VERSION);
        $this->info("   cURL Version: " . (function_exists('curl_version') ? curl_version()['version'] : 'Not available'));
        $this->info("   OpenSSL: " . (extension_loaded('openssl') ? 'Available' : 'Missing'));
        $this->info("   JSON: " . (extension_loaded('json') ? 'Available' : 'Missing'));

        // Test 5: Check internet connectivity
        $this->newLine();
        $this->info('5. Connectivity Test:');

        $testUrls = [
            'https://google.com',
            'https://paddle.com',
            'https://sandbox-vendors.paddle.com'
        ];

        foreach ($testUrls as $testUrl) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $testUrl);
            curl_setopt($ch, CURLOPT_NOBODY, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $result = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            $status = ($result !== false && $httpCode < 400) ? '✅' : '❌';
            $this->info("   {$status} {$testUrl} (HTTP {$httpCode})");
        }

        // Test 6: Paddle SDK Test
        $this->newLine();
        $this->info('6. Laravel Paddle SDK Test:');

        try {
            // Try to use Paddle SDK methods
            $this->info("   Paddle class exists: " . (class_exists(\Laravel\Paddle\Paddle::class) ? 'Yes' : 'No'));

            // Check if we can access Paddle configuration
            $paddleConfig = app('config')->get('services.paddle');
            $this->info("   Config accessible: " . ($paddleConfig ? 'Yes' : 'No'));

        } catch (\Exception $e) {
            $this->error("   ❌ Paddle SDK Error: " . $e->getMessage());
        }

        // Summary and recommendations
        $this->newLine();
        $this->info('🎯 Debug Summary & Recommendations:');
        $this->info('=====================================');

        if ($httpCode === 200) {
            $this->info('✅ Your Paddle API connection is working!');
            $this->info('   The original test might have had a timeout issue.');
        } elseif ($httpCode === 401 || $httpCode === 403) {
            $this->error('❌ Authentication failed:');
            $this->info('   1. Double-check your vendor_id and vendor_auth_code in Paddle dashboard');
            $this->info('   2. Make sure you\'re using the correct credentials for sandbox/production');
            $this->info('   3. Verify your API key hasn\'t expired');
        } elseif ($httpCode === 0 || $httpCode >= 500) {
            $this->error('❌ Network/Server issue:');
            $this->info('   1. Check your internet connection');
            $this->info('   2. Verify firewall settings aren\'t blocking Paddle API');
            $this->info('   3. Try again in a few minutes (Paddle servers might be busy)');
        } else {
            $this->error("❌ Unexpected HTTP code: {$httpCode}");
            $this->info('   Check the full response above for details');
        }

        $this->newLine();
        $this->info('Next steps:');
        $this->info('1. If authentication works here, your original test might have timed out');
        $this->info('2. Try creating a test checkout to verify full integration');
        $this->info('3. Set up ngrok for webhook testing');

        return 0;
    }
}
