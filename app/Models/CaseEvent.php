<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class CaseEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'legal_case_id',
        'user_id',
        'title',
        'description',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function legalCase(): BelongsTo
    {
        return $this->belongsTo(LegalCase::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
