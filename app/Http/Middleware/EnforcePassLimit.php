<?php

namespace App\Http\Middleware;

use App\Services\PassLimitService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnforcePassLimit
{
    /**
     * Create a new middleware instance.
     */
    public function __construct(
        protected PassLimitService $passLimitService
    ) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        $platform = $request->input('platform');

        if (!$platform) {
            return $next($request);
        }

        if (!$this->passLimitService->canCreatePass($user, $platform)) {
            return back()->withErrors([
                'limit' => 'You have reached your pass creation limit. Please upgrade your plan to create more passes.',
            ]);
        }

        return $next($request);
    }
}
