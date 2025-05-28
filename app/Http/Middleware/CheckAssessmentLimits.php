<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAssessmentLimits
{
    /**
     * Handle an incoming request to check assessment limits
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Check if user can create more assessments
        if (!$user->canCreateAssessment()) {
            $limit = $user->getAssessmentLimit();

            return redirect()->route('subscription.show')
                ->with('error', "You have reached your assessment limit of {$limit}. Please upgrade to premium for unlimited assessments.");
        }

        return $next($request);
    }
}
