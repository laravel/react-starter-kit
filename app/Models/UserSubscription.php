<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class UserSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_type',
        'status',
        'started_at',
        'expires_at',
        'amount',
        'currency',
        'payment_method',
        'payment_reference',
        'features',
        'notes',
        'cancelled_at',
        'cancelled_reason',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'expires_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'amount' => 'decimal:2',
        'features' => 'array',
    ];

    /**
     * Get the user that owns the subscription
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if subscription is active
     */
    public function isActive(): bool
    {
        return $this->status === 'active' &&
            ($this->expires_at === null || $this->expires_at->gt(now()));
    }

    /**
     * Check if subscription is expired
     */
    public function isExpired(): bool
    {
        return $this->status === 'expired' ||
            ($this->expires_at && $this->expires_at->lt(now()));
    }

    /**
     * Check if subscription is cancelled
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    /**
     * Check if subscription is pending
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if subscription is free plan
     */
    public function isFree(): bool
    {
        return $this->plan_type === 'free';
    }

    /**
     * Check if subscription is premium plan
     */
    public function isPremium(): bool
    {
        return $this->plan_type === 'premium';
    }

    /**
     * Get days until expiration
     */
    public function getDaysUntilExpiration(): ?int
    {
        if (!$this->expires_at) {
            return null; // Never expires
        }

        return max(0, now()->diffInDays($this->expires_at, false));
    }

    /**
     * Check if subscription expires soon (within 7 days)
     */
    public function expiresSoon(): bool
    {
        $days = $this->getDaysUntilExpiration();
        return $days !== null && $days <= 7 && $days > 0;
    }

    /**
     * Get subscription features
     */
    public function getFeatures(): array
    {
        return $this->features ?? $this->getDefaultFeatures();
    }

    /**
     * Get default features based on plan type
     */
    public function getDefaultFeatures(): array
    {
        return match ($this->plan_type) {
            'free' => [
                'assessments_limit' => 1,
                'pdf_reports' => 'basic',
                'advanced_analytics' => false,
                'team_management' => false,
                'api_access' => false,
                'priority_support' => false,
                'custom_branding' => false,
            ],
            'premium' => [
                'assessments_limit' => null, // unlimited
                'pdf_reports' => 'full',
                'advanced_analytics' => true,
                'team_management' => true,
                'api_access' => true,
                'priority_support' => true,
                'custom_branding' => true,
            ],
            default => []
        };
    }

    /**
     * Check if feature is available
     */
    public function hasFeature(string $feature): bool
    {
        $features = $this->getFeatures();
        return isset($features[$feature]) && $features[$feature] !== false;
    }

    /**
     * Get feature value
     */
    public function getFeature(string $feature, mixed $default = null): mixed
    {
        $features = $this->getFeatures();
        return $features[$feature] ?? $default;
    }

    /**
     * Cancel subscription
     */
    public function cancel(string $reason = null): void
    {
        $this->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancelled_reason' => $reason,
        ]);
    }

    /**
     * Activate subscription
     */
    public function activate(): void
    {
        $this->update([
            'status' => 'active',
            'started_at' => $this->started_at ?? now(),
        ]);
    }

    /**
     * Expire subscription
     */
    public function expire(): void
    {
        $this->update([
            'status' => 'expired',
        ]);
    }

    /**
     * Extend subscription
     */
    public function extend(Carbon $newExpirationDate): void
    {
        $this->update([
            'expires_at' => $newExpirationDate,
            'status' => 'active',
        ]);
    }

    /**
     * Get formatted amount
     */
    public function getFormattedAmount(): string
    {
        if (!$this->amount) {
            return 'Free';
        }

        return number_format($this->amount, 2) . ' ' . strtoupper($this->currency);
    }

    /**
     * Scope for active subscriptions
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            });
    }

    /**
     * Scope for expired subscriptions
     */
    public function scopeExpired($query)
    {
        return $query->where('status', 'expired')
            ->orWhere(function ($q) {
                $q->where('expires_at', '<=', now())
                    ->whereNotNull('expires_at');
            });
    }

    /**
     * Scope for premium subscriptions
     */
    public function scopePremium($query)
    {
        return $query->where('plan_type', 'premium');
    }

    /**
     * Scope for free subscriptions
     */
    public function scopeFree($query)
    {
        return $query->where('plan_type', 'free');
    }
}
