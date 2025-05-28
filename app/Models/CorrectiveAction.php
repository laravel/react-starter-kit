<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CorrectiveAction extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_response_id',
        'action',
        'responsible_person',
        'due_date',
        'status',
    ];

    public function assessmentResponse(): BelongsTo
    {
        return $this->belongsTo(AssessmentResponse::class);
    }
}
