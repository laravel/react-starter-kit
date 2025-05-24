<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get appearance preference from cookie, default to 'light'
        $appearance = $request->cookie('appearance', 'light');

        // Validate the appearance value
        if (!in_array($appearance, ['light', 'dark', 'system'])) {
            $appearance = 'light';
        }

        // Share with all views
        View::share('appearance', $appearance);

        return $next($request);
    }
}
