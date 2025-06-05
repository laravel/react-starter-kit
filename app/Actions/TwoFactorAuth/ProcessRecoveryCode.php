<?php

namespace App\Actions\TwoFactorAuth;

class ProcessRecoveryCode
{
    /**
     * Verify a recovery code and remove it from the list if valid.
     *
     * @param  array  $recoveryCodes The array of recovery codes
     * @param  string  $submittedCode The code submitted by the user
     * @return array|false Returns the updated array of recovery codes if valid, or false if invalid
     */
    public function __invoke(array $recoveryCodes, string $submittedCode)
    {
        // Clean the submitted code
        $submittedCode = trim($submittedCode);
        
        // If the user has entered multiple codes, only validate the first one
        $submittedCode = explode(" ", $submittedCode)[0];
        
        // Check if the code is valid
        if (!in_array($submittedCode, $recoveryCodes)) {
            return false;
        }
        
        // Remove the used recovery code from the list
        $updatedCodes = array_values(array_filter($recoveryCodes, function($code) use ($submittedCode) {
            return !hash_equals($code, $submittedCode);
        }));
        
        return $updatedCodes;
    }
}
