<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentResponse;
use App\Models\Tool;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FreeUserController extends Controller
{
    /**
     * Show free user assessments
     */
    public function index()
    {
        $user = auth()->user();
        $locale = app()->getLocale();

        // Only allow free users
        if ($user->isPremium() || $user->isAdmin()) {
            return redirect()->route('assessments.index');
        }

        // Load user relationships
        $user->load(['details', 'subscription']);

        $assessments = Assessment::with(['tool'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($assessment) use ($locale) {
                $overallScore = null;
                if ($assessment->status === 'completed') {
                    try {
                        $results = $assessment->getResults();
                        $overallScore = $results['overall_percentage'] ?? null;
                    } catch (Exception $e) {
                        Log::warning('Failed to get results for assessment', [
                            'assessment_id' => $assessment->id,
                            'error' => $e->getMessage()
                        ]);
                    }
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
                    'completed_at' => $assessment->completed_at?->toISOString(),
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

    /**
     * Show assessment results for free users
     */
    public function results(Assessment $assessment)
    {
        $user = auth()->user();
        $locale = app()->getLocale();

        // Check if user can access this assessment
        if ($assessment->user_id !== $user->id) {
            abort(403, 'You do not have permission to view this assessment.');
        }

        // Only allow free users
        if ($user->isPremium() || $user->isAdmin()) {
            return redirect()->route('assessment.results', $assessment->id);
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

        return Inertia::render('FreeUserResults', [
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

    /**
     * Show edit form for free user assessment
     */
    public function edit(Assessment $assessment)
    {
        $user = auth()->user();

        // Check if user can access this assessment
        if ($assessment->user_id !== $user->id) {
            abort(403, 'You do not have permission to edit this assessment.');
        }

        // Only allow free users
        if ($user->isPremium() || $user->isAdmin()) {
            return redirect()->route('assessment.edit', $assessment->id);
        }

        // Only allow editing of draft or in_progress assessments
        if ($assessment->status === 'completed') {
            return redirect()->route('free-user.results', $assessment->id)
                ->with('error', 'Cannot edit completed assessments.');
        }

        // Load tool with all related data
        $tool = Tool::with(['domains.categories.criteria' => function ($query) {
            $query->where('status', 'active')->orderBy('order');
        }])->findOrFail($assessment->tool_id);

        // Load existing responses
        $existingResponses = $assessment->responses()
            ->with('criterion')
            ->get()
            ->keyBy('criterion_id')
            ->map(function ($response) {
                // Convert response back to numeric value for the form
                return match ($response->response) {
                    'yes' => 100,
                    'no' => 0,
                    'na' => 50,
                    default => 50
                };
            })
            ->toArray();

        $existingNotes = $assessment->responses()
            ->get()
            ->keyBy('criterion_id')
            ->map(fn($response) => $response->notes)
            ->toArray();

        $assessmentData = [
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image ? asset('storage/' . $tool->image) : null,
            ],
            'domains' => $tool->domains->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'name_en' => $domain->name_en,
                    'name_ar' => $domain->name_ar,
                    'description_en' => $domain->description_en,
                    'description_ar' => $domain->description_ar,
                    'order' => $domain->order,
                    'categories' => $domain->categories->map(function ($category) {
                        return [
                            'id' => $category->id,
                            'name_en' => $category->name_en,
                            'name_ar' => $category->name_ar,
                            'description_en' => $category->description_en,
                            'description_ar' => $category->description_ar,
                            'order' => $category->order,
                            'criteria' => $category->criteria->map(function ($criterion) {
                                return [
                                    'id' => $criterion->id,
                                    'name_en' => $criterion->name_en,
                                    'name_ar' => $criterion->name_ar,
                                    'description_en' => $criterion->description_en,
                                    'description_ar' => $criterion->description_ar,
                                    'order' => $criterion->order,
                                    'requires_attachment' => $criterion->requires_attachment,
                                ];
                            }),
                        ];
                    }),
                ];
            }),
        ];

        return Inertia::render('assessment/FreeUserEdit', [
            'assessment' => [
                'id' => $assessment->id,
                'name' => $assessment->name,
                'email' => $assessment->email,
                'organization' => $assessment->organization,
                'status' => $assessment->status,
            ],
            'assessmentData' => $assessmentData,
            'existingResponses' => $existingResponses,
            'existingNotes' => $existingNotes,
            'locale' => app()->getLocale(),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'details' => $user->details ? [
                    'company_name' => $user->details->company_name,
                ] : null,
            ],
        ]);
    }

    /**
     * Update free user assessment
     */
    public function update(Request $request, Assessment $assessment)
    {
        $user = auth()->user();

        // Check if user can access this assessment
        if ($assessment->user_id !== $user->id) {
            abort(403, 'You do not have permission to update this assessment.');
        }

        // Only allow free users
        if ($user->isPremium() || $user->isAdmin()) {
            return redirect()->route('assessment.update', $assessment->id);
        }

        // Only allow editing of draft or in_progress assessments
        if ($assessment->status === 'completed') {
            return response()->json(['error' => 'Cannot edit completed assessments.'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
            'responses' => 'required|array',
            'notes' => 'array',
            'action' => 'required|in:save,submit',
        ]);

        try {
            DB::beginTransaction();

            // Update assessment basic info
            $assessment->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'organization' => $validated['organization'],
                'status' => $validated['action'] === 'submit' ? 'completed' : 'in_progress',
                'completed_at' => $validated['action'] === 'submit' ? now() : null,
            ]);

            // Clear existing responses
            $assessment->responses()->delete();

            // Save new responses
            foreach ($validated['responses'] as $criterionId => $responseValue) {
                if ($responseValue !== null) {
                    // Convert numeric response to string
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
            }

            // Calculate results if submitted
            if ($validated['action'] === 'submit') {
                $assessment->calculateResults();
            }

            DB::commit();

            if ($validated['action'] === 'submit') {
                return redirect()->route('free-user.results', $assessment->id)
                    ->with('success', 'Assessment completed successfully!');
            } else {
                return redirect()->route('free-user.index')
                    ->with('success', 'Assessment saved successfully!');
            }

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Free user assessment update failed', [
                'error' => $e->getMessage(),
                'assessment_id' => $assessment->id,
                'user_id' => $user->id
            ]);

            return back()->withErrors([
                'submit' => 'There was an error updating your assessment. Please try again.'
            ]);
        }
    }

    /**
     * Submit free user assessment
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

        // Only allow free users
        if ($user->isPremium() || $user->isAdmin()) {
            return redirect()->route('assessment.submit');
        }

        Log::info('Free user assessment submission started', $request->all());

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

            return redirect()->route('free-user.results', $assessment->id)
                ->with('success', 'Assessment completed successfully!');

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Free user assessment submission failed', [
                'error' => $e->getMessage(),
                'user_id' => $user->id
            ]);

            return back()->withErrors([
                'submit' => 'There was an error submitting your assessment. Please try again.'
            ]);
        }
    }
}
