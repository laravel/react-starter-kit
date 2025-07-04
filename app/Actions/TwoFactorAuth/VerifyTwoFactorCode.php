<?php

namespace App\Actions\TwoFactorAuth;

use PragmaRX\Google2FA\Google2FA;

class VerifyTwoFactorCode
{
    /**
     * Verify a two-factor authentication code.
     *
     * @param  string  $secret The decrypted secret key
     * @param  string  $code The code to verify
     * @return bool
     */
    public function __invoke(string $secret, string $code): bool
    {
        // Clean the code (remove spaces and non-numeric characters)
        $code = preg_replace('/[^0-9]/', '', $code);
        
        // Create a new Google2FA instance with explicit configuration
        $google2fa = new Google2FA();
        $google2fa->setWindow(8); // Allow for some time drift
        $google2fa->setOneTimePasswordLength(6); // Ensure 6-digit codes
        
        try {
            return $google2fa->verify($code, $secret);
        } catch (\Exception $e) {
            return false;
        }
    }
}
