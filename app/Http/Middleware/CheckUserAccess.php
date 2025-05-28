<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserAccess
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $accessLevel = 'free'): Response
    {
        $user = $request->user();

        // Ensure user is authenticated
        if (!$user) {
            return redirect()->route('login');
        }

        // Load user relationships safely
        $user->load(['subscription', 'roles']);

        switch ($accessLevel) {
            case 'dashboard':
                // Dashboard access requires premium or admin
                if (!$user->isPremium() && !$user->isAdmin()) {
                    // Free users should go to their assessment tools page
                    return redirect()->route('assessment-tools')
                        ->with('info', 'Upgrade to premium to access the dashboard.');
                }
                break;

            case 'premium':
                // Premium features require premium subscription or admin
                if (!$user->isPremium() && !$user->isAdmin()) {
                    return redirect()->route('subscription.show')
                        ->with('error', 'This feature requires a premium subscription.');
                }
                break;

            case 'admin':
                // Admin access requires admin role
                if (!$user->isAdmin()) {
                    // Regular users (free or premium) go to their appropriate page
                    if ($user->isPremium()) {
                        return redirect()->route('dashboard')
                            ->with('error', 'Access denied. Admin privileges required.');
                    } else {
                        return redirect()->route('assessment-tools')
                            ->with('error', 'Access denied. Admin privileges required.');
                    }
                }
                break;

            case 'free':
            default:
                // Free level access - all authenticated users allowed
                return $next($request);
        }

        return $next($request);
    }
}
