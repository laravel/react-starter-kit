<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    $user = auth()->user();

    $stats = [
        'totalPasses' => $user->passes()->count(),
        'applePasses' => $user->passes()->where('platform', 'apple')->count(),
        'googlePasses' => $user->passes()->where('platform', 'google')->count(),
        'used' => $user->passes()->count(),
        'limit' => app(\App\Services\PassLimitService::class)->getPlanConfig($user)['pass_limit'],
    ];

    $recentPasses = $user->passes()
        ->with('template')
        ->latest()
        ->limit(5)
        ->get();

    return Inertia::render('dashboard', [
        'stats' => $stats,
        'recentPasses' => $recentPasses,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/passes.php';
require __DIR__.'/settings.php';
