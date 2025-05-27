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
    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function criterion(): BelongsTo
    {
        return $this->belongsTo(Criterion::class);
    }

    // Add this method to help with debugging
    public function getResponseValue(): string
    {
        return $this->response ?? 'na';
    }
}
