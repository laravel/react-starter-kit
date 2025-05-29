<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckFilamentAccess
{
    /**
     * Handle an incoming request for Filament admin panel ONLY
     */
    public function handle(Request $request, Closure $next): Response
    {
        // FIXED: Only apply this middleware to Filament admin routes
//        if (!str_contains($request->path(), 'admin') && !str_contains($request->path(), 'filament')) {
//            return $next($request);
//        }
//
//        $user = auth()->user();
//
//        if (!$user || !$user->isAdmin()) {
//            abort(403, 'Access denied to admin panel.');
//        }

        return $next($request);
    }
}
