<?php

namespace App\Http\Controllers;

use App\Models\gallery;
use App\Http\Requests\StoregalleryRequest;
use App\Http\Requests\UpdategalleryRequest;
use Illuminate\Support\Facades\DB;
// use Inertia\Inertia;

class GalleryController extends Controller
{
    protected function resetAutoIncrementIfEmpty()
    {
        if (gallery::count() === 0) {
            DB::statement('ALTER TABLE galleries AUTO_INCREMENT = 1');
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {
            $galleries = gallery::all();
            return response()->json($galleries);
        } catch (\Exception $e) { 
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoregalleryRequest $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // 5MB max
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'alt' => 'required|string|max:255',
        ]);

        $path = $request->file('image')->store('images', 'public');

        $image = gallery::create([
            'title' => $request->title,
            'description' => $request->description,
            'alt' => $request->alt,
            'src' => $path,
        
        ]);

        return redirect()->route('dashboard')->with('success', 'Image uploaded successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(gallery $gallery)
    {
        return response()->json($gallery);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(gallery $gallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdategalleryRequest $request, gallery $gallery)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'alt' => 'sometimes|required|string|max:255',
        ]);

        // Check if there's a new image
        if ($request->hasFile('image')) {
            // Validate the new image
            $request->validate([
                'image' => 'required|image|max:5120',
            ]);

            // Delete old image if it exists
            if ($gallery->src && file_exists(storage_path('app/public/' . $gallery->src))) {
                unlink(storage_path('app/public/' . $gallery->src));
            }

            // Store new image
            $path = $request->file('image')->store('images', 'public');
            $gallery->src = $path;
        }

        // Update other fields
        $gallery->title = $request->title ?? $gallery->title;
        $gallery->description = $request->description ?? $gallery->description;
        $gallery->alt = $request->alt ?? $gallery->alt;
        $gallery->save();

        return response()->json($gallery);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(gallery $gallery)
    {
        // Delete the image file from storage
        if ($gallery->src && file_exists(storage_path('app/public/' . $gallery->src))) {
            unlink(storage_path('app/public/' . $gallery->src));
        }

        // Delete from database
        $gallery->delete();

        $this->resetAutoIncrementIfEmpty();

        return response()->json(['message' => 'Image deleted successfully']);
    }

}
