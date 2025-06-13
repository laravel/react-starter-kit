<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use App\Models\Assessment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentToolsController extends Controller
{
    /**
     * Display assessment tools - works for all user types
     */
    public function index()
    {
        $user = auth()->user();
        $tools = Tool::where('status', 'active')
            ->withCount(['assessments', 'domains'])
            ->with(['domains' => function($query) {
                $query->withCount(['categories' => function($q) {
                    $q->withCount('criteria');
                }]);
            }])
            ->orderBy('name_en')
            ->get()
            ->map(function ($tool) {
                // Calculate total criteria from loaded relationships
                $totalCriteria = $tool->domains->sum(function($domain) {
                    return $domain->categories->sum('criteria_count');
                });

                $estimatedTime = max(10, ceil($totalCriteria * 0.5)); // Minimum 10 minutes

                return [
                    'id' => $tool->id,
                    'name_en' => $tool->name_en,
                    'name_ar' => $tool->name_ar,
                    'description_en' => $tool->description_en,
                    'description_ar' => $tool->description_ar,
                    'image' => $tool->image,
                    'status' => $tool->status,
                    'total_domains' => $tool->domains_count,
                    'total_criteria' => $totalCriteria,
                    'estimated_time' => $estimatedTime,
                    'assessments_count' => $tool->assessments_count,
                ];
            });

        // Get user limits and access info
        $userLimits = [
            'current_assessments' => $user->assessments()->count(),
            'assessment_limit' => $user->getAssessmentLimit(),
            'can_create_more' => $user->canCreateAssessment(),
            'is_premium' => $user->isPremium(),
            'subscription_status' => $user->getSubscriptionStatus(),
        ];

        // Return the assessment tools page with user limits
        return Inertia::render('assessment-tools', [
            'tools' => $tools,
            'userLimits' => $userLimits,
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Start an assessment for a specific tool
     */
    public function start(Tool $tool)
    {
        $user = auth()->user();

        // Check user limits
        if (!$user->canCreateAssessment()) {
            if ($user->isFree()) {
                return redirect()->route('subscription.show')
                    ->with('error', 'You have reached your assessment limit. Please upgrade to premium for unlimited assessments.');
            }
        }

        // Load tool with all necessary data
        $tool->load([
            'domains' => function($query) {
                $query->orderBy('order')->with([
                    'categories' => function($q) {
                        $q->orderBy('order')->with([
                            'criteria' => function($q2) {
                                $q2->orderBy('order');
                            }
                        ]);
                    }
                ]);
            }
        ]);

        // Prepare assessment data
        $assessmentData = [
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image,
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

        // Pre-fill user data
        $prefillData = [
            'name' => $user->name,
            'email' => $user->email,
        ];

        // Route to assessment start page
        return Inertia::render('assessment/Start', [
            'assessmentData' => $assessmentData,
            'userLimits' => $userLimits,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'subscription' => $user->subscription,
            ],
            'prefillData' => $prefillData,
            'locale' => app()->getLocale(),
        ]);
    }
}
