<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get appearance preference from cookie (defaults to 'system')
        $appearance = $request->cookie('appearance') ?? 'system';
        
        // Share the appearance with all views
        view()->share('appearance', $appearance);
        
        return $next($request);
    }
}
