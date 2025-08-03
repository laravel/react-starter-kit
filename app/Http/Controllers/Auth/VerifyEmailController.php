<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            $user = $request->user();

            if ($user->isAdmin()) {
                return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
            }

            if ($user->hasAnyToolSubscription()) {
                return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
            }

            // Free users go to free assessment
            return redirect()->intended(route('free-assessment.index', absolute: false).'?verified=1');
        }

        $request->user()->markEmailAsVerified();

        event(new Verified($request->user()));

        $user = $request->user();

        if ($user->isAdmin()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        if ($user->hasAnyToolSubscription()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }
        $request->fulfill();

        return redirect()->intended(route('free-assessment.index', absolute: false).'?verified=1');
    }
}
