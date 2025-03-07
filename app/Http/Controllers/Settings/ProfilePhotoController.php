<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilePhotoController extends Controller
{
    /**
     * Delete the current user's profile photo.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $path = $request->user()->profile_photo_path;
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }

        $request->user()->profile_photo_path = null;
        $request->user()->save();

        return to_route('profile.edit');
    }
}
