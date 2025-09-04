<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('settings.profile');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('settings.profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('settings.profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('settings.password');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('settings.password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('settings.appearance');
});
