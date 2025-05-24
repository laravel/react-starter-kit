<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Tool;
use App\Models\AssessmentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GuestAssessmentController extends Controller
{
    /**
     * Show the assessment landing page
     */
    public function index()
    {
        $tools = Tool::with(['domains.categories'])
            ->where('status', 'active')
            ->get();

        return Inertia::render('welcome', [
            'tools' => $tools,
        ]);
    }

    /**
     * Start a new assessment
     */
    public function start(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tool_id' => 'required|exists:tools,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

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

        return redirect()->route('assessment.take', ['assessment' => $assessment->id]);
    }

    /**
     * Take the assessment
     */
    public function take(Assessment $assessment)
    {
        // Load assessment with all related data
        $assessment->load([
            'tool.domains.categories.criteria' => function ($query) {
                $query->orderBy('order');
            },
            'responses'
        ]);

        // Check if user can access this assessment
        if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
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
    }

    /**
     * Save assessment response
     */
    public function saveResponse(Request $request, Assessment $assessment)
    {
        try {
            $validator = Validator::make($request->all(), [
                'criterion_id' => 'required|exists:criteria,id',
                'response' => 'required|in:yes,no,na',
                'notes' => 'nullable|string|max:2000',
                'attachment' => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png,txt',
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator);
            }

            // Check if user can access this assessment
            if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
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
            }

            // Return back with success message for Inertia
            return back()->with('success', 'Response saved successfully');

        } catch (\Exception $e) {
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
     * Show assessment results
     */
    public function results(Assessment $assessment)
    {
        // Check if user can access this assessment
        if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
            abort(403);
        }

        if (!$assessment->isComplete()) {
            return redirect()->route('assessment.take', $assessment)
                ->with('error', 'Please complete the assessment to view results.');
        }

        // Load necessary relationships
        $assessment->load(['tool', 'results.domain', 'results.category']);

        // Get results
        $results = $assessment->getResults();

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

        // Format results data with proper domain and category names
        $formattedResults = [
            'overall_percentage' => (float) $results['overall_percentage'],
            'total_criteria' => $results['total_criteria'],
            'applicable_criteria' => $results['applicable_criteria'],
            'yes_count' => $results['yes_count'],
            'no_count' => $results['no_count'],
            'na_count' => $results['na_count'],
            'domain_results' => $results['domain_results']->map(function ($domainResult) {
                return [
                    'domain_id' => $domainResult->domain_id,
                    'domain_name' => $domainResult->domain->name_en, // Use consistent field name
                    'score_percentage' => (float) $domainResult->score_percentage,
                    'total_criteria' => $domainResult->total_criteria,
                    'applicable_criteria' => $domainResult->applicable_criteria,
                    'yes_count' => $domainResult->yes_count,
                    'no_count' => $domainResult->no_count,
                    'na_count' => $domainResult->na_count,
                    'weighted_score' => $domainResult->weighted_score ? (float) $domainResult->weighted_score : null,
                ];
            })->toArray(),
            'category_results' => $results['category_results']->mapWithKeys(function ($categoryResults, $domainId) {
                return [
                    $domainId => $categoryResults->map(function ($categoryResult) {
                        return [
                            'category_id' => $categoryResult->category_id,
                            'category_name' => $categoryResult->category->name_en, // Use consistent field name
                            'score_percentage' => (float) $categoryResult->score_percentage,
                            'applicable_criteria' => $categoryResult->applicable_criteria,
                            'yes_count' => $categoryResult->yes_count,
                            'no_count' => $categoryResult->no_count,
                            'na_count' => $categoryResult->na_count,
                            'weight_percentage' => $categoryResult->weight_percentage ? (float) $categoryResult->weight_percentage : null,
                        ];
                    })->toArray()
                ];
            })->toArray(),
        ];

        return Inertia::render('assessment/Results', [
            'assessment' => $assessmentData,
            'results' => $formattedResults,
        ]);
    }

    public function getResults(): array
    {
        $results = $this->results()->with(['domain', 'category'])->get();

        $domainResults = $results->where('category_id', null);
        $categoryResults = $results->where('category_id', '!=', null)->groupBy('domain_id');

        return [
            'domain_results' => $domainResults,
            'category_results' => $categoryResults,
            'overall_percentage' => $domainResults->avg('score_percentage') ?? 0,
            'total_criteria' => $domainResults->sum('total_criteria'),
            'applicable_criteria' => $domainResults->sum('applicable_criteria'),
            'yes_count' => $domainResults->sum('yes_count'),
            'no_count' => $domainResults->sum('no_count'),
            'na_count' => $domainResults->sum('na_count'),
        ];
    }

    /**
     * Show assessment form with pre-filled data for authenticated users
     */
    public function create(Tool $tool)
    {
        $user = Auth::user();


        return Inertia::render('assessment/Create', [
            'tool' => $tool->load(['domains.categories']),
            'prefillData' => $user ? [
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ]);
    }

    /**
     * Update assessment details (notes and attachment)
     */
    public function updateDetails(Request $request, Assessment $assessment)
    {
        $validator = Validator::make($request->all(), [
            'notes' => 'nullable|string|max:2000',
            'attachment' => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png,txt',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if user can access this assessment
        if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
            abort(403);
        }

        $updateData = ['notes' => $request->input('notes')];

        // Handle file upload
        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('assessments/' . $assessment->id, $fileName, 'public');
            $updateData['attachment'] = $filePath;
        }

        $assessment->update($updateData);

        return response()->json(['success' => true]);
    }

    /**
     * Submit assessment
     */
    /**
     * Submit assessment
     */
    public function submit(Request $request, Assessment $assessment)
    {
        // Check if user can access this assessment
        if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
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
                        'notes' => $notes,        // This goes to assessment_responses table
                    ];

                    // Handle file upload if present
                    if ($attachment && $attachment instanceof \Illuminate\Http\UploadedFile) {
                        $filename = time() . '_' . $criterionId . '_' . $attachment->getClientOriginalName();
                        $path = $attachment->storeAs('assessment_attachments', $filename, 'public');
                        $data['attachment'] = $path;  // This goes to assessment_responses table
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

            DB::commit();

            return redirect()->route('assessment.results', $assessment)
                ->with('success', 'Assessment submitted successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Assessment submission error', [
                'assessment_id' => $assessment->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['assessment' => 'There was an error submitting your assessment. Please try again.']);
        }
    }

//    public function submit(Assessment $assessment)
//    {
//        // Check if user can access this assessment
////        if (Auth::check() && $assessment->user_id && $assessment->user_id !== Auth::id()) {
////            abort(403);
////        }
//
//        dd($assessment->markAsCompleted());
//
//        if (!$assessment->isComplete()) {
//            return back()->withErrors(['assessment' => 'Assessment is not complete']);
//        }
//
//        $assessment->markAsCompleted();
//        return response()->json(['success' => true]);
//
//    }

//        if (!$assessment->isComplete()) {
//            return response()->json(['error' => 'Assessment is not complete'], 400);
//        }
//
//        $assessment->update([
//            'status' => 'completed',
//            'completed_at' => now(),
//        ]);
//
//        // Calculate and save results
//        $assessment->calculateResults();
//
////        return redirect()->route('assessment.results', $assessment);
//
//    }
}
