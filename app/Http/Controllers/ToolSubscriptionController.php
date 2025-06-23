<?php
// app/Http/Controllers/ToolSubscriptionController.php

namespace App\Http\Controllers;

use App\Models\Tool;
use App\Models\ToolSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ToolSubscriptionController extends Controller
{
    /**
     * Show user's tool subscriptions
     */
    public function index()
    {
        $user = auth()->user();

        $subscriptions = $user->toolSubscriptions()
            ->with('tool')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($subscription) {
                return [
                    'id' => $subscription->id,
                    'tool' => [
                        'id' => $subscription->tool->id,
                        'name_en' => $subscription->tool->name_en,
                        'name_ar' => $subscription->tool->name_ar,
                        'image' => $subscription->tool->image,
                    ],
                    'plan_type' => $subscription->plan_type,
                    'status' => $subscription->status,
                    'started_at' => $subscription->started_at,
                    'expires_at' => $subscription->expires_at,
                    'features' => $subscription->features,
                    'paddle_subscription_id' => $subscription->paddle_subscription_id,
                ];
            });

        return Inertia::render('MyToolSubscriptions', [
            'subscriptions' => $subscriptions,
        ]);
    }

    /**
     * Show tool subscription page with pricing options
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
            'paddle' => [
                'vendor_id' => config('paddle.vendor_id'),
                'client_side_token' => config('paddle.client_side_token'),
                'environment' => config('paddle.sandbox') ? 'sandbox' : 'production',
            ],
        ]);
    }

    /**
     * Handle subscription request (both free and premium)
     */
    public function subscribe(Request $request, Tool $tool)
    {
        $request->validate([
            'plan_type' => 'required|in:free,premium',
        ]);

        $user = auth()->user();

        // Check if user already has a subscription for this tool
        $existingSubscription = $user->getToolSubscription($tool->id);
        if ($existingSubscription && $existingSubscription->status === 'active') {
            return response()->json([
                'success' => false,
                'error' => 'You already have an active subscription for this tool.',
            ], 400);
        }

        if ($request->plan_type === 'free') {
            return $this->subscribeFree($user, $tool);
        } else {
            return $this->createPaddleCheckout($user, $tool);
        }
    }

    /**
     * Create Paddle checkout for premium subscription
     */
    private function createPaddleCheckout($user, $tool)
    {
        try {
            // Prepare checkout data for Paddle API
            $checkoutData = [
                'items' => [
                    [
                        'price_id' => config('paddle.products.tool_premium'), // Set this in config
                        'quantity' => 1,
                    ]
                ],
                'customer' => [
                    'email' => $user->email,
                    'name' => $user->name,
                ],
                'custom_data' => [
                    'user_id' => $user->id,
                    'tool_id' => $tool->id,
                    'plan_type' => 'premium',
                    'tool_name' => $tool->name_en,
                ],
                'return_url' => route('tools.payment.success', ['tool' => $tool->id]),
                'discount_id' => null, // Add discount logic if needed
            ];

            // Create checkout via Paddle API
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('paddle.vendor_auth_code'),
                'Content-Type' => 'application/json',
            ])->post('https://sandbox-api.paddle.com/transactions', $checkoutData);

            if ($response->successful()) {
                $checkout = $response->json();

                return response()->json([
                    'success' => true,
                    'checkout_url' => $checkout['data']['checkout']['url'],
                    'checkout_id' => $checkout['data']['id'],
                ]);
            } else {
                Log::error('Paddle checkout creation failed', [
                    'user_id' => $user->id,
                    'tool_id' => $tool->id,
                    'response' => $response->body(),
                ]);

                return response()->json([
                    'success' => false,
                    'error' => 'Checkout creation failed. Please try again.',
                ], 500);
            }

        } catch (\Exception $e) {
            Log::error('Paddle checkout exception', [
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
        $transactionId = $request->query('_ptxn');

        if (!$transactionId) {
            return redirect()->route('tools.discover')
                ->with('error', 'Payment verification failed.');
        }

        // Check if subscription was created (webhook should have handled this)
        $subscription = $user->getToolSubscription($tool->id);

        if ($subscription && $subscription->status === 'active') {
            return redirect()->route('assessment.start', $tool->id)
                ->with('success', "Payment successful! You now have premium access to {$tool->name_en}.");
        } else {
            // Subscription not found, redirect to try again
            return redirect()->route('tools.subscribe', $tool->id)
                ->with('error', 'Payment processed but subscription setup is pending. Please contact support if this persists.');
        }
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
                    'expires_at' => null, // Free subscriptions don't expire
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

    /**
     * Cancel tool subscription
     */
    public function cancel(ToolSubscription $subscription)
    {
        $user = auth()->user();

        // Ensure user owns this subscription
        if ($subscription->user_id !== $user->id) {
            abort(403, 'Unauthorized to cancel this subscription.');
        }

        try {
            DB::beginTransaction();

            // If it's a premium subscription with Paddle, cancel it there too
            if ($subscription->plan_type === 'premium' && $subscription->paddle_subscription_id) {
                $this->cancelPaddleSubscription($subscription->paddle_subscription_id);
            }

            // Update local subscription status
            $subscription->update([
                'status' => 'canceled',
                'canceled_at' => now(),
            ]);

            DB::commit();

            return redirect()->back()
                ->with('success', 'Subscription canceled successfully.');

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Subscription cancellation failed', [
                'subscription_id' => $subscription->id,
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', 'Failed to cancel subscription. Please try again.');
        }
    }

    /**
     * Cancel subscription in Paddle
     */
    private function cancelPaddleSubscription($paddleSubscriptionId)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('paddle.vendor_auth_code'),
                'Content-Type' => 'application/json',
            ])->post("https://sandbox-api.paddle.com/subscriptions/{$paddleSubscriptionId}/cancel", [
                'effective_from' => 'immediately',
            ]);

            if (!$response->successful()) {
                Log::warning('Failed to cancel Paddle subscription', [
                    'paddle_subscription_id' => $paddleSubscriptionId,
                    'response' => $response->body(),
                ]);
            }

        } catch (\Exception $e) {
            Log::error('Exception canceling Paddle subscription', [
                'paddle_subscription_id' => $paddleSubscriptionId,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Webhook handler for Paddle events
     */
    public function webhook(Request $request)
    {
        $signature = $request->header('Paddle-Signature');
        $webhookSecret = config('paddle.webhook_secret');

        // Verify webhook signature
        if (!$this->verifyWebhookSignature($request->getContent(), $signature, $webhookSecret)) {
            Log::warning('Invalid webhook signature', [
                'signature' => $signature,
            ]);
            return response('Invalid signature', 400);
        }

        $payload = $request->json()->all();
        $eventType = $payload['event_type'] ?? null;

        try {
            switch ($eventType) {
                case 'transaction.completed':
                    $this->handleTransactionCompleted($payload);
                    break;

                case 'subscription.canceled':
                    $this->handleSubscriptionCanceled($payload);
                    break;

                case 'subscription.updated':
                    $this->handleSubscriptionUpdated($payload);
                    break;

                default:
                    Log::info('Unhandled webhook event', ['event_type' => $eventType]);
            }

            return response('OK', 200);

        } catch (\Exception $e) {
            Log::error('Webhook processing failed', [
                'event_type' => $eventType,
                'error' => $e->getMessage(),
                'payload' => $payload,
            ]);

            return response('Processing failed', 500);
        }
    }

    /**
     * Handle transaction completed webhook
     */
    private function handleTransactionCompleted($payload)
    {
        $customData = $payload['data']['custom_data'] ?? [];
        $userId = $customData['user_id'] ?? null;
        $toolId = $customData['tool_id'] ?? null;

        if (!$userId || !$toolId) {
            Log::warning('Missing custom data in transaction webhook', $customData);
            return;
        }

        $user = \App\Models\User::find($userId);
        $tool = Tool::find($toolId);

        if (!$user || !$tool) {
            Log::warning('User or tool not found for webhook', [
                'user_id' => $userId,
                'tool_id' => $toolId,
            ]);
            return;
        }

        // Create premium subscription
        $user->toolSubscriptions()->updateOrCreate(
            ['tool_id' => $toolId],
            [
                'plan_type' => 'premium',
                'status' => 'active',
                'started_at' => now(),
                'expires_at' => null, // One-time payment, no expiry
                'paddle_transaction_id' => $payload['data']['id'],
                'features' => [
                    'assessments_limit' => null, // Unlimited
                    'pdf_reports' => 'detailed',
                    'advanced_analytics' => true,
                    'support' => 'priority',
                ]
            ]
        );

        Log::info('Premium tool subscription created via webhook', [
            'user_id' => $userId,
            'tool_id' => $toolId,
            'transaction_id' => $payload['data']['id'],
        ]);
    }

    /**
     * Handle subscription canceled webhook
     */
    private function handleSubscriptionCanceled($payload)
    {
        $subscriptionId = $payload['data']['id'] ?? null;

        if ($subscriptionId) {
            ToolSubscription::where('paddle_subscription_id', $subscriptionId)
                ->update([
                    'status' => 'canceled',
                    'canceled_at' => now(),
                ]);
        }
    }

    /**
     * Handle subscription updated webhook
     */
    private function handleSubscriptionUpdated($payload)
    {
        $subscriptionId = $payload['data']['id'] ?? null;
        $status = $payload['data']['status'] ?? null;

        if ($subscriptionId && $status) {
            ToolSubscription::where('paddle_subscription_id', $subscriptionId)
                ->update(['status' => $status]);
        }
    }

    /**
     * Verify Paddle webhook signature
     */
    private function verifyWebhookSignature($payload, $signature, $secret)
    {
        // Implement Paddle signature verification
        // This is a simplified version - use Paddle's official method
        $computedSignature = hash_hmac('sha256', $payload, $secret);
        return hash_equals($signature, $computedSignature);
    }
}
