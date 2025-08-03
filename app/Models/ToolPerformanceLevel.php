<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToolPerformanceLevel extends Model
{
    use HasFactory;

    protected $table = 'tool_performance_levels';

    protected $fillable = [
        'tool_id',
        'code',
        'min_percentage',
        'color',
        'name_en',
        'name_ar',
        'text_en',
        'text_ar',
        'recommendation_en',
        'recommendation_ar',
    ];

    protected $casts = [
        'min_percentage' => 'float',
    ];


    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }
}
