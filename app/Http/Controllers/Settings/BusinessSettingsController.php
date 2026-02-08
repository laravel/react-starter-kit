<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessSettingsController extends Controller
{
    /**
     * Display business settings page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('settings/business', [
            'business' => [
                'name' => $request->user()->business_name,
                'address' => $request->user()->business_address,
                'phone' => $request->user()->business_phone,
                'email' => $request->user()->business_email,
                'website' => $request->user()->business_website,
            ],
            'google' => [
                'issuer_id' => $request->user()->google_issuer_id,
                'has_service_account' => !empty($request->user()->google_service_account_json),
            ],
            'apple' => [
                'team_id' => $request->user()->apple_team_id,
                'pass_type_id' => $request->user()->apple_pass_type_id,
                'has_certificate' => !empty($request->user()->apple_certificate),
            ],
        ]);
    }

    /**
     * Update business information    */
    public function updateBusiness(Request $request)
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
        ]);

        $request->user()->update([
            'business_name' => $validated['name'],
            'business_address' => $validated['address'],
            'business_phone' => $validated['phone'],
            'business_email' => $validated['email'],
            'business_website' => $validated['website'],
        ]);

        return back()->with('success', 'Business information updated successfully.');
    }

    /**
     * Update Google Wallet configuration.
     */
    public function updateGoogle(Request $request)
    {
        $validated = $request->validate([
            'issuer_id' => ['nullable', 'string', 'max:255'],
            'service_account_json' => ['nullable', 'string'],
        ]);

        $request->user()->update([
            'google_issuer_id' => $validated['issuer_id'],
            'google_service_account_json' => $validated['service_account_json'],
        ]);

        return back()->with('success', 'Google Wallet configuration updated successfully.');
    }

    /**
     * Update Apple Wallet configuration.
     */
    public function updateApple(Request $request)
    {
        $validated = $request->validate([
            'team_id' => ['nullable', 'string', 'max:255'],
            'pass_type_id' => ['nullable', 'string', 'max:255'],
            'certificate' => ['nullable', 'string'],
            'certificate_password' => ['nullable', 'string', 'max:255'],
        ]);

        $request->user()->update([
            'apple_team_id' => $validated['team_id'],
            'apple_pass_type_id' => $validated['pass_type_id'],
            'apple_certificate' => $validated['certificate'],
            'apple_certificate_password' => $validated['certificate_password'],
        ]);

        return back()->with('success', 'Apple Wallet configuration updated successfully.');
    }
}
