<?php

// routes/api.php
use App\Http\Controllers\AssessmentReportController;
use Illuminate\Support\Facades\Route;

// PDF Report Generation Routes
Route::middleware(['auth:sanctum'])->group(function () {

    // Generate PDF report for assessment
    Route::post('/assessments/{assessment}/reports/generate', [AssessmentReportController::class, 'generateReport'])
        ->name('api.assessments.reports.generate');

    // Preview report data (for frontend preview)
    Route::get('/assessments/{assessment}/reports/preview', [AssessmentReportController::class, 'previewReport'])
        ->name('api.assessments.reports.preview');

    // Get available report templates
    Route::get('/reports/templates', [AssessmentReportController::class, 'getTemplates'])
        ->name('api.reports.templates');
});

// Guest PDF Generation (for guest assessments)
Route::middleware(['throttle:10,1'])->group(function () {

    // Generate PDF for guest assessment with session validation
    Route::post('/guest/assessments/{assessment}/reports/generate', [AssessmentReportController::class, 'generateGuestReport'])
        ->name('api.guest.assessments.reports.generate');

});

// Additional methods for AssessmentReportController

/**
 * Preview report data without generating PDF
 */

