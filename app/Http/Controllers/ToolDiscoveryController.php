<?php
namespace App\Http\Controllers;

use App\Models\Tool;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ToolDiscoveryController extends Controller
{
    /**
     * Display tools for discovery and subscription
     */
    public function index(): Response
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
            ->map(function ($tool) use ($user) {
                // Calculate total criteria
                $totalCriteria = $tool->domains->sum(function($domain) {
                    return $domain->categories->sum('criteria_count');
                });

                $estimatedTime = max(10, ceil($totalCriteria * 0.5)); // Minimum 10 minutes

                // Check user access to this tool
                $hasAccess = $user ? $user->hasAccessToTool($tool->id) : false;
                $subscriptionType = 'none';

                if ($user && $hasAccess) {
                    $subscription = $user->getToolSubscription($tool->id);
                    $subscriptionType = $subscription ? $subscription->plan_type : 'none';
                }

                return [
                    'id' => $tool->id,
                    'name_en' => $tool->name_en,
                    'name_ar' => $tool->name_ar,
                    'description_en' => $tool->description_en,
                    'description_ar' => $tool->description_ar,
                    'image' => $tool->image,
                    'total_domains' => $tool->domains_count,
                    'total_criteria' => $totalCriteria,
                    'estimated_time' => $estimatedTime,
                    'assessments_count' => $tool->assessments_count,
                    'has_access' => $hasAccess,
                    'subscription_type' => $subscriptionType,
                    'has_free_plan' => $tool->has_free_plan ?? false,
                    'premium_price' => $tool->premium_price,
                    'currency' => $tool->currency ?? 'USD',
                ];
            });

        $userInfo = $user ? [
            'access_level' => $user->getAccessLevel(),
            'current_assessments' => $user->assessments()->count(),
            'tool_subscriptions' => $user->toolSubscriptions()
                ->where('status', 'active')
                ->pluck('tool_id', 'tool_id')
                ->toArray(),
        ] : [
            'access_level' => 'guest',
            'current_assessments' => 0,
            'tool_subscriptions' => [],
        ];

        return Inertia::render('ToolDiscover', [
            'tools' => $tools,
            'user' => $userInfo,
            'message' => 'hiii',
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Show individual tool details
     */
    public function show(Tool $tool): Response
    {
        $user = auth()->user();

        $tool->load([
            'domains.categories.criteria' => function ($query) {
                $query->orderBy('order');
            }
        ]);

        $toolData = [
            'id' => $tool->id,
            'name_en' => $tool->name_en,
            'name_ar' => $tool->name_ar,
            'description_en' => $tool->description_en,
            'description_ar' => $tool->description_ar,
            'image' => $tool->image,
            'has_free_plan' => $tool->has_free_plan ?? false,
            'premium_price' => $tool->premium_price,
            'currency' => $tool->currency ?? 'USD',
            'domains' => $tool->domains->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'name_en' => $domain->name_en,
                    'name_ar' => $domain->name_ar,
                    'categories_count' => $domain->categories->count(),
                    'criteria_count' => $domain->categories->sum(function($category) {
                        return $category->criteria->count();
                    }),
                ];
            }),
        ];

        $userAccess = $user ? [
            'has_access' => $user->hasAccessToTool($tool->id),
            'subscription_type' => $user->getToolSubscription($tool->id)?->plan_type ?? 'none',
            'access_level' => $user->getAccessLevel(),
        ] : [
            'has_access' => false,
            'subscription_type' => 'none',
            'access_level' => 'guest',
        ];

        return Inertia::render('ToolDetails', [
            'tool' => $toolData,
            'user_access' => $userAccess,
            'locale' => app()->getLocale(),
        ]);
    }
}
