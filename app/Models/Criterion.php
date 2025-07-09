<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Criterion extends Model
{
    use HasFactory;

    protected $table = 'criteria';

    protected $fillable = [
        'category_id',
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'order',
        'status',
        'requires_attachment',
    ];

    protected $casts = [
        'requires_attachment' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(AssessmentResponse::class);
    }

    /**
     * Get all actions for this criterion
     */
    public function actions(): HasMany
    {
        return $this->hasMany(Action::class);
    }

    /**
     * Get improvement actions only
     */
    public function improvementActions(): HasMany
    {
        return $this->hasMany(Action::class)->where('flag', true);
    }

    /**
     * Get corrective actions only
     */
    public function correctiveActions(): HasMany
    {
        return $this->hasMany(Action::class)->where('flag', false);
    }

    public function getName(string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();
        $field = "name_{$locale}";

        return $this->{$field};
    }

    public function getDescription(string $locale = null): ?string
    {
        $locale = $locale ?: app()->getLocale();
        $field = "description_{$locale}";

        return $this->{$field};
    }

    /**
     * Accessor for localized name attribute.
     */
    public function getNameAttribute(): string
    {
        return $this->getName();
    }

    /**
     * Accessor for localized description attribute.
     */
    public function getDescriptionAttribute(): ?string
    {
        return $this->getDescription();
    }
}
