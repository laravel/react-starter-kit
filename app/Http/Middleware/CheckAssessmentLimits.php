<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAssessmentLimits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Allow access if no user (guest)
        if (!$user) {
            return $next($request);
        }

        // Always allow premium/admin users
        if ($user->isPremium() || $user->isAdmin()) {
            return $next($request);
        }

        // For free users, check limits only on POST requests (submissions)
        if ($request->isMethod('POST') && $request->routeIs('assessment.submit')) {
            if (!$user->canCreateAssessment()) {
                return redirect()->route('subscription.show')
                    ->with('error', 'You have reached your assessment limit. Please upgrade to premium for unlimited assessments.');
            }
        }

        // Allow GET requests (viewing assessment tools, starting assessments)
        return $next($request);
    }
}
