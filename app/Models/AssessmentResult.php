<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'domain_id',
        'category_id',
        'total_criteria',
        'applicable_criteria',
        'yes_count',
        'no_count',
        'na_count',
        'score_percentage',
        'weighted_score',
    ];

    protected $casts = [
        'score_percentage' => 'decimal:2',
        'weighted_score' => 'decimal:2',
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function domain(): BelongsTo
    {
        return $this->belongsTo(Domain::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
