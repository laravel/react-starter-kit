<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

class Tool extends Model
{
    use HasFactory;

    protected $table = 'tools';
    protected $fillable = [
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'image',
        'status',
    ];

    public function domains(): HasMany
    {
        return $this->hasMany(Domain::class)->orderBy('order');
    }

    public function assessments(): HasMany
    {
        return $this->hasMany(Assessment::class);
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


    public function criteria(): HasManyThrough
    {
        return $this->hasManyThrough(
            Criterion::class,
            Domain::class,
            'tool_id',      // Foreign key on domains table
            'category_id',  // Foreign key on criteria table
            'id',           // Local key on tools table
            'id'            // Local key on domains table
        )->join('categories', 'criteria.category_id', '=', 'categories.id')
            ->where('categories.domain_id', '=', 'domains.id');
    }

    public function getCriteriaCount(): int
    {
        return DB::table('criteria')
            ->join('categories', 'criteria.category_id', '=', 'categories.id')
            ->join('domains', 'categories.domain_id', '=', 'domains.id')
            ->where('domains.tool_id', $this->id)
            ->count();
    }
}
