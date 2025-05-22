<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'criterion_id',
        'response',     // Changed from 'is_available' to match frontend
        'notes',
        'attachment',
    ];

    // Add accessor for frontend compatibility
    public function getIsAvailableAttribute(): ?bool
    {
        return match($this->response) {
            'yes' => true,
            'no' => false,
            'na' => null,
            default => null,
        };
    }

    // Add mutator for backward compatibility
    public function setIsAvailableAttribute($value): void
    {
        $this->attributes['response'] = match($value) {
            true => 'yes',
            false => 'no',
            null => 'na',
            default => 'na',
        };
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function criterion(): BelongsTo
    {
        return $this->belongsTo(Criterion::class);
    }
}
