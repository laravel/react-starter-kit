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

        // Get assessments for the authenticated user
        $assessments = Assessment::with(['tool'])
            ->where('user_id', auth()->id()) // Only get current user's assessments
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
                    'guest_name' => $assessment->name ?? auth()->user()->name,
                    'guest_email' => $assessment->email ?? auth()->user()->email,
                    'organization' => $assessment->organization,
                    'status' => $assessment->status,
                    'created_at' => $assessment->created_at->toISOString(),
                    'updated_at' => $assessment->updated_at->toISOString(),
                    'overall_score' => $overallScore,
                    'completion_percentage' => $assessment->getCompletionPercentage(),
                    'user_id' => $assessment->user_id, // Add this to distinguish user vs guest assessments
                ];
            });

        return Inertia::render('assessments/index', [
            'assessments' => $assessments,
            'locale' => $locale,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'tool_id' => 'required|exists:tools,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
            'responses' => 'required|array',
            'responses.*' => 'required|numeric|between:0,100',
            'notes' => 'nullable|array',
            'notes.*' => 'nullable|string|max:1000',
        ]);

        try {
            DB::beginTransaction();

            // Create the assessment for authenticated user
            $assessment = Assessment::create([
                'tool_id' => $validated['tool_id'],
                'user_id' => auth()->id(), // Set the authenticated user
                'name' => $validated['name'],
                'email' => $validated['email'],
                'organization' => $validated['organization'],
                'status' => 'completed',
                'started_at' => now(),
                'completed_at' => now(),
            ]);

            // Create assessment responses
            foreach ($validated['responses'] as $criterionId => $value) {
                AssessmentResponse::create([
                    'assessment_id' => $assessment->id,
                    'criterion_id' => $criterionId,
                    'response' => $this->convertValueToResponse($value), // Convert numeric to yes/no/na
                    'notes' => $validated['notes'][$criterionId] ?? null,
                ]);
            }

            // Calculate results
            $assessment->calculateResults();

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

        // Check if user can access this assessment
        if ($assessment->user_id !== auth()->id()) {
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

        return Inertia::render('assessment/results', [ // Note: lowercase 'results' for authenticated users
            'assessment' => [
                'id' => $assessment->id,
                'title_en' => $assessment->title_en ?? $assessment->tool->name_en,
                'title_ar' => $assessment->title_ar ?? $assessment->tool->name_ar,
                'tool' => [
                    'id' => $assessment->tool->id,
                    'name_en' => $assessment->tool->name_en,
                    'name_ar' => $assessment->tool->name_ar,
                ],
                'guest_name' => $assessment->name ?? auth()->user()->name,
                'organization' => $assessment->organization,
                'created_at' => $assessment->created_at->format('Y-m-d H:i:s'),
            ],
            'results' => $results,
            'locale' => $locale,
        ]);
    }

    /**
     * Convert numeric value to response format
     */
    private function convertValueToResponse($value): string
    {
        if ($value >= 75) {
            return 'yes';
        } elseif ($value >= 25) {
            return 'no';
        } else {
            return 'na';
        }
    }

    /**
     * Calculate results for authenticated user assessments
     */
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
                            'response' => $response->response,
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
