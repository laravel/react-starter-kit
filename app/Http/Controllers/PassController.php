<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pass\StorePassRequest;
use App\Http\Requests\Pass\UpdatePassRequest;
use App\Models\Pass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PassController extends Controller
{
    /**
     * Display a listing of the user's passes.
     */
    public function index(Request $request): Response
    {
        $query = $request->user()->passes()->with('template');

        // Apply filters
        if ($request->filled('platform')) {
            $query->whereJsonContains('platforms', $request->platform);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('type')) {
            $query->where('pass_type', $request->type);
        }

        $passes = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('passes/index', [
            'passes' => $passes,
            'filters' => $request->only(['platform', 'status', 'type']),
        ]);
    }

    /**
     * Show the form for creating a new pass.
     */
    public function create(Request $request): Response
    {
        $templates = $request->user()->passTemplates()->latest()->get();

        return Inertia::render('passes/create', [
            'templates' => $templates,
        ]);
    }

    /**
     * Store a newly created pass.
     */
    public function store(StorePassRequest $request)
    {
        $pass = $request->user()->passes()->create([
            ...$request->validated(),
            'serial_number' => \Illuminate\Support\Str::uuid()->toString(),
            'status' => 'active',
        ]);

        return to_route('passes.show', $pass)->with('success', 'Pass created successfully.');
    }

    /**
     * Display the specified pass.
     */
    public function show(Request $request, Pass $pass): Response
    {
        $this->authorize('view', $pass);

        $pass->load('template');

        return Inertia::render('passes/show', [
            'pass' => $pass,
        ]);
    }

    /**
     * Show the form for editing the specified pass.
     */
    public function edit(Request $request, Pass $pass): Response
    {
        $this->authorize('update', $pass);

        $templates = $request->user()->passTemplates()->latest()->get();

        return Inertia::render('passes/edit', [
            'pass' => $pass->load('template'),
            'templates' => $templates,
        ]);
    }

    /**
     * Update the specified pass.
     */
    public function update(UpdatePassRequest $request, Pass $pass)
    {
        $this->authorize('update', $pass);

        $pass->update($request->validated());

        return to_route('passes.show', $pass)->with('success', 'Pass updated successfully.');
    }

    /**
     * Remove the specified pass.
     */
    public function destroy(Request $request, Pass $pass)
    {
        $this->authorize('delete', $pass);

        $pass->delete();

        return to_route('passes.index')->with('success', 'Pass deleted successfully.');
    }
}
