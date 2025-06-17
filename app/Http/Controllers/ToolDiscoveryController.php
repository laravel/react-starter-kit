<?php

namespace App\Http\Controllers;

use App\Models\Tool;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolDiscoveryController extends Controller
{
    /**
     * Show tool discovery page for free users
     * This allows free users to browse and learn about tools before subscribing
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
                    'pricing' => [
                        'free' => [
                            'price' => 0,
                            'assessments_limit' => 1,
                        ],
                        'premium' => [
                            'price' => 49.99, // Per tool
                            'assessments_limit' => null, // Unlimited
                        ]
                    ]
                ];
            });

        // Get user info
        $userInfo = [
            'current_assessments' => $user->assessments()->count(),
            'is_premium' => $user->isPremium(),
            'is_admin' => $user->isAdmin(),
            'subscription_status' => $user->getSubscriptionStatus(),
            'tool_subscriptions' => $user->toolSubscriptions()
                ->with('tool:id,name_en')
                ->where('status', 'active')
                ->get()
                ->pluck('tool.name_en', 'tool_id')
                ->toArray(),
        ];

        return Inertia::render('ToolDiscovery', [
            'tools' => $tools,
            'user' => $userInfo,
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Show detailed information about a specific tool
     */
    public function show(Tool $tool)
    {
        $user = auth()->user();

        // Load tool with full details
        $tool->load([
            'domains.categories.criteria' => function ($query) {
                $query->orderBy('order');
            }
        ]);

        // Check current subscription status
        $toolSubscription = $user->getToolSubscription($tool->id);
        $hasAccess = $user->hasAccessToTool($tool->id);

        // Calculate detailed metrics
        $toolMetrics = [
            'total_domains' => $tool->domains->count(),
            'total_categories' => $tool->domains->sum(function($domain) {
                return $domain->categories->count();
            }),
            'total_criteria' => $tool->domains->sum(function($domain) {
                return $domain->categories->sum(function($category) {
                    return $category->criteria->count();
                });
            }),
        ];

        $toolMetrics['estimated_time'] = max(10, ceil($toolMetrics['total_criteria'] * 0.5));

        return Inertia::render('ToolDetails', [
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image,
                'domains' => $tool->domains->map(function($domain) {
                    return [
                        'id' => $domain->id,
                        'name_en' => $domain->name_en,
                        'name_ar' => $domain->name_ar,
                        'description_en' => $domain->description_en,
                        'description_ar' => $domain->description_ar,
                        'categories_count' => $domain->categories->count(),
                        'criteria_count' => $domain->categories->sum(function($category) {
                            return $category->criteria->count();
                        }),
                    ];
                }),
                'metrics' => $toolMetrics,
            ],
            'subscription' => $toolSubscription ? [
                'plan_type' => $toolSubscription->plan_type,
                'status' => $toolSubscription->status,
                'expires_at' => $toolSubscription->expires_at,
                'features' => $toolSubscription->features,
                'is_active' => $toolSubscription->isActive(),
            ] : null,
            'access' => [
                'has_access' => $hasAccess,
                'can_start_assessment' => $hasAccess,
                'requires_subscription' => !$hasAccess,
            ],
            'pricing' => [
                'free' => [
                    'price' => 0,
                    'currency' => 'USD',
                    'features' => [
                        'assessments_limit' => 1,
                        'pdf_reports' => 'basic',
                        'advanced_analytics' => false,
                        'support' => 'community',
                    ]
                ],
                'premium' => [
                    'price' => 49.99,
                    'currency' => 'USD',
                    'features' => [
                        'assessments_limit' => null, // Unlimited
                        'pdf_reports' => 'detailed',
                        'advanced_analytics' => true,
                        'support' => 'priority',
                    ]
                ]
            ],
            'user' => [
                'is_premium' => $user->isPremium(),
                'is_admin' => $user->isAdmin(),
            ],
        ]);
    }
}
