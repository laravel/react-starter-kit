<?php

use App\Http\Controllers\AssessmentToolsController;
use App\Http\Controllers\GuestAssessmentController;
use App\Http\Controllers\AssessmentController;
use App\Models\Tool;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Assessment Tools routes for authenticated users
    Route::get('/assessment-tools', [AssessmentToolsController::class, 'index'])
        ->name('assessment-tools');

    // Start assessment for authenticated users (redirects to start.tsx)
    Route::get('/assessment/start/{tool}', [AssessmentToolsController::class, 'start'])
        ->name('assessment.start');

    // Submit assessment for authenticated users
    Route::post('/assessment/submit', [AssessmentController::class, 'submit'])
        ->name('assessment.submit');

    // Results for authenticated users (results.tsx - different from guest Results.tsx)
    Route::get('/assessment/results/{assessment}', [AssessmentController::class, 'results'])
        ->name('assessment.results');

    // List all user's assessments
    Route::get('/assessments', [AssessmentController::class, 'index'])
        ->name('assessments.index');
});

// Guest routes (for non-authenticated users)
Route::get('/', [GuestAssessmentController::class, 'index'])->name('home');

// Create assessment form for guests
Route::get('/assessment/tool/{tool}', [GuestAssessmentController::class, 'create'])
    ->name('assessment.create');

// Start assessment for guests
Route::post('/assessment/start', [GuestAssessmentController::class, 'start'])
    ->name('guest.assessment.start');

// Assessment taking routes (accessible by both guests and authenticated users)
Route::get('/assessment/{assessment}/take', [GuestAssessmentController::class, 'take'])
    ->name('assessment.take');

Route::post('/assessment/{assessment}/response', [GuestAssessmentController::class, 'saveResponse'])
    ->name('assessment.save-response');

Route::post('/assessment/{assessment}/update-details', [GuestAssessmentController::class, 'updateDetails'])
    ->name('assessment.update-details');

Route::post('/assessment/{assessment}/submit', [GuestAssessmentController::class, 'submit'])
    ->name('guest.assessment.submit');

// Guest results (Results.tsx with capital R)
Route::get('/guest/assessment/{assessment}/results', [GuestAssessmentController::class, 'results'])
    ->name('guest.assessment.results');
