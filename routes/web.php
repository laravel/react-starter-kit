<?php

// =====================================================================
// REVISED ROUTES/WEB.PHP - FIXED FREE ASSESSMENT IMPLEMENTATION
// =====================================================================

use App\Http\Controllers\AssessmentPDFController;
use App\Http\Controllers\AssessmentReportController;
use App\Http\Controllers\AssessmentToolsController;
use App\Http\Controllers\ContactSalesController;
use App\Http\Controllers\GuestAssessmentController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\PaddleWebhookController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserRegistrationController;
use App\Http\Controllers\FreeUserController;
use App\Http\Controllers\FreeAssessmentController;

// NEW CONTROLLER
use App\Http\Controllers\NavigationController;

// NEW CONTROLLER
use App\Http\Controllers\ToolDiscoveryController;
use App\Http\Controllers\ToolSubscriptionController;
use App\Models\Tool;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ========================================
// PUBLIC HOME ROUTE - UPDATED FOR FREE ASSESSMENT REDIRECT
// ========================================

Route::get('/', function () {
    if (auth()->check()) {
        $user = auth()->user();

        // Admin users go to dashboard
        if ($user->isAdmin()) {
            return redirect()->route('dashboard');
        }

        // Premium users (with tool subscriptions) go to dashboard
        if ($user->hasAnyToolSubscription()) {
            return redirect()->route('dashboard');
        }

        // Free users go to free assessment
        return redirect()->route('free-assessment.index');
    }

    // Guest users see welcome page
    return app(GuestAssessmentController::class)->index2();
})->name('home');

// Alternative home route for compatibility
Route::get('/home', [GuestAssessmentController::class, 'index2'])->name('home2');

// ========================================
// GUEST ROUTES (PUBLIC - NO AUTH REQUIRED)
// ========================================

// Free user registration route (public)
Route::post('/user/register-free', [UserRegistrationController::class, 'registerFreeUser'])
    ->name('user.register-free');

// Guest assessment routes
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

// Guest API access (limited)
Route::post('/guest/assessments/{assessment}/reports/generate', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->middleware(['throttle:10,1']);

// Paddle webhooks (no auth middleware)
Route::post('/paddle/webhook', [PaddleWebhookController::class, 'handleWebhook'])
    ->name('paddle.webhook');

// ========================================
// AUTHENTICATED USER ROUTES
// ========================================

Route::middleware(['auth', 'verified'])->group(function () {

    // ========================================
    // API ROUTES FOR NAVIGATION
    // ========================================

    Route::get('/api/navigation', [NavigationController::class, 'getNavigationItems'])
        ->name('api.navigation');

    // ========================================
    // FREE ASSESSMENT ROUTES - ONLY for users WITHOUT tool subscriptions
    // ========================================

    Route::middleware(['checkAccess:free'])->group(function () {

        Route::get('/free-assessment', [FreeAssessmentController::class, 'index'])
            ->name('free-assessment.index');

        Route::post('/free-assessment/start', [FreeAssessmentController::class, 'start'])
            ->name('free-assessment.start');

        Route::get('/free-assessment/{assessment}/take', [FreeAssessmentController::class, 'take'])
            ->name('free-assessment.take')
            ->where('assessment', '[0-9]+');

        Route::post('/free-assessment/{assessment}/save-response', [FreeAssessmentController::class, 'saveResponse'])
            ->name('free-assessment.save-response');

        Route::post('/free-assessment/{assessment}/submit', [FreeAssessmentController::class, 'submit'])
            ->name('free-assessment.submit');

        Route::get('/free-assessment/{assessment}/results', [FreeAssessmentController::class, 'results'])
            ->name('free-assessment.results');

        Route::get('/free-assessment/{assessment}/edit', [FreeAssessmentController::class, 'edit'])
            ->name('free-assessment.edit');
    });

    // ========================================
    // TOOL DISCOVERY AND SUBSCRIPTION ROUTES - Available to ALL authenticated users
    // ========================================

    Route::get('/tools/discover', [ToolDiscoveryController::class, 'index'])
        ->name('tools.discover');

    Route::get('/tools/{tool}/details', [ToolDiscoveryController::class, 'show'])
        ->name('tools.show');

    Route::get('/tools/{tool}/subscribe', [ToolSubscriptionController::class, 'show'])
        ->name('tools.subscribe');

    Route::post('/tools/{tool}/subscribe', [ToolSubscriptionController::class, 'subscribe'])
        ->name('tools.subscribe.store');

    // Paddle checkout routes
    Route::post('/tools/{tool}/paddle-checkout', [ToolSubscriptionController::class, 'createCheckout'])
        ->name('tools.paddle.checkout');

    Route::get('/tools/{tool}/payment/success', [ToolSubscriptionController::class, 'paymentSuccess'])
        ->name('tools.payment.success');

    // User's tool subscriptions management
    Route::get('/my-tool-subscriptions', [ToolSubscriptionController::class, 'index'])
        ->name('tools.subscriptions');

    Route::delete('/tool-subscriptions/{subscription}', [ToolSubscriptionController::class, 'cancel'])
        ->name('tools.subscriptions.cancel');

    // ========================================
    // PREMIUM ROUTES - ONLY for users WITH tool subscriptions
    // ========================================

    Route::middleware(['checkAccess:premium'])->group(function () {

        // Dashboard access
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        // Assessment tools access
        Route::get('/assessment-tools', [AssessmentToolsController::class, 'index'])
            ->name('assessment-tools');

        // Premium assessment routes
        Route::get('/assessment/start/{tool}', [AssessmentToolsController::class, 'start'])
            ->name('assessment.start');

        Route::get('/assessment/{assessment}/take', [AssessmentController::class, 'take'])
            ->name('assessment.take');

        Route::post('/assessment/{assessment}/submit', [AssessmentController::class, 'submit'])
            ->name('assessment.submit');

        Route::get('/assessment/results/{assessment}', [AssessmentController::class, 'results'])
            ->name('assessment.results');

        // Assessment history
        Route::get('/assessments', [AssessmentController::class, 'index'])
            ->name('assessments.index');

        // Alternative route for backward compatibility
        Route::get('/my-assessments', function () {
            return redirect()->route('assessments.index');
        })->name('assessments');

        // Premium PDF Reports
        Route::get('/assessments/{assessment}/report', [AssessmentPDFController::class, 'downloadReport'])
            ->name('assessments.report.download');

        // Assessment saving and exiting
        Route::post('/assessment/{assessment}/save-exit', function (\App\Models\Assessment $assessment) {
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
    });

    // ========================================
    // LEGACY FREE USER ROUTES - REDIRECT TO NEW SYSTEM
    // ========================================

    // Redirect old free user routes to new free assessment system
    Route::get('/free-user/assessments', function () {
        $user = auth()->user();

        if ($user->hasAnyToolSubscription() || $user->isAdmin()) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('free-assessment.index');
    })->name('free-user.index');

    Route::get('/free-user/assessments/{assessment}/results', function ($assessmentId) {
        $user = auth()->user();

        if ($user->hasAnyToolSubscription() || $user->isAdmin()) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('free-assessment.results', $assessmentId);
    })->name('free-user.results');

    // ========================================
    // SUBSCRIPTION AND UPGRADE ROUTES
    // ========================================

    Route::get('/subscription', [UserRegistrationController::class, 'showSubscription'])
        ->name('subscription.show');

    Route::get('/upgrade', [UserRegistrationController::class, 'showSubscription'])
        ->name('subscription');

    Route::post('/subscription/request', [UserRegistrationController::class, 'requestSubscription'])
        ->name('subscription.request');

    // ========================================
    // CATCH-ALL REDIRECTS FOR BLOCKED ACCESS
    // ========================================

    // These routes catch users trying to access restricted areas and redirect appropriately
    // They are placed at the end to avoid conflicts with the protected routes above
});

// ========================================
// ADMIN ROUTES - Only for super_admin role
// ========================================

Route::middleware(['auth', 'verified', 'checkAccess:admin'])->group(function () {
    // Admin-specific routes
    // Filament admin panel routes are handled by FilamentServiceProvider
});

// ========================================
// ADDITIONAL ROUTES FROM YOUR EXISTING SETUP
// ========================================

// CMO Report routes (if needed)
Route::get('/cmo-report', [ReportController::class, 'generateReport'])->name('cmo.report');
Route::get('/cmo-report/preview', [ReportController::class, 'previewReport'])->name('cmo.report.preview');
Route::get('/report/landscape', [ReportController::class, 'landscapeChart']);

// Include settings and auth routes
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

