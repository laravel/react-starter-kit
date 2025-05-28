<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $level = 'free'): Response
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        switch ($level) {
            case 'dashboard':
                if (!$user->canAccessDashboard()) {
                    return redirect()->route('assessment-tools')
                        ->with('error', 'Dashboard access requires premium subscription.');
                }
                break;

            case 'premium':
                if (!$user->canAccessAdvancedFeatures()) {
                    return redirect()->route('subscription.show')
                        ->with('info', 'This feature requires premium subscription.');
                }
                break;

            case 'admin':
                if (!$user->isAdmin()) {
                    abort(403, 'Access denied.');
                }
                break;

            case 'free':
            default:
                // Free access - no additional checks needed
                break;
        }

        return $next($request);
    }
}
