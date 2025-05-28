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

Route::get('/assessment/{assessment}/take', [GuestAssessmentController::class, 'take'])
    ->name('assessment.take');

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

// Authenticated routes with role-based access
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard - Only for premium and admin users
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->middleware(['checkAccess:dashboard'])->name('dashboard');

    // Assessment Tools - Available for all authenticated users (free, premium, admin)
    Route::get('/assessment-tools', [AssessmentToolsController::class, 'index'])
//        ->middleware(['checkAccess:free'])
        ->name('assessment-tools');

    // Assessment routes for authenticated users
    Route::get('/assessment/start/{tool}', [AssessmentToolsController::class, 'start'])
//        ->middleware(['checkAccess:free'])
        ->name('assessment.start');

    Route::post('/assessment/submit', [AssessmentController::class, 'submit'])
//        ->middleware(['checkAccess:free'])
        ->name('assessment.submit');

    Route::get('/assessment/results/{assessment}', [AssessmentController::class, 'results'])
//        ->middleware(['checkAccess:free'])
        ->name('assessment.results');

    // Assessment history - Available for all authenticated users
    Route::get('/assessments', [AssessmentController::class, 'index'])
//        ->middleware(['checkAccess:free'])
        ->name('assessments.index');

    // Subscription routes - Only for free users who want to upgrade
    Route::get('/subscription', [UserRegistrationController::class, 'showSubscription'])
//        ->middleware(['checkAccess:free'])
        ->name('subscription.show');

    Route::post('/subscription/request', [UserRegistrationController::class, 'requestSubscription'])
//        ->middleware(['checkAccess:free'])
        ->name('subscription.request');

    // PDF Reports with role-based restrictions
    Route::get('/assessments/{assessment}/report', [AssessmentController::class, 'downloadReport'])
//        ->middleware(['checkAccess:free']) // Free users get basic reports
        ->name('assessments.report.download');

    // Advanced features - Premium only
    Route::middleware(['checkAccess:premium'])->group(function () {
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
    // Filament admin panel routes are handled by FilamentServiceProvider
    // Additional admin routes can be added here
});

// PDF Generation routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadReport'])
        ->name('assessments.report.download');
});

// Guest PDF reports
Route::get('/guest/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->name('guest.assessments.report.download');

// API routes
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
