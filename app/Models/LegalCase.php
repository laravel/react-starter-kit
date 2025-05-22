<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\ModelStatus\HasStatuses;

final class LegalCase extends Model implements Searchable
{
    use HasFactory, SoftDeletes, HasStatuses;

    protected $fillable = [
        'code',
        'entry_date',
        'sentence_date',
        'closing_date',
        'case_type_id',
    ];

    protected $casts = [
        'entry_date' => 'date',
        'sentence_date' => 'date',
        'closing_date' => 'date',
    ];

    public function getSearchResult(): SearchResult
    {
        // URL para ver el detalle del caso
        $url = route('legal-cases.show', $this->id);
        
        return new SearchResult(
            $this,
            "Expediente: {$this->code}",
            $url
        );
    }

    public function caseType(): BelongsTo
    {
        return $this->belongsTo(CaseType::class);
    }

    public function individuals(): BelongsToMany
    {
        return $this->belongsToMany(Individual::class, 'case_individuals')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function legalEntities(): BelongsToMany
    {
        return $this->belongsToMany(LegalEntity::class, 'case_legal_entities')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function events(): HasMany
    {
        return $this->hasMany(CaseEvent::class);
    }

    public function importantDates(): HasMany
    {
        return $this->hasMany(CaseImportantDate::class);
    }

    public function setStatus(string $status, ?string $reason = null): void
    {
        $this->statuses()->create([
            'name' => $status,
            'reason' => $reason,
        ]);
    }
} 