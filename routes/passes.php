<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\PassController;
use App\Http\Controllers\PassDownloadController;
use App\Http\Controllers\PassImageController;
use App\Http\Controllers\PassTemplateController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Pass management routes
    Route::resource('passes', PassController::class);

    // Apply pass limit middleware only to store action
    Route::post('passes', [PassController::class, 'store'])
        ->name('passes.store')
        ->middleware('enforce.pass.limit');

    // Pass download and generation routes
    Route::post('passes/{pass}/download/apple', [PassDownloadController::class, 'downloadApple'])
        ->name('passes.download.apple');
    Route::post('passes/{pass}/generate/google', [PassDownloadController::class, 'generateGoogleLink'])
        ->name('passes.generate.google');

    // Pass image upload
    Route::post('passes/images', [PassImageController::class, 'store'])
        ->name('passes.images.store');

    // Pass template management routes
    Route::resource('templates', PassTemplateController::class);

    // Billing routes
    Route::get('billing', [BillingController::class, 'index'])
        ->name('billing.index');
    Route::post('billing/checkout', [BillingController::class, 'checkout'])
        ->name('billing.checkout');
    Route::get('billing/portal', [BillingController::class, 'portal'])
        ->name('billing.portal');
});
