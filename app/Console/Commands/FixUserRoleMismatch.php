<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class FixUserRoleMismatch extends Command
{
    protected $signature = 'fix:user-roles {email}';
    protected $description = 'Fix user role and subscription mismatches';

    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("User not found: {$email}");
            return Command::FAILURE;
        }

        $this->info("Fixing user role mismatch for: {$user->email}");

        // Load relationships
        $user->load(['subscription', 'roles']);

        $subscription = $user->subscription;
        $currentRoles = $user->roles->pluck('name')->toArray();

        $this->info("Current subscription: {$subscription->plan_type}");
        $this->info("Current roles: " . implode(', ', $currentRoles));

        // Fix role based on subscription
        if ($subscription && $subscription->plan_type === 'premium') {
            // User has premium subscription, should have premium role
            $this->info("User has premium subscription, updating role...");

            // Remove old roles
            $user->syncRoles([]);

            // Assign premium role
            $user->assignRole('premium');

            // Update user_type field to match
            $user->update(['user_type' => 'premium']);

            $this->info("✓ Updated user to premium role");

        } elseif ($subscription && $subscription->plan_type === 'free') {
            // User has free subscription, should have free role
            $this->info("User has free subscription, updating role...");

            // Remove old roles
            $user->syncRoles([]);

            // Assign free role
            $user->assignRole('free');

            // Update user_type field to match
            $user->update(['user_type' => 'free']);

            $this->info("✓ Updated user to free role");
        }

        // Verify the fix
        $user->refresh();
        $user->load(['subscription', 'roles']);

        $this->info("\n=== AFTER FIX ===");
        $this->info("Subscription: {$user->subscription->plan_type}");
        $this->info("Roles: " . $user->roles->pluck('name')->implode(', '));
        $this->info("User Type: {$user->user_type}");
        $this->info("isPremium(): " . ($user->isPremium() ? 'true' : 'false'));
        $this->info("isAdmin(): " . ($user->isAdmin() ? 'true' : 'false'));
        $this->info("isFree(): " . ($user->isFree() ? 'true' : 'false'));

        return Command::SUCCESS;
    }
}
