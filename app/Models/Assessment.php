<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;

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
        'title_en',
        'title_ar',
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

    public function guestSession(): HasOne
    {
        return $this->hasOne(GuestSession::class);
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

        // Convert responses to simple array format for the calculation methods
        $responseArray = [];
        foreach ($responses as $criterionId => $response) {
            $responseArray[$criterionId] = $response->response; // 'yes', 'no', or 'na'
        }

        Log::info('Calculating results for assessment', [
            'assessment_id' => $this->id,
            'responses_count' => count($responseArray),
            'sample_responses' => array_slice($responseArray, 0, 5, true)
        ]);

        // Clear existing results
        $this->results()->delete();

        // Calculate results for each domain and category
        foreach ($tool->domains as $domain) {
            $domainScore = $domain->calculateScore($responseArray);

            Log::info('Domain score calculated', [
                'domain_id' => $domain->id,
                'domain_name' => $domain->name_en,
                'score' => $domainScore
            ]);

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
     * Get assessment results with fixed calculation
     */
    public function getResults(): array
    {
        Log::info('Getting results for assessment', ['assessment_id' => $this->id]);

        // Get all responses for this assessment
        $responses = $this->responses()->with('criterion.category.domain')->get();

        Log::info('Responses loaded', [
            'count' => $responses->count(),
            'sample' => $responses->take(3)->map(function($r) {
                return [
                    'criterion_id' => $r->criterion_id,
                    'response' => $r->response,
                    'criterion_name' => $r->criterion->name_en ?? 'Unknown'
                ];
            })
        ]);

        if ($responses->isEmpty()) {
            Log::warning('No responses found for assessment', ['assessment_id' => $this->id]);
            return $this->getEmptyResults();
        }

        // Count responses by type
        $yesCount = $responses->where('response', 'yes')->count();
        $noCount = $responses->where('response', 'no')->count();
        $naCount = $responses->where('response', 'na')->count();
        $totalResponses = $yesCount + $noCount + $naCount;
        $applicableResponses = $yesCount + $noCount; // Exclude N/A from applicable

        Log::info('Response counts', [
            'yes' => $yesCount,
            'no' => $noCount,
            'na' => $naCount,
            'total' => $totalResponses,
            'applicable' => $applicableResponses
        ]);

        // Calculate overall percentage - FIXED LOGIC
        // If all responses are "Yes", score should be 100%
        // If all responses are "No", score should be 0%
        // N/A responses are excluded from the calculation
        $overallPercentage = 0;
        if ($applicableResponses > 0) {
            $overallPercentage = ($yesCount / $applicableResponses) * 100;
        }

        Log::info('Overall percentage calculated', [
            'percentage' => $overallPercentage,
            'calculation' => "({$yesCount} / {$applicableResponses}) * 100"
        ]);

        // Group responses by domain
        $domainResults = [];
        $responsesByDomain = $responses->groupBy(function ($response) {
            return $response->criterion->category->domain->id;
        });

        foreach ($responsesByDomain as $domainId => $domainResponses) {
            $domain = $domainResponses->first()->criterion->category->domain;

            $domainYesCount = $domainResponses->where('response', 'yes')->count();
            $domainNoCount = $domainResponses->where('response', 'no')->count();
            $domainNaCount = $domainResponses->where('response', 'na')->count();
            $domainApplicable = $domainYesCount + $domainNoCount;

            // Calculate domain percentage
            $domainPercentage = 0;
            if ($domainApplicable > 0) {
                $domainPercentage = ($domainYesCount / $domainApplicable) * 100;
            }

            $domainResults[] = [
                'domain_id' => $domain->id,
                'domain_name' => $domain->name_en,
                'score_percentage' => round($domainPercentage, 2),
                'total_criteria' => $domainResponses->count(),
                'applicable_criteria' => $domainApplicable,
                'yes_count' => $domainYesCount,
                'no_count' => $domainNoCount,
                'na_count' => $domainNaCount,
                'weighted_score' => round($domainPercentage, 2),
            ];
        }

        // Group responses by category within domains
        $categoryResults = [];
        foreach ($responsesByDomain as $domainId => $domainResponses) {
            $categoriesByDomain = $domainResponses->groupBy(function ($response) {
                return $response->criterion->category->id;
            });

            $categoryResults[$domainId] = [];
            foreach ($categoriesByDomain as $categoryId => $categoryResponses) {
                $category = $categoryResponses->first()->criterion->category;

                $categoryYesCount = $categoryResponses->where('response', 'yes')->count();
                $categoryNoCount = $categoryResponses->where('response', 'no')->count();
                $categoryNaCount = $categoryResponses->where('response', 'na')->count();
                $categoryApplicable = $categoryYesCount + $categoryNoCount;

                // Calculate category percentage
                $categoryPercentage = 0;
                if ($categoryApplicable > 0) {
                    $categoryPercentage = ($categoryYesCount / $categoryApplicable) * 100;
                }

                $categoryResults[$domainId][] = [
                    'category_id' => $category->id,
                    'category_name' => $category->name_en,
                    'score_percentage' => round($categoryPercentage, 2),
                    'applicable_criteria' => $categoryApplicable,
                    'yes_count' => $categoryYesCount,
                    'no_count' => $categoryNoCount,
                    'na_count' => $categoryNaCount,
                ];
            }
        }

        $results = [
            'domain_results' => $domainResults,
            'category_results' => $categoryResults,
            'overall_percentage' => round($overallPercentage, 2),
            'total_criteria' => $totalResponses,
            'applicable_criteria' => $applicableResponses,
            'yes_count' => $yesCount,
            'no_count' => $noCount,
            'na_count' => $naCount,
        ];

        Log::info('Final results calculated', [
            'overall_percentage' => $results['overall_percentage'],
            'domain_count' => count($domainResults)
        ]);

        return $results;
    }

    /**
     * Get empty results structure
     */
    private function getEmptyResults(): array
    {
        return [
            'domain_results' => [],
            'category_results' => [],
            'overall_percentage' => 0,
            'total_criteria' => 0,
            'applicable_criteria' => 0,
            'yes_count' => 0,
            'no_count' => 0,
            'na_count' => 0,
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
