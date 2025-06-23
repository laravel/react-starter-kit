<?php
// app/Models/BlogComment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class BlogComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_post_id',
        'user_id',
        'parent_id',
        'author_name',
        'author_email',
        'contentt',
        'status',
        'meta_data',
        'likes_count',
    ];

    protected $casts = [
        'meta_data' => 'array',
        'likes_count' => 'integer',
    ];

    public function blogPost(): BelongsTo
    {
        return $this->belongsTo(BlogPost::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(BlogComment::class, 'parent_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(BlogComment::class, 'parent_id');
    }

    public function approvedReplies(): HasMany
    {
        return $this->hasMany(BlogComment::class, 'parent_id')->where('status', 'approved');
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    public function scopeTopLevel(Builder $query): Builder
    {
        return $query->whereNull('parent_id');
    }

    public function getAuthorDisplayName(): string
    {
        return $this->user ? $this->user->name : $this->author_name;
    }

    public function isReply(): bool
    {
        return !is_null($this->parent_id);
    }

    protected static function booting()
    {
        static::created(function ($comment) {
            if ($comment->status === 'approved') {
                $comment->blogPost->updateCommentsCount();
            }
        });

        static::updated(function ($comment) {
            if ($comment->wasChanged('status')) {
                $comment->blogPost->updateCommentsCount();
            }
        });

        static::deleted(function ($comment) {
            $comment->blogPost->updateCommentsCount();
        });
    }
}
