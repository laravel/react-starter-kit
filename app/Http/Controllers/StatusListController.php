<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\StatusList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class StatusListController extends Controller
{
    public function index(Request $request): Response
    {
        $query = StatusList::query();

        $search = $request->input('search');
        // No aplicar búsqueda aquí, será en el frontend

        $statuses = $query->orderBy('name')->get();

        return Inertia::render('StatusLists/Index', [
            'statuses' => $statuses,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('StatusLists/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:status_lists,name',
            'description' => 'nullable|string|max:1000',
        ]);
        StatusList::create($validated);
        return redirect()->route('status-lists.index')
            ->with('success', 'Estatus creado exitosamente.');
    }

    public function edit(StatusList $statusList): Response
    {
        return Inertia::render('StatusLists/Edit', [
            'status' => $statusList
        ]);
    }

    public function update(Request $request, StatusList $statusList)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:status_lists,name,' . $statusList->id,
            'description' => 'nullable|string|max:1000',
        ]);
        $statusList->update($validated);
        return redirect()->route('status-lists.index')
            ->with('success', 'Estatus actualizado exitosamente.');
    }

    public function destroy(StatusList $statusList)
    {
        $statusList->delete();
        return redirect()->route('status-lists.index')
            ->with('success', 'Estatus eliminado exitosamente.');
    }
} 