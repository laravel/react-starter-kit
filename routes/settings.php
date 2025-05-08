<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/two-factor', [TwoFactorAuthController::class, 'show'])->name('two-factor.show');
    Route::post('settings/two-factor', [TwoFactorAuthController::class, 'enable'])->name('two-factor.enable');
    Route::post('settings/two-factor/confirm', [TwoFactorAuthController::class, 'confirm'])->name('two-factor.confirm');
    Route::post('settings/two-factor/recovery-codes', [TwoFactorAuthController::class, 'regenerateRecoveryCodes'])->name('two-factor.regenerate-recovery-codes');
    Route::delete('settings/two-factor', [TwoFactorAuthController::class, 'disable'])->name('two-factor.disable')
        ->middleware('password.confirm');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});
