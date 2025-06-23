<?php
// app/Models/BlogPostLike.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPostLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_post_id',
        'user_id',
        'session_id',
        'ip_address',
    ];

    public function blogPost(): BelongsTo
    {
        return $this->belongsTo(BlogPost::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function booting()
    {
        static::created(function ($like) {
            $like->blogPost->updateLikesCount();
        });

        static::deleted(function ($like) {
            $like->blogPost->updateLikesCount();
        });
    }
}
