<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Middleware\HandleSocialitePlusProviders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Content and file uploads
    Route::get('content', [ContentController::class, 'index'])->name('content.index');
    Route::post('content/upload', [FileUploadController::class, 'store'])->name('content.upload');
    Route::get('content/{fileUpload}/download', [FileUploadController::class, 'download'])->name('content.download');
    Route::patch('content/{fileUpload}/status', [FileUploadController::class, 'updateStatus'])->name('content.update-status');
    Route::delete('content/{fileUpload}', [FileUploadController::class, 'destroy'])->name('content.destroy');
});

// Custom Stripe webhook route - this will override Laravel Cashier's built-in route
Route::post('stripe/webhook', [StripeWebhookController::class, 'handleWebhook'])->name('cashier.webhook');

Route::get('/subscription-checkout', function (Request $request) {
    return $request->user()
        ->newSubscription('default', env('STRIPE_PRODUCT_ID'))
        ->checkout([
            'success_url' => route('dashboard'),
            'cancel_url' => route('dashboard'),
        ]);
});

Route::get('/billing', function (Request $request) {
    return $request->user()->redirectToBillingPortal(route('dashboard'));
})->middleware(['auth'])->name('billing');

Route::get('register', [RegisteredUserController::class, 'create'])
    ->middleware(HandleSocialitePlusProviders::class)
    ->name('register');

Route::get('login', [AuthenticatedSessionController::class, 'create'])
    ->middleware(HandleSocialitePlusProviders::class)
    ->name('login');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
