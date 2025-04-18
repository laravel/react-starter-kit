<?php

namespace App\Actions\TwoFactorAuth;

use Illuminate\Support\Facades\Session;

class GetTwoFactorAuthenticatableUser
{
    /**
     * Get the user that is in the process of two-factor authentication.
     *
     * @return mixed|null The user model instance or null if not found
     */
    public function __invoke()
    {
        $userId = Session::get('login.id');
        
        if (!$userId) {
            return null;
        }
        
        // Get the user model from auth config
        $userModel = app(config('auth.providers.users.model'));
        
        return $userModel::find($userId);
    }
}
