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
        // Log the user in
        Auth::login($user);

        // Clear the session that is used to determine if the user can visit the 2fa challenge page
        Session::forget('login.id');
    }
}
