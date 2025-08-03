<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone',
        'company',
        'company_type',
        'company_name',
        'company_name_ar',
        'company_name_en',
        'region',
        'city',
        'employee_name_ar',
        'employee_name_en',
        'employee_type',
        'position',
        'website',
        'address',
        'country',
        'industry',
        'notes',
        'company_size',
        'established_year',
        'annual_revenue',
        'linkedin_profile',
        'twitter_profile',
        'facebook_profile',
        'preferred_language',
        'timezone',
        'communication_preferences',
        'interests',
        'how_did_you_hear',
        'marketing_emails',
        'newsletter_subscription',
        'profile_completed',
    ];

    protected $casts = [
        'communication_preferences' => 'array',
        'interests' => 'array',
        'company_type' => 'integer',
        'employee_type' => 'integer',
        'marketing_emails' => 'boolean',
        'newsletter_subscription' => 'boolean',
        'annual_revenue' => 'decimal:2',
        'established_year' => 'integer',
        'company_size' => 'integer',
        'profile_completed' => 'boolean',
    ];

    /**
     * Get the user that owns the details
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get formatted company size
     */
    public function getFormattedCompanySize(): string
    {
        if (!$this->company_size) return 'Not specified';

        return match (true) {
            $this->company_size <= 10 => '1-10 employees',
            $this->company_size <= 50 => '11-50 employees',
            $this->company_size <= 200 => '51-200 employees',
            $this->company_size <= 500 => '201-500 employees',
            $this->company_size <= 1000 => '501-1000 employees',
            default => '1000+ employees'
        };
    }

    /**
     * Get formatted annual revenue
     */
    public function getFormattedAnnualRevenue(): string
    {
        if (!$this->annual_revenue) return 'Not specified';

        if ($this->annual_revenue >= 1000000) {
            return number_format($this->annual_revenue / 1000000, 1) . 'M';
        } elseif ($this->annual_revenue >= 1000) {
            return number_format($this->annual_revenue / 1000, 1) . 'K';
        }

        return number_format($this->annual_revenue, 0);
    }

    /**
     * Check if user allows marketing emails
     */
    public function allowsMarketingEmails(): bool
    {
        return $this->marketing_emails ?? false;
    }

    /**
     * Check if user is subscribed to newsletter
     */
    public function isNewsletterSubscribed(): bool
    {
        return $this->newsletter_subscription ?? false;
    }

    /**
     * Get communication preferences
     */
    public function getCommunicationPreferences(): array
    {
        return $this->communication_preferences ?? [
            'email' => true,
            'sms' => false,
            'whatsapp' => false,
            'phone' => false
        ];
    }

    /**
     * Get user interests
     */
    public function getInterests(): array
    {
        return $this->interests ?? [];
    }

    /**
     * Add interest
     */
    public function addInterest(string $interest): void
    {
        $interests = $this->getInterests();
        if (!in_array($interest, $interests)) {
            $interests[] = $interest;
            $this->update(['interests' => $interests]);
        }
    }

    /**
     * Remove interest
     */
    public function removeInterest(string $interest): void
    {
        $interests = $this->getInterests();
        $interests = array_filter($interests, fn($i) => $i !== $interest);
        $this->update(['interests' => array_values($interests)]);
    }

    /**
     * Update communication preference
     */
    public function updateCommunicationPreference(string $type, bool $enabled): void
    {
        $preferences = $this->getCommunicationPreferences();
        $preferences[$type] = $enabled;
        $this->update(['communication_preferences' => $preferences]);
    }
}
