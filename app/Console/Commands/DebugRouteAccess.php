<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;

class DebugRouteAccess extends Command
{
    protected $signature = 'debug:routes {email}';
    protected $description = 'Debug route access and user permissions';

    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("User not found: {$email}");
            return Command::FAILURE;
        }

        $this->info("=== DEBUGGING ROUTE ACCESS FOR {$user->email} ===\n");

        // Check user setup
        $this->checkUserSetup($user);

        // Check routes
        $this->checkRoutes();

        // Test user methods
        $this->testUserMethods($user);

        return Command::SUCCESS;
    }

    private function checkUserSetup($user)
    {
        $this->info("=== USER SETUP ===");
        $this->info("ID: {$user->id}");
        $this->info("Name: {$user->name}");
        $this->info("Email: {$user->email}");
        $this->info("User Type: " . ($user->user_type ?? 'NULL'));
        $this->info("Created: {$user->created_at}");

        // Check subscription
        $subscription = $user->subscription;
        $this->info("\n--- Subscription ---");
        if ($subscription) {
            $this->info("✓ Subscription exists");
            $this->info("  Plan: {$subscription->plan_type}");
            $this->info("  Status: {$subscription->status}");
        } else {
            $this->error("✗ No subscription found!");
            $this->warn("Run: php artisan users:fix-subscriptions");
        }

        // Check details
        $details = $user->details;
        $this->info("\n--- User Details ---");
        if ($details) {
            $this->info("✓ User details exist");
            $this->info("  Company: " . ($details->company_name ?? 'NULL'));
        } else {
            $this->error("✗ No user details found!");
        }

        // Check roles
        $this->info("\n--- Roles ---");
        if (method_exists($user, 'roles')) {
            $roles = $user->roles;
            if ($roles->count() > 0) {
                $this->info("✓ Roles assigned: " . $roles->pluck('name')->implode(', '));
            } else {
                $this->warn("⚠ No roles assigned");
                $this->warn("Run: php artisan db:seed --class=RolesAndPermissionsSeeder");
            }
        } else {
            $this->error("✗ Roles system not available (Spatie Permission not installed?)");
        }
    }

    private function checkRoutes()
    {
        $this->info("\n=== ROUTE ANALYSIS ===");

        $importantRoutes = [
            'home' => '/',
            'home2' => '/home',
            'assessment-tools' => '/assessment-tools',
            'dashboard' => '/dashboard',
            'subscription.show' => '/subscription',
        ];

        foreach ($importantRoutes as $name => $uri) {
            $route = Route::getRoutes()->getByName($name);
            if ($route) {
                $middleware = $route->gatherMiddleware();
                $this->info("✓ {$name} ({$uri})");
                $this->info("  Middleware: " . (empty($middleware) ? 'none' : implode(', ', $middleware)));
            } else {
                $this->error("✗ Route '{$name}' not found!");
            }
        }

        // Check for admin routes
        $this->info("\n--- Admin Routes ---");
        $adminRoutes = collect(Route::getRoutes())->filter(function ($route) {
            $middleware = $route->gatherMiddleware();
            return in_array('checkAccess:admin', $middleware) ||
                in_array('admin', $middleware) ||
                str_contains($route->uri(), 'admin') ||
                str_contains($route->uri(), 'filament');
        });

        if ($adminRoutes->count() > 0) {
            $this->info("Found {$adminRoutes->count()} admin routes:");
            foreach ($adminRoutes->take(5) as $route) {
                $this->info("  - {$route->uri()} [" . implode(',', $route->methods()) . "]");
            }
        }
    }

    private function testUserMethods($user)
    {
        $this->info("\n=== USER METHOD TESTS ===");

        try {
            $user->load(['subscription', 'details', 'roles']);

            $methods = [
                'isPremium' => fn() => $user->isPremium(),
                'isAdmin' => fn() => $user->isAdmin(),
                'isFree' => fn() => $user->isFree(),
                'getSubscriptionStatus' => fn() => $user->getSubscriptionStatus(),
                'canCreateAssessment' => fn() => $user->canCreateAssessment(),
                'getAssessmentLimit' => fn() => $user->getAssessmentLimit(),
            ];

            foreach ($methods as $method => $callable) {
                try {
                    $result = $callable();
                    $this->info("✓ {$method}(): " . json_encode($result));
                } catch (\Exception $e) {
                    $this->error("✗ {$method}(): " . $e->getMessage());
                }
            }

        } catch (\Exception $e) {
            $this->error("Failed to load user relationships: " . $e->getMessage());
        }

        // Test what happens on login redirect
        $this->info("\n--- Login Redirect Test ---");
        try {
            if ($user->isAdmin()) {
                $this->info("→ Should redirect to: dashboard (admin)");
            } elseif ($user->isPremium()) {
                $this->info("→ Should redirect to: dashboard (premium)");
            } else {
                $this->info("→ Should redirect to: assessment-tools (free)");
            }
        } catch (\Exception $e) {
            $this->error("→ Redirect test failed: " . $e->getMessage());
            $this->warn("→ Fallback: assessment-tools");
        }
    }
}
