<?php

namespace App\Http\Controllers;

use App\Models\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index(Request $request)
    {
        $subscribed = $request->user()->subscribed();

        // Get only the current user's uploaded files
        $files = FileUpload::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('content', [
            'subscribed' => $subscribed,
            'files' => $files,
        ]);
    }
}
