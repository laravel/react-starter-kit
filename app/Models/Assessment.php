<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tool_id',
        'name',
        'email',
        'organization',
        'status',
        'started_at',
        'completed_at',
        'title_en',      // Add these if they don't exist
        'title_ar',      // Add these if they don't exist
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tool(): BelongsTo
    {
        return $this->belongsTo(Tool::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(AssessmentResponse::class);
    }

    public function results(): HasMany
    {
        return $this->hasMany(AssessmentResult::class);
    }

    /**
     * Check if this is a guest assessment (no user_id)
     */
    public function isGuestAssessment(): bool
    {
        return is_null($this->user_id);
    }

    /**
     * Check if this assessment belongs to a specific user
     */
    public function belongsToUser(int $userId): bool
    {
        return $this->user_id === $userId;
    }

    /**
     * Calculate and save assessment results
     */
    public function calculateResults(): void
    {
        $tool = $this->tool->load(['domains.categories.criteria']);
        $responses = $this->responses->keyBy('criterion_id');

        // Convert responses to simple array format
        $responseArray = [];
        foreach ($responses as $criterionId => $response) {
            $responseArray[$criterionId] = $response->response;
        }

        // Clear existing results
        $this->results()->delete();

        // Calculate results for each domain and category
        foreach ($tool->domains as $domain) {
            $domainScore = $domain->calculateScore($responseArray);

            // Save domain result
            AssessmentResult::create([
                'assessment_id' => $this->id,
                'domain_id' => $domain->id,
                'category_id' => null,
                'total_criteria' => $domainScore['total_criteria'],
                'applicable_criteria' => $domainScore['applicable_criteria'],
                'yes_count' => $domainScore['yes_count'],
                'no_count' => $domainScore['no_count'],
                'na_count' => $domainScore['na_count'],
                'score_percentage' => $domainScore['percentage'],
                'weighted_score' => $domainScore['percentage'] * ($domain->weight_percentage ?? 100) / 100,
            ]);

            // Save category results
            foreach ($domainScore['category_scores'] as $categoryScore) {
                AssessmentResult::create([
                    'assessment_id' => $this->id,
                    'domain_id' => $domain->id,
                    'category_id' => $categoryScore['category_id'],
                    'total_criteria' => $domain->categories->find($categoryScore['category_id'])->criteria->count(),
                    'applicable_criteria' => $categoryScore['applicable_count'],
                    'yes_count' => $categoryScore['yes_count'],
                    'no_count' => $categoryScore['no_count'],
                    'na_count' => $categoryScore['na_count'],
                    'score_percentage' => $categoryScore['percentage'],
                    'weighted_score' => $categoryScore['percentage'] * ($categoryScore['weight_percentage'] ?? 100) / 100,
                ]);
            }
        }
    }

    /**
     * Get assessment results
     */
    public function getResults(): array
    {
        $results = $this->results()->with(['domain', 'category'])->get();

        $domainResults = $results->where('category_id', null)->values();
        $categoryResults = $results->where('category_id', '!=', null)->groupBy('domain_id');

        return [
            'domain_results' => $domainResults->map(function ($result) {
                return [
                    'domain_id' => $result->domain_id,
                    'domain_name' => $result->domain->name_en, // You might want to handle localization
                    'score_percentage' => $result->score_percentage,
                    'total_criteria' => $result->total_criteria,
                    'applicable_criteria' => $result->applicable_criteria,
                    'yes_count' => $result->yes_count,
                    'no_count' => $result->no_count,
                    'na_count' => $result->na_count,
                    'weighted_score' => $result->weighted_score,
                ];
            }),
            'category_results' => $categoryResults->map(function ($categories, $domainId) {
                return $categories->map(function ($result) {
                    return [
                        'category_id' => $result->category_id,
                        'category_name' => $result->category->name_en, // You might want to handle localization
                        'score_percentage' => $result->score_percentage,
                        'applicable_criteria' => $result->applicable_criteria,
                        'yes_count' => $result->yes_count,
                        'no_count' => $result->no_count,
                        'na_count' => $result->na_count,
                        'weight_percentage' => $result->weighted_score,
                    ];
                });
            }),
            'overall_percentage' => $domainResults->avg('score_percentage') ?? 0,
            'total_criteria' => $domainResults->sum('total_criteria'),
            'applicable_criteria' => $domainResults->sum('applicable_criteria'),
            'yes_count' => $domainResults->sum('yes_count'),
            'no_count' => $domainResults->sum('no_count'),
            'na_count' => $domainResults->sum('na_count'),
        ];
    }

    /**
     * Check if assessment is complete
     */
    public function isComplete(): bool
    {
        // Get all criteria for this tool
        $totalCriteria = $this->tool->domains()
            ->with('categories.criteria')
            ->get()
            ->flatMap(fn($domain) => $domain->categories)
            ->flatMap(fn($category) => $category->criteria)
            ->count();

        $answeredCriteria = $this->responses()->count();

        // Also check required attachments
        $requiredAttachmentsMet = $this->checkRequiredAttachments();

        return $totalCriteria === $answeredCriteria && $requiredAttachmentsMet;
    }

    /**
     * Check if all required attachments are provided
     */
    public function checkRequiredAttachments(): bool
    {
        $yesResponsesRequiringAttachment = $this->responses()
            ->where('response', 'yes')
            ->whereHas('criterion', function($query) {
                $query->where('requires_attachment', true);
            })
            ->get();

        foreach ($yesResponsesRequiringAttachment as $response) {
            if (empty($response->attachment)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get completion percentage
     */
    public function getCompletionPercentage(): float
    {
        // Get all criteria for this tool
        $totalCriteria = $this->tool->domains()
            ->with('categories.criteria')
            ->get()
            ->flatMap(fn($domain) => $domain->categories)
            ->flatMap(fn($category) => $category->criteria)
            ->count();

        $answeredCriteria = $this->responses()->count();

        if ($totalCriteria === 0) {
            return 100;
        }

        return round(($answeredCriteria / $totalCriteria) * 100, 2);
    }

    /**
     * Mark assessment as completed
     */
    public function markAsCompleted(): void
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        $this->calculateResults();
    }

    /**
     * Get the appropriate display name for the assessment
     */
    public function getDisplayName(string $locale = 'en'): string
    {
        $field = "title_{$locale}";

        // If assessment has a title, use it
        if ($this->{$field}) {
            return $this->{$field};
        }

        // Otherwise, use the tool name
        $toolField = "name_{$locale}";
        return $this->tool->{$toolField} ?? $this->tool->name_en;
    }

    /**
     * Get the appropriate assessor name
     */
    public function getAssessorName(): string
    {
        // If it's a user assessment, return the user's name
        if ($this->user_id && $this->user) {
            return $this->user->name;
        }

        // Otherwise, return the guest name
        return $this->name ?? 'Unknown';
    }

    /**
     * Get the appropriate email
     */
    public function getAssessorEmail(): string
    {
        // If it's a user assessment, return the user's email
        if ($this->user_id && $this->user) {
            return $this->user->email;
        }

        // Otherwise, return the guest email
        return $this->email ?? '';
    }
}
