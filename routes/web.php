<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Middleware\HandleSocialitePlusProviders;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('register', [RegisteredUserController::class, 'create'])
    ->middleware(HandleSocialitePlusProviders::class)
    ->name('register');

Route::get('login', [AuthenticatedSessionController::class, 'create'])
    ->middleware(HandleSocialitePlusProviders::class)
    ->name('login');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
