<?php

use App\Http\Controllers\GalleryController;
use App\Models\gallery;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::middleware(['auth', 'verified' , 'role:admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::get('upload', function ()  {
        return inertia::render('upload');
    })->name('upload');

    Route::get('gallery/{gallery}/edit', function (gallery $gallery) {
        return Inertia::render('gallery/edit', [
            'gallery' => $gallery
        ]);
    })->name('gallery.edit');
    Route::post('/upload', [GalleryController::class, 'store'])->name('image.store');
    
    Route::get('landing/admin', function () {
        return Inertia::render('landing');
    })->name('landing');
    Route::apiResource('api/v1/gallery', GalleryController::class);

});

Route::middleware(['auth', 'verified' ])->group(function () {
    Route::get('landing', function () {
        return Inertia::render('landing');
    })->name('landing');
    Route::apiResource('api/v1/gallery', GalleryController::class);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
