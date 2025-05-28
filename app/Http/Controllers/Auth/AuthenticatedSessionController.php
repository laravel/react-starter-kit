<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = $request->user();

        // Load user relationships to ensure methods work properly
        $user->load(['subscription', 'details']);

        // Create default subscription and details if missing
        if (!$user->subscription || !$user->details) {
            $user->createDefaultSubscriptionAndDetails();
            $user->refresh(); // Reload the user with new data
        }

        // Determine redirect based on user type
        $intendedUrl = $request->session()->get('url.intended');

        // If there's an intended URL, use it (but avoid admin panel for non-admins)
        if ($intendedUrl && !str_contains($intendedUrl, '/admin') && !str_contains($intendedUrl, '/filament')) {
            return redirect($intendedUrl);
        }

        // Smart redirect based on user subscription
        try {
            if ($user->isAdmin()) {
                // Admin users can go to dashboard or admin panel
                return redirect()->route('dashboard');
            } elseif ($user->isPremium()) {
                // Premium users go to dashboard
                return redirect()->route('dashboard');
            } else {
                // Free users go to assessment tools (standalone page)
                return redirect()->route('assessment-tools');
            }
        } catch (\Exception $e) {
            // Fallback if user methods fail
            \Log::error('Login redirect failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            // Safe fallback
            return redirect()->route('assessment-tools');
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
