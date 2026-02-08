<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApiTokenController extends Controller
{
    /**
     * Display API tokens management page.
     */
    public function index(Request $request): Response
    {
        $tokens = $request->user()->tokens()->orderBy('created_at', 'desc')->get();

        return Inertia::render('settings/api-tokens', [
            'tokens' => $tokens->map(fn($token) => [
                'id' => $token->id,
                'name' => $token->name,
                'last_used_at' => $token->last_used_at?->toISOString(),
                'created_at' => $token->created_at->toISOString(),
                'abilities' => $token->abilities,
            ]),
        ]);
    }

    /**
     * Create a new API token.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $token = $request->user()->createToken($validated['name']);

        return back()->with([
            'success' => 'API token created successfully.',
            'token' => $token->plainTextToken,
        ]);
    }

    /**
     * Delete an API token.
     */
    public function destroy(Request $request, string $tokenId)
    {
        $request->user()->tokens()->where('id', $tokenId)->delete();

        return back()->with('success', 'API token deleted successfully.');
    }
}
