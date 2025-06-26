<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Tool;
use App\Models\AssessmentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Exception;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class FreeAssessmentController extends Controller
{
    /**
     * Show free assessment index page with start button
     */
    public function index()
    {
        $user = auth()->user();

        // Check if user can take free assessment
        if (!$user->canTakeFreeAssessment()) {
            return redirect()->route('tools.discover')
                ->with('info', 'You have already used your free assessment. Browse tools below to purchase more assessments.');
        }

        // Get a sample tool for free assessment
        $sampleTool = Tool::where('has_free_plan', true)->first();

        if (!$sampleTool) {
            return redirect()->route('subscription.show')
                ->with('error', 'No free assessment available. Please subscribe to access tools.');
        }

        // Check if user has existing assessment
        $existingAssessment = $user->assessments()
            ->where('tool_id', $sampleTool->id)
            ->where('assessment_type', 'free')
            ->first();

        return Inertia::render('FreeAssessment/Index', [
            'tool' => [
                'id' => $sampleTool->id,
                'name_en' => $sampleTool->name_en,
                'name_ar' => $sampleTool->name_ar,
                'description_en' => $sampleTool->description_en,
                'description_ar' => $sampleTool->description_ar,
                'image' => $sampleTool->image,
            ],
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'access_level' => $user->getAccessLevel(),
            ],
            'existingAssessment' => $existingAssessment ? [
                'id' => $existingAssessment->id,
                'status' => $existingAssessment->status,
                'completed_at' => $existingAssessment->completed_at,
                'can_access_results' => $existingAssessment->status === 'completed',
            ] : null,
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
        if (!$user->canTakeFreeAssessment()) {
            return redirect()->route('tools.discover')
                ->with('error', 'You have already used your free assessment.');
        }

        // Get the free tool directly (since there's only one)
        $tool = Tool::where('has_free_plan', true)->first();

        if (!$tool) {
            return redirect()->route('free-assessment.index')
                ->with('error', 'No free assessment tool available.');
        }

        try {
            DB::beginTransaction();

            // Check if user already has an assessment for this tool
            $existingAssessment = $user->assessments()
                ->where('tool_id', $tool->id)
                ->where('assessment_type', 'free')
                ->first();

            if ($existingAssessment) {
                DB::commit();
                // Redirect to take with edit flag
                return redirect()->route('free-assessment.take', $existingAssessment);
            }

            // Create new free assessment
            $assessment = Assessment::create([
                'user_id' => $user->id,
                'tool_id' => $tool->id,
                'name' => $user->name . ' - Free Assessment',
                'email' => $user->email,
                'organization' => 'Free Assessment',
                'status' => 'in_progress',
                'assessment_type' => 'free',
                'started_at' => now(),
            ]);

            DB::commit();

            return redirect()->route('free-assessment.take', $assessment);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to start free assessment', [
                'user_id' => $user->id,
                'tool_id' => $tool->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['error' => 'Failed to start assessment. Please try again.']);
        }
    }

    /**
     * Take assessment - renders Start.tsx
     */
    public function take(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment.');
        }

        // Load tool with full structure
        $tool = $assessment->tool;
        $tool->load([
            'domains' => function ($query) {
                $query->orderBy('order');
            },
            'domains.categories' => function ($query) {
                $query->orderBy('order');
            },
            'domains.categories.criteria' => function ($query) {
                $query->orderBy('order');
            }
        ]);

        // Get existing responses and convert scores back to yes/no/na format
        $existingResponses = [];
        $existingNotes = [];

        // Load responses with error handling
        try {
            $responses = $assessment->responses()->get();

            foreach ($responses as $response) {
                // Convert score back to response format or use response field directly
                if (isset($response->response) && in_array($response->response, ['yes', 'no', 'na'])) {
                    // If response field exists and is valid, use it directly
                    $existingResponses[$response->criterion_id] = $response->response;
                } else {
                    // Convert score to response format
                    $responseValue = match($response->score ?? 0) {
                        100 => 'yes',
                        0 => 'no',
                        50 => 'na',
                        default => 'no'
                    };
                    $existingResponses[$response->criterion_id] = $responseValue;
                }

                if ($response->notes) {
                    $existingNotes[$response->criterion_id] = $response->notes;
                }
            }

            Log::info('Loaded existing responses for edit', [
                'assessment_id' => $assessment->id,
                'responses_count' => count($existingResponses),
                'sample_responses' => array_slice($existingResponses, 0, 3, true)
            ]);

        } catch (Exception $e) {
            Log::error('Error loading existing responses', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage()
            ]);
        }

        // Build assessment data structure for Start.tsx
        $assessmentData = [
            'id' => $assessment->id,
            'name' => $assessment->name,
            'email' => $assessment->email,
            'status' => $assessment->status,
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'domains' => $tool->domains->map(function ($domain) {
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
                                        'text_en' => $criterion->name_en,
                                        'text_ar' => $criterion->name_ar,
                                        'requires_file' => $criterion->requires_attachment ?? false,
                                    ];
                                })->toArray(),
                            ];
                        })->toArray(),
                    ];
                })->toArray(),
            ],
            'responses' => $existingResponses, // Pass existing responses as 'yes', 'no', 'na'
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
            'isEdit' => count($existingResponses) > 0, // Set to true if there are existing responses
        ]);
    }

    /**
     * Submit assessment
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



            // Clear existing responses
            $assessment->responses()->delete();

            // Store new responses
            foreach ($validated['responses'] as $criterionId => $response) {
                $score = match($response) {
                    'yes' => 100,
                    'no' => 0,
                    'na' => 50,
                    default => 0
                };

                AssessmentResponse::create([
                    'assessment_id' => $assessment->id,
                    'criterion_id' => $criterionId,
                    'score' => $score,
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

            return redirect()->route('free-assessment.results', $assessment)
                ->with('success', 'Assessment completed successfully!');

        } catch (Exception $e) {
            DB::rollBack();

            Log::error('Free assessment submission failed', [
                'assessment_id' => $assessment->id,
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['submit' => 'There was an error submitting your assessment. Please try again.']);
        }
    }

    /**
     * Show assessment results - renders Results.tsx for free users
     */
    public function results(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment results.');
        }

        // Check if assessment is completed
        if ($assessment->status !== 'completed') {
            return redirect()->route('free-assessment.take', $assessment)
                ->with('info', 'Please complete the assessment first.');
        }

        // Load assessment with relationships
        $assessment->load([
            'tool',
            'responses.criterion.category.domain'
        ]);

        // Try to get results using the existing getResults method, fallback to manual calculation
        try {
            $results = $assessment->getResults();
            $domainScores = collect($results['domain_results'] ?? [])->map(function ($domainResult) {
                return [
                    'domain_name' => $domainResult['domain_name'],
                    'score' => $domainResult['score_percentage'],
                    'max_score' => 100,
                    'percentage' => $domainResult['score_percentage'],
                ];
            });
            $overallScore = $results['overall_percentage'] ?? 0;
            $yesAnswers = $results['yes_count'] ?? 0;
            $noAnswers = $results['no_count'] ?? 0;
            $naAnswers = $results['na_count'] ?? 0;
            $totalQuestions = $results['total_criteria'] ?? 0;
        } catch (Exception $e) {
            // Fallback to manual calculation using scores
            Log::warning('getResults failed, using fallback calculation', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage()
            ]);

            $responses = $assessment->responses;
            $yesAnswers = $responses->where('score', 100)->count();
            $noAnswers = $responses->where('score', 0)->count();
            $naAnswers = $responses->where('score', 50)->count();
            $totalQuestions = $responses->count();
            $applicableAnswers = $yesAnswers + $noAnswers;

            $overallScore = $applicableAnswers > 0 ? ($yesAnswers / $applicableAnswers) * 100 : 0;

            // Calculate domain scores manually
            $domainScores = $responses->groupBy(function ($response) {
                return $response->criterion->category->domain->id;
            })->map(function ($domainResponses, $domainId) {
                $domain = $domainResponses->first()->criterion->category->domain;
                $domainYes = $domainResponses->where('score', 100)->count();
                $domainNo = $domainResponses->where('score', 0)->count();
                $domainApplicable = $domainYes + $domainNo;
                $domainPercentage = $domainApplicable > 0 ? ($domainYes / $domainApplicable) * 100 : 0;

                return [
                    'domain_name' => $domain->name_en,
                    'score' => round($domainPercentage, 1),
                    'max_score' => 100,
                    'percentage' => round($domainPercentage, 1),
                ];
            })->values();
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
     * Edit assessment - renders Start.tsx in edit mode
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

    /**
     * Show premium results page (for premium users or upgrade prompt)
     */
    public function premiumResults(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment results.');
        }

        // Check if user is premium
        if (!$user->isPremium()) {
            return redirect()->route('free-assessment.results', $assessment)
                ->with('info', 'Upgrade to premium to access detailed analytics.');
        }

        // Load detailed data for premium users
        $assessment->load([
            'tool',
            'responses.criterion.category.domain',
            'domainScores'
        ]);

        // Premium analytics data
        $detailedAnalytics = [
            'trend_analysis' => $this->calculateTrendAnalysis($assessment),
            'benchmark_comparison' => $this->getBenchmarkComparison($assessment),
            'improvement_recommendations' => $this->getImprovementRecommendations($assessment),
            'detailed_breakdown' => $this->getDetailedBreakdown($assessment),
        ];

        return Inertia::render('FreeAssessment/Premium', [
            'assessment' => $assessment,
            'analytics' => $detailedAnalytics,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_premium' => true,
            ],
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Generate and download PDF report for free users
     */
    public function downloadPDF(Assessment $assessment)
    {
        $user = auth()->user();

        // Check ownership and type
        if ($assessment->user_id !== $user->id || $assessment->assessment_type !== 'free') {
            abort(403, 'Unauthorized access to assessment PDF.');
        }

        // Check if assessment is completed
        if ($assessment->status !== 'completed') {
            return redirect()->route('free-assessment.take', $assessment)
                ->with('info', 'Please complete the assessment first.');
        }

        // Load assessment with relationships
        $assessment->load([
            'tool',
            'responses.criterion.category.domain'
        ]);

        // Get results
        try {
            $results = $assessment->getResults();
        } catch (Exception $e) {
            // Fallback calculation
            $responses = $assessment->responses;
            $yesAnswers = $responses->where('score', 100)->count();
            $noAnswers = $responses->where('score', 0)->count();
            $naAnswers = $responses->where('score', 50)->count();
            $totalQuestions = $responses->count();
            $applicableAnswers = $yesAnswers + $noAnswers;

            $overallScore = $applicableAnswers > 0 ? ($yesAnswers / $applicableAnswers) * 100 : 0;

            $domainScores = $responses->groupBy(function ($response) {
                return $response->criterion->category->domain->id;
            })->map(function ($domainResponses, $domainId) {
                $domain = $domainResponses->first()->criterion->category->domain;
                $domainYes = $domainResponses->where('score', 100)->count();
                $domainNo = $domainResponses->where('score', 0)->count();
                $domainApplicable = $domainYes + $domainNo;
                $domainPercentage = $domainApplicable > 0 ? ($domainYes / $domainApplicable) * 100 : 0;

                return [
                    'domain_name' => $domain->name_en,
                    'score_percentage' => round($domainPercentage, 1),
                    'yes_count' => $domainYes,
                    'no_count' => $domainNo,
                    'na_count' => $domainResponses->where('score', 50)->count(),
                ];
            })->values();

            $results = [
                'overall_percentage' => round($overallScore, 1),
                'yes_count' => $yesAnswers,
                'no_count' => $noAnswers,
                'na_count' => $naAnswers,
                'total_criteria' => $totalQuestions,
                'domain_results' => $domainScores->toArray(),
            ];
        }

        // Prepare data for PDF
        $data = [
            'assessment' => $assessment,
            'results' => $results,
            'user' => $user,
            'generated_at' => now(),
        ];

        // Generate PDF
        $pdf = PDF::loadView('pdf.free-assessment-report', $data);

        // Set PDF options for better quality
        $pdf->setPaper('A4', 'portrait');
        $pdf->setOptions([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isRemoteEnabled' => true,
        ]);

        $filename = 'assessment-report-' . $assessment->id . '-' . now()->format('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }
}
