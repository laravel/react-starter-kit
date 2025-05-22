<?php

use App\Http\Controllers\AssessmentToolsController;
use App\Http\Controllers\GuestAssessmentController;
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

    // Assessment Tools routes
    Route::get('/assessment-tools', [App\Http\Controllers\AssessmentToolsController::class, 'index'])
        ->name('assessment-tools');

    Route::get('/assessment/start/{tool}', [App\Http\Controllers\AssessmentToolsController::class, 'start'])
        ->name('assessment.start');

    Route::post('/assessment/submit', [App\Http\Controllers\AssessmentController::class, 'submit'])
        ->name('assessment.submit');

    Route::get('/assessment/results/{assessment}', [App\Http\Controllers\AssessmentController::class, 'results'])
        ->name('assessment.results');

    Route::get('/assessments', [App\Http\Controllers\AssessmentController::class, 'index'])
        ->name('assessments.index');
});

//Route::get('/', function () {
//    $tools = Tool::with(['domains.categories'])
//        ->get();
//
//    return Inertia::render('welcome', [
//        'tools' => $tools
//    ]);
//});

Route::get('/', [GuestAssessmentController::class, 'index'])->name('home');
Route::get('/assessment/tool/{tool}', [GuestAssessmentController::class, 'create'])->name('assessment.create');
Route::post('/assessment/start', [GuestAssessmentController::class, 'start'])->name('assessment.start');

// Assessment taking routes (accessible by both guests and authenticated users)
Route::get('/assessment/{assessment}/take', [GuestAssessmentController::class, 'take'])->name('assessment.take');
Route::post('/assessment/{assessment}/response', [GuestAssessmentController::class, 'saveResponse'])->name('assessment.save-response');
Route::post('/assessment/{assessment}/update-details', [GuestAssessmentController::class, 'updateDetails'])->name('assessment.update-details');
Route::post('/assessment/{assessment}/submit', [GuestAssessmentController::class, 'submit'])->name('assessment.submit');
Route::get('/assessment/{assessment}/results', [GuestAssessmentController::class, 'results'])->name('assessment.results');
