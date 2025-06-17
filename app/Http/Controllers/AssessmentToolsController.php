<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use App\Models\Assessment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentToolsController extends Controller
{
    /**
     * Display assessment tools - PREMIUM ACCESS ONLY
     */
    public function index()
    {
        $user = auth()->user();

        // Only premium users and admins can access assessment tools
        if (!$user->isPremium() && !$user->isAdmin()) {
            return redirect()->route('subscription.show')
                ->with('error', 'Assessment tools are available for premium users only. Please upgrade your subscription.');
        }

        $tools = Tool::where('status', 'active')
            ->withCount(['assessments', 'domains'])
            ->with(['domains' => function($query) {
                $query->withCount(['categories' => function($q) {
                    $q->withCount('criteria');
                }]);
            }])
            ->orderBy('name_en')
            ->get()
            ->map(function ($tool) use ($user) {
                // Calculate total criteria from loaded relationships
                $totalCriteria = $tool->domains->sum(function($domain) {
                    return $domain->categories->sum('criteria_count');
                });

                $estimatedTime = max(10, ceil($totalCriteria * 0.5)); // Minimum 10 minutes

                // Check per-tool access
                $hasToolAccess = $user->hasAccessToTool($tool->id);
                $toolSubscription = $user->getToolSubscription($tool->id);

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
                    'requires_premium' => $tool->requiresPremium(),
                    'has_access' => $hasToolAccess,
                    'subscription_type' => $toolSubscription ? $toolSubscription->plan_type : 'none',
                ];
            });

        // Get user limits and access info
        $userLimits = [
            'current_assessments' => $user->assessments()->count(),
            'assessment_limit' => $user->getAssessmentLimit(),
            'can_create_more' => $user->canCreateAssessment(),
            'is_premium' => $user->isPremium(),
            'is_admin' => $user->isAdmin(),
            'subscription_status' => $user->getSubscriptionStatus(),
        ];

        // Return the assessment tools page with per-tool access
        return Inertia::render('assessment-tools', [
            'tools' => $tools,
            'userLimits' => $userLimits,
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Start an assessment for a specific tool - WITH PER-TOOL ACCESS CHECK
     */
    public function start(Tool $tool)
    {
        $user = auth()->user();

        // Check if user has access to this specific tool
        if (!$user->hasAccessToTool($tool->id)) {
            return redirect()->route('subscription.show')
                ->with('error', "You don't have access to the {$tool->name_en} tool. Please subscribe to access this tool.");
        }

        // Check user limits for this specific tool
        $toolSubscription = $user->getToolSubscription($tool->id);

        if ($toolSubscription) {
            $assessmentLimit = $toolSubscription->getFeature('assessments_limit');
            $currentAssessments = $user->assessments()->where('tool_id', $tool->id)->count();

            if ($assessmentLimit !== null && $currentAssessments >= $assessmentLimit) {
                return redirect()->route('subscription.show')
                    ->with('error', "You have reached your assessment limit for {$tool->name_en}. Please upgrade to premium for unlimited assessments.");
            }
        }

        // Load tool with domains and criteria
        $tool->load([
            'domains.categories.criteria' => function ($query) {
                $query->orderBy('order');
            }
        ]);

        // Create the assessment
        $assessment = Assessment::create([
            'user_id' => $user->id,
            'tool_id' => $tool->id,
            'name' => $user->name . ' - ' . $tool->name_en,
            'email' => $user->email,
            'organization' => $user->details->organization ?? 'Not specified',
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        return redirect()->route('assessment.take', $assessment);
    }

    /**
     * Premium dashboard version - for premium users accessing via dashboard
     */
    public function premiumIndex()
    {
        // This method remains the same but could include additional premium features
        return $this->index();
    }
}
