<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class DebugUserAccess extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'debug:user-access {email}';

    /**
     * The console command description.
     */
    protected $description = 'Debug user access and subscription status';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("User with email {$email} not found.");
            return Command::FAILURE;
        }

        $this->info("=== USER DEBUG INFO ===");
        $this->info("ID: {$user->id}");
        $this->info("Name: {$user->name}");
        $this->info("Email: {$user->email}");
        $this->info("User Type: " . ($user->user_type ?? 'not set'));

        // Check subscription
        $subscription = $user->subscription;
        $this->info("\n=== SUBSCRIPTION INFO ===");
        if ($subscription) {
            $this->info("Plan Type: {$subscription->plan_type}");
            $this->info("Status: {$subscription->status}");
            $this->info("Started: " . ($subscription->started_at ?? 'not set'));
            $this->info("Expires: " . ($subscription->expires_at ?? 'never'));
        } else {
            $this->warn("No subscription found!");
        }

        // Check roles
        $this->info("\n=== ROLES INFO ===");
        if (method_exists($user, 'roles')) {
            $roles = $user->roles->pluck('name')->toArray();
            if (empty($roles)) {
                $this->warn("No roles assigned!");
            } else {
                $this->info("Roles: " . implode(', ', $roles));
            }
        } else {
            $this->warn("Spatie Permission not installed or configured!");
        }

        // Check user methods
        $this->info("\n=== USER METHODS ===");
        try {
            $this->info("isPremium(): " . ($user->isPremium() ? 'true' : 'false'));
        } catch (\Exception $e) {
            $this->error("isPremium() failed: " . $e->getMessage());
        }

        try {
            $this->info("isAdmin(): " . ($user->isAdmin() ? 'true' : 'false'));
        } catch (\Exception $e) {
            $this->error("isAdmin() failed: " . $e->getMessage());
        }

        try {
            $this->info("isFree(): " . ($user->isFree() ? 'true' : 'false'));
        } catch (\Exception $e) {
            $this->error("isFree() failed: " . $e->getMessage());
        }

        try {
            $this->info("getSubscriptionStatus(): " . $user->getSubscriptionStatus());
        } catch (\Exception $e) {
            $this->error("getSubscriptionStatus() failed: " . $e->getMessage());
        }

        // Recommendations
        $this->info("\n=== RECOMMENDATIONS ===");
        if (!$subscription) {
            $this->info("Run: php artisan users:fix-subscriptions");
        }

        if (method_exists($user, 'roles') && $user->roles->isEmpty()) {
            $this->info("Run: php artisan db:seed --class=RolesAndPermissionsSeeder");
            $this->info("Then assign role: \$user->assignRole('free');");
        }

        return Command::SUCCESS;
    }
}
