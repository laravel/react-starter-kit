<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Exception;

class UserRegistrationController extends Controller
{
    /**
     * Register a new free user
     */
    public function registerFreeUser(Request $request)
    {
        // Log the registration attempt
        Log::info('Free user registration attempt', [
            'data' => $request->except(['password', 'password_confirmation']),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);

        try {
            // Validate the request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'company_name' => 'required|string|max:255',
                'marketing_emails' => 'nullable|boolean',
                'newsletter_subscription' => 'nullable|boolean',
            ], [
                'name.required' => 'Full name is required.',
                'email.required' => 'Email address is required.',
                'email.email' => 'Please enter a valid email address.',
                'email.unique' => 'This email address is already registered. Please use a different email or try signing in.',
                'password.required' => 'Password is required.',
                'password.min' => 'Password must be at least 8 characters long.',
                  'password.confirmed' => 'Password confirmation does not match.',
                  'company_name.required' => 'Company name is required.',
                'password.confirmed' => 'Password confirmation does not match.',
                'company_name.required' => 'Company name is required.',
            ]);

            Log::info('Validation passed for user registration', ['email' => $validated['email']]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed for user registration', [
                'errors' => $e->errors(),
                'email' => $request->email ?? 'not provided'
            ]);
            throw $e;
        }

        try {
            DB::beginTransaction();

            // Create the user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'email_verified_at' => now(), // Auto-verify for free users
            ]);

            Log::info('User created successfully', ['user_id' => $user->id, 'email' => $user->email]);

            // Try to create user details (if the relationship exists)
            try {
                if (method_exists($user, 'details')) {
                    $user->details()->create([
                        'company' => $validated['company_name'],
                        'company_name' => $validated['company_name'],
                        'preferred_language' => app()->getLocale(),
                        'marketing_emails' => (bool) ($validated['marketing_emails'] ?? false),
                        'newsletter_subscription' => (bool) ($validated['newsletter_subscription'] ?? false),
                        'marketing_emails' => true,
                        'newsletter_subscription' => false,
                        'profile_completed' => false,
                    ]);
                    Log::info('User details created', ['user_id' => $user->id]);
                }
            } catch (Exception $e) {
                Log::warning('Failed to create user details, but continuing', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage()
                ]);
                // Don't fail registration if details creation fails
            }

            // Try to create free subscription (if the relationship exists)
            try {
                if (method_exists($user, 'subscriptions')) {
                    $user->subscriptions()->create([
                        'plan_type' => 'free',
                        'status' => 'active',
                        'started_at' => now(),
                        'features' => [
                            'assessments_limit' => 1,
                            'pdf_reports' => 'basic',
                            'advanced_analytics' => false,
                            'team_management' => false,
                            'api_access' => false,
                            'priority_support' => false,
                            'custom_branding' => false,
                        ]
                    ]);
                    Log::info('User subscription created', ['user_id' => $user->id]);
                }
            } catch (Exception $e) {
                Log::warning('Failed to create user subscription, but continuing', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage()
                ]);
            }

            // Try to assign free role (if using Spatie Permission)
            try {
                if (method_exists($user, 'assignRole')) {
                    $user->assignRole('free');
                    Log::info('Role assigned to user', ['user_id' => $user->id, 'role' => 'free']);
                }
            } catch (Exception $e) {
                Log::warning('Could not assign role to user', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage()
                ]);
            }

            DB::commit();
            Log::info('User registration transaction committed', ['user_id' => $user->id]);

            // Send admin notification (non-blocking)
            try {
                $this->sendAdminNotification($user);
                Log::info('New free user notification sent', ['user_id' => $user->id]);
            } catch (Exception $e) {
                Log::error('Failed to send new user notification', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage()
                ]);
            }

            // Log them in
            auth()->login($user);
            Log::info('User logged in after registration', ['user_id' => $user->id]);

            // Redirect to tools discovery page
            return redirect()->route('tools.discover')->with('success',
                'Registration successful! Welcome to our platform. Browse available assessment tools below.'
            );

        } catch (Exception $e) {
            DB::rollBack();

            Log::error('Free user registration failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->except(['password', 'password_confirmation'])
            ]);

            // Return specific error message
            if ($e instanceof \Illuminate\Database\QueryException) {
                if (str_contains($e->getMessage(), 'users_email_unique')) {
                    throw ValidationException::withMessages([
                        'email' => 'This email address is already registered. Please use a different email or try signing in.'
                    ]);
                }
            }

            throw ValidationException::withMessages([
                'email' => 'Registration failed due to a system error. Please try again in a few moments.'
            ]);
        }
    }

    /**
     * Complete user profile after initial registration
     */
    public function completeProfile(Request $request)
    {
        $data = $request->validate([
            'company_name_ar' => ['required', 'string', 'max:255'],
            'company_name_en' => ['required', 'string', 'max:255'],
            'company_type' => ['required', 'integer', 'in:1,2,3'],
            'region' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'employee_name_ar' => ['required', 'string', 'max:255'],
            'employee_name_en' => ['required', 'string', 'max:255'],
            'employee_type' => ['required', 'integer', 'in:1,2,3,4,5,6,7'],
            'phone' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'notes' => ['nullable', 'string'],
            'how_did_you_hear' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
        ]);

        $user = $request->user();

        if ($user && $user->details) {
            $user->details->update([
                'company_name_ar' => $data['company_name_ar'],
                'company_name_en' => $data['company_name_en'],
                'company_type' => $data['company_type'],
                'region' => $data['region'],
                'city' => $data['city'],
                'employee_name_ar' => $data['employee_name_ar'],
                'employee_name_en' => $data['employee_name_en'],
                'employee_type' => $data['employee_type'],
                'phone' => $data['phone'],
                'website' => $data['website'] ?? null,
                'notes' => $data['notes'] ?? null,
                'how_did_you_hear' => $data['how_did_you_hear'] ?? null,
                'phone' => $data['phone'],
                'address' => $data['address'],
                'profile_completed' => true,
            ]);
        }

        return redirect()->route('dashboard');
    }

    /**
     * Send admin notification about new user
     */
    private function sendAdminNotification(User $user)
    {
        try {
            $adminEmail = env('ADMIN_EMAIL', 'admin@example.com');
            $subject = 'New Free User Registration - ' . $user->name;

            $message = "New free user registered:\n\n" .
                "Name: {$user->name}\n" .
                "Email: {$user->email}\n" .
                "Registered At: {$user->created_at}\n";

            // Simple mail function - you can replace with Laravel Mail facade if needed
            if (function_exists('mail')) {
                mail($adminEmail, $subject, $message);
            }

        } catch (Exception $e) {
            Log::error('Failed to send admin notification', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Show subscription upgrade page
     */
    public function showSubscription()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Load relationships safely
        try {
            $user->load(['details', 'subscription']);
        } catch (Exception $e) {
            Log::warning('Could not load user relationships', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }

        return Inertia::render('SubscriptionUpgrade', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'details' => $user->details ?? null,
                'subscription' => $user->subscription ?? null,
            ],
            'currentPlan' => $user->subscription?->plan_type ?? 'free'
        ]);
    }
}
