<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Tool;
use App\Models\AssessmentResponse;
use App\Models\GuestSession;
use App\Mail\GuestAssessmentCompleted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Exception;

class GuestAssessmentController extends Controller
{
    /**
     * Show the assessment landing page
     */
    public function index()
    {
        $user = auth()->user();



        Log::info('Index method called', ['user_id' => $user?->id ?? 'guest']);

        // If user is authenticated, redirect them to their appropriate page
        if ($user) {
            try {
                // Load relationships safely
                $user->load(['subscription', 'details', 'roles']);
                Log::info('User relationships loaded', ['user_id' => $user->id]);

                // Create default subscription/details if missing
                if (!$user->subscription || !$user->details) {
                    Log::info('Creating default subscription/details', ['user_id' => $user->id]);
                    $user->createDefaultSubscriptionAndDetails();
                    $user->refresh();
                }

                // Redirect based on user type - FIXED ROUTES
                if ($user->isAdmin()) {
                    Log::info('Redirecting admin to dashboard', ['user_id' => $user->id]);
                    return redirect()->route('dashboard');
                } elseif ($user->isPremium()) {
                    Log::info('Redirecting premium to dashboard', ['user_id' => $user->id]);
                    return redirect()->route('dashboard');
                } else {
                    Log::info('Redirecting free user to assessment tools', ['user_id' => $user->id]);
                    return redirect()->route('assessment-tools');
                }
            } catch (Exception $e) {
                // Log error and fallback to assessment tools
                Log::error('Home redirect failed', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);

                return redirect()->route('assessment-tools');
            }
        }

        // Show welcome page for guests
        Log::info('Showing welcome page for guest');
        return $this->renderWelcomePage();
    }

    /**
     * Show the home2 page (/home) - For free users to register/subscribe
     */
    public function index2()
    {
        $user = auth()->user();

        Log::info('Index2 method called', ['user_id' => $user?->id ?? 'guest']);

        try {
            // If user is authenticated, show them the welcome page with user info
            if ($user) {
                Log::info('Authenticated user accessing home2', ['user_id' => $user->id]);

                // Load relationships safely
                $user->load(['subscription', 'details', 'roles']);

                // Create default subscription/details if missing
                if (!$user->subscription || !$user->details) {
                    Log::info('Creating default subscription/details for user', ['user_id' => $user->id]);
                    $user->createDefaultSubscriptionAndDetails();
                    $user->refresh();
                }

                // Show welcome page with user authentication info (NO BLOCKING)
                return $this->renderWelcomePage([
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'subscription' => $user->subscription ? [
                            'plan_type' => $user->subscription->plan_type,
                            'status' => $user->subscription->status,
                        ] : null,
                    ]
                ]);

            } else {
                Log::info('Guest user accessing home2');
                // Show welcome page for guests
                return $this->renderWelcomePage();
            }

        } catch (Exception $e) {
            // Log detailed error information
            Log::error('Index2 failed', [
                'user_id' => $user?->id ?? 'guest',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            // Fallback - show basic welcome page
            return $this->renderWelcomePage($user ? [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ] : null);
        }
    }

    /**
     * Render welcome page with consistent structure
     */
    private function renderWelcomePage($authData = null)
    {
        $data = [
            'auth' => $authData ? $authData : ['user' => null],
            'locale' => app()->getLocale()
        ];

        Log::info('Rendering Welcome2 page', [
            'auth_data' => $authData ? 'provided' : 'null',
            'locale' => $data['locale']
        ]);

        try {
            return Inertia::render('Welcome2', $data);
        } catch (Exception $e) {
            Log::error('Failed to render Welcome2', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            // Ultimate fallback - simple response
            return response()->json([
                'error' => 'Page rendering failed',
                'debug' => [
                    'message' => $e->getMessage(),
                    'file' => basename($e->getFile()),
                    'line' => $e->getLine()
                ]
            ], 500);
        }
    }

    /**
     * Start a new assessment
     */
    public function start(Request $request)
    {
        Log::info('Assessment start requested', $request->all());

        $validator = Validator::make($request->all(), [
            'tool_id' => 'required|exists:tools,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            Log::warning('Assessment start validation failed', $validator->errors()->toArray());
            return back()->withErrors($validator)->withInput();
        }

        try {
            $tool = Tool::with(['domains.categories.criteria'])->findOrFail($request->tool_id);

            // Create assessment
            $assessment = Assessment::create([
                'user_id' => Auth::id(), // This will be null for guests
                'tool_id' => $tool->id,
                'name' => $request->name,
                'email' => $request->email,
                'organization' => $request->organization,
                'status' => 'in_progress',
                'started_at' => now(),
            ]);

            Log::info('Assessment created', ['assessment_id' => $assessment->id]);

            // Create guest session tracking
            if (!Auth::check()) {
                GuestSession::createFromRequest($request, $assessment);
                Log::info('Guest session created', ['assessment_id' => $assessment->id]);
            }

            return redirect()->route('assessment.take', ['assessment' => $assessment->id]);

        } catch (Exception $e) {
            Log::error('Assessment start failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return back()->withErrors(['general' => 'Failed to start assessment. Please try again.']);
        }
    }

    /**
     * Take the assessment
     */
    public function take(Assessment $assessment)
    {
        Log::info('Assessment take requested', ['assessment_id' => $assessment->id]);

        try {
            // Load assessment with all related data
            $assessment->load([
                'tool.domains.categories.criteria' => function ($query) {
                    $query->orderBy('order');
                },
                'responses'
            ]);

            // Check if user can access this assessment
            if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
                Log::warning('Unauthorized assessment access attempt', [
                    'assessment_id' => $assessment->id,
                    'user_id' => Auth::id(),
                    'assessment_user_id' => $assessment->user_id
                ]);
                abort(403);
            }

            // Get existing responses
            $existingResponses = $assessment->responses->keyBy('criterion_id');

            return Inertia::render('assessment/Take', [
                'assessment' => $assessment,
                'tool' => $assessment->tool,
                'existingResponses' => $existingResponses,
                'completionPercentage' => $assessment->getCompletionPercentage(),
            ]);

        } catch (Exception $e) {
            Log::error('Assessment take failed', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['general' => 'Failed to load assessment. Please try again.']);
        }
    }

    /**
     * Save assessment response
     */
    public function saveResponse(Request $request, Assessment $assessment)
    {
        Log::info('Save response requested', [
            'assessment_id' => $assessment->id,
            'criterion_id' => $request->criterion_id
        ]);

        try {
            $validator = Validator::make($request->all(), [
                'criterion_id' => 'required|exists:criteria,id',
                'response' => 'required|in:yes,no,na',
                'notes' => 'nullable|string|max:2000',
                'attachment' => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png,txt',
            ]);

            if ($validator->fails()) {
                Log::warning('Save response validation failed', $validator->errors()->toArray());
                return back()->withErrors($validator);
            }

            // Check if user can access this assessment
            if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
                Log::warning('Unauthorized response save attempt');
                abort(403);
            }

            $responseData = [
                'assessment_id' => $assessment->id,
                'criterion_id' => $request->criterion_id,
                'response' => $request->response,
                'notes' => $request->input('notes'),
            ];

            // Handle file upload
            if ($request->hasFile('attachment')) {
                $file = $request->file('attachment');
                $fileName = time() . '_' . $request->criterion_id . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('assessments/' . $assessment->id, $fileName, 'public');
                $responseData['attachment'] = $filePath;
                Log::info('File uploaded', ['file_path' => $filePath]);
            }

            // Save or update response
            AssessmentResponse::updateOrCreate(
                [
                    'assessment_id' => $assessment->id,
                    'criterion_id' => $request->criterion_id,
                ],
                $responseData
            );

            // Recalculate completion percentage
            $completionPercentage = $assessment->getCompletionPercentage();
            $isComplete = $assessment->isComplete();

            // Update assessment status if needed
            if ($isComplete && $assessment->status !== 'completed') {
                $assessment->update([
                    'status' => 'completed',
                    'completed_at' => now(),
                ]);
                // Calculate results
                $assessment->calculateResults();
                Log::info('Assessment completed and results calculated', ['assessment_id' => $assessment->id]);
            }

            // Return back with success message for Inertia
            return back()->with('success', 'Response saved successfully');

        } catch (Exception $e) {
            Log::error('Error saving assessment response', [
                'assessment_id' => $assessment->id,
                'criterion_id' => $request->criterion_id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['response' => 'An error occurred while saving your response']);
        }
    }

    /**
     * Show limited assessment results for guests
     */
    public function results(Assessment $assessment)
    {
        Log::info('Results requested', ['assessment_id' => $assessment->id]);

        try {
            // Check if user can access this assessment
            if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
                Log::warning('Unauthorized results access attempt');
                abort(403);
            }

            if (!$assessment->isComplete()) {
                Log::info('Assessment not complete, redirecting to take', ['assessment_id' => $assessment->id]);
                return redirect()->route('assessment.take', $assessment)
                    ->with('error', 'Please complete the assessment to view results.');
            }

            // Load necessary relationships
            $assessment->load(['tool', 'results.domain', 'results.category']);

            // Get basic results (limited for guests)
            $results = $assessment->results()->with(['domain', 'category'])->get();
            $domainResults = $results->where('category_id', null);

            // Get guest session data
            $guestSession = GuestSession::where('assessment_id', $assessment->id)->first();

            // Format basic results for guests (limited information)
            $basicResults = [
                'overall_percentage' => (float) $domainResults->avg('score_percentage') ?? 0,
                'total_criteria' => $domainResults->sum('total_criteria'),
                'applicable_criteria' => $domainResults->sum('applicable_criteria'),
                'yes_count' => $domainResults->sum('yes_count'),
                'no_count' => $domainResults->sum('no_count'),
                'na_count' => $domainResults->sum('na_count'),
                'domain_count' => $domainResults->count(),
            ];

            // Format assessment data for frontend
            $assessmentData = [
                'id' => $assessment->id,
                'name' => $assessment->name,
                'email' => $assessment->email,
                'organization' => $assessment->organization,
                'status' => $assessment->status,
                'completed_at' => $assessment->completed_at ? $assessment->completed_at->toISOString() : null,
                'created_at' => $assessment->created_at->toISOString(),
                'tool' => [
                    'id' => $assessment->tool->id,
                    'name_en' => $assessment->tool->name_en,
                    'name_ar' => $assessment->tool->name_ar,
                ]
            ];

            // Format session data
            $sessionData = null;
            if ($guestSession) {
                $sessionData = [
                    'device_type' => $guestSession->device_type,
                    'browser' => $guestSession->browser,
                    'operating_system' => $guestSession->operating_system,
                    'location' => $guestSession->country . ', ' . $guestSession->city,
                    'ip_address' => $guestSession->ip_address,
                ];
            }

            Log::info('Results prepared successfully', ['assessment_id' => $assessment->id]);

            return Inertia::render('assessment/GuestResults', [
                'assessment' => $assessmentData,
                'results' => $basicResults,
                'sessionData' => $sessionData,
            ]);

        } catch (Exception $e) {
            Log::error('Results display failed', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['general' => 'Failed to load results. Please try again.']);
        }
    }

    /**
     * Send email with results to guest
     */
    public function sendEmail(Assessment $assessment)
    {
        Log::info('Send email requested', ['assessment_id' => $assessment->id]);

        try {
            $results = $assessment->results()->with(['domain'])->get();
            $domainResults = $results->where('category_id', null);

            $basicResults = [
                'overall_percentage' => (float) $domainResults->avg('score_percentage') ?? 0,
                'total_criteria' => $domainResults->sum('total_criteria'),
                'applicable_criteria' => $domainResults->sum('applicable_criteria'),
                'yes_count' => $domainResults->sum('yes_count'),
                'no_count' => $domainResults->sum('no_count'),
                'na_count' => $domainResults->sum('na_count'),
            ];

            // Generate results URL
            $resultsUrl = route('guest.assessment.results', $assessment->id);

            // Send email
            Mail::to($assessment->email)->send(
                new GuestAssessmentCompleted($assessment, $resultsUrl, $basicResults)
            );

            Log::info('Email sent successfully', ['assessment_id' => $assessment->id]);

            return response()->json(['success' => true]);

        } catch (Exception $e) {
            Log::error('Error sending guest assessment email', [
                'assessment_id' => $assessment->id,
                'email' => $assessment->email,
                'error' => $e->getMessage()
            ]);

            return response()->json(['error' => 'Failed to send email'], 500);
        }
    }

    /**
     * Update guest session with additional device information
     */
    public function updateSession(Request $request, Assessment $assessment)
    {
        Log::info('Update session requested', ['assessment_id' => $assessment->id]);

        try {
            $guestSession = GuestSession::where('assessment_id', $assessment->id)->first();

            if ($guestSession) {
                $sessionData = $guestSession->session_data ?? [];
                $sessionData = array_merge($sessionData, [
                    'device_info' => $request->input('device_info'),
                    'completed_at' => $request->input('completed_at'),
                    'updated_at' => now(),
                ]);

                $guestSession->update([
                    'session_data' => $sessionData,
                    'completed_at' => $request->input('completed_at') ?
                        \Carbon\Carbon::parse($request->input('completed_at')) : now(),
                ]);

                Log::info('Session updated successfully', ['assessment_id' => $assessment->id]);
            }

            return response()->json(['success' => true]);

        } catch (Exception $e) {
            Log::error('Error updating guest session', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage()
            ]);

            return response()->json(['error' => 'Failed to update session'], 500);
        }
    }

    /**
     * Show assessment form with pre-filled data for authenticated users
     */
    public function create(Tool $tool)
    {
        $user = Auth::user();

        Log::info('Assessment create requested', [
            'tool_id' => $tool->id,
            'user_id' => $user?->id ?? 'guest'
        ]);

        try {
            return Inertia::render('assessment/Create', [
                'tool' => $tool->load(['domains.categories']),
                'prefillData' => $user ? [
                    'name' => $user->name,
                    'email' => $user->email,
                ] : null,
            ]);
        } catch (Exception $e) {
            Log::error('Assessment create failed', [
                'tool_id' => $tool->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['general' => 'Failed to load assessment form.']);
        }
    }

    /**
     * Update assessment details (notes and attachment)
     */
    public function updateDetails(Request $request, Assessment $assessment)
    {
        Log::info('Update details requested', ['assessment_id' => $assessment->id]);

        $validator = Validator::make($request->all(), [
            'notes' => 'nullable|string|max:2000',
            'attachment' => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png,txt',
        ]);

        if ($validator->fails()) {
            Log::warning('Update details validation failed', $validator->errors()->toArray());
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Check if user can access this assessment
            if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
                Log::warning('Unauthorized details update attempt');
                abort(403);
            }

            $updateData = ['notes' => $request->input('notes')];

            // Handle file upload
            if ($request->hasFile('attachment')) {
                $file = $request->file('attachment');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('assessments/' . $assessment->id, $fileName, 'public');
                $updateData['attachment'] = $filePath;
                Log::info('Attachment uploaded', ['file_path' => $filePath]);
            }

            $assessment->update($updateData);

            Log::info('Details updated successfully', ['assessment_id' => $assessment->id]);

            return response()->json(['success' => true]);

        } catch (Exception $e) {
            Log::error('Update details failed', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage()
            ]);

            return response()->json(['error' => 'Failed to update details'], 500);
        }
    }

    /**
     * Submit assessment
     */
    public function submit(Request $request, Assessment $assessment)
    {
        Log::info('Assessment submit requested', [
            'assessment_id' => $assessment->id,
            'responses_count' => count($request->input('responses', []))
        ]);

        // Check if user can access this assessment
        if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
            Log::warning('Unauthorized submit attempt');
            abort(403);
        }

        // Validate the request data
        $request->validate([
            'responses' => 'required|array',
        ]);

        try {
            DB::beginTransaction();

            // Process responses from the frontend
            if (isset($request->responses)) {
                foreach ($request->responses as $criterionId => $responseData) {
                    // Handle different response formats
                    if (is_array($responseData)) {
                        $response = $responseData['response'] ?? null;
                        $notes = $responseData['notes'] ?? null;
                        $attachment = $responseData['attachment'] ?? null;
                    } else {
                        $response = $responseData;
                        $notes = null;
                        $attachment = null;
                    }

                    if (!$response) continue;

                    $data = [
                        'assessment_id' => $assessment->id,
                        'criterion_id' => $criterionId,
                        'response' => $response,
                        'notes' => $notes,
                    ];

                    // Handle file upload if present
                    if ($attachment && $attachment instanceof \Illuminate\Http\UploadedFile) {
                        $filename = time() . '_' . $criterionId . '_' . $attachment->getClientOriginalName();
                        $path = $attachment->storeAs('assessment_attachments', $filename, 'public');
                        $data['attachment'] = $path;
                        Log::info('Response attachment uploaded', ['file_path' => $path]);
                    }

                    // Update or create response
                    AssessmentResponse::updateOrCreate(
                        [
                            'assessment_id' => $assessment->id,
                            'criterion_id' => $criterionId,
                        ],
                        $data
                    );
                }
            }

            // Mark assessment as completed
            $assessment->markAsCompleted();

            // Update guest session completion
            $guestSession = GuestSession::where('assessment_id', $assessment->id)->first();
            if ($guestSession) {
                $guestSession->update(['completed_at' => now()]);
            }

            DB::commit();

            Log::info('Assessment submitted successfully', ['assessment_id' => $assessment->id]);

            // Redirect to guest results page (limited view)
            return redirect()->route('guest.assessment.results', $assessment)
                ->with('success', 'Assessment submitted successfully!');

        } catch (Exception $e) {
            DB::rollBack();

            Log::error('Assessment submission error', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['assessment' => 'There was an error submitting your assessment. Please try again.']);
        }
    }

    /**
     * Get analytics data for admin dashboard
     */
    public function getAnalytics(Request $request)
    {
        Log::info('Analytics requested');

        // Only allow authenticated admin users
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            Log::warning('Unauthorized analytics access attempt');
            abort(403);
        }

        try {
            $startDate = $request->input('start_date', now()->subDays(30));
            $endDate = $request->input('end_date', now());

            $guestSessions = GuestSession::with(['assessment.tool'])
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get();

            $analytics = [
                'total_sessions' => $guestSessions->count(),
                'unique_emails' => $guestSessions->unique('email')->count(),
                'completed_assessments' => $guestSessions->whereNotNull('completed_at')->count(),
                'device_breakdown' => $guestSessions->groupBy('device_type')->map->count(),
                'browser_breakdown' => $guestSessions->groupBy('browser')->map->count(),
                'country_breakdown' => $guestSessions->groupBy('country')->map->count(),
                'top_locations' => $guestSessions->groupBy('city')
                    ->map->count()
                    ->sortDesc()
                    ->take(10),
                'conversion_rate' => $guestSessions->count() > 0 ?
                    ($guestSessions->whereNotNull('completed_at')->count() / $guestSessions->count()) * 100 : 0,
                'popular_tools' => $guestSessions->groupBy('assessment.tool.name_en')
                    ->map->count()
                    ->sortDesc()
                    ->take(5),
            ];

            Log::info('Analytics generated successfully');

            return response()->json($analytics);

        } catch (Exception $e) {
            Log::error('Analytics generation failed', [
                'error' => $e->getMessage()
            ]);

            return response()->json(['error' => 'Failed to generate analytics'], 500);
        }
    }
}
