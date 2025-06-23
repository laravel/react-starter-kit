<?php
// app/Models/BlogPost.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ar',
        'slug',
        'excerpt',
        'excerpt_ar',
        'content',
        'content_ar',
        'featured_image',
        'status',
        'tags',
        'meta_data',
        'published_at',
        'author_id',
        'views_count',
        'likes_count',
        'comments_count',
    ];

    protected $casts = [
        'tags' => 'array',
        'meta_data' => 'array',
        'published_at' => 'datetime',
        'views_count' => 'integer',
        'likes_count' => 'integer',
        'comments_count' => 'integer',
    ];

    protected static function booting()
    {
        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });

        static::updating(function ($post) {
            if ($post->isDirty('title') && empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(BlogComment::class);
    }

    public function approvedComments(): HasMany
    {
        return $this->hasMany(BlogComment::class)->where('status', 'approved');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(BlogPostLike::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function scopeByTag(Builder $query, string $tag): Builder
    {
        return $query->whereJsonContains('tags', $tag);
    }

    public function incrementViews(): void
    {
        $this->increment('views_count');
    }

    public function updateCommentsCount(): void
    {
        $this->update([
            'comments_count' => $this->approvedComments()->count()
        ]);
    }

    public function updateLikesCount(): void
    {
        $this->update([
            'likes_count' => $this->likes()->count()
        ]);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function getLocalizedTitle(string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        return $locale === 'ar' && $this->title_ar ? $this->title_ar : $this->title;
    }

    public function getLocalizedExcerpt(string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        return $locale === 'ar' && $this->excerpt_ar ? $this->excerpt_ar : $this->excerpt;
    }

    public function getLocalizedContent(string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        return $locale === 'ar' && $this->content_ar ? $this->content_ar : $this->content;
    }
}
