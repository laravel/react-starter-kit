<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gallery extends Model
{
    /** @use HasFactory<\Database\Factories\GalleryFactory> */
    use HasFactory;
    protected $fillable = [
            'src',
            'alt',
            'title',
            'description',
    ];
}
