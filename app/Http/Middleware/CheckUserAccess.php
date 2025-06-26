<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CheckUserAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string  $accessType
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, string $accessType = 'free')
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Load user relationships to avoid errors
        $user->load(['subscription', 'details', 'roles']);

        // Create default subscription/details if missing
        if (!$user->subscription || !$user->details) {
            $user->createDefaultSubscriptionAndDetails();
            $user->refresh();
        }

        Log::info('CheckUserAccess middleware called', [
            'user_id' => $user->id,
            'access_type' => $accessType,
            'user_is_admin' => $user->isAdmin(),
            'user_has_tool_subscriptions' => $user->hasAnyToolSubscription(),
            'requested_route' => $request->route()?->getName(),
        ]);

        switch ($accessType) {
            case 'admin':
                // Only super admins can access admin routes
                if (!$user->isAdmin()) {
                    Log::info('Non-admin user blocked from admin route', ['user_id' => $user->id]);
                    return redirect()->route('dashboard')->with('error', 'Access denied. Admin privileges required.');
                }
                break;

            case 'premium':
                // Only users with tool subscriptions or admins can access premium routes
                if (!$user->hasAnyToolSubscription() && !$user->isAdmin()) {
                    Log::info('User without tool subscriptions blocked from premium route', ['user_id' => $user->id]);
                    return redirect()->route('tools.discover')->with('error', 'Please subscribe to a tool to access this feature.');
                }
                break;

            case 'free':
                // Only users WITHOUT tool subscriptions can access free routes (unless admin)
                if ($user->hasAnyToolSubscription() && !$user->isAdmin()) {
                    Log::info('Premium user redirected from free route to dashboard', ['user_id' => $user->id]);
                    return redirect()->route('dashboard');
                }
                break;

            default:
                Log::warning('Unknown access type in CheckUserAccess middleware', [
                    'access_type' => $accessType,
                    'user_id' => $user->id
                ]);
                break;
        }

        return $next($request);
    }
}
