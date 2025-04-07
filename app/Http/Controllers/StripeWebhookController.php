<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierWebhookController;
use Symfony\Component\HttpFoundation\Response;

class StripeWebhookController extends CashierWebhookController
{
    /**
     * Handle a Stripe webhook call.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handleWebhook(Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        // Log the webhook event
        Log::channel('stripe')->info('Stripe webhook received', [
            'type' => $payload['type'] ?? 'unknown',
            'id' => $payload['id'] ?? 'unknown',
            'payload' => $payload,
        ]);

        // Call the parent handler
        $response = parent::handleWebhook($request);

        // Log the result
        Log::channel('stripe')->info('Stripe webhook processed', [
            'type' => $payload['type'] ?? 'unknown',
            'id' => $payload['id'] ?? 'unknown',
            'status' => $response->getStatusCode()
        ]);

        return $response;
    }

    /**
     * Handle customer subscription created.
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function handleCustomerSubscriptionCreated(array $payload)
    {
        Log::channel('stripe')->info('Subscription created webhook received', [
            'subscription_id' => $payload['data']['object']['id'] ?? 'unknown',
            'customer' => $payload['data']['object']['customer'] ?? 'unknown',
            'payload' => $payload['data']['object'],
        ]);

        return parent::handleCustomerSubscriptionCreated($payload);
    }
}
