<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Action extends Model
{
    use HasFactory;

    protected $table = 'actions';
    protected $fillable = [
        'criteria_id',
        'action_ar',
        'action_en',
        'flag',
    ];

    protected $casts = [
        'flag' => 'boolean',
    ];

    /**
     * Get the criterion that this action belongs to
     */
    public function criterion(): BelongsTo
    {
        return $this->belongsTo(Criterion::class, 'criteria_id');
    }

    /**
     * Get the action text based on locale
     */
    public function getAction(string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();
        $field = "action_{$locale}";

        return $this->{$field} ?? $this->action_en;
    }

    /**
     * Get the action type text
     */
    public function getActionTypeText(string $locale = 'en'): string
    {
        if ($locale === 'ar') {
            return $this->flag ? 'إجراءات تحسينية' : 'إجراءات تصليحية';
        }

        return $this->flag ? 'Improvement Action' : 'Corrective Action';
    }

    /**
     * Scope for improvement actions
     */
    public function scopeImprovement($query)
    {
        return $query->where('flag', true);
    }

    /**
     * Scope for corrective actions
     */
    public function scopeCorrective($query)
    {
        return $query->where('flag', false);
    }
}
