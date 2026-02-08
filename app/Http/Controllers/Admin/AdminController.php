<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\PassLimitService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display admin dashboard with stats.
     */
    public function index(Request $request): Response
    {
        $totalUsers = User::count();
        $totalPasses = \App\Models\Pass::count();
        $subscribedUsers = User::whereHas('subscriptions', function ($query) {
            $query->where('stripe_status', 'active');
        })->count();

        return Inertia::render('admin/index', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalPasses' => $totalPasses,
                'subscribedUsers' => $subscribedUsers,
                'freeUsers' => $totalUsers - $subscribedUsers,
            ],
        ]);
    }

    /**
     * Display list of all users with subscription details.
     */
    public function users(Request $request, PassLimitService $passLimitService): Response
    {
        $query = User::query()
            ->withCount('passes')
            ->with('subscriptions')
            ->latest();

        // Search filter
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Subscription filter
        if ($status = $request->input('status')) {
            if ($status === 'subscribed') {
                $query->whereHas('subscriptions', function ($q) {
                    $q->where('stripe_status', 'active');
                });
            } elseif ($status === 'free') {
                $query->whereDoesntHave('subscriptions', function ($q) {
                    $q->where('stripe_status', 'active');
                });
            }
        }

        $users = $query->paginate(20);

        // Add plan information to each user
        $users->getCollection()->transform(function ($user) use ($passLimitService) {
            $currentPlan = $passLimitService->getCurrentPlan($user);
            $user->current_plan = $currentPlan;

            // Get subscription status
            $activeSubscription = $user->subscriptions()
                ->where('stripe_status', 'active')
                ->first();

            $user->subscription_status = $activeSubscription ? 'active' : 'none';
            $user->subscription_end = $activeSubscription?->ends_at;

            return $user;
        });

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status'),
            ],
        ]);
    }

    /**
     * Display detailed information about a specific user.
     */
    public function showUser(Request $request, User $user, PassLimitService $passLimitService): Response
    {
        $user->loadCount('passes', 'passTemplates');
        $user->load(['subscriptions' => function ($query) {
            $query->latest();
        }]);

        $currentPlan = $passLimitService->getCurrentPlan($user);
        $planConfig = config("passkit.plans.{$currentPlan}");

        // Get user's passes with pagination
        $passes = $user->passes()
            ->latest()
            ->paginate(10);

        // Get subscription history
        $subscriptions = $user->subscriptions()
            ->latest()
            ->get()
            ->map(function ($subscription) {
                return [
                    'id' => $subscription->id,
                    'name' => $subscription->name,
                    'stripe_status' => $subscription->stripe_status,
                    'stripe_price' => $subscription->stripe_price,
                    'quantity' => $subscription->quantity,
                    'trial_ends_at' => $subscription->trial_ends_at,
                    'ends_at' => $subscription->ends_at,
                    'created_at' => $subscription->created_at->toDateTimeString(),
                ];
            });

        return Inertia::render('admin/user-details', [
            'user' => array_merge($user->toArray(), [
                'current_plan' => $currentPlan,
                'plan_config' => $planConfig,
            ]),
            'passes' => $passes,
            'subscriptions' => $subscriptions,
        ]);
    }
}
