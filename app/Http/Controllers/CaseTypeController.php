<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\CaseType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class CaseTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $caseTypes = CaseType::orderBy('name')->get();
        return Inertia::render('CaseTypes/Index', [
            'caseTypes' => $caseTypes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CaseTypes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:case_types',
            'description' => 'nullable|string',
        ]);

        CaseType::create($validated);

        return Redirect::route('case-types.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // No necesitamos un show para CaseType, podríamos redirigir o retornar 404
         return Redirect::route('case-types.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $caseType = CaseType::findOrFail($id);
        return Inertia::render('CaseTypes/Edit', [
            'caseType' => $caseType,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $caseType = CaseType::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:case_types,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $caseType->update($validated);

        return Redirect::route('case-types.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $caseType = CaseType::findOrFail($id);
        $caseType->delete();

        return Redirect::route('case-types.index');
    }
}
