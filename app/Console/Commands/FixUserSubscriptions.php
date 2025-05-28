<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\UserSubscription;
use App\Models\UserDetails;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixUserSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:fix-subscriptions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix existing users by creating missing subscriptions and details';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to fix user subscriptions and details...');

        $users = User::all();
        $fixedCount = 0;
        $detailsFixedCount = 0;

        foreach ($users as $user) {
            DB::beginTransaction();

            try {
                // Fix missing subscription
                if (!$user->subscription) {
                    UserSubscription::create([
                        'user_id' => $user->id,
                        'plan_type' => 'free',
                        'status' => 'active',
                        'started_at' => $user->created_at ?? now(),
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
                    $fixedCount++;
                    $this->info("Created subscription for user: {$user->name} ({$user->email})");
                }

                // Fix missing user details
                if (!$user->details) {
                    UserDetails::create([
                        'user_id' => $user->id,
                        'preferred_language' => 'en',
                        'marketing_emails' => true,
                        'newsletter_subscription' => false,
                    ]);
                    $detailsFixedCount++;
                    $this->info("Created details for user: {$user->name} ({$user->email})");
                }

                // Assign free role if using Spatie Permission and user doesn't have any roles
                if (method_exists($user, 'assignRole') && $user->roles->isEmpty()) {
                    try {
                        $user->assignRole('free');
                        $this->info("Assigned 'free' role to user: {$user->name}");
                    } catch (\Exception $e) {
                        $this->warn("Could not assign role to user {$user->name}: {$e->getMessage()}");
                    }
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                $this->error("Failed to fix user {$user->name}: {$e->getMessage()}");
            }
        }

        $this->info("Completed! Fixed {$fixedCount} subscriptions and {$detailsFixedCount} user details.");

        return Command::SUCCESS;
    }
}
