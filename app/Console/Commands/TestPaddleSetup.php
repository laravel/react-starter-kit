<?php
// Create this as: app/Console/Commands/TestPaddleSetup.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Laravel\Paddle\Cashier;
use Laravel\Paddle;

class TestPaddleSetup extends Command
{
    protected $signature = 'paddle:test';
    protected $description = 'Test Paddle configuration and setup';

    public function handle()
    {
        $this->info('🏄‍♂️ Testing Paddle Setup');
        $this->info('========================');

        // Test 1: Configuration
        $this->newLine();
        $this->info('1. Configuration Check:');

        $config = config('services.paddle');

        if (!$config) {
            $this->error('   ❌ Paddle configuration not found in config/services.php');
            return 1;
        }

        $this->checkConfig('vendor_id', $config['vendor_id'] ?? null);
        $this->checkConfig('vendor_auth_code', $config['vendor_auth_code'] ?? null, true);
        $this->checkConfig('client_side_token', $config['client_side_token'] ?? null, true);
        $this->checkConfig('retain_key', $config['retain_key'] ?? null, true);
        $this->checkConfig('sandbox', $config['sandbox'] ?? null);
        $this->checkConfig('webhook.secret', $config['webhook']['secret'] ?? null, true);

        // Test 2: Paddle SDK
        $this->newLine();
        $this->info('2. Paddle SDK Check:');

        try {
            $environment = $config['sandbox'] ? 'sandbox' : 'production';
            $this->info("   ✅ Environment: {$environment}");

            // Test API credentials
            $this->info('   Testing API connection...');

            // Use Laravel Paddle to make a simple API call
            $response = $this->testApiConnection($config);

            if ($response) {
                $this->info('   ✅ API Connection: Successful');
            } else {
                $this->error('   ❌ API Connection: Failed');
            }

        } catch (\Exception $e) {
            $this->error('   ❌ Paddle SDK Error: ' . $e->getMessage());
        }

        // Test 3: Database
        $this->newLine();
        $this->info('3. Database Check:');

        try {
            // Check if necessary tables exist
            $tables = [
                'tool_subscriptions',
                'users'
            ];

            foreach ($tables as $table) {
                if (Schema::hasTable($table)) {
                    $this->info("   ✅ Table '{$table}' exists");
                } else {
                    $this->error("   ❌ Table '{$table}' missing");
                }
            }

        } catch (\Exception $e) {
            $this->error('   ❌ Database Error: ' . $e->getMessage());
        }

        // Test 4: Routes
        $this->newLine();
        $this->info('4. Routes Check:');

        $routes = [
            'tools.paddle.checkout',
            'tools.payment.success',
            'paddle.webhook'
        ];

        foreach ($routes as $routeName) {
            try {
                $route = route($routeName, ['tool' => 1], false);
                $this->info("   ✅ Route '{$routeName}': {$route}");
            } catch (\Exception $e) {
                $this->error("   ❌ Route '{$routeName}' not found");
            }
        }

        // Test 5: Models
        $this->newLine();
        $this->info('5. Models Check:');

        try {
            if (class_exists(\App\Models\ToolSubscription::class)) {
                $this->info('   ✅ ToolSubscription model exists');
            } else {
                $this->error('   ❌ ToolSubscription model missing');
            }

            if (class_exists(\App\Models\Tool::class)) {
                $this->info('   ✅ Tool model exists');
            } else {
                $this->error('   ❌ Tool model missing');
            }

        } catch (\Exception $e) {
            $this->error('   ❌ Model Error: ' . $e->getMessage());
        }

        $this->newLine();
        $this->info('🎯 Test Summary:');
        $this->info('================');
        $this->info('If all checks pass, your Paddle setup should be working!');
        $this->info('');
        $this->info('Next steps:');
        $this->info('1. Create a test product in your Paddle dashboard');
        $this->info('2. Test the checkout flow on your application');
        $this->info('3. Use ngrok to test webhooks locally');

        return 0;
    }

    private function checkConfig($key, $value, $hideValue = false)
    {
        if ($value) {
            $displayValue = $hideValue ? substr($value, 0, 10) . '...' : $value;
            $this->info("   ✅ {$key}: {$displayValue}");
        } else {
            $this->error("   ❌ {$key}: Missing");
        }
    }

    private function testApiConnection($config)
    {
        try {
            $url = $config['sandbox']
                ? 'https://sandbox-vendors.paddle.com/api/2.0/product'
                : 'https://sandbox-vendors.paddle.com/api/2.0/product';

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
                'vendor_id' => $config['vendor_id'],
                'vendor_auth_code' => $config['vendor_auth_code']
            ]));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($response && $httpCode === 200) {
                $data = json_decode($response, true);
                return isset($data['success']) && $data['success'];
            }

            return false;

        } catch (\Exception $e) {
            return false;
        }
    }
}
