<?php

use App\Http\Controllers\AssessmentPDFController;
use App\Http\Controllers\AssessmentReportController;
use App\Http\Controllers\AssessmentToolsController;
use App\Http\Controllers\ContactSalesController;
use App\Http\Controllers\GuestAssessmentController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\UserRegistrationController;
use App\Http\Controllers\FreeUserController;
use App\Models\Tool;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ========================================
// PUBLIC HOME ROUTE - Updated for Admin Redirect
// ========================================

Route::get('/', function () {
    // Check if user is authenticated and is admin
//    if (auth()->check() && auth()->user()->isAdmin()) {
//        return redirect('/dashboard');
//    }

    // For all other users (non-authenticated, premium, or free), show the Welcome2 page
    return app(GuestAssessmentController::class)->index2();
})->name('home');

// Alternative home route for compatibility
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

// Authenticated routes - ACCESSIBLE TO ALL AUTHENTICATED USERS
Route::middleware(['auth', 'verified'])->group(function () {

    // ========================================
    // FREE USER ROUTES - SEPARATE CONTROLLER
    // ========================================

    // Free User Assessment Management - Using dedicated FreeUserController
    Route::get('/free-user/assessments', [FreeUserController::class, 'index'])
        ->name('free-user.index');

    Route::get('/free-user/assessments/{assessment}/results', [FreeUserController::class, 'results'])
        ->name('free-user.results');

    Route::get('/free-user/assessments/{assessment}/edit', [FreeUserController::class, 'edit'])
        ->name('free-user.edit');

    Route::put('/free-user/assessments/{assessment}', [FreeUserController::class, 'update'])
        ->name('free-user.update');

    Route::post('/free-user/assessments/submit', [FreeUserController::class, 'submit'])
        ->name('free-user.submit');

    // ========================================
    // ASSESSMENT TOOLS - FIXED ROUTING
    // ========================================

    // Assessment Tools - Use AssessmentToolsController for all users
    Route::get('/assessment-tools', [AssessmentToolsController::class, 'index'])
        ->name('assessment-tools');

    // Assessment routes for authenticated users
    Route::get('/assessment/start/{tool}', [AssessmentToolsController::class, 'start'])
        ->name('assessment.start');

    Route::post('/assessment/submit', [AssessmentController::class, 'submit'])
        ->name('assessment.submit');

    // Assessment results - Different views based on user type
    Route::get('/assessment/results/{assessment}', [AssessmentController::class, 'results'])
        ->name('assessment.results');

    // ========================================
    // ASSESSMENT HISTORY - FIXED ROUTING
    // ========================================

    // Assessment history - Route to appropriate controller based on user type
    Route::get('/assessments', function() {
        $user = auth()->user();

        // Route to appropriate controller based on user type
        if ($user->isPremium() || $user->isAdmin()) {
            // For premium/admin users, use AssessmentController
            return app(AssessmentController::class)->index(request());
        } else {
            // For free users, use FreeUserController
            return app(FreeUserController::class)->index();
        }
    })->name('assessments.index');

    // Alternative route for backward compatibility
    Route::get('/my-assessments', function() {
        return redirect()->route('assessments.index');
    })->name('assessments');

    // ========================================
    // SUBSCRIPTION ROUTES - AVAILABLE FOR ALL USERS
    // ========================================

    // Subscription routes - Available for all users (NO MIDDLEWARE BLOCKING)
    Route::get('/subscription', [UserRegistrationController::class, 'showSubscription'])
        ->name('subscription.show');

    // Alternative route name for compatibility
    Route::get('/upgrade', [UserRegistrationController::class, 'showSubscription'])
        ->name('subscription');

    Route::post('/subscription/request', [UserRegistrationController::class, 'requestSubscription'])
        ->name('subscription.request');

    // ========================================
    // PDF REPORTS - ROUTE TO APPROPRIATE CONTROLLER
    // ========================================

    // Free User PDF Reports
    Route::get('/assessments/{assessment}/free-report', [App\Http\Controllers\FreeUserPDFController::class, 'downloadFreeUserReport'])
        ->name('assessments.free-report.download');

    // Premium PDF Reports
    Route::get('/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadReport'])
        ->name('assessments.report.download');

    // ========================================
    // ASSESSMENT SAVING AND EXITING
    // ========================================

    // Save and exit route - saves current progress and redirects to assessments
    Route::post('/assessment/{assessment}/save-exit', function(\App\Models\Assessment $assessment) {
        $user = auth()->user();

        // Check if user owns this assessment
        if ($assessment->user_id !== $user->id) {
            abort(403);
        }

        // Update assessment status to draft if it's in progress
        if ($assessment->status === 'in_progress') {
            $assessment->update(['status' => 'draft']);
        }

        return redirect()->route('assessments.index')
            ->with('success', 'Assessment progress saved successfully!');
    })->name('assessment.save-exit');

    // Alternative save and exit that accepts form data
    Route::post('/assessment/save-and-exit', function(\Illuminate\Http\Request $request) {
        $user = auth()->user();

        $assessmentId = $request->input('assessment_id');
        if (!$assessmentId) {
            return redirect()->route('assessments.index')
                ->with('info', 'Redirected to assessments.');
        }

        $assessment = \App\Models\Assessment::find($assessmentId);

        if ($assessment && $assessment->user_id === $user->id) {
            // Save any pending responses if provided
            if ($request->has('responses')) {
                foreach ($request->input('responses', []) as $criterionId => $responseValue) {
                    if ($responseValue !== null) {
                        $responseString = match ((int)$responseValue) {
                            100 => 'yes',
                            0 => 'no',
                            50 => 'na',
                            default => 'na'
                        };

                        \App\Models\AssessmentResponse::updateOrCreate(
                            [
                                'assessment_id' => $assessment->id,
                                'criterion_id' => $criterionId,
                            ],
                            [
                                'response' => $responseString,
                                'notes' => $request->input("notes.{$criterionId}"),
                            ]
                        );
                    }
                }
            }

            // Update status to draft
            $assessment->update(['status' => 'draft']);
        }

        return redirect()->route('assessments.index')
            ->with('success', 'Assessment progress saved successfully!');
    })->name('assessment.save-and-exit');

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

// ========================================
// ADMIN ROUTES - Only for super_admin role
// ========================================

Route::middleware(['auth', 'verified', 'checkAccess:admin'])->group(function () {
    // Admin-specific routes can be added here
    // Filament admin panel routes are handled by FilamentServiceProvider

    // You can add custom admin routes here if needed
    Route::get('/admin/custom', function () {
        return Inertia::render('admin/custom');
    })->name('admin.custom');
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

use App\Http\Controllers\ReportController;

Route::get('/cmo-report', [ReportController::class, 'generateReport'])->name('cmo.report');
Route::get('/cmo-report/preview', [ReportController::class, 'previewReport'])->name('cmo.report.preview');

// Guest API access (limited)
Route::post('/guest/assessments/{assessment}/reports/generate', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->middleware(['throttle:10,1']);

Route::get('/report/landscape', [ReportController::class, 'landscapeChart']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
