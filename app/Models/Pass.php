<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pass extends Model
{
    /** @use HasFactory<\Database\Factories\PassFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'pass_template_id',
        'platforms',
        'pass_type',
        'serial_number',
        'status',
        'pass_data',
        'barcode_data',
        'images',
        'pkpass_path',
        'google_save_url',
        'google_class_id',
        'google_object_id',
        'last_generated_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'platforms' => 'array',
            'pass_data' => 'array',
            'barcode_data' => 'array',
            'images' => 'array',
            'last_generated_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the pass.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the template that was used for this pass.
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(PassTemplate::class, 'pass_template_id');
    }
}
