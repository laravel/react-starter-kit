<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class gallery extends Model
{
    /** @use HasFactory<\Database\Factories\GalleryFactory> */
    use HasFactory;
    protected $fillable = [
            'src',
            'alt',
            'title',
            'description',
            'user_id',
    ];
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
