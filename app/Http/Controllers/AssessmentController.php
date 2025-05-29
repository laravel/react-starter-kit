<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    /**
     * Submit assessment with user limits
     */
    public function submit(Request $request)
    {
        $user = auth()->user();

        // Double-check assessment limits
        if (!$user->canCreateAssessment()) {
            return response()->json([
                'error' => 'Assessment limit exceeded. Please upgrade to premium.'
            ], 403);
        }

        Log::info('Assessment submission started', $request->all());

        $validated = $request->validate([
            'tool_id' => 'required|exists:tools,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
            'responses' => 'required|array',
            'notes' => 'array',
        ]);

        try {
            DB::beginTransaction();

            // Create the assessment
            $assessment = Assessment::create([
                'tool_id' => $validated['tool_id'],
                'user_id' => $user->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'organization' => $validated['organization'],
                'status' => 'completed',
                'started_at' => now(),
                'completed_at' => now(),
            ]);

            // Process responses
            foreach ($validated['responses'] as $criterionId => $responseValue) {
                // Convert numeric response back to string
                $responseString = match ((int)$responseValue) {
                    100 => 'yes',
                    0 => 'no',
                    50 => 'na',
                    default => 'na'
                };

                AssessmentResponse::create([
                    'assessment_id' => $assessment->id,
                    'criterion_id' => $criterionId,
                    'response' => $responseString,
                    'notes' => $validated['notes'][$criterionId] ?? null,
                ]);
            }

            // Calculate results
            $assessment->calculateResults();

            DB::commit();

            // Update user's assessment count in session/cache if needed
            session(['user_assessments_count' => $user->assessments()->count()]);

            return redirect()->route('assessment.results', $assessment->id)
                ->with('success', 'Assessment completed successfully!');

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Assessment submission failed', [
                'error' => $e->getMessage(),
                'user_id' => $user->id
            ]);

            return back()->withErrors([
                'submit' => 'There was an error submitting your assessment. Please try again.'
            ]);
        }
    }

    /**
     * Show user's assessments with proper routing for free vs premium users
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $locale = app()->getLocale();

        // Load user relationships
        $user->load(['details', 'subscription']);

        $assessments = Assessment::with(['tool'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($assessment) use ($locale) {
                $overallScore = null;
                if ($assessment->status === 'completed') {
                    $results = $assessment->getResults();
                    $overallScore = $results['overall_percentage'] ?? null;
                }

                return [
                    'id' => $assessment->id,
                    'title_en' => $assessment->title_en ?? $assessment->tool->name_en,
                    'title_ar' => $assessment->title_ar ?? $assessment->tool->name_ar,
                    'tool' => [
                        'id' => $assessment->tool->id,
                        'name_en' => $assessment->tool->name_en,
                        'name_ar' => $assessment->tool->name_ar,
                        'description_en' => $assessment->tool->description_en,
                        'description_ar' => $assessment->tool->description_ar,
                        'image' => $assessment->tool->image ? asset('storage/' . $assessment->tool->image) : null,
                    ],
                    'guest_name' => $assessment->name ?? $user->name,
                    'guest_email' => $assessment->email ?? $user->email,
                    'organization' => $assessment->organization,
                    'status' => $assessment->status,
                    'created_at' => $assessment->created_at->toISOString(),
                    'updated_at' => $assessment->updated_at->toISOString(),
                    'overall_score' => $overallScore,
                    'completion_percentage' => $assessment->getCompletionPercentage(),
                    'user_id' => $assessment->user_id,
                ];
            });

        $userLimits = [
            'current_assessments' => $assessments->count(),
            'assessment_limit' => $user->getAssessmentLimit(),
            'can_create_more' => $user->canCreateAssessment(),
            'is_premium' => $user->isPremium(),
            'subscription_status' => $user->getSubscriptionStatus(),
        ];

        // Route to different pages based on user type
        if ($user->isPremium() || $user->isAdmin()) {
            // Premium users get the full dashboard assessment index
            return Inertia::render('assessments/index', [
                'assessments' => $assessments,
                'userLimits' => $userLimits,
                'locale' => $locale,
                'auth' => [
                    'user' => $user->getFullProfileData()
                ],
            ]);
        } else {
            // Free users get the simplified assessment index
            return Inertia::render('FreeUserAssessmentIndex', [
                'assessments' => $assessments,
                'userLimits' => $userLimits,
                'locale' => $locale,
                'auth' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'details' => $user->details ? [
                            'company_name' => $user->details->company_name,
                            'phone' => $user->details->phone,
                        ] : null,
                    ]
                ],
            ]);
        }
    }

    /**
     * Show assessment results with different views for free vs premium
     */
    public function results(Assessment $assessment)
    {
        $user = auth()->user();
        $locale = app()->getLocale();

        // Check if user can access this assessment
        if ($assessment->user_id !== $user->id) {
            abort(403, 'You do not have permission to view this assessment.');
        }

        // Load assessment with all related data
        $assessment->load([
            'tool',
            'responses.criterion.category.domain',
            'responses.criterion.category',
            'responses.criterion'
        ]);

        // Get the results using the existing method
        $results = $assessment->getResults();

        $assessmentData = [
            'id' => $assessment->id,
            'title_en' => $assessment->title_en ?? $assessment->tool->name_en,
            'title_ar' => $assessment->title_ar ?? $assessment->tool->name_ar,
            'tool' => [
                'id' => $assessment->tool->id,
                'name_en' => $assessment->tool->name_en,
                'name_ar' => $assessment->tool->name_ar,
            ],
            'name' => $assessment->name ?? $user->name,
            'email' => $assessment->email ?? $user->email,
            'organization' => $assessment->organization,
            'status' => $assessment->status,
            'created_at' => $assessment->created_at->format('Y-m-d H:i:s'),
            'completed_at' => $assessment->completed_at?->format('Y-m-d H:i:s'),
        ];

        if ($user->isPremium() || $user->isAdmin()) {
            // Premium users get full results page
            return Inertia::render('assessment/results', [
                'assessment' => $assessmentData,
                'results' => $results,
                'locale' => $locale,
                'userAccess' => [
                    'is_premium' => true,
                    'pdf_report_level' => 'full',
                    'can_access_advanced_features' => true,
                    'subscription_status' => $user->getSubscriptionStatus(),
                ],
            ]);
        } else {
            // Free users get limited results page
            return Inertia::render('assessment/FreeUserResults', [
                'assessment' => $assessmentData,
                'results' => $results,
                'locale' => $locale,
                'userAccess' => [
                    'is_premium' => false,
                    'pdf_report_level' => 'basic',
                    'can_access_advanced_features' => false,
                    'subscription_status' => $user->getSubscriptionStatus(),
                ],
            ]);
        }
    }
}
