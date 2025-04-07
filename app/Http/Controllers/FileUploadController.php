<?php

namespace App\Http\Controllers;

use App\Models\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FileUploadController extends Controller
{
    /**
     * Display a listing of the uploaded files.
     */
    public function index()
    {
        $files = FileUpload::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Content', [
            'files' => $files,
            'subscribed' => true, // Adjust based on your subscription logic
        ]);
    }

    /**
     * Store a newly uploaded file.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:204800', // 200MB max file size
        ]);

        $file = $request->file('file');
        $originalFilename = $file->getClientOriginalName();
        $filename = Str::uuid().'.'.$file->getClientOriginalExtension();

        // Store the file in the storage/app/uploads directory (private)
        $path = $file->storeAs('uploads', $filename);

        // Create a new file upload record
        $fileUpload = FileUpload::create([
            'user_id' => Auth::id(),
            'filename' => $filename,
            'original_filename' => $originalFilename,
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'status' => 'uploaded', // Default status
        ]);

        // In a real application, you might queue a job here to process the file
        // ProcessFileJob::dispatch($fileUpload);

        return redirect()->route('content.index')
            ->with('success', 'File uploaded successfully.');
    }

    /**
     * Download a file securely.
     */
    public function download(FileUpload $fileUpload)
    {
        // Check if the user has permission to download this file
        if ($fileUpload->user_id !== Auth::id()) {
            abort(403, 'You do not have permission to access this file.');
        }

        // Check if the file exists
        if (! Storage::exists($fileUpload->path)) {
            abort(404, 'File not found.');
        }

        // Debugging information
        Log::info('Download requested by User: '.Auth::id().' for File: '.$fileUpload->id.' Path: '.$fileUpload->path);

        // Force download the file
        return response()->download(
            storage_path('app/'.$fileUpload->path),
            $fileUpload->original_filename,
            ['Content-Type' => $fileUpload->mime_type]
        );
    }

    /**
     * Update the status of an uploaded file.
     */
    public function updateStatus(FileUpload $fileUpload, Request $request)
    {
        $request->validate([
            'status' => 'required|in:uploaded,processing,processed',
        ]);

        $fileUpload->update([
            'status' => $request->status,
        ]);

        return redirect()->back()
            ->with('success', 'File status updated successfully.');
    }

    /**
     * Remove the specified file from storage.
     */
    public function destroy(FileUpload $fileUpload)
    {
        // Check if user owns the file
        if ($fileUpload->user_id !== Auth::id()) {
            return redirect()->back()
                ->with('error', 'You do not have permission to delete this file.');
        }

        // Delete the file from storage (private)
        Storage::delete($fileUpload->path);

        // Delete the database record
        $fileUpload->delete();

        return redirect()->back()
            ->with('success', 'File deleted successfully.');
    }
}
