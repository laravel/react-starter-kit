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

class FreeAssessmentController extends Controller
{
    /**
     * Show free assessment index page with start button
     */
    public function index()
    {
        $user = auth()->user();

        // Check if user can take free assessment
//        if (!$user->canTakeFreeAssessment()) {
//            return redirect()->route('tools.discover')
//                ->with('info', 'You have already used your free assessment. Browse tools below to purchase more assessments.');
//        }

        // Get all tools available for free assessment
        $freeTools = Tool::where('has_free_plan', true)->get();

        if ($freeTools->isEmpty()) {
            return redirect()->route('subscription.show')
                ->with('error', 'No free assessment available. Please subscribe to access tools.');
        }

        $tools = $freeTools->map(function ($tool) use ($user) {
            $existing = $user->assessments()
                ->where('tool_id', $tool->id)
                ->where('assessment_type', 'free')
                ->first();

            return [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image,
                'existing_assessment' => $existing ? [
                    'id' => $existing->id,
                    'status' => $existing->status,
                    'completed_at' => $existing->completed_at,
                    'can_access_results' => $existing->status === 'completed',
                ] : null,
            ];
        });

        return Inertia::render('FreeAssessment/Index', [
            'tools' => $tools,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'access_level' => $user->getAccessLevel(),
            ],
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Start or resume assessment
     */
    public function start(Request $request)
    {
        $user = auth()->user();

        // Check if user can take free assessment
//        if (!$user->canTakeFreeAssessment()) {
//            return redirect()->route('tools.discover')
//                ->with('error', 'You have already used your free assessment.');
//        }

        $validated = $request->validate([
            'tool_id' => 'required|exists:tools,id'
        ]);

        // Get the tool and ensure it is available for free
        $tool = Tool::findOrFail($validated['tool_id']);

        if (!$tool->hasFreeAccess()) {
            return redirect()->route('free-assessment.index')
                ->with('error', 'Selected tool is not available for free.');
        }

        try {
            DB::beginTransaction();

            // Create or find existing assessment
            $assessment = $user->assessments()
                ->where('tool_id', $tool->id)
                ->where('assessment_type', 'free')
                ->first();

            if (!$assessment) {
                $assessment = Assessment::create([
                    'tool_id' => $tool->id,
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'organization' => null,
                    'assessment_type' => 'free',
                    'status' => 'in_progress',
                    'started_at' => now(),
                ]);
            }

            DB::commit();

            // Redirect to the assessment form
            return redirect()->route('free-assessment.take', $assessment);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to start assessment', [
                'user_id' => $user->id,
                'tool_id' => $tool->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['start' => 'Failed to start assessment. Please try again.']);
        }
    }

    /**
     * Show the take assessment form
     */
    public function take(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment.');
        }

        // Load tool with all related data
        $tool = Tool::with(['domains.categories.criteria' => function ($query) {
            $query->where('status', 'active')->orderBy('order');
        }])->findOrFail($assessment->tool_id);

        // Load existing responses
        $existingResponses = [];
        $existingNotes = [];

        $responses = $assessment->responses()->with('criterion')->get();

        foreach ($responses as $response) {
            // Store the actual response value (yes/no/na)
            $existingResponses[$response->criterion_id] = $response->response;

            if ($response->notes) {
                $existingNotes[$response->criterion_id] = $response->notes;
            }
        }

        $assessmentData = [
            'id' => $assessment->id,
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image ? asset('storage/' . $tool->image) : null,
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
                                        'text_en' => $criterion->text_en,
                                        'text_ar' => $criterion->text_ar,
                                        'description_en' => $criterion->description_en,
                                        'description_ar' => $criterion->description_ar,
                                        'order' => $criterion->order,
                                        'weight' => $criterion->weight ?? 1,
                                        'requires_file' => $criterion->requires_file ?? false,
                                    ];
                                })->toArray(),
                            ];
                        })->toArray(),
                    ];
                })->toArray(),
            ],
            'responses' => $existingResponses, // Pass responses as 'yes', 'no', 'na'
        ];

        return Inertia::render('FreeAssessment/Start', [
            'assessmentData' => $assessmentData,
            'locale' => app()->getLocale(),
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ],
            'existingNotes' => $existingNotes,
            'isEdit' => count($existingResponses) > 0,
        ]);
    }

    /**
     * Submit assessment - FIXED: Proper database field and Inertia redirect
     */
    public function submit(Assessment $assessment, Request $request)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment.');
        }

        $validated = $request->validate([
            'responses' => 'required|array',
            'responses.*' => 'required|string|in:yes,no,na',
            'notes' => 'nullable|array',
            'notes.*' => 'nullable|string|max:1000',
            'files' => 'nullable|array',
        ]);

        try {
            DB::beginTransaction();

            // Clear existing responses to avoid duplicates
            $assessment->responses()->delete();

            // Store new responses - FIXED: Use 'response' field not 'score'
            foreach ($validated['responses'] as $criterionId => $response) {
                AssessmentResponse::create([
                    'assessment_id' => $assessment->id,
                    'criterion_id' => $criterionId,
                    'response' => $response, // Store as 'yes', 'no', 'na' string
                    'notes' => $validated['notes'][$criterionId] ?? null,
                ]);
            }

            // Update assessment status
            $assessment->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            // Calculate results
            $assessment->calculateResults();

            DB::commit();

            // Redirect to completion page before showing results
            return redirect()->route('free-assessment.complete', $assessment)
                ->with('success', 'Assessment completed successfully!');

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Free assessment submission failed', [
                'error' => $e->getMessage(),
                'assessment_id' => $assessment->id,
                'user_id' => $user->id
            ]);

            return back()->withErrors([
                'submit' => 'There was an error submitting your assessment. Please try again.'
            ]);
        }
    }

    /**
     * Show assessment results
     */
    public function results(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment results.');
        }

        // Ensure assessment is completed
        if ($assessment->status !== 'completed') {
            return redirect()->route('free-assessment.take', $assessment)
                ->with('info', 'Please complete the assessment first.');
        }

        // Load tool and responses with proper relationships
        $tool = Tool::with(['domains.categories.criteria'])->findOrFail($assessment->tool_id);
        $responses = $assessment->responses()->with('criterion.category.domain')->get();

        // Calculate statistics
        $totalQuestions = $responses->count();
        $yesAnswers = $responses->where('response', 'yes')->count();
        $noAnswers = $responses->where('response', 'no')->count();
        $naAnswers = $responses->where('response', 'na')->count();

        // Calculate overall score
        $totalScore = 0;
        $maxPossibleScore = 0;

        foreach ($responses as $response) {
            $weight = $response->criterion->weight ?? 1;
            $maxPossibleScore += (100 * $weight);

            if ($response->response === 'yes') {
                $totalScore += (100 * $weight);
            } elseif ($response->response === 'na') {
                // N/A responses don't count towards max score
                $maxPossibleScore -= (100 * $weight);
            }
        }

        $overallScore = $maxPossibleScore > 0 ? ($totalScore / $maxPossibleScore) * 100 : 0;

        // Calculate domain scores
        $domainScores = collect();

        foreach ($tool->domains as $domain) {
            $domainResponses = $responses->filter(function ($response) use ($domain) {
                return $response->criterion->category->domain_id === $domain->id;
            });

            if ($domainResponses->count() > 0) {
                $domainTotal = 0;
                $domainMax = 0;

                foreach ($domainResponses as $response) {
                    $weight = $response->criterion->weight ?? 1;
                    $domainMax += (100 * $weight);

                    if ($response->response === 'yes') {
                        $domainTotal += (100 * $weight);
                    } elseif ($response->response === 'na') {
                        $domainMax -= (100 * $weight);
                    }
                }

                $domainPercentage = $domainMax > 0 ? ($domainTotal / $domainMax) * 100 : 0;

                $domainScores->push([
                    'domain_name_en' => $domain->name_en,
                    'domain_name_ar' => $domain->name_ar,
                    'score' => round($domainPercentage, 1),
                    'max_score' => 100,
                    'percentage' => round($domainPercentage, 1),
                ]);
            }
        }

        // Check if user is premium for upgrade prompts
        $isPremium = $user->isPremium();

        return Inertia::render('FreeAssessment/Results', [
            'assessment' => [
                'id' => $assessment->id,
                'name' => $assessment->name,
                'organization' => $assessment->organization,
                'completed_at' => $assessment->completed_at,
                'overall_score' => round($overallScore, 1),
                'tool' => [
                    'name_en' => $assessment->tool->name_en,
                    'name_ar' => $assessment->tool->name_ar,
                ],
            ],
            'statistics' => [
                'total_questions' => $totalQuestions,
                'yes_answers' => $yesAnswers,
                'no_answers' => $noAnswers,
                'na_answers' => $naAnswers,
                'completion_rate' => 100,
            ],
            'domainScores' => $domainScores,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_premium' => $isPremium,
            ],
            'canEdit' => true,
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Show completion thank you page
     */
    public function complete(Assessment $assessment)
    {
        $user = auth()->user();

        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment.');
        }

        return Inertia::render('FreeAssessment/Complete', [
            'assessment' => [
                'id' => $assessment->id,
                'tool' => [
                    'name_en' => $assessment->tool->name_en,
                    'name_ar' => $assessment->tool->name_ar,
                ],
            ],
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Edit assessment - redirects to take route
     */
    public function edit(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment.');
        }

        // Redirect to take route which handles both new and edit modes
        return redirect()->route('free-assessment.take', $assessment);
    }
}
