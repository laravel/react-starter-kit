<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Tool;
use App\Models\AssessmentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $validator = Validator::make($request->all(), [
            'criterion_id' => 'required|exists:criteria,id',
            'response' => 'required|in:yes,no,na',
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

        // Check if assessment is complete and update status
        if ($assessment->isComplete()) {
            $assessment->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            // Calculate and save results
            $assessment->calculateResults();
        }

        return response()->json([
            'success' => true,
            'completion_percentage' => $assessment->getCompletionPercentage(),
            'is_complete' => $assessment->isComplete(),
        ]);
    }

    /**
     * Show assessment results
     */
    public function results(Assessment $assessment)
    {
        // Check if user can access this assessment
        if (Auth::check() && $assessment->user_id !== Auth::id()) {
            abort(403);
        }

        if (!$assessment->isComplete()) {
            return redirect()->route('assessment.take', $assessment)
                ->with('error', 'Please complete the assessment to view results.');
        }

        $results = $assessment->getResults();

        return Inertia::render('assessment/Results', [
            'assessment' => $assessment,
            'results' => $results,
        ]);
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
    public function submit(Request $request, Assessment $assessment)
    {
        $request->validate([
            'responses' => 'required|array',
            'responses.*.criterion_id' => 'required|exists:criteria,id',
            'responses.*.response' => 'required|in:yes,no,na',
            'responses.*.notes' => 'nullable|string|max:1000',
            'responses.*.attachment' => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png,txt',
        ]);

        foreach ($request->responses as $responseData) {
            $data = [
                'assessment_id' => $assessment->id, // Added here in controller
                'criterion_id' => $responseData['criterion_id'],
                'response' => $responseData['response'],
                'notes' => $responseData['notes'] ?? null,
            ];

            // Handle file upload if present
            if (isset($responseData['attachment']) && $responseData['attachment']) {
                $file = $responseData['attachment'];
                $filename = time() . '_' . $responseData['criterion_id'] . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('assessment_attachments', $filename, 'public');
                $data['attachment'] = $path;
            }

            // Update or create response
            AssessmentResponse::updateOrCreate(
                [
                    'assessment_id' => $assessment->id,
                    'criterion_id' => $responseData['criterion_id'],
                ],
                $data
            );
        }

        // Mark assessment as completed
        $assessment->markAsCompleted();

        return redirect()->route('assessment.results', $assessment)
            ->with('success', 'Assessment submitted successfully!');
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
