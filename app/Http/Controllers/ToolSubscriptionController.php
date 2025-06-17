<?php
// app/Http/Controllers/ToolSubscriptionController.php

namespace App\Http\Controllers;

use App\Models\Tool;
use App\Models\ToolSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Cashier\Cashier;

class ToolSubscriptionController extends Controller
{
    /**
     * Show tool subscription page with Paddle integration
     */
    public function show(Tool $tool)
    {
        $user = auth()->user();

        // Load tool with pricing information
        $tool->load(['domains.categories.criteria']);

        // Check current subscription status for this tool
        $currentSubscription = $user->getToolSubscription($tool->id);

        // Calculate tool metrics
        $totalCriteria = $tool->domains->sum(function($domain) {
            return $domain->categories->sum(function($category) {
                return $category->criteria->count();
            });
        });

        return Inertia::render('ToolSubscription', [
            'tool' => [
                'id' => $tool->id,
                'name_en' => $tool->name_en,
                'name_ar' => $tool->name_ar,
                'description_en' => $tool->description_en,
                'description_ar' => $tool->description_ar,
                'image' => $tool->image,
                'total_criteria' => $totalCriteria,
                'estimated_time' => max(10, ceil($totalCriteria * 0.5)),
            ],
            'currentSubscription' => $currentSubscription ? [
                'plan_type' => $currentSubscription->plan_type,
                'status' => $currentSubscription->status,
                'expires_at' => $currentSubscription->expires_at,
                'features' => $currentSubscription->features,
            ] : null,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_premium' => $user->isPremium(),
                'is_admin' => $user->isAdmin(),
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
                    'price' => 49.99, // Per tool price in USD
                    'currency' => 'USD',
                    'paddle_product_id' => config('paddle.products.tool_premium'), // Set in config
                    'features' => [
                        'assessments_limit' => null, // Unlimited
                        'pdf_reports' => 'detailed',
                        'advanced_analytics' => true,
                        'support' => 'priority',
                    ]
                ]
            ],
            'paddle' => [
                'vendor_id' => config('services.paddle.vendor_id'),
                'environment' => config('services.paddle.sandbox') ? 'sandbox' : 'production',
            ],
        ]);
    }

    /**
     * Create Paddle checkout for tool subscription
     */
    public function createCheckout(Request $request, Tool $tool)
    {
        $request->validate([
            'plan_type' => 'required|in:free,premium',
        ]);

        $user = auth()->user();

        if ($request->plan_type === 'free') {
            return $this->subscribeFree($user, $tool);
        }

        try {
            // Create one-time payment for tool access
            $checkout = $user->checkout([
                'product_id' => config('paddle.products.tool_premium'), // Set in config
                'quantity' => 1,
            ])
                ->customData([
                    'user_id' => $user->id,
                    'tool_id' => $tool->id,
                    'plan_type' => 'premium',
                    'tool_name' => $tool->name_en,
                ])
                ->returnTo(route('tools.payment.success', [
                    'tool' => $tool->id,
                ]))
                ->create();

            return response()->json([
                'success' => true,
                'checkout_url' => $checkout['url'],
                'checkout_id' => $checkout['id'],
            ]);

        } catch (\Exception $e) {
            Log::error('Paddle checkout creation failed', [
                'user_id' => $user->id,
                'tool_id' => $tool->id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Checkout creation failed. Please try again.',
            ], 500);
        }
    }

    /**
     * Handle successful payment callback
     */
    public function paymentSuccess(Request $request, Tool $tool)
    {
        $user = auth()->user();
        $checkoutId = $request->query('checkout');

        if (!$checkoutId) {
            return redirect()->route('tools.discover')
                ->with('error', 'Payment verification failed.');
        }

        // The webhook will handle the actual subscription creation
        // This is just a success page
        return redirect()->route('assessment-tools')
            ->with('success', "Payment successful! You now have access to {$tool->name_en}.");
    }

    /**
     * Handle free subscription
     */
    private function subscribeFree($user, $tool)
    {
        try {
            DB::beginTransaction();

            $subscription = $user->toolSubscriptions()->updateOrCreate(
                ['tool_id' => $tool->id],
                [
                    'plan_type' => 'free',
                    'status' => 'active',
                    'started_at' => now(),
                    'features' => [
                        'assessments_limit' => 1,
                        'pdf_reports' => 'basic',
                        'advanced_analytics' => false,
                        'support' => 'community',
                    ]
                ]
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "You now have free access to {$tool->name_en}!",
                'redirect_url' => route('assessment.start', $tool->id),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Free subscription failed', [
                'user_id' => $user->id,
                'tool_id' => $tool->id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Subscription failed. Please try again.',
            ], 500);
        }
    }
}
