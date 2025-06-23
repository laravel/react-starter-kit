<?php
// =====================================================================
// CORRECTED STEP 6: NAVIGATION AND COMPONENT UPDATES
// =====================================================================

// ISSUE IDENTIFIED: The original step 6 had generic component examples
// SOLUTION: Create specific implementations for your Laravel/Inertia setup

// =====================================================================
// NAVIGATION CONTROLLER - CORRECTED IMPLEMENTATION
// app/Http/Controllers/NavigationController.php
// =====================================================================

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NavigationController extends Controller
{
    /**
     * Get navigation items based on user access level
     */
    public function getNavigationItems(Request $request): JsonResponse
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'items' => [],
                'user_access_level' => 'guest',
                'user_stats' => null,
            ]);
        }

        $accessLevel = $user->getAccessLevel();
        $navigationItems = $this->getNavigationByAccessLevel($accessLevel);
        $userStats = $this->getUserStats($user);

        return response()->json([
            'items' => $navigationItems,
            'user_access_level' => $accessLevel,
            'user_stats' => $userStats,
        ]);
    }

    /**
     * Get navigation items based on access level
     */
    private function getNavigationByAccessLevel(string $accessLevel): array
    {
        switch ($accessLevel) {
            case 'admin':
                return [
                    [
                        'title' => 'Dashboard',
                        'href' => route('dashboard'),
                        'icon' => 'LayoutGrid',
                        'active' => request()->routeIs('dashboard'),
                    ],
                    [
                        'title' => 'Assessment Tools',
                        'href' => route('assessment-tools'),
                        'icon' => 'ClipboardCheck',
                        'active' => request()->routeIs('assessment-tools*'),
                    ],
                    [
                        'title' => 'My Assessments',
                        'href' => route('assessments.index'),
                        'icon' => 'FileText',
                        'active' => request()->routeIs('assessments*'),
                    ],
                    [
                        'title' => 'Admin Panel',
                        'href' => '/admin', // Filament admin URL
                        'icon' => 'Settings',
                        'active' => request()->is('admin*'),
                    ],
                ];

            case 'premium':
                return [
                    [
                        'title' => 'Dashboard',
                        'href' => route('dashboard'),
                        'icon' => 'LayoutGrid',
                        'active' => request()->routeIs('dashboard'),
                    ],
                    [
                        'title' => 'Assessment Tools',
                        'href' => route('assessment-tools'),
                        'icon' => 'ClipboardCheck',
                        'active' => request()->routeIs('assessment-tools*'),
                    ],
                    [
                        'title' => 'My Assessments',
                        'href' => route('assessments.index'),
                        'icon' => 'FileText',
                        'active' => request()->routeIs('assessments*'),
                    ],
                    [
                        'title' => 'Tool Subscriptions',
                        'href' => route('tools.subscriptions'),
                        'icon' => 'Crown',
                        'active' => request()->routeIs('tools.subscriptions*'),
                    ],
                ];

            case 'free':
            default:
                $user = auth()->user();
                return [
                    [
                        'title' => 'Free Assessment',
                        'href' => route('free-assessment.index'),
                        'icon' => 'FileText',
                        'active' => request()->routeIs('free-assessment*'),
                        'badge' => $user && $user->canTakeFreeAssessment() ? 'Available' : null,
                        'badge_variant' => 'success',
                    ],
                    [
                        'title' => 'Browse Tools',
                        'href' => route('tools.discover'),
                        'icon' => 'ShoppingCart',
                        'active' => request()->routeIs('tools.discover*'),
                    ],
                    [
                        'title' => 'Contact Sales',
                        'href' => route('contact.sales.show'),
                        'icon' => 'Info',
                        'active' => request()->routeIs('contact.sales*'),
                    ],
                ];
        }
    }

    /**
     * Get user statistics
     */
    private function getUserStats($user): array
    {
        return [
            'has_free_assessment' => $user->hasTakenFreeAssessment(),
            'can_take_free' => $user->canTakeFreeAssessment(),
            'tool_subscriptions_count' => $user->toolSubscriptions()->where('status', 'active')->count(),
            'total_assessments' => $user->assessments()->count(),
        ];
    }
}
