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
        if ($request->user()->profile_photo_path) {
            Storage::disk('public')->delete($request->user()->profile_photo_path);
        }

        $request->user()->profile_photo_path = null;
        $request->user()->save();

        return to_route('profile.edit');
    }
}
