<?php

use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::inertia('/', 'welcome')->name('home');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
