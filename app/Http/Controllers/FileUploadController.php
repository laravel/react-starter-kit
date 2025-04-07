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

        // Ensure the uploads directory exists
        if (! Storage::exists('uploads')) {
            Storage::makeDirectory('uploads');
            Log::info('Created uploads directory on default disk');
        }

        // Store the file in the private/uploads directory
        $path = Storage::putFileAs('uploads', $file, $filename);

        // Log file storage details
        Log::info('File stored', [
            'original_filename' => $originalFilename,
            'generated_filename' => $filename,
            'storage_path' => $path,
            'full_path' => Storage::path($path),
            'exists' => Storage::exists($path) ? 'Yes' : 'No',
            'default_disk' => config('filesystems.default'),
            'disk_root' => config('filesystems.disks.'.config('filesystems.default').'.root'),
        ]);

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

        // Log the download attempt
        Log::info('File download requested', [
            'file_id' => $fileUpload->id,
            'filename' => $fileUpload->original_filename,
            'path' => $fileUpload->path,
            'user_id' => Auth::id(),
            'exists' => Storage::exists($fileUpload->path) ? 'Yes' : 'No',
            'default_disk' => config('filesystems.default'),
        ]);

        // Check if the file exists
        if (! Storage::exists($fileUpload->path)) {
            // Try to check where the file might be
            $alternativePaths = [
                'uploads/'.$fileUpload->filename,
                'private/uploads/'.$fileUpload->filename,
                'app/uploads/'.$fileUpload->filename,
                'app/private/uploads/'.$fileUpload->filename,
            ];

            $foundAlternative = false;
            foreach ($alternativePaths as $altPath) {
                if (Storage::exists($altPath)) {
                    Log::info('Found file at alternative path', ['path' => $altPath]);
                    $fileUpload->path = $altPath;
                    $fileUpload->save();
                    $foundAlternative = true;
                    break;
                }
            }

            if (! $foundAlternative) {
                Log::error('File not found for download', [
                    'file_id' => $fileUpload->id,
                    'path' => $fileUpload->path,
                    'checked_alternatives' => $alternativePaths,
                ]);

                abort(404, 'File not found. It may have been moved or deleted.');
            }
        }

        try {
            // Return the file as a download
            return Storage::download(
                $fileUpload->path,
                $fileUpload->original_filename,
                ['Content-Type' => $fileUpload->mime_type]
            );
        } catch (\Exception $e) {
            Log::error('Error downloading file', [
                'file_id' => $fileUpload->id,
                'error' => $e->getMessage(),
            ]);

            abort(500, 'Error downloading file. Please try again later.');
        }
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
