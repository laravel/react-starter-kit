<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get user's details
     */
    public function details(): HasOne
    {
        return $this->hasOne(UserDetails::class);
    }

    /**
     * Get user's current subscription
     */
    public function subscription(): HasOne
    {
        return $this->hasOne(UserSubscription::class)->latest();
    }

    /**
     * Get all user's subscriptions
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserSubscription::class)->orderBy('created_at', 'desc');
    }

    /**
     * Get user's assessments
     */
    public function assessments(): HasMany
    {
        return $this->hasMany(Assessment::class);
    }

    /**
     * Check if user is free tier
     */
    public function isFree(): bool
    {
        $subscription = $this->subscription;
        return !$subscription || $subscription->isFree() || !$subscription->isActive();
    }

    /**
     * Check if user is premium
     */
    public function isPremium(): bool
    {
        $subscription = $this->subscription;
        return $subscription && $subscription->isPremium() && $subscription->isActive();
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->hasRole(['super_admin', 'admin']);
    }

    /**
     * Check if subscription is active
     */
    public function hasActiveSubscription(): bool
    {
        $subscription = $this->subscription;
        return $subscription && $subscription->isActive();
    }

    /**
     * Get subscription status
     */
    public function getSubscriptionStatus(): string
    {
        if ($this->isAdmin()) {
            return 'admin';
        }

        $subscription = $this->subscription;

        if (!$subscription) {
            return 'free';
        }

        if ($subscription->isPremium() && $subscription->isActive()) {
            return 'premium';
        }

        if ($subscription->isPremium() && $subscription->isExpired()) {
            return 'expired';
        }

        return 'free';
    }

    /**
     * Can access dashboard
     */
    public function canAccessDashboard(): bool
    {
        return $this->isPremium() || $this->isAdmin();
    }

    /**
     * Can access advanced features
     */
    public function canAccessAdvancedFeatures(): bool
    {
        return $this->isPremium() || $this->isAdmin();
    }

    /**
     * Get user's assessment limit
     */
    public function getAssessmentLimit(): ?int
    {
        if ($this->isPremium() || $this->isAdmin()) {
            return null; // Unlimited
        }

        $subscription = $this->subscription;
        if ($subscription) {
            return $subscription->getFeature('assessments_limit', 1);
        }

        return 1; // Free users get 1 assessment
    }

    /**
     * Check if user can create more assessments
     */
    public function canCreateAssessment(): bool
    {
        $limit = $this->getAssessmentLimit();

        if ($limit === null) {
            return true; // Unlimited
        }

        return $this->assessments()->count() < $limit;
    }

    /**
     * Get user's PDF report access level
     */
    public function getPdfReportLevel(): string
    {
        if ($this->isPremium() || $this->isAdmin()) {
            return 'full'; // Full detailed report
        }

        $subscription = $this->subscription;
        if ($subscription) {
            return $subscription->getFeature('pdf_reports', 'basic');
        }

        return 'basic'; // Domain-level only
    }

    /**
     * Get user's company name from details
     */
    public function getCompanyName(): ?string
    {
        return $this->details?->company_name;
    }

    /**
     * Get user's phone from details
     */
    public function getPhone(): ?string
    {
        return $this->details?->phone;
    }

    /**
     * Get user's full profile data
     */
    public function getFullProfileData(): array
    {
        $details = $this->details;
        $subscription = $this->subscription;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'details' => $details ? $details->toArray() : null,
            'subscription' => [
                'plan_type' => $subscription?->plan_type ?? 'free',
                'status' => $subscription?->status ?? 'active',
                'expires_at' => $subscription?->expires_at,
                'features' => $subscription?->getFeatures() ?? [],
                'is_active' => $subscription?->isActive() ?? false,
            ],
            'roles' => $this->roles->pluck('name')->toArray(),
            'permissions' => [
                'can_access_dashboard' => $this->canAccessDashboard(),
                'can_access_advanced_features' => $this->canAccessAdvancedFeatures(),
                'assessment_limit' => $this->getAssessmentLimit(),
                'pdf_report_level' => $this->getPdfReportLevel(),
            ]
        ];
    }
}
