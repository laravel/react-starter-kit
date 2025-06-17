<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Paddle\Billable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasRoles;
    use Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
    ];
    public function canAccessPanel(Panel $panel): bool
    {
        // Only allow actual admins to access Filament
        return $this->hasRole(['admin', 'super_admin']);
    }
    public function paddleName(): string
    {
        return $this->name;
    }

    /**
     * Get the customer email that should be synced to Paddle.
     */
    public function paddleEmail(): string
    {
        return $this->email;
    }

    /**
     * Determine if the entity has a given ability.
     */




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
        // Your existing logic
        $subscription = $this->subscription;
        return $subscription && $subscription->isPremium() && $subscription->isActive();
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        // Check if user has admin roles or if they have the admin user_type
        return $this->hasRole(['super_admin', 'admin']) || $this->user_type === 'admin';
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
     * Get subscription status with safer fallbacks
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
     * Get user's assessment limit with safer fallbacks
     */
    public function getAssessmentLimit(): ?int
    {
        if ($this->isPremium() || $this->isAdmin()) {
            return null; // Unlimited
        }

        $subscription = $this->subscription;
        if ($subscription && method_exists($subscription, 'getFeature')) {
            return $subscription->getFeature('assessments_limit', 1);
        }

        return 1; // Free users get 1 assessment
    }

    /**
     * Check if user can create more assessments
     */
    public function canCreateAssessment(): bool
    {
        if ($this->isAdmin()) {
            return true; // Admins always can create
        }

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
        if ($subscription && method_exists($subscription, 'getFeature')) {
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
     * Get user's full profile data with safe fallbacks
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
            'user_type' => $this->user_type ?? 'free',
            'details' => $details ? $details->toArray() : null,
            'subscription' => [
                'plan_type' => $subscription?->plan_type ?? 'free',
                'status' => $subscription?->status ?? 'active',
                'expires_at' => $subscription?->expires_at,
                'features' => $subscription && method_exists($subscription, 'getFeatures')
                    ? $subscription->getFeatures()
                    : $this->getDefaultFeatures(),
                'is_active' => $subscription?->isActive() ?? true,
            ],
            'roles' => method_exists($this, 'roles') ? $this->roles->pluck('name')->toArray() : [],
            'permissions' => [
                'can_access_dashboard' => $this->canAccessDashboard(),
                'can_access_advanced_features' => $this->canAccessAdvancedFeatures(),
                'assessment_limit' => $this->getAssessmentLimit(),
                'pdf_report_level' => $this->getPdfReportLevel(),
            ]
        ];
    }

    /**
     * Get default features for free users
     */
    private function getDefaultFeatures(): array
    {
        return [
            'assessments_limit' => 1,
            'pdf_reports' => 'basic',
            'advanced_analytics' => false,
            'team_management' => false,
            'api_access' => false,
            'priority_support' => false,
            'custom_branding' => false,
        ];
    }

    /**
     * Create default subscription and details for user
     */
    public function createDefaultSubscriptionAndDetails(): void
    {
        // Create subscription if it doesn't exist
        if (!$this->subscription) {
            $this->subscriptions()->create([
                'plan_type' => 'free',
                'status' => 'active',
                'started_at' => now(),
                'features' => $this->getDefaultFeatures()
            ]);
        }

        // Create details if they don't exist
        if (!$this->details) {
            $this->details()->create([
                'preferred_language' => 'en',
                'marketing_emails' => true,
                'newsletter_subscription' => false,
            ]);
        }
    }


    public function toolSubscriptions()
    {
        return $this->hasMany(ToolSubscription::class);
    }

    public function hasAccessToTool(int $toolId): bool
    {
        // Check if user is admin
        if ($this->isAdmin()) {
            return true;
        }

        // Check if user has active subscription to this tool
        $subscription = $this->toolSubscriptions()
            ->where('tool_id', $toolId)
            ->where('status', 'active')
            ->first();

        if ($subscription) {
            return true;
        }

        // Check if user has global premium subscription
        return $this->isPremium();
    }


    public function getToolSubscription(int $toolId): ?ToolSubscription
    {
        return $this->toolSubscriptions()
            ->where('tool_id', $toolId)
            ->where('status', 'active')
            ->first();
    }

    public function subscribeToTool(int $toolId, string $planType = 'premium'): ToolSubscription
    {
        return $this->toolSubscriptions()->updateOrCreate(
            ['tool_id' => $toolId],
            [
                'plan_type' => $planType,
                'status' => 'active',
                'started_at' => now(),
                'expires_at' => $planType === 'premium' ? now()->addYear() : null,
                'features' => [
                    'assessments_limit' => $planType === 'premium' ? null : 1,
                    'pdf_reports' => $planType === 'premium' ? 'detailed' : 'basic',
                    'advanced_analytics' => $planType === 'premium',
                ]
            ]
        );
    }
}
