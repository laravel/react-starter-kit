<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactSalesRequest;
use App\Jobs\SendContactSalesNotification;
use App\Jobs\SendWhatsAppNotification;
use App\Models\ContactSalesLead;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactSalesController extends Controller
{
    /**
     * Store a new contact sales request
     */
    public function store(ContactSalesRequest $request)
    {
        try {
            // Create the lead record
            $lead = ContactSalesLead::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'company' => $request->company,
                'position' => $request->position,
                'company_type' => $request->company_type,
                'interest' => $request->interest,
                'message' => $request->message,
                'estimated_users' => $request->estimated_users,
                'timeline' => $request->timeline,
                'budget_range' => $request->budget_range,
                'source' => 'website_form',
                'status' => 'new',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'metadata' => [
                    'submitted_at' => now(),
                    'form_version' => '1.0',
                    'page_url' => $request->headers->get('referer'),
                ]
            ]);

            // Handle newsletter subscriptions
            $this->handleSubscriptions($request, $lead);

            // Send email notifications
            $this->sendEmailNotifications($lead);

            // Send WhatsApp notification if phone number provided
            if ($lead->phone) {
                $this->sendWhatsAppNotification($lead);
            }

            // Log the successful submission
            Log::info('Contact sales form submitted', [
                'lead_id' => $lead->id,
                'company' => $lead->company,
                'email' => $lead->email
            ]);

            return back()->with('success', 'Your request has been submitted successfully!');

        } catch (\Exception $e) {
            Log::error('Error processing contact sales form', [
                'error' => $e->getMessage(),
                'email' => $request->email,
                'company' => $request->company
            ]);

            return back()->withErrors(['general' => 'An error occurred while processing your request. Please try again.']);
        }
    }

    /**
     * Handle newsletter and marketing subscriptions
     */
    private function handleSubscriptions(ContactSalesRequest $request, ContactSalesLead $lead)
    {
        $subscriptionTypes = [];

        if ($request->subscribe_newsletter) {
            $subscriptionTypes[] = 'newsletter';
        }

        if ($request->subscribe_updates) {
            $subscriptionTypes[] = 'product_updates';
        }

        if ($request->subscribe_offers) {
            $subscriptionTypes[] = 'marketing_offers';
        }

        if (!empty($subscriptionTypes)) {
            NewsletterSubscriber::updateOrCreate(
                ['email' => $lead->email],
                [
                    'name' => $lead->name,
                    'company' => $lead->company,
                    'subscription_types' => $subscriptionTypes,
                    'subscribed_at' => now(),
                    'source' => 'contact_sales_form',
                    'is_active' => true,
                    'lead_id' => $lead->id,
                ]
            );
        }
    }

    /**
     * Send email notifications
     */
    private function sendEmailNotifications(ContactSalesLead $lead)
    {
        // Send confirmation email to the lead
        Mail::send('emails.contact-sales-confirmation', compact('lead'), function ($message) use ($lead) {
            $message->to($lead->email, $lead->name)
                ->subject('Thank you for contacting our sales team');
        });

        // Send notification to sales team
        $salesEmails = config('sales.notification_emails', ['sales@yourcompany.com']);

        Mail::send('emails.contact-sales-notification', compact('lead'), function ($message) use ($salesEmails) {
            $message->to($salesEmails)
                ->subject('New Sales Lead: ' . $lead->company);
        });

        // Dispatch job for CRM integration (if needed)
        SendContactSalesNotification::dispatch($lead);
    }

    /**
     * Send WhatsApp notification
     */
    private function sendWhatsAppNotification(ContactSalesLead $lead)
    {
        // Format phone number for WhatsApp
        $phoneNumber = $this->formatPhoneNumber($lead->phone);

        if ($phoneNumber) {
            $message = $this->generateWhatsAppMessage($lead);

            // Dispatch WhatsApp notification job
            SendWhatsAppNotification::dispatch($phoneNumber, $message, $lead);
        }
    }

    /**
     * Format phone number for WhatsApp API
     */
    private function formatPhoneNumber($phone)
    {
        // Remove all non-numeric characters
        $cleaned = preg_replace('/[^0-9]/', '', $phone);

        // Add country code if not present (assuming US +1 for this example)
        if (strlen($cleaned) === 10) {
            $cleaned = '1' . $cleaned;
        }

        // Basic validation
        if (strlen($cleaned) >= 10 && strlen($cleaned) <= 15) {
            return $cleaned;
        }

        return null;
    }

    /**
     * Generate WhatsApp message content
     */
    private function generateWhatsAppMessage(ContactSalesLead $lead)
    {
        return "Hi {$lead->name}! 👋\n\n" .
            "Thank you for your interest in our assessment platform! We've received your request and our sales team will contact you within 24 hours.\n\n" .
            "Your request details:\n" .
            "🏢 Company: {$lead->company}\n" .
            "📧 Email: {$lead->email}\n" .
            "🎯 Interest: {$lead->interest}\n\n" .
            "Meanwhile, feel free to reply to this message if you have any urgent questions.\n\n" .
            "Best regards,\n" .
            "AssessmentHub Sales Team";
    }

    /**
     * Show contact sales page (if you want a dedicated page)
     */
    public function show()
    {
        return Inertia::render('ContactSales', [
            'companyTypes' => $this->getCompanyTypes(),
            'interests' => $this->getInterests(),
        ]);
    }

    /**
     * Get company types for the form
     */
    private function getCompanyTypes()
    {
        return [
            'Startup (1-10 employees)',
            'Small Business (11-50 employees)',
            'Medium Business (51-200 employees)',
            'Large Enterprise (201-1000 employees)',
            'Corporation (1000+ employees)',
            'Government/Public Sector',
            'Non-Profit Organization',
            'Educational Institution',
            'Other'
        ];
    }

    /**
     * Get interests for the form
     */
    private function getInterests()
    {
        return [
            'Assessment Platform Demo',
            'Enterprise Solutions',
            'Custom Assessment Development',
            'Training & Support',
            'Integration Services',
            'Volume Pricing',
            'Partnership Opportunities',
            'Other'
        ];
    }
}
