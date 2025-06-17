<?php
// app/Models/ToolSubscription.php

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
        'paddle_subscription_id', // Add this
        'paddle_customer_id',     // Add this
        'amount',
        'currency',
    ];

    protected $casts = [
        'features' => 'array',
        'started_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tool(): BelongsTo
    {
        return $this->belongsTo(Tool::class);
    }

    /**
     * Check if subscription is active
     */
    public function isActive(): bool
    {
        return $this->status === 'active' &&
            ($this->expires_at === null || $this->expires_at->isFuture());
    }

    /**
     * Check if subscription is premium
     */
    public function isPremium(): bool
    {
        return $this->plan_type === 'premium';
    }

    /**
     * Get feature value
     */
    public function getFeature(string $key, $default = null)
    {
        return data_get($this->features, $key, $default);
    }
}
