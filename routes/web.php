<?php

use App\Http\Controllers\AssessmentReportController;
use App\Http\Controllers\AssessmentToolsController;
use App\Http\Controllers\ContactSalesController;
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

    // Submit assessment for authenticated users - THIS ROUTE MUST EXIST
    Route::post('/assessment/submit', [AssessmentController::class, 'submit'])
        ->name('assessment.submit');

    // Results for authenticated users (results.tsx)
    Route::get('/assessment/results/{assessment}', [AssessmentController::class, 'results'])
        ->name('assessment.results');

    // List all user's assessments
    Route::get('/assessments', [AssessmentController::class, 'index'])
        ->name('assessments.index');
});

Route::post('/contact/sales', [ContactSalesController::class, 'store'])->name('contact.sales');
Route::get('/contact/sales', [ContactSalesController::class, 'show'])->name('contact.sales.show');
// Guest routes (for non-authenticated users)
Route::get('/', [GuestAssessmentController::class, 'index'])->name('home');
Route::get('/home', [GuestAssessmentController::class, 'index2'])->name('home2');
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

// Guest results (GuestResults.tsx - limited view)
Route::get('/guest/assessment/{assessment}/results', [GuestAssessmentController::class, 'results'])
    ->name('guest.assessment.results');

// Guest email functionality
Route::post('/guest/assessment/{assessment}/send-email', [GuestAssessmentController::class, 'sendEmail'])
    ->name('guest.assessment.send-email');

// Guest session tracking
Route::post('/guest/session/{assessment}/update', [GuestAssessmentController::class, 'updateSession'])
    ->name('guest.session.update');

// Enhanced registration route with prefilled data
//Route::get('/register', function(\Illuminate\Http\Request $request) {
//    return Inertia::render('auth/register', [
//        'prefillData' => [
//            'name' => $request->query('name'),
//            'email' => $request->query('email'),
//        ]
//    ]);
//})->middleware('guest')->name('register');



// routes/api.php - Add these routes
Route::post('/assessments/{assessment}/reports/generate', [AssessmentReportController::class, 'generateReport']);
Route::get('/assessments/{assessment}/reports/preview', [AssessmentReportController::class, 'previewReport']);

// routes/web.php - Add download route
Route::get('/assessments/{assessment}/report', [AssessmentController::class, 'downloadReport'])
    ->name('assessments.report.download');


// Add these routes to your existing routes/web.php file

use App\Http\Controllers\AssessmentPDFController;

// Add these routes to your existing authenticated routes group
Route::middleware(['auth', 'verified'])->group(function () {
    // Your existing routes...

    // PDF Generation for authenticated users
    Route::get('/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadReport'])
        ->name('assessments.report.download');
});

// Add this route for guest assessments (outside the auth middleware)
Route::get('/guest/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->name('guest.assessments.report.download');

// If you want API endpoints as well, add these to routes/api.php
Route::middleware(['auth'])->group(function () {
    Route::post('/assessments/{assessment}/reports/generate', [AssessmentPDFController::class, 'downloadReport']);
    Route::get('/reports/templates', function () {
        return response()->json([
            'success' => true,
            'data' => [
                [
                    'id' => 'comprehensive',
                    'name' => 'Comprehensive Report',
                    'name_ar' => 'تقرير شامل',
                    'description' => 'Complete assessment report with all details',
                    'description_ar' => 'تقرير تقييم كامل مع جميع التفاصيل',
                    'pages' => '8-12',
                    'includes' => ['client_info', 'results', 'charts', 'recommendations', 'action_plan']
                ],
                [
                    'id' => 'summary',
                    'name' => 'Executive Summary',
                    'name_ar' => 'ملخص تنفيذي',
                    'description' => 'Brief overview with key findings',
                    'description_ar' => 'نظرة عامة موجزة مع النتائج الرئيسية',
                    'pages' => '3-5',
                    'includes' => ['client_info', 'overall_score', 'key_recommendations']
                ],
                [
                    'id' => 'detailed',
                    'name' => 'Detailed Analysis',
                    'name_ar' => 'تحليل مفصل',
                    'description' => 'In-depth analysis with category breakdowns',
                    'description_ar' => 'تحليل متعمق مع تفصيل الفئات',
                    'pages' => '10-15',
                    'includes' => ['client_info', 'results', 'category_breakdown', 'charts', 'detailed_recommendations']
                ]
            ]
        ]);
    });
});

// For guest API access (if needed)
Route::post('/guest/assessments/{assessment}/reports/generate', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->middleware(['throttle:10,1']);



