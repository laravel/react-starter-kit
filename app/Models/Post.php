<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'thumbnail',
        'image_gallery',
        'audio',
        'video',
        'youtube_url',
        'published_at',
        'status',
    ];

    protected $casts = [
        'image_gallery' => 'array',
        'published_at' => 'datetime',

    ];

    protected $appends = [
        'thumbnail_url',
        'image_gallery_urls',
    ];

    protected static function booted()
    {
        static::creating(function (Post $post) {
            $post->slug = static::generateUniqueSlug($post->title);
        });
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }

    public function getImageGalleryUrlsAttribute()
    {
        return collect($this->image_gallery ?? [])->map(fn ($path) => asset('storage/' . $path));
    }


    protected static function generateUniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $i = 1;
        while (static::where('slug', $slug)->exists()) {
            $slug = "$original-{$i}";
            $i++;
        }
        return $slug;
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
