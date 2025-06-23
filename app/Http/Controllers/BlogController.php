<?php
// app/Http/Controllers/BlogController.php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\BlogComment;
use App\Models\BlogPostLike;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::query()
            ->with(['author:id,name,email'])
            ->published()
            ->latest('published_at');

        // Search functionality
        if ($request->search) {
            $query->whereFullText(['title', 'excerpt', 'contentt'], $request->search);
        }

        // Tag filtering
        if ($request->tags) {
            $tags = is_array($request->tags) ? $request->tags : [$request->tags];
            foreach ($tags as $tag) {
                $query->whereJsonContains('tags', $tag);
            }
        }

        $posts = $query->paginate(12);

        // Get all unique tags for filter
        $availableTags = BlogPost::published()
            ->whereNotNull('tags')
            ->pluck('tags')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'availableTags' => $availableTags,
            'filters' => [
                'search' => $request->search,
                'tags' => $request->tags ? (is_array($request->tags) ? $request->tags : [$request->tags]) : [],
            ],
        ]);
    }

    public function show(BlogPost $post)
    {
        // Only show published posts to public
        if ($post->status !== 'published' ||
            ($post->published_at && $post->published_at->isFuture())) {
            abort(404);
        }

        // Increment view count
        $post->incrementViews();

        // Load post with author
        $post->load(['author:id,name,email']);

        // Get approved comments with replies
        $comments = BlogComment::where('blog_post_id', $post->id)
            ->where('status', 'approved')
            ->with(['user:id,name,email'])
            ->orderBy('created_at', 'asc')
            ->get();

        // Check if current user has liked this post
        $isLiked = false;
        if (auth()->check()) {
            $isLiked = BlogPostLike::where('blog_post_id', $post->id)
                ->where('user_id', auth()->id())
                ->exists();
        } else {
            $isLiked = BlogPostLike::where('blog_post_id', $post->id)
                ->where('session_id', session()->getId())
                ->exists();
        }

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'comments' => $comments,
            'isLiked' => $isLiked,
            'canComment' => auth()->check(), // Only authenticated users can comment
        ]);
    }

    public function like(BlogPost $post)
    {
        $userId = auth()->id();
        $sessionId = session()->getId();

        // Check if already liked
        $existingLike = BlogPostLike::where('blog_post_id', $post->id)
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->first();

        if ($existingLike) {
            return response()->json(['message' => 'Already liked'], 400);
        }

        BlogPostLike::create([
            'blog_post_id' => $post->id,
            'user_id' => $userId,
            'session_id' => $userId ? null : $sessionId,
            'ip_address' => request()->ip(),
        ]);

        return response()->json(['message' => 'Post liked successfully']);
    }

    public function unlike(BlogPost $post)
    {
        $userId = auth()->id();
        $sessionId = session()->getId();

        $like = BlogPostLike::where('blog_post_id', $post->id)
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->first();

        if (!$like) {
            return response()->json(['message' => 'Not liked yet'], 400);
        }

        $like->delete();

        return response()->json(['message' => 'Post unliked successfully']);
    }

    public function storeComment(Request $request, BlogPost $post)
    {
        $request->validate([
            'contentt' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:blog_comments,id',
        ]);

        $comment = BlogComment::create([
            'blog_post_id' => $post->id,
            'user_id' => auth()->id(),
            'parent_id' => $request->parent_id,
            'contentt' => $request->contentt,
            'status' => 'pending', // Require moderation
            'meta_data' => [
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ],
        ]);

        return back()->with('success', 'Comment submitted for review.');
    }
}
