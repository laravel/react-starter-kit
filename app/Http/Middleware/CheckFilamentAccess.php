<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckFilamentAccess
{
    /**
     * Handle an incoming request for Filament admin panel
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!$user || !$user->isAdmin()) {
            abort(403, 'Access denied to admin panel.');
        }

        return $next($request);
    }
}
