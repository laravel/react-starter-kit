<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

class PassImageController extends Controller
{
    /**
     * Store a pass image.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => ['required', File::image()->max(1024)], // Max 1MB
            'type' => ['required', 'string', 'in:icon,icon_2x,icon_3x,logo,logo_2x,logo_3x,strip,strip_2x,strip_3x,thumbnail,thumbnail_2x,thumbnail_3x,background,background_2x,background_3x,footer,footer_2x,footer_3x'],
        ]);

        $imagesDisk = config('passkit.storage.images_disk');
        $imagesPath = config('passkit.storage.images_path');

        $path = $request->file('image')->store(
            $imagesPath . '/' . $request->user()->id,
            $imagesDisk
        );

        return response()->json([
            'path' => $path,
            'url' => Storage::disk($imagesDisk)->url($path),
        ]);
    }
}
