<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Tool;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class AssessmentToolsController extends Controller
{
    /**
     * Display assessment tools - Route based on user type
     * NO BLOCKING - Free users get access to their page
     */
    public function index()
    {
        $user = auth()->user();

        // Ensure user exists and load relationships safely
        if (!$user) {
            return redirect()->route('login');
        }

        // Load user relationships safely
        $user->load(['details', 'subscription']);

        $tools = Tool::where('status', 'active')
            ->with(['domains.categories.criteria'])
            ->orderBy('order')
            ->get();

        // Get user's current assessment usage safely
        $currentAssessments = $user->assessments()->count();
        $assessmentLimit = $user->getAssessmentLimit();
        $canCreateMore = $user->canCreateAssessment();

        $toolsData = $tools->map(function ($tool) {
            return [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image ? asset('storage/' . $tool->image) : null,
                'status' => $tool->status,
                'total_criteria' => $tool->getCriteriaCount(),
                'total_domains' => $tool->domains->count(),
                'estimated_time' => ceil($tool->getCriteriaCount() * 1.5), // 1.5 minutes per criterion
            ];
        });

        $userLimits = [
            'current_assessments' => $currentAssessments,
            'assessment_limit' => $assessmentLimit,
            'can_create_more' => $canCreateMore,
            'is_premium' => $user->isPremium(),
            'subscription_status' => $user->getSubscriptionStatus(),
        ];

        // Route to different pages based on user type
        if ($user->isPremium() || $user->isAdmin()) {
            // Premium users go to dashboard assessment tools
            return Inertia::render('assessment-tools', [
                'tools' => $toolsData,
                'userLimits' => $userLimits,
                'locale' => app()->getLocale(),
            ]);
        } else {
            // Free users go to standalone assessment page (outside dashboard)
            return Inertia::render('FreeUserAssessmentPage', [
                'tools' => $toolsData,
                'userLimits' => $userLimits,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'details' => $user->details ? [
                        'company_name' => $user->details->company_name,
                        'phone' => $user->details->phone,
                    ] : null,
                ],
                'locale' => app()->getLocale(),
            ]);
        }
    }

    /**
     * Start assessment - ALLOW ALL AUTHENTICATED USERS
     */
    public function start(Tool $tool)
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Load user relationships safely
        $user->load(['details', 'subscription']);

        // Don't block access here - let them start the assessment
        // Limits will be checked only on submission

        // Check if user already has an incomplete assessment for this tool
        $existingAssessment = $user->assessments()
            ->where('tool_id', $tool->id)
            ->where('status', '!=', 'completed')
            ->first();

        if ($existingAssessment) {
            return redirect()->route('assessment.take', $existingAssessment->id)
                ->with('info', 'Continuing your existing assessment for this tool.');
        }

        // Load tool with all related data
        $tool->load(['domains.categories.criteria' => function ($query) {
            $query->where('status', 'active')->orderBy('order');
        }]);

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

        // Use different start pages based on user type
        if ($user->isPremium() || $user->isAdmin()) {
            // Premium users get the full assessment start page
            return Inertia::render('assessment/start', [
                'assessmentData' => $assessmentData,
                'locale' => app()->getLocale(),
                'prefillData' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'organization' => $user->details?->company_name,
                ],
                'auth' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'organization' => $user->details?->company_name,
                    ],
                ],
                'userLimits' => [
                    'current_assessments' => $user->assessments()->count(),
                    'assessment_limit' => $user->getAssessmentLimit(),
                    'can_create_more' => $user->canCreateAssessment(),
                    'is_premium' => $user->isPremium(),
                ],
            ]);
        } else {
            // Free users get a simplified assessment start page
            return Inertia::render('assessment/FreeUserStart', [
                'assessmentData' => $assessmentData,
                'locale' => app()->getLocale(),
                'prefillData' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'organization' => $user->details?->company_name,
                ],
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'details' => $user->details ? [
                        'company_name' => $user->details->company_name,
                    ] : null,
                ],
                'userLimits' => [
                    'current_assessments' => $user->assessments()->count(),
                    'assessment_limit' => $user->getAssessmentLimit(),
                    'can_create_more' => $user->canCreateAssessment(),
                    'is_premium' => $user->isPremium(),
                    'subscription_status' => $user->getSubscriptionStatus(),
                ],
            ]);
        }
    }

    /**
     * Show assessment tools for premium users (dashboard version)
     */
    public function premiumIndex()
    {
        $user = auth()->user();

        // Only premium users can access this
        if (!$user->isPremium() && !$user->isAdmin()) {
            return redirect()->route('assessment-tools');
        }

        $tools = Tool::where('status', 'active')
            ->with(['domains.categories.criteria'])
            ->orderBy('order')
            ->get();

        $toolsData = $tools->map(function ($tool) {
            return [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image ? asset('storage/' . $tool->image) : null,
                'status' => $tool->status,
                'total_criteria' => $tool->getCriteriaCount(),
                'total_domains' => $tool->domains->count(),
                'estimated_time' => ceil($tool->getCriteriaCount() * 1.5),
            ];
        });

        return Inertia::render('assessment-tools', [
            'tools' => $toolsData,
            'userLimits' => [
                'current_assessments' => $user->assessments()->count(),
                'assessment_limit' => null, // Unlimited for premium
                'can_create_more' => true,
                'is_premium' => true,
                'subscription_status' => $user->getSubscriptionStatus(),
            ],
            'locale' => app()->getLocale(),
        ]);
    }
}
