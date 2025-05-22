<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Domain extends Model
{
    use HasFactory;

    protected $fillable = [
        'tool_id',
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'weight_percentage',
        'order',
        'status',
    ];

    protected $casts = [
    'weight_percentage' => 'decimal:2',];

    public function tool(): BelongsTo
    {
        return $this->belongsTo(Tool::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class)->orderBy('order');
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

    public function calculateScore(array $responses): array
    {
        $categories = $this->categories;
        $totalCategories = $categories->count();

        if ($totalCategories === 0) {
            return [
                'score' => 0,
                'percentage' => 0,
                'category_scores' => [],
                'total_criteria' => 0,
                'applicable_criteria' => 0,
                'yes_count' => 0,
                'no_count' => 0,
                'na_count' => 0,
            ];
        }

        $categoryScores = [];
        $totalYes = 0;
        $totalNo = 0;
        $totalNA = 0;
        $totalApplicable = 0;
        $totalCriteria = 0;
        $weightedScore = 0;

        foreach ($categories as $category) {
            $categoryScore = $category->calculateScore($responses);
            $categoryScores[] = array_merge($categoryScore, [
                'category_id' => $category->id,
                'category_name' => $category->name,
                'weight_percentage' => $category->weight_percentage,
            ]);

            $totalYes += $categoryScore['yes_count'];
            $totalNo += $categoryScore['no_count'];
            $totalNA += $categoryScore['na_count'];
            $totalApplicable += $categoryScore['applicable_count'];
            $totalCriteria += $category->criteria->count();

            // Calculate weighted score if weight percentages are set
            if ($category->weight_percentage) {
                $weightedScore += ($categoryScore['percentage'] * $category->weight_percentage / 100);
            }
        }

        // If no weights are set, use simple average
        if ($weightedScore === 0) {
            $averagePercentages = collect($categoryScores)->avg('percentage');
            $finalPercentage = $averagePercentages ?? 0;
        } else {
            $finalPercentage = $weightedScore;
        }

        return [
            'score' => $totalYes,
            'percentage' => round($finalPercentage, 2),
            'category_scores' => $categoryScores,
            'total_criteria' => $totalCriteria,
            'applicable_criteria' => $totalApplicable,
            'yes_count' => $totalYes,
            'no_count' => $totalNo,
            'na_count' => $totalNA,
        ];
    }
}
