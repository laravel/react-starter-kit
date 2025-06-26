<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
        Log::info('User logged in', ['user_id' => $user->id, 'email' => $user->email]);

        // Load user relationships safely
        try {
            $user->load(['subscription', 'details', 'roles']);

            // Create default subscription and details if missing
            if (method_exists($user, 'createDefaultSubscriptionAndDetails')) {
                if (!$user->subscription || !$user->details) {
                    $user->createDefaultSubscriptionAndDetails();
                    $user->refresh();
                }
            }
        } catch (\Exception $e) {
            Log::warning('Could not load user relationships or create defaults', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }

        // FIXED: Determine redirect based on user type
        try {
            // Check if user is admin
            $isAdmin = false;
            if (method_exists($user, 'isAdmin')) {
                $isAdmin = $user->isAdmin();
            } elseif ($user->roles) {
                $isAdmin = $user->roles->contains('name', 'super_admin');
            }

            // Check if user has tool subscriptions (premium)
            $hasToolSubscriptions = false;
            if (method_exists($user, 'hasAnyToolSubscription')) {
                $hasToolSubscriptions = $user->hasAnyToolSubscription();
            } elseif (method_exists($user, 'isPremium')) {
                $hasToolSubscriptions = $user->isPremium();
            } elseif ($user->subscription) {
                $hasToolSubscriptions = $user->subscription->plan_type === 'premium';
            }

            if ($isAdmin) {
                Log::info('Redirecting admin user to dashboard', ['user_id' => $user->id]);
                return redirect('/dashboard');
            } elseif ($hasToolSubscriptions) {
                Log::info('Redirecting premium user to dashboard', ['user_id' => $user->id]);
                return redirect('/dashboard');
            } else {
                Log::info('Redirecting free user to tools discovery', ['user_id' => $user->id]);
                // FIXED: Use correct URL
                return redirect('/tools/discover');
            }
        } catch (\Exception $e) {
            // Fallback if user methods fail
            Log::error('Login redirect failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // FIXED: Safe fallback with correct URL
            return redirect('/tools/discover');
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
