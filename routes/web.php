<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('upload', function () {
        return Inertia::render('upload');
    })->name('upload');

    Route::apiResource('api/v1/gallery', GalleryController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
