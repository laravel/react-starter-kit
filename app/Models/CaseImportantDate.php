<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseImportantDate extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'legal_case_id',
        'title',
        'description',
        'start_date',
        'end_date',
        'is_expired',
        'created_by'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_expired' => 'boolean',
    ];

    public function legalCase(): BelongsTo
    {
        return $this->belongsTo(LegalCase::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function isExpired(): bool
    {
        return $this->is_expired;
    }

    public function isActive(): bool
    {
        return !$this->is_expired;
    }

    public function getDaysRemaining(): int
    {
        if (!$this->isActive()) {
            return 0;
        }

        return now()->diffInDays($this->end_date, false);
    }
} 