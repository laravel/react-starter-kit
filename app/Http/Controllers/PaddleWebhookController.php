<?php
// app/Http/Controllers/PaddleWebhookController.php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
//use Laravel\Cashier\Http\Controllers\WebhookController;
use Laravel\Paddle\Http\Controllers\WebhookController;

//use Laravel\Paddle\Http\Controllers\WebhookController;

class PaddleWebhookController extends WebhookController
{
    /**
     * Handle a payment succeeded webhook
     */
    public function handlePaymentSucceeded(array $payload)
    {
        Log::info('Paddle payment succeeded', $payload);

        $customData = $payload['custom_data'] ?? [];

        if (!isset($customData['user_id']) || !isset($customData['tool_id'])) {
            Log::warning('Missing custom data in payment webhook', ['payload' => $payload]);
            return;
        }

        try {
            DB::transaction(function () use ($payload, $customData) {
                $user = User::find($customData['user_id']);
                $tool = Tool::find($customData['tool_id']);

                if ($user && $tool) {
                    $subscription = $user->toolSubscriptions()->updateOrCreate(
                        ['tool_id' => $tool->id],
                        [
                            'plan_type' => 'premium',
                            'status' => 'active',
                            'started_at' => now(),
                            'expires_at' => now()->addYear(),
                            'paddle_customer_id' => $payload['customer_id'] ?? null,
                            'amount' => $payload['amount'] ?? 49.99,
                            'currency' => $payload['currency'] ?? 'USD',
                            'paddle_data' => $payload,
                            'features' => [
                                'assessments_limit' => null,
                                'pdf_reports' => 'detailed',
                                'advanced_analytics' => true,
                                'support' => 'priority',
                            ]
                        ]
                    );

                    Log::info('Tool subscription activated via Paddle webhook', [
                        'user_id' => $user->id,
                        'tool_id' => $tool->id,
                        'subscription_id' => $subscription->id,
                    ]);
                }
            });

        } catch (\Exception $e) {
            Log::error('Paddle webhook processing failed', [
                'error' => $e->getMessage(),
                'payload' => $payload
            ]);
        }
    }

    /**
     * Handle a payment failed webhook
     */
    public function handlePaymentFailed(array $payload)
    {
        Log::warning('Paddle payment failed', $payload);

        // Handle failed payment logic here
        // You might want to notify the user or retry payment
    }
}
