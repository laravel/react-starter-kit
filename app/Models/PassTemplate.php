<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PassTemplate extends Model
{
    /** @use HasFactory<\Database\Factories\PassTemplateFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'pass_type',
        'platforms',
        'design_data',
        'images',
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
            'design_data' => 'array',
            'images' => 'array',
        ];
    }

    /**
     * Get the user that owns the pass template.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the passes for the template.
     */
    public function passes(): HasMany
    {
        return $this->hasMany(Pass::class, 'pass_template_id');
    }
}
