<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $level  ('free', 'premium', 'admin')
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $level = 'free')
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        switch ($level) {
            case 'admin':
                if (!$user->isAdmin()) {
                    return redirect()->route('free-assessment.index')
                        ->with('error', 'Admin access required.');
                }
                break;

            case 'premium':
                if (!$user->hasAnyToolSubscription() && !$user->isAdmin()) {
                    return redirect()->route('free-assessment.index')
                        ->with('info', 'Subscribe to tools to access premium features.');
                }
                break;

            case 'free':
                // Free users can't access premium features if they have subscriptions
                if ($request->routeIs('free-assessment.*') &&
                    ($user->hasAnyToolSubscription() || $user->isAdmin())) {
                    return redirect()->route('dashboard')
                        ->with('info', 'You have premium access. Use the dashboard instead.');
                }
                break;
        }

        return $next($request);
    }
}
