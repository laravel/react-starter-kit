<?php

namespace App\Services;

use App\Models\User;

class PassLimitService
{
    /**
     * Get the current subscription plan for a user.
     *
     * @param User $user
     * @return string Plan key (free, pro_apple, pro_google, unlimited)
     */
    public function getCurrentPlan(User $user): string
    {
        $plans = config('passkit.plans');

        // Check each paid plan
        foreach ($plans as $planKey => $planConfig) {
            if ($planKey === 'free') {
                continue;
            }

            $priceId = $planConfig['stripe_price_id'] ?? null;
            if ($priceId && $user->subscribedToPrice($priceId)) {
                return $planKey;
            }
        }

        // Default to free plan
        return 'free';
    }

    /**
     * Check if a user can create a pass for the given platform.
     *
     * @param User $user
     * @param string $platform
     * @return bool
     */
    public function canCreatePass(User $user, string $platform): bool
    {
        $planConfig = $this->getPlanConfig($user);

        // Check if platform is allowed
        if (!in_array($platform, $planConfig['platforms'])) {
            return false;
        }

        // Check pass limit
        $passLimit = $planConfig['pass_limit'];

        // Null means unlimited
        if ($passLimit === null) {
            return true;
        }

        // Check current count
        $currentCount = $user->passes()->count();

        return $currentCount < $passLimit;
    }

    /**
     * Get the number of remaining passes a user can create.
     *
     * @param User $user
     * @return int|null Null means unlimited
     */
    public function getRemainingPasses(User $user): ?int
    {
        $planConfig = $this->getPlanConfig($user);
        $passLimit = $planConfig['pass_limit'];

        // Null means unlimited
        if ($passLimit === null) {
            return null;
        }

        $currentCount = $user->passes()->count();

        return max(0, $passLimit - $currentCount);
    }

    /**
     * Get the plan configuration for a user's current plan.
     *
     * @param User $user
     * @return array
     */
    public function getPlanConfig(User $user): array
    {
        $planKey = $this->getCurrentPlan($user);
        $plans = config('passkit.plans');

        return $plans[$planKey] ?? $plans['free'];
    }

    /**
     * Get all available plans.
     *
     * @return array
     */
    public function getAllPlans(): array
    {
        return config('passkit.plans');
    }

    /**
     * Check if a platform is allowed for a user's current plan.
     *
     * @param User $user
     * @param string $platform
     * @return bool
     */
    public function isPlatformAllowed(User $user, string $platform): bool
    {
        $planConfig = $this->getPlanConfig($user);
        return in_array($platform, $planConfig['platforms']);
    }
}
