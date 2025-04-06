<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleSocialitePlusProviders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $providers = collect(config('socialiteplus.providers'))->filter(fn ($provider) => $provider['active'])->map(fn ($provider) => [
            'name' => $provider['name'],
            'icon' => $provider['icon'],
            'branded' => $provider['branded'],
        ])->toArray();

        $providerConfig = config('socialiteplus');

        $providerConfig['providers'] = $providers;

        $request->attributes->set('providersConfig', $providerConfig);

        return $next($request);
    }
}
