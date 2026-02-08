<?php

use App\Http\Controllers\Api\PassApiController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Create pass from template with custom data
    Route::post('/passes', [PassApiController::class, 'store']);

    // Get pass details
    Route::get('/passes/{pass}', [PassApiController::class, 'show']);

    // List user's passes
    Route::get('/passes', [PassApiController::class, 'index']);
});
