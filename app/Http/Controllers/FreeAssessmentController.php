<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Tool;
use App\Models\AssessmentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FreeAssessmentController extends Controller
{
    /**
     * Show free assessment start page
     */
    public function index()
    {
        $user = auth()->user();

        // Check if user can take free assessment
        if (!$user->canTakeFreeAssessment()) {
            return redirect()->route('tools.discover')
                ->with('info', 'You have already used your free assessment. Browse tools below to purchase more assessments.');
        }

        // Get a sample tool for free assessment (you can pick one or let user choose)
        $sampleTool = Tool::where('has_free_plan', true)->first();

        if (!$sampleTool) {
            return redirect()->route('subscription.show')
                ->with('error', 'No free assessment available. Please subscribe to access tools.');
        }

        return Inertia::render('FreeAssessment/Start', [
            'tool' => $sampleTool,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'access_level' => $user->getAccessLevel(),
            ]
        ]);
    }

    /**
     * Create and start free assessment
     */
    public function start(Request $request)
    {
        $user = auth()->user();

        // Double-check they can take free assessment
        if (!$user->canTakeFreeAssessment()) {
            return redirect()->route('tools.discover')
                ->with('error', 'You have already used your free assessment.');
        }

        $request->validate([
            'tool_id' => 'required|exists:tools,id',
        ]);

        $tool = Tool::findOrFail($request->tool_id);

        try {
            DB::beginTransaction();

            // Create free assessment
            $assessment = Assessment::create([
                'user_id' => $user->id,
                'tool_id' => $tool->id,
                'name' => $user->name . ' - Free Assessment',
                'email' => $user->email,
                'organization' => 'Free Trial',
                'status' => 'in_progress',
                'assessment_type' => 'free', // Mark as free assessment
                'started_at' => now(),
            ]);

            DB::commit();

            return redirect()->route('free-assessment.take', $assessment);

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Failed to start assessment. Please try again.']);
        }
    }

    /**
     * Take free assessment
     */
    public function take(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access.');
        }

        // Load assessment data
        $assessment->load([
            'tool.domains.categories.criteria' => function ($query) {
                $query->orderBy('order');
            },
            'responses'
        ]);

        $assessmentData = [
            'id' => $assessment->id,
            'name' => $assessment->name,
            'email' => $assessment->email,
            'status' => $assessment->status,
            'assessment_type' => $assessment->assessment_type,
            'tool' => [
                'id' => $assessment->tool->id,
                'name_en' => $assessment->tool->name_en,
                'name_ar' => $assessment->tool->name_ar,
                'domains' => $assessment->tool->domains->map(function ($domain) {
                    return [
                        'id' => $domain->id,
                        'name_en' => $domain->name_en,
                        'name_ar' => $domain->name_ar,
                        'categories' => $domain->categories->map(function ($category) {
                            return [
                                'id' => $category->id,
                                'name_en' => $category->name_en,
                                'name_ar' => $category->name_ar,
                                'criteria' => $category->criteria->map(function ($criterion) {
                                    return [
                                        'id' => $criterion->id,
                                        'text_en' => $criterion->text_en,
                                        'text_ar' => $criterion->text_ar,
                                        'requires_file' => false, // Simplified for free
                                    ];
                                })
                            ];
                        })
                    ];
                })
            ],
            'responses' => $assessment->responses->keyBy('criterion_id')
        ];

        return Inertia::render('FreeAssessment/Take', [
            'assessmentData' => $assessmentData,
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Save free assessment response
     */
    public function saveResponse(Request $request, Assessment $assessment)
    {
        $user = auth()->user();

        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'criterion_id' => 'required|exists:criteria,id',
            'response' => 'required|in:yes,no,na',
            'notes' => 'nullable|string|max:500',
        ]);

        AssessmentResponse::updateOrCreate(
            [
                'assessment_id' => $assessment->id,
                'criterion_id' => $request->criterion_id,
            ],
            [
                'response' => $request->response,
                'notes' => $request->notes,
            ]
        );

        return response()->json(['success' => true]);
    }

    /**
     * Submit free assessment
     */
    public function submit(Request $request, Assessment $assessment)
    {
        $user = auth()->user();

        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access.');
        }

        try {
            DB::beginTransaction();

            // Save final responses
            if ($request->has('responses')) {
                foreach ($request->responses as $criterionId => $response) {
                    AssessmentResponse::updateOrCreate(
                        [
                            'assessment_id' => $assessment->id,
                            'criterion_id' => $criterionId,
                        ],
                        [
                            'response' => $response,
                            'notes' => $request->notes[$criterionId] ?? null,
                        ]
                    );
                }
            }

            // Mark as completed
            $assessment->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            DB::commit();

            return redirect()->route('free-assessment.results', $assessment);

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Failed to submit assessment.']);
        }
    }

    /**
     * Show free assessment results with subscription prompt
     */
    public function results(Assessment $assessment)
    {
        $user = auth()->user();

        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access.');
        }

        // Calculate basic results
        $assessment->load(['tool.domains', 'responses']);

        $totalCriteria = $assessment->tool->domains->sum(function($domain) {
            return $domain->categories->sum->criteria->count();
        });

        $responses = $assessment->responses;
        $yesResponses = $responses->where('response', 'yes')->count();
        $noResponses = $responses->where('response', 'no')->count();
        $naResponses = $responses->where('response', 'na')->count();

        $resultsData = [
            'assessment' => [
                'id' => $assessment->id,
                'name' => $assessment->name,
                'tool_name' => $assessment->tool->name_en,
                'completed_at' => $assessment->completed_at,
                'assessment_type' => $assessment->assessment_type,
            ],
            'summary' => [
                'total_criteria' => $totalCriteria,
                'yes_responses' => $yesResponses,
                'no_responses' => $noResponses,
                'na_responses' => $naResponses,
                'completion_percentage' => $totalCriteria > 0 ? round((($yesResponses + $noResponses + $naResponses) / $totalCriteria) * 100, 1) : 0,
                'compliance_percentage' => ($yesResponses + $noResponses) > 0 ? round(($yesResponses / ($yesResponses + $noResponses)) * 100, 1) : 0,
            ],
            'is_free_assessment' => true,
            'tools_available' => Tool::where('is_active', true)->get(['id', 'name_en', 'premium_price', 'currency']),
        ];

        return Inertia::render('FreeAssessment/Results', [
            'results' => $resultsData,
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Edit free assessment
     */
    public function edit(Assessment $assessment)
    {
        $user = auth()->user();

        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access.');
        }

        // Allow editing of free assessment
        return $this->take($assessment);
    }
}
