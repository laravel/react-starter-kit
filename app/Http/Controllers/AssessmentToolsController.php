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

        // Get all active tools with statistics
        $tools = Tool::where('status', 'active')
            ->withCount(['assessments', 'domains', 'criteria'])
            ->with(['domains' => function($query) {
                $query->withCount('categories');
            }])
            ->orderBy('name_en')
            ->get()
            ->map(function ($tool) {
                // Calculate total criteria and estimated time
                $totalCriteria = $tool->getCriteriaCount();
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
        $userLimits = $user->getAssessmentLimits();

        // Determine which view to render based on user type
        if ($user->isPremium() || $user->isAdmin()) {
            // Premium/Admin users get full dashboard view
            return Inertia::render('assessment-tools/PremiumIndex', [
                'tools' => $tools,
                'userLimits' => $userLimits,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'plan_type' => $user->getPlanType(),
                    'subscription' => $user->subscription,
                ],
                'locale' => app()->getLocale(),
            ]);
        } else {
            // Free users get limited view
            return Inertia::render('FreeUserAssessmentPage', [
                'tools' => $tools,
                'userLimits' => $userLimits,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'details' => $user->details,
                ],
                'locale' => app()->getLocale(),
            ]);
        }
    }

    /**
     * Premium-specific assessment tools page
     */
    public function premiumIndex()
    {
        $user = auth()->user();

        // Ensure user has premium access
        if (!$user->isPremium() && !$user->isAdmin()) {
            return redirect()->route('assessment-tools')
                ->with('error', 'Premium access required.');
        }

        // Get tools with advanced statistics for premium users
        $tools = Tool::where('status', 'active')
            ->withCount(['assessments', 'domains'])
            ->with([
                'domains.categories.criteria',
                'assessments' => function($query) use ($user) {
                    $query->where('user_id', $user->id);
                }
            ])
            ->orderBy('name_en')
            ->get()
            ->map(function ($tool) use ($user) {
                $totalCriteria = $tool->getCriteriaCount();
                $userAssessments = $tool->assessments->count();
                $lastAssessment = $tool->assessments->sortByDesc('created_at')->first();

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
                    'estimated_time' => max(10, ceil($totalCriteria * 0.5)),
                    'assessments_count' => $tool->assessments_count,
                    'user_assessments' => $userAssessments,
                    'last_assessment' => $lastAssessment ? [
                        'id' => $lastAssessment->id,
                        'created_at' => $lastAssessment->created_at,
                        'status' => $lastAssessment->status,
                    ] : null,
                ];
            });

        return Inertia::render('dashboard/AssessmentTools', [
            'tools' => $tools,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'plan_type' => $user->getPlanType(),
                'subscription' => $user->subscription,
            ],
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
        $userLimits = $user->getAssessmentLimits();
        if (!$userLimits['can_create_more']) {
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

        // Route to appropriate assessment start page based on user type
        if ($user->isPremium() || $user->isAdmin()) {
            return Inertia::render('assessment/PremiumStart', [
                'assessmentData' => $assessmentData,
                'userLimits' => $userLimits,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'plan_type' => $user->getPlanType(),
                    'subscription' => $user->subscription,
                ],
                'prefillData' => $prefillData,
                'locale' => app()->getLocale(),
            ]);
        } else {
            return Inertia::render('assessment/FreeUserStart', [
                'assessmentData' => $assessmentData,
                'userLimits' => $userLimits,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'details' => $user->details,
                ],
                'prefillData' => $prefillData,
                'locale' => app()->getLocale(),
            ]);
        }
    }
}
