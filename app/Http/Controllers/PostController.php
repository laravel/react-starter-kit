<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function show(Post $post)
    {
        if ($post->status !== 'published') {
            abort(404);
        }

        $comments = $post->comments()->latest()->get();

        return Inertia::render('posts/Show', [
            'post' => $post,
            'comments' => $comments,
        ]);
    }

    public function storeComment(Request $request, Post $post)
    {
        $data = $request->validate([
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->comments()->create($data);

        return redirect()->back();
    }
}
