<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Concerns\ConfirmsTwoFactorAuthentication;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class TwoFactorAuthenticationController extends Controller implements HasMiddleware
{
    use ConfirmsTwoFactorAuthentication;

    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword')
            ? [new Middleware('password.confirm', only: ['show'])]
            : [];
    }

    /**
     * Show the user's two-factor authentication settings page.
     */
    public function show(Request $request): Response
    {
        abort_if(
            ! Features::enabled(Features::twoFactorAuthentication()),
            HttpResponse::HTTP_FORBIDDEN,
            'Two factor authentication is disabled.'
        );

        $this->validateTwoFactorAuthenticationState($request);

        return Inertia::render('settings/two-factor', [
            'requiresConfirmation' => Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm'),
            'twoFactorEnabled' => $request->user()->hasEnabledTwoFactorAuthentication(),
        ]);
    }
}
