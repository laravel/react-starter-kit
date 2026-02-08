<?php

namespace App\Http\Controllers;

use App\Services\PassLimitService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    /**
     * Display billing information and subscription management.
     */
    public function index(Request $request, PassLimitService $passLimitService): Response
    {
        $user = $request->user();
        $plans = config('passkit.plans');
        $currentPlanKey = $passLimitService->getCurrentPlan($user);
        $currentPlanData = $plans[$currentPlanKey];
        $passCount = $user->passes()->count();

        // Transform plans to include key
        $transformedPlans = collect($plans)->map(function ($plan, $key) {
            return array_merge($plan, ['key' => $key]);
        })->values();

        // Add key to current plan
        $currentPlan = array_merge($currentPlanData, ['key' => $currentPlanKey]);

        $invoices = [];
        if ($user->hasStripeId()) {
            $invoices = $user->invoices()->map(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'number' => $invoice->number,
                    'created' => $invoice->date()->timestamp,
                    'amount' => $invoice->total(),
                    'currency' => $invoice->currency,
                    'status' => $invoice->status,
                    'invoice_pdf' => $invoice->invoice_pdf,
                ];
            });
        }

        return Inertia::render('billing/index', [
            'plans' => $transformedPlans,
            'currentPlan' => $currentPlan,
            'passCount' => $passCount,
            'passLimit' => $currentPlanData['pass_limit'],
            'invoices' => $invoices,
        ]);
    }

    /**
     * Redirect to Stripe Checkout for subscription.
     */
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'price_id' => ['required', 'string'],
        ]);

        return $request->user()
            ->newSubscription('default', $validated['price_id'])
            ->checkout([
                'success_url' => route('billing.index') . '?success=true',
                'cancel_url' => route('billing.index') . '?canceled=true',
            ]);
    }

    /**
     * Redirect to Stripe's customer portal.
     */
    public function portal(Request $request)
    {
        return $request->user()->redirectToBillingPortal(route('billing.index'));
    }
}
