<?php

namespace App\Actions\TwoFactorAuth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CompleteTwoFactorAuthentication
{
    /**
     * Complete the two-factor authentication process.
     *
     * @param  mixed  $user The user to authenticate
     * @return void
     */
    public function __invoke($user): void
    {
        // Get the remember preference from the session (default to false if not set)
        $remember = Session::get('login.remember', false);
        
        // Log the user in with the remember preference
        Auth::login($user, $remember);

        // Clear the session variables used for the 2FA challenge
        Session::forget(['login.id', 'login.remember']);
    }
}
