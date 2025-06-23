<?php

use App\Http\Middleware\CheckAssessmentLimits;
use App\Http\Middleware\CheckFilamentAccess;
use App\Http\Middleware\CheckToolAccess;
use App\Http\Middleware\CheckUserAccess;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            // REMOVED: CheckUserAccess, CheckFilamentAccess, CheckAssessmentLimits from global web middleware
            // These should be applied only to specific routes that need them
        ])->alias([
            'checkAccess' => CheckUserAccess::class,
            'checkToolAccess' => CheckToolAccess::class,
            'filamentAccess' => CheckFilamentAccess::class,
            'checkAssessmentLimits' => CheckAssessmentLimits::class,
        ])->validateCsrfTokens(except: [

            'paddle/*',

        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
