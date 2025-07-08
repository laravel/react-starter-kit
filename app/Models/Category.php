<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'domain_id',
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'weight_percentage',
        'order',
        'status',
    ];


    protected $casts = [
        'weight_percentage' => 'decimal:2',
    ];
    public function domain(): BelongsTo
    {
        return $this->belongsTo(Domain::class);
    }

    public function criteria(): HasMany
    {
        return $this->hasMany(Criterion::class)->orderBy('order');
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


    public function calculateScore(array $responses): array
    {
        $criteria = $this->criteria;
        $totalCriteria = $criteria->count();

        if ($totalCriteria === 0) {
            return [
                'score' => 0,
                'percentage' => 0,
                'applicable_count' => 0,
                'yes_count' => 0,
                'no_count' => 0,
                'na_count' => 0,
            ];
        }

        $yesCount = 0;
        $noCount = 0;
        $naCount = 0;
        $applicableCount = 0;

        foreach ($criteria as $criterion) {
            // Check if response exists for this criterion
            if (!isset($responses[$criterion->id])) {
                // If no response exists, treat as unanswered (you might want to handle this differently)
                $naCount++; // or you could skip this criterion entirely
                continue;
            }

            $response = $responses[$criterion->id];

            switch ($response) {
                case 'yes':
                    $yesCount++;
                    $applicableCount++;
                    break;
                case 'no':
                    $noCount++;
                    $applicableCount++;
                    break;
                case 'na':
                    $naCount++;
                    break;
                default:
                    // Handle unexpected response values
                    $naCount++;
                    break;
            }
        }

        // Calculate percentage based on applicable criteria only
        $percentage = $applicableCount > 0 ? ($yesCount / $applicableCount) * 100 : 0;

        return [
            'score' => $yesCount,
            'percentage' => round($percentage, 2),
            'applicable_count' => $applicableCount,
            'yes_count' => $yesCount,
            'no_count' => $noCount,
            'na_count' => $naCount,
        ];
    }
}




