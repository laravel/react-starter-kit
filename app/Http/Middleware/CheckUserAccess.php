<?php

// Update app/Http/Middleware/CheckUserAccess.php
// Replace the existing middleware with this enhanced version

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserAccess
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $accessType = 'authenticated')
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Load necessary relationships
        $user->load(['subscription', 'details', 'roles']);

        // Create default subscription/details if missing
        if (!$user->subscription || !$user->details) {
            $user->createDefaultSubscriptionAndDetails();
            $user->refresh();
        }

        switch ($accessType) {
            case 'admin':
                if (!$user->isAdmin()) {
                    return redirect()->route('assessment-tools.redirect')
                        ->with('error', 'Admin access required.');
                }
                break;

            case 'premium':
                if (!$user->isPremium() && !$user->isAdmin()) {
                    return redirect()->route('tools.discover')
                        ->with('info', 'Premium subscription required to access assessment tools. Browse available tools below and subscribe to get started!');
                }
                break;

            case 'dashboard':
                if (!$user->canAccessDashboard()) {
                    return redirect()->route('tools.discover')
                        ->with('info', 'Dashboard access requires premium subscription. Upgrade to unlock advanced features!');
                }
                break;

            case 'authenticated':
            default:
                // Just require authentication - already checked above
                break;
        }

        return $next($request);
    }
}
