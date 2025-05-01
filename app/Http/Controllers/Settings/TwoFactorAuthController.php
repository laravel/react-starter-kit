<?php

namespace App\Http\Controllers\Settings;

use App\Actions\TwoFactorAuth\DisableTwoFactorAuthentication;
use App\Actions\TwoFactorAuth\GenerateNewRecoveryCodes;
use App\Actions\TwoFactorAuth\GenerateQrCodeAndSecretKey;
use App\Actions\TwoFactorAuth\VerifyTwoFactorCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TwoFactorAuthController extends Controller
{
    /**
     * Show the two factor auth settings page
     * route[GET] => 'settings/two-factor'
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $confirmed = !is_null($user->two_factor_confirmed_at);

        // If 2fa is not confirmed, we want to clear out secret and recovery codes
        // This happens when a user enables 2fa and does not finish confirmation
        if (!$confirmed) {
            app(DisableTwoFactorAuthentication::class)($user);
        }

        return Inertia::render('settings/two-factor', [
            'confirmed' => $confirmed,
            'recoveryCodes' => !is_null($user->two_factor_secret) ? json_decode(decrypt($user->two_factor_recovery_codes)) : [],
        ]);
    }

    /**
     * Enable two factor authentication
     * route[POST] => 'settings/two-factor'
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function enable(Request $request)
    {
        [$qrCode, $secret] = app(GenerateQrCodeAndSecretKey::class)($request->user());
        
        $request->user()->forceFill([
            'two_factor_secret' => encrypt($secret)
        ])->save();
        
        return response()->json([
            'qrCode' => $qrCode,
            'secret' => $secret
        ]);
    }

    /**
     * Verify and confirm the user's two-factor authentication.
     * route[POST] => 'settings/two-factor/confirm'
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function confirm(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        // Get the secret key from the user's record
        $secret = decrypt($request->user()->two_factor_secret);
        
        // Verify the code
        $valid = app(VerifyTwoFactorCode::class)($secret, $request->code);

        if ($valid) {
            // Generate recovery codes when confirming 2FA
            $recoveryCodes = app(GenerateNewRecoveryCodes::class)($request->user());
            
            // Update user with recovery codes and confirm 2FA
            $request->user()->forceFill([
                'two_factor_recovery_codes' => encrypt(json_encode($recoveryCodes)),
                'two_factor_confirmed_at' => now()
            ])->save();
            
            return response()->json([
                'status' => 'two-factor-authentication-confirmed',
                'recovery_codes' => $recoveryCodes
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'The provided two-factor authentication code was invalid.'
        ], 422);
    }

    /**
     * Generate new recovery codes for the user.
     * route[POST] => 'settings/two-factor/recovery-codes'
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function regenerateRecoveryCodes(Request $request)
    {
        $codes = app(GenerateNewRecoveryCodes::class)($request->user());
        
        $request->user()->forceFill([
            'two_factor_recovery_codes' => encrypt(json_encode($codes))
        ])->save();
        
        return response()->json([
            'recovery_codes' => $codes
        ]);
    }

    /**
     * Disable two factor authentication for the user.
     * route[DELETE] => 'settings/two-factor'
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function disable(Request $request)
    {
        $disableTwoFactorAuthentication = app(DisableTwoFactorAuthentication::class);
        $disableTwoFactorAuthentication($request->user());
    }
}
