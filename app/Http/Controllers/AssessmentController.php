<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AssessmentController extends Controller
{

    public function index(Request $request)
    {
        $locale = app()->getLocale();

        $assessments = Assessment::with(['tool'])
            ->where(function($query) {
                if (auth()->check()) {
                    $query->where('user_id', auth()->id());
                } else {
                    // For guests, you might want to use session or not show this page
                    $query->whereNull('id'); // Returns empty result
                }
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($assessment) use ($locale) {
                // Calculate overall score if needed
                $overallScore = null;
                if ($assessment->status === 'completed') {
                    $responses = $assessment->responses;
                    if ($responses->count() > 0) {
                        $overallScore = round($responses->avg('value'), 1);
                    }
                }

                return [
                    'id' => $assessment->id,
                    'title_en' => $assessment->title_en,
                    'title_ar' => $assessment->title_ar,
                    'tool' => [
                        'name_en' => $assessment->tool->name_en,
                        'name_ar' => $assessment->tool->name_ar,
                    ],
                    'guest_name' => $assessment->guest_name,
                    'organization' => $assessment->organization,
                    'status' => $assessment->status,
                    'created_at' => $assessment->created_at->toISOString(),
                    'overall_score' => $overallScore,
                ];
            });

        return Inertia::render('assessments/index', [
            'assessments' => $assessments,
            'locale' => $locale,
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'tool_id' => 'required|exists:tools,id',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
            'responses' => 'required|array',
            'responses.*' => 'required|numeric|between:0,100',
            'notes' => 'nullable|array',
            'notes.*' => 'nullable|string|max:1000',
        ]);

        try {
            DB::beginTransaction();

            // Create the assessment
            $assessment = Assessment::create([
                'tool_id' => $validated['tool_id'],
                'user_id' => auth()->id(), // Will be null for guests
                'guest_name' => $validated['guest_name'],
                'guest_email' => $validated['guest_email'],
                'organization' => $validated['organization'],
                'status' => 'completed',
            ]);

            // Create assessment responses
            foreach ($validated['responses'] as $criterionId => $value) {
                AssessmentResponse::create([
                    'assessment_id' => $assessment->id,
                    'criterion_id' => $criterionId,
                    'value' => $value,
                    'notes' => $validated['notes'][$criterionId] ?? null,
                ]);
            }

            DB::commit();

            return redirect()->route('assessment.results', $assessment->id)
                ->with('success', 'Assessment submitted successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'submit' => 'There was an error submitting your assessment. Please try again.'
            ]);
        }
    }

    public function results(Assessment $assessment)
    {
        $locale = app()->getLocale();

        // Load assessment with all related data
        $assessment->load([
            'tool',
            'responses.criterion.category.domain',
            'responses.criterion.category',
            'responses.criterion'
        ]);

        // Calculate results by domain and category
        $results = $this->calculateResults($assessment);

        return Inertia::render('assessment/results', [
            'assessment' => [
                'id' => $assessment->id,
                'title_en' => $assessment->title_en,
                'title_ar' => $assessment->title_ar,
                'tool' => [
                    'id' => $assessment->tool->id,
                    'name_en' => $assessment->tool->name_en,
                    'name_ar' => $assessment->tool->name_ar,
                ],
                'guest_name' => $assessment->guest_name,
                'organization' => $assessment->organization,
                'created_at' => $assessment->created_at->format('Y-m-d H:i:s'),
            ],
            'results' => $results,
            'locale' => $locale,
        ]);
    }

    private function calculateResults(Assessment $assessment)
    {
        $domainResults = [];
        $overallTotal = 0;
        $overallCount = 0;

        // Group responses by domain
        $responsesByDomain = $assessment->responses->groupBy(function ($response) {
            return $response->criterion->category->domain->id;
        });

        foreach ($responsesByDomain as $domainId => $domainResponses) {
            $domain = $domainResponses->first()->criterion->category->domain;

            // Group by category within domain
            $responsesByCategory = $domainResponses->groupBy(function ($response) {
                return $response->criterion->category->id;
            });

            $categoryResults = [];
            $domainTotal = 0;
            $domainCount = 0;

            foreach ($responsesByCategory as $categoryId => $categoryResponses) {
                $category = $categoryResponses->first()->criterion->category;

                $categoryTotal = $categoryResponses->sum('value');
                $categoryCount = $categoryResponses->count();
                $categoryAverage = $categoryCount > 0 ? $categoryTotal / $categoryCount : 0;

                $categoryResults[] = [
                    'id' => $category->id,
                    'name_en' => $category->name_en,
                    'name_ar' => $category->name_ar,
                    'average' => round($categoryAverage, 2),
                    'total' => $categoryTotal,
                    'count' => $categoryCount,
                    'responses' => $categoryResponses->map(function ($response) {
                        return [
                            'criterion_name_en' => $response->criterion->name_en,
                            'criterion_name_ar' => $response->criterion->name_ar,
                            'value' => $response->value,
                            'notes' => $response->notes,
                        ];
                    }),
                ];

                $domainTotal += $categoryTotal;
                $domainCount += $categoryCount;
            }

            $domainAverage = $domainCount > 0 ? $domainTotal / $domainCount : 0;

            $domainResults[] = [
                'id' => $domain->id,
                'name_en' => $domain->name_en,
                'name_ar' => $domain->name_ar,
                'average' => round($domainAverage, 2),
                'total' => $domainTotal,
                'count' => $domainCount,
                'categories' => $categoryResults,
            ];

            $overallTotal += $domainTotal;
            $overallCount += $domainCount;
        }

        $overallAverage = $overallCount > 0 ? $overallTotal / $overallCount : 0;

        return [
            'overall' => [
                'average' => round($overallAverage, 2),
                'total' => $overallTotal,
                'count' => $overallCount,
            ],
            'domains' => $domainResults,
        ];
    }
}
