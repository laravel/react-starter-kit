<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class StatusController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Status/Index', [
            'statuses' => Status::query()
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Status/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:7'],
            'is_active' => ['boolean'],
        ]);

        Status::create($validated);

        return redirect()->route('statuses.index')
            ->with('success', 'Status created successfully.');
    }

    public function edit(Status $status): Response
    {
        return Inertia::render('Status/Edit', [
            'status' => $status,
        ]);
    }

    public function update(Request $request, Status $status)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:7'],
            'is_active' => ['boolean'],
        ]);

        $status->update($validated);

        return redirect()->route('statuses.index')
            ->with('success', 'Status updated successfully.');
    }

    public function destroy(Status $status)
    {
        $status->delete();

        return redirect()->route('statuses.index')
            ->with('success', 'Status deleted successfully.');
    }
} 