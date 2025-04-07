<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Middleware\HandleSocialitePlusProviders;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Custom Stripe webhook route - this will override Laravel Cashier's built-in route
Route::post('stripe/webhook', [StripeWebhookController::class, 'handleWebhook'])->name('cashier.webhook');

Route::get('/subscription-checkout', function (Request $request) {
    return $request->user()
        ->newSubscription('default', 'price_1R7a4FIWRSe7TYLFAjJ1tuXS')
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
