<?php

use App\Http\Controllers\AssessmentPDFController;
use App\Http\Controllers\AssessmentReportController;
use App\Http\Controllers\AssessmentToolsController;
use App\Http\Controllers\ContactSalesController;
use App\Http\Controllers\GuestAssessmentController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\UserRegistrationController;
use App\Models\Tool;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [GuestAssessmentController::class, 'index'])->name('home');
Route::get('/home', [GuestAssessmentController::class, 'index2'])->name('home2');

// Free user registration route (public)
Route::post('/user/register-free', [UserRegistrationController::class, 'registerFreeUser'])
    ->name('user.register-free');

// Guest routes (for non-authenticated users)
Route::get('/assessment/tool/{tool}', [GuestAssessmentController::class, 'create'])
    ->name('assessment.create');

Route::post('/assessment/start', [GuestAssessmentController::class, 'start'])
    ->name('guest.assessment.start');

Route::post('/assessment/{assessment}/response', [GuestAssessmentController::class, 'saveResponse'])
    ->name('assessment.save-response');

Route::post('/assessment/{assessment}/update-details', [GuestAssessmentController::class, 'updateDetails'])
    ->name('assessment.update-details');

Route::post('/assessment/{assessment}/submit', [GuestAssessmentController::class, 'submit'])
    ->name('guest.assessment.submit');

Route::get('/guest/assessment/{assessment}/results', [GuestAssessmentController::class, 'results'])
    ->name('guest.assessment.results');

Route::post('/guest/assessment/{assessment}/send-email', [GuestAssessmentController::class, 'sendEmail'])
    ->name('guest.assessment.send-email');

Route::post('/guest/session/{assessment}/update', [GuestAssessmentController::class, 'updateSession'])
    ->name('guest.session.update');

// Contact routes
Route::post('/contact/sales', [ContactSalesController::class, 'store'])->name('contact.sales');
Route::get('/contact/sales', [ContactSalesController::class, 'show'])->name('contact.sales.show');

// Guest PDF reports
Route::get('/guest/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->name('guest.assessments.report.download');

// Authenticated routes - REMOVED MIDDLEWARE BLOCKING FREE USERS
Route::middleware(['auth', 'verified'])->group(function () {

    // ========================================
    // ASSESSMENT TOOLS - ACCESSIBLE TO ALL AUTHENTICATED USERS
    // ========================================

    // Assessment Tools - This routes free users to FreeUserAssessmentPage, premium to dashboard version
    Route::get('/assessment-tools', [AssessmentToolsController::class, 'index'])
        ->name('assessment-tools');

    // Assessment routes for authenticated users
    Route::get('/assessment/start/{tool}', [AssessmentToolsController::class, 'start'])
        ->name('assessment.start');

    Route::post('/assessment/submit', [AssessmentController::class, 'submit'])
        ->name('assessment.submit');

    // Assessment results - Different views based on user type
    Route::get('/assessment/results/{assessment}', [AssessmentController::class, 'results'])
        ->name('assessment.results'); // Auto-redirects based on user type

    // Free user results page (outside dashboard)
    Route::get('/assessment/results/{assessment}/free', [AssessmentController::class, 'freeResults'])
        ->name('assessment.results.free');

    // Assessment history - Available for all authenticated users
    Route::get('/assessments', [AssessmentController::class, 'index'])
        ->name('assessments.index');

    // Subscription routes - Available for all users (NO MIDDLEWARE)
    Route::get('/subscription', [UserRegistrationController::class, 'showSubscription'])
        ->name('subscription.show');

    Route::post('/subscription/request', [UserRegistrationController::class, 'requestSubscription'])
        ->name('subscription.request');

    // PDF Reports - Available for all authenticated users (with different access levels)
    Route::get('/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadReport'])
        ->name('assessments.report.download');

    // ========================================
    // PREMIUM USER ROUTES (Dashboard Access)
    // ========================================

    // Dashboard - Only for premium and admin users
    Route::middleware('checkAccess:dashboard')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        // Premium Assessment Tools (dashboard version)
        Route::get('/dashboard/assessment-tools', [AssessmentToolsController::class, 'premiumIndex'])
            ->name('dashboard.assessment-tools');

        // Premium user results page (dashboard version)
        Route::get('/assessment/results/{assessment}/premium', [AssessmentController::class, 'premiumResults'])
            ->name('assessment.results.premium');
    });

    // Advanced features - Premium only
    Route::middleware('checkAccess:premium')->group(function () {
        Route::get('/advanced-analytics', function () {
            return Inertia::render('analytics/advanced');
        })->name('analytics.advanced');

        Route::get('/team-management', function () {
            return Inertia::render('team/management');
        })->name('team.management');

        Route::get('/api-access', function () {
            return Inertia::render('api/access');
        })->name('api.access');
    });
});

// Admin routes - Only for super_admin role
Route::middleware(['auth', 'verified', 'checkAccess:admin'])->group(function () {
    // Additional admin routes can be added here
    // Filament admin panel routes are handled by FilamentServiceProvider
});

// API routes for authenticated users
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

// Guest API access (limited)
Route::post('/guest/assessments/{assessment}/reports/generate', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->middleware(['throttle:10,1']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
