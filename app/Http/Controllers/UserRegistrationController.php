<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserRegistrationController extends Controller
{
    /**
     * Register a new free user
     */
    public function registerFreeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'company' => 'required|string|max:255',
            'company_type' => 'required|in:commercial,government,service',
            'company_name' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string|max:500',
            'country' => 'nullable|string|max:100',
            'industry' => 'nullable|string|max:100',
            'company_size' => 'nullable|integer|min:1',
            'how_did_you_hear' => 'nullable|string|max:255',
            'marketing_emails' => 'boolean',
            'newsletter_subscription' => 'boolean',
        ]);

        try {
            DB::beginTransaction();

            // Create user with basic info only
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make(str()->random(12)), // Random password
                'user_type' => 'free',
                'email_verified_at' => now(), // Auto-verify for free users
            ]);

            // Create user details
            $user->details()->create([
                'phone' => $validated['phone'],
                'company' => $validated['company'],
                'company_type' => $validated['company_type'],
                'company_name' => $validated['company_name'],
                'city' => $validated['city'] ?? null,
                'position' => $validated['position'] ?? null,
                'website' => $validated['website'] ?? null,
                'address' => $validated['address'] ?? null,
                'country' => $validated['country'] ?? null,
                'industry' => $validated['industry'] ?? null,
                'company_size' => $validated['company_size'] ?? null,
                'how_did_you_hear' => $validated['how_did_you_hear'] ?? null,
                'marketing_emails' => $validated['marketing_emails'] ?? true,
                'newsletter_subscription' => $validated['newsletter_subscription'] ?? false,
                'preferred_language' => app()->getLocale(),
            ]);

            // Assign free role if you're using Spatie Permission
            if (method_exists($user, 'assignRole')) {
                $user->assignRole('free');
            }

            DB::commit();

            // Send notification email to admin
            try {
                $this->sendAdminNotification($user);
                Log::info('New free user notification sent', ['user_id' => $user->id]);
            } catch (Exception $e) {
                Log::error('Failed to send new user notification', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage()
                ]);
            }

            // Log them in automatically
            auth()->login($user);

            return redirect()->route('assessment-tools')->with('success',
                'Registration successful! You can now access our free assessment tools.'
            );

        } catch (Exception $e) {
            DB::rollBack();

            Log::error('Free user registration failed', [
                'error' => $e->getMessage(),
                'data' => $validated
            ]);

            throw ValidationException::withMessages([
                'email' => 'Registration failed. Please try again.'
            ]);
        }
    }

    /**
     * Send admin notification about new user
     */
    private function sendAdminNotification(User $user)
    {
        // Simple email notification without custom notification class
        $adminEmail = 'subscribe@afaqcm.com';

        $subject = 'New Free User Registration - ' . config('app.name');
        $message = $this->buildNotificationMessage($user);

        // Using Laravel's basic mail functionality
        \Mail::raw($message, function ($mail) use ($adminEmail, $subject) {
            $mail->to($adminEmail)
                ->subject($subject);
        });
    }

    /**
     * Build notification message
     */
    private function buildNotificationMessage(User $user): string
    {
        $details = $user->details;

        return "New free user registered:\n\n" .
            "Name: {$user->name}\n" .
            "Email: {$user->email}\n" .
            "Phone: {$details->phone}\n" .
            "Company: {$details->company_name}\n" .
            "Company Type: {$details->company_type}\n" .
            "Position: {$details->position}\n" .
            "City: {$details->city}\n" .
            "Website: {$details->website}\n" .
            "Industry: {$details->industry}\n" .
            "Company Size: {$details->company_size}\n" .
            "How did you hear: {$details->how_did_you_hear}\n" .
            "Marketing Emails: " . ($details->marketing_emails ? 'Yes' : 'No') . "\n" .
            "Newsletter: " . ($details->newsletter_subscription ? 'Yes' : 'No') . "\n" .
            "Registered At: {$user->created_at}\n";
    }

    /**
     * Show subscription upgrade page
     */
    public function showSubscription()
    {
        return Inertia::render('subscription/upgrade', [
            'user' => auth()->user(),
            'currentPlan' => 'free'
        ]);
    }

    /**
     * Handle subscription request
     */
    public function requestSubscription(Request $request)
    {
        $validated = $request->validate([
            'plan' => 'required|string|in:premium,professional,enterprise',
            'message' => 'nullable|string|max:1000'
        ]);

        $user = auth()->user();

        try {
            $this->sendSubscriptionRequest($user, $validated);
            $this->sendWhatsAppMessage($user, $validated);

            return back()->with('success',
                'Your subscription request has been sent! We will contact you shortly.'
            );

        } catch (Exception $e) {
            Log::error('Subscription request failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors([
                'subscription' => 'Failed to send subscription request. Please try again.'
            ]);
        }
    }

    /**
     * Send subscription request email
     */
    private function sendSubscriptionRequest(User $user, array $data)
    {
        $adminEmail = 'subscribe@afaqcm.com';
        $subject = 'Subscription Request - ' . $user->name;
        $details = $user->details;

        $message = "Subscription request received:\n\n" .
            "User: {$user->name} ({$user->email})\n" .
            "Company: {$details->company_name}\n" .
            "Phone: {$details->phone}\n" .
            "Position: {$details->position}\n" .
            "Industry: {$details->industry}\n" .
            "Company Size: {$details->company_size}\n" .
            "Requested Plan: {$data['plan']}\n" .
            "Current Plan: free\n";

        if (!empty($data['message'])) {
            $message .= "Message: {$data['message']}\n";
        }

        $message .= "Request Date: " . now()->format('Y-m-d H:i:s') . "\n";

        \Mail::raw($message, function ($mail) use ($adminEmail, $subject) {
            $mail->to($adminEmail)
                ->subject($subject);
        });
    }

    /**
     * Send WhatsApp message (placeholder for WhatsApp API integration)
     */
    private function sendWhatsAppMessage($user, $data)
    {
        try {
            $details = $user->details;

            $message = "🔔 New subscription request\n\n";
            $message .= "👤 Name: {$user->name}\n";
            $message .= "📧 Email: {$user->email}\n";
            $message .= "🏢 Company: {$details->company_name}\n";
            $message .= "📱 Phone: {$details->phone}\n";
            $message .= "💼 Plan: " . ucfirst($data['plan']) . "\n";

            if (!empty($data['message'])) {
                $message .= "💬 Message: {$data['message']}\n";
            }

            $message .= "📅 Date: " . now()->format('Y-m-d H:i:s');

            // Log the message for now (replace with actual WhatsApp API)
            Log::info('WhatsApp message would be sent', [
                'recipient' => config('app.whatsapp_admin_number', '+966583710301'),
                'message' => $message
            ]);

            // Example integration with WhatsApp API (uncomment and configure)
            /*
            $whatsappService = new WhatsAppService();
            $whatsappService->sendMessage([
                'to' => config('app.whatsapp_admin_number'),
                'message' => $message
            ]);
            */

        } catch (Exception $e) {
            Log::error('WhatsApp message failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Show registration form
     */
    public function showRegistrationForm()
    {
        return Inertia::render('auth/free-register');
    }
}
