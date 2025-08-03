<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

class Tool extends Model
{
    use HasFactory;

    protected $table = 'tools';
    protected $fillable = [
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'image',
        'status',
        'has_free_plan',
    ];

    public function domains(): HasMany
    {
        return $this->hasMany(Domain::class)->orderBy('order');
    }

    public function hasFreeAccess(): bool
    {
        return $this->has_free_plan ?? false;
    }

    /**
     * Get total criteria count for this tool
     */
    public function getAllCriteriaCount(): int
    {
        return $this->domains()
            ->withCount(['categories' => function($query) {
                $query->withCount('criteria');
            }])
            ->get()
            ->sum(function($domain) {
                return $domain->categories->sum('criteria_count');
            });
    }

    /**
     * Get estimated completion time
     */
    public function getEstimatedTime(): int
    {
        $criteriaCount = $this->getAllCriteriaCount();
        return max(10, ceil($criteriaCount * 0.5)); // Minimum 10 minutes, 0.5 minutes per criterion
    }

    /**
     * Get tools available for free assessment
     */
    public static function getAvailableForFreeAssessment()
    {
        return static::where('status', 'active')
            ->where('has_free_plan', true)
            ->orderBy('name_en')
            ->get();
    }
    public function assessments(): HasMany
    {
        return $this->hasMany(Assessment::class);
    }

    public function getName(string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();
        $field = "name_{$locale}";

        return $this->{$field};
    }

    public function getDescription(string $locale = null): ?string
    {
        $locale = $locale ?: app()->getLocale();
        $field = "description_{$locale}";

        return $this->{$field};
    }

    /**
     * Accessor for localized name attribute.
     */
    public function getNameAttribute(): string
    {
        return $this->getName();
    }

    /**
     * Accessor for localized description attribute.
     */
    public function getDescriptionAttribute(): ?string
    {
        return $this->getDescription();
    }

    /**
     * FIXED: Get criteria count using proper relationship counting
     */
    public function getCriteriaCount(): int
    {
        // Option 1: Use relationship counting (more efficient)
        return $this->domains()
            ->withCount(['categories' => function ($query) {
                $query->withCount('criteria');
            }])
            ->get()
            ->sum(function ($domain) {
                return $domain->categories->sum('criteria_count');
            });
    }

    /**
     * Alternative method using raw DB query if relationships become complex
     */
    public function getCriteriaCountRaw(): int
    {
        return DB::table('criteria')
            ->join('categories', 'criteria.category_id', '=', 'categories.id')
            ->join('domains', 'categories.domain_id', '=', 'domains.id')
            ->where('domains.tool_id', $this->id)
            ->count();
    }

    /**
     * Even simpler approach using existing relationships
     */
    public function getCriteriaCountSimple(): int
    {
        $count = 0;
        foreach ($this->domains as $domain) {
            foreach ($domain->categories as $category) {
                $count += $category->criteria()->count();
            }
        }
        return $count;
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(ToolSubscription::class);
    }

    /**
     * Check if tool requires premium access
     */
    public function requiresPremium(): bool
    {
        // You can add a 'premium_only' column to tools table
        // or define premium tools by their IDs
        return $this->premium_only ?? false;
    }


    /**
     * Performance level thresholds associated with this tool.
     */
    public function performanceLevels()
    {
        return $this->hasMany(ToolPerformanceLevel::class)->orderBy('min_percentage');
    }

    public function getPerformanceByScore(float $percentage): ?ToolPerformanceLevel
    {
        $percentage = floatval($percentage); // ensure number

        return $this->performanceLevels()
            ->where('min_percentage', '<=', $percentage)
            ->orderBy('min_percentage', 'asc') // ← ascending
            ->get()
            ->last(); // ← get highest within qualifying
    }





}
