<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ToolSubscription extends Model
{
    protected $fillable = [
        'user_id',
        'tool_id',
        'plan_type',
        'status',
        'started_at',
        'expires_at',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
        'started_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tool(): BelongsTo
    {
        return $this->belongsTo(Tool::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
            ->where(function($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            });
    }

    public function scopeFree($query)
    {
        return $query->where('plan_type', 'free');
    }

    public function scopePremium($query)
    {
        return $query->where('plan_type', 'premium');
    }

    // Methods
    public function isActive(): bool
    {
        return $this->status === 'active' &&
            ($this->expires_at === null || $this->expires_at->isFuture());
    }

    public function isFree(): bool
    {
        return $this->plan_type === 'free';
    }

    public function isPremium(): bool
    {
        return $this->plan_type === 'premium';
    }

    public function getFeature(string $feature, $default = null)
    {
        return $this->features[$feature] ?? $default;
    }

    public function hasFeature(string $feature): bool
    {
        return isset($this->features[$feature]) && $this->features[$feature] === true;
    }

    public function getRemainingAssessments(): ?int
    {
        $limit = $this->getFeature('assessments_limit');

        if ($limit === null) {
            return null; // Unlimited
        }

        $used = $this->user->assessments()
            ->where('tool_id', $this->tool_id)
            ->count();

        return max(0, $limit - $used);
    }

    public function canCreateAssessment(): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        $remaining = $this->getRemainingAssessments();
        return $remaining === null || $remaining > 0;
    }
}
