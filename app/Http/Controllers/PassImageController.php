<?php

namespace App\Http\Controllers;

use App\Http\Requests\PassImageRequest;
use App\Services\PassImageService;

class PassImageController extends Controller
{
    /**
     * Store a pass image.
     */
    public function store(PassImageRequest $request, PassImageService $passImageService)
    {
        $validated = $request->validated();
        $userId = (int) $request->user()->id;

        $result = $passImageService->process(
            $request->file('image'),
            $validated['slot'],
            $validated['platform'],
            $validated['resize_mode'] ?? null,
            $userId,
        );

        return response()->json($result);
    }
}
