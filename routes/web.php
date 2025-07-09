<?php

// =====================================================================
// UPDATED ROUTES/WEB.PHP - FIXED REDIRECT LOGIC
// =====================================================================

use App\Http\Controllers\AssessmentPDFController;
use App\Http\Controllers\AssessmentReportController;
use App\Http\Controllers\AssessmentToolsController;
use App\Http\Controllers\ContactSalesController;
use App\Http\Controllers\GuestAssessmentController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\PaddleWebhookController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserRegistrationController;
use App\Http\Controllers\FreeUserController;
use App\Http\Controllers\FreeAssessmentController;
use App\Http\Controllers\NavigationController;
use App\Http\Controllers\ToolDiscoveryController;
use App\Http\Controllers\ToolSubscriptionController;
use App\Http\Controllers\ToolRequestController;
use App\Http\Controllers\PostController;
use App\Models\Tool;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ========================================
// PUBLIC HOME ROUTE - UPDATED FOR PROPER REDIRECT LOGIC
// ========================================

Route::get('/', function () {
    if (auth()->check()) {
        $user = auth()->user();

        // Load user relationships
        $user->load(['subscription', 'details', 'roles']);

        // Create default subscription/details if missing
        if (!$user->subscription || !$user->details) {
            $user->createDefaultSubscriptionAndDetails();
            $user->refresh();
        }

        // FIXED REDIRECT LOGIC:
        // 1. Admin users -> dashboard
        if ($user->isAdmin()) {
            return redirect()->route('dashboard');
        }

        // 2. Users with tool subscriptions (premium) -> dashboard
        if ($user->hasAnyToolSubscription()) {
            return redirect()->route('dashboard');
        }

        // 3. Free users -> tools discovery page to browse available tools
        return redirect()->route('tools.discover');
    }

    // Guest users see welcome page
    return app(GuestAssessmentController::class)->index2();
})->name('home');

// Alternative home route for compatibility
Route::get('/home', [GuestAssessmentController::class, 'index2'])->name('home2');

// ========================================
// PUBLIC GUEST ROUTES
// ========================================

// Guest assessment routes
Route::get('/guest/assessment', [GuestAssessmentController::class, 'create'])->name('guest.assessment.create');
Route::post('/guest/assessment', [GuestAssessmentController::class, 'store'])->name('guest.assessment.store');
Route::get('/guest/assessment/{session}', [GuestAssessmentController::class, 'show'])->name('guest.assessment.show');
Route::post('/guest/assessment/{session}/response', [GuestAssessmentController::class, 'storeResponse'])->name('guest.assessment.response');
Route::post('/guest/assessment/{session}/submit', [GuestAssessmentController::class, 'submit'])->name('guest.assessment.submit');
Route::get('/guest/assessment/{session}/results', [GuestAssessmentController::class, 'results'])->name('guest.assessment.results');

// Free user registration route
Route::post('/user/register-free', [UserRegistrationController::class, 'registerFreeUser'])->middleware('guest')->name('user.register-free');


// Contact sales
Route::post('/contact-sales', [ContactSalesController::class, 'store'])->name('contact.sales');

// Tool access requests
Route::get('/tools/request/{tool}', [ToolRequestController::class, 'create'])->name('tool-request.create');
Route::post('/tool-requests', [ToolRequestController::class, 'store'])->name('tool-request.store');

// Guest PDF report generation
Route::post('/guest/assessments/{assessment}/reports/generate', [AssessmentPDFController::class, 'downloadGuestReport'])
    ->middleware(['throttle:10,1']);

// Blog posts
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');
Route::post('/posts/{post:slug}/comments', [PostController::class, 'storeComment'])->name('posts.comments.store');

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
    Route::get('logout', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
    // User's tool subscriptions management
    Route::get('/my-tool-subscriptions', [ToolSubscriptionController::class, 'index'])
        ->name('tools.subscriptions');

    Route::delete('/tool-subscriptions/{subscription}', [ToolSubscriptionController::class, 'cancel'])
        ->name('tools.subscriptions.cancel');

    // ========================================
    // FREE ASSESSMENT ROUTES - ONLY for users WITHOUT tool subscriptions
    // ========================================

    Route::middleware(['checkAccess:free'])->group(function () {

        // 1. Index page - shows tool info and start button (Index.tsx)
        Route::get('/free-assessment', [FreeAssessmentController::class, 'index'])
            ->name('free-assessment.index');

        // 2. Start assessment - NO PARAMETERS NEEDED (uses single free tool)
        Route::post('/free-assessment/start', [FreeAssessmentController::class, 'start'])
            ->name('free-assessment.start');

        // 3. Take assessment - main assessment form (Start.tsx)
        Route::get('/free-assessment/{assessment}/take', [FreeAssessmentController::class, 'take'])
            ->name('free-assessment.take')
            ->where('assessment', '[0-9]+');

        // 4. Submit final assessment (from Start.tsx form)
        Route::post('/free-assessment/{assessment}/submit', [FreeAssessmentController::class, 'submit'])
            ->name('free-assessment.submit');

        // 5. Completion page before showing results
        Route::get('/free-assessment/{assessment}/complete', [FreeAssessmentController::class, 'complete'])
            ->name('free-assessment.complete');

        // 6. View basic results (Results.tsx)
        Route::get('/free-assessment/{assessment}/results', [FreeAssessmentController::class, 'results'])
            ->name('free-assessment.results');

        // 7. Edit assessment (redirects to take route)
        Route::get('/free-assessment/{assessment}/edit', [FreeAssessmentController::class, 'edit'])
            ->name('free-assessment.edit');

        // 7. Download PDF report (NEW)
        Route::get('/free-assessment/{assessment}/pdf', [FreeAssessmentController::class, 'downloadPDF'])
            ->name('free-assessment.pdf');

        // 8. Premium results page (Premium.tsx) - for premium users or upgrade prompt
        Route::get('/free-assessment/{assessment}/premium', [FreeAssessmentController::class, 'premiumResults'])
            ->name('free-assessment.premium');
    });
    // ========================================
    // PREMIUM ROUTES - ONLY for users WITH tool subscriptions OR admins
    // ========================================

    Route::middleware(['checkAccess:premium'])->group(function () {

        // Dashboard access
                 Route::get('dashboard', function () {
                return Inertia::render('dashboard');
            })->name('dashboard');

        // Assessment tools access
        Route::get('/assessment-tools', [AssessmentToolsController::class, 'index'])
            ->name('assessment-tools');

        Route::get('/assessments/tool/{tool}', [AssessmentToolsController::class, 'start'])
            ->name('assessment.start');

        Route::get('/assessments/{assessment}', [AssessmentController::class, 'show'])
            ->name('assessment.show');

        Route::get('/assessments/{assessment}/take', [AssessmentController::class, 'take'])
            ->name('assessment.take');

        Route::post('/assessments/{assessment}/response', [AssessmentController::class, 'saveResponse'])
            ->name('assessment.response');

        Route::post('/assessments/{assessment}/submit', [AssessmentController::class, 'submit'])
            ->name('assessment.submit');

        Route::get('/assessments/{assessment}/results', [AssessmentController::class, 'results'])
            ->name('assessment.results');

        Route::get('/assessments/{assessment}/edit', [AssessmentController::class, 'edit'])
            ->name('assessment.edit');

        Route::get('/assessments', [AssessmentController::class, 'index'])
            ->name('assessments.index');

        Route::post('/assessments/{assessment}/save-exit', function($assessmentId) {
            return response()->json(['success' => true, 'message' => 'Progress saved']);
        })->name('assessment.save-exit');

        Route::prefix('assessment/{assessment}/pdf')->name('assessment.pdf.')->group(function () {

            // Download PDF directly
            Route::get('/download', [AssessmentPDFController::class, 'downloadAssessmentPDF'])
                ->name('download');

            // Save PDF to storage and get URL
            Route::post('/save', [AssessmentPDFController::class, 'saveAssessmentPDF'])
                ->name('save');

            // Preview PDF in browser (HTML version)
            Route::get('/preview', [AssessmentPDFController::class, 'previewAssessmentPDF'])
                ->name('preview');
        });
    });

    // ========================================
    // LEGACY FREE USER ROUTES - REDIRECT TO NEW SYSTEM
    // ========================================

    // Redirect old free user routes to new system
    Route::get('/free-user/assessments', function () {
        $user = auth()->user();

        if ($user->hasAnyToolSubscription() || $user->isAdmin()) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('tools.discover');
    })->name('free-user.index');

    Route::get('/free-user/assessments/{assessment}/results', function ($assessmentId) {
        $user = auth()->user();

        if ($user->hasAnyToolSubscription() || $user->isAdmin()) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('free-assessment.results', $assessmentId);
    })->name('free-user.results');

    // Legacy assessment tools redirect
    Route::get('/freeUserAssessmentPage', function () {
        return redirect()->route('tools.discover');
    });

//    Route::get('/pdf', function () {
//        // Simple usage
//        $generator = new GartnerPDFGenerator();
//      return  $generator->saveToPDF('my_gartner_clone.pdf');
//
//// Or stream directly to browser
////        $generator->streamToBrowser();
//    });

    // ========================================
    // SUBSCRIPTION AND UPGRADE ROUTES
    // ========================================

    Route::get('/subscription', [UserRegistrationController::class, 'showSubscription'])
        ->name('subscription.show');

    Route::get('/upgrade', [UserRegistrationController::class, 'showSubscription'])
        ->name('subscription');

    Route::post('/subscription/request', [UserRegistrationController::class, 'requestSubscription'])
        ->name('subscription.request');

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

use App\Services\GartnerPDFGenerator;

Route::get('/pdf', function () {
    try {
        // Simple usage
        $generator = new GartnerPDFGenerator();

        // Option 1: Save to file and return download
        $filename = $generator->saveToPDF('my_gartner_clone.pdf');
        return response()->download($filename);

        // Option 2: Stream directly to browser (uncomment to use instead)
        // return response()->stream(function() use ($generator) {
        //     $generator->streamToBrowser();
        // }, 200, [
        //     'Content-Type' => 'application/pdf',
        //     'Content-Disposition' => 'inline; filename="gartner_cmo_playbook.pdf"'
        // ]);

    } catch (Exception $e) {
        // Better error handling for production
        return response()->json([
            'error' => 'PDF generation failed',
            'message' => $e->getMessage()
        ], 500);
    }
});

// Alternative approach if you want more control:
Route::get('/pdf-custom', function () {
    $generator = new GartnerPDFGenerator();

    // Generate the PDF content
    $pdfContent = $generator->generate();

    // Return as direct response
    return response($pdfContent, 200, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="gartner_clone.pdf"'
    ]);
});

// For testing purposes - simple text response
//Route::get('/pdf-test', function () {
//    try {
//        $generator = new GartnerPDFGenerator();
//        return "PDF Generator class loaded successfully!";
//    } catch (Exception $e) {
//        return "Error: " . $e->getMessage();
//    }
//});


// File: routes/web.php


// PDF Generation Routes
Route::prefix('pdf')->group(function () {
    // Download PDF directly
    Route::get('/gartner/download', [PDFController::class, 'downloadGartnerPDF'])
        ->name('pdf.gartner.download');

    // Preview in browser
    Route::get('/gartner/preview', [PDFController::class, 'previewGartnerPDF'])
        ->name('pdf.gartner.preview');

    // Save PDF to storage
    Route::post('/gartner/save', [PDFController::class, 'saveGartnerPDF'])
        ->name('pdf.gartner.save');

    // Get generation statistics
    Route::get('/stats', [PDFController::class, 'getPDFStats'])
        ->name('pdf.stats');
});

Route::get('/pdf/test', [PDFController::class, 'testSimplePDF']);
// API Routes (add to routes/api.php if you want API access)
Route::prefix('api/pdf')->group(function () {
    Route::get('/gartner', [PDFController::class, 'getGartnerPDFAPI']);
    Route::post('/gartner/bulk', [PDFController::class, 'bulkGenerateGartnerPDFs']);
});
