<?php

namespace App\Http\Controllers;

use App\Models\Individual;
use App\Http\Requests\Individual\StoreIndividualRequest;
use App\Http\Requests\Individual\UpdateIndividualRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class IndividualController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Individual::query();
        
        // Filtrado
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('national_id', 'like', "%{$search}%");
            });
        }
        
        $individuals = $query->orderBy('id', 'desc')
                            ->paginate(10)
                            ->withQueryString();
        
        return Inertia::render('Individuals/Index', [
            'individuals' => [
                'data' => $individuals->items(),
                'links' => [
                    'first' => $individuals->url(1),
                    'last' => $individuals->url($individuals->lastPage()),
                    'prev' => $individuals->previousPageUrl(),
                    'next' => $individuals->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $individuals->currentPage(),
                    'from' => $individuals->firstItem(),
                    'last_page' => $individuals->lastPage(),
                    'links' => $individuals->linkCollection()->toArray(),
                    'path' => $individuals->path(),
                    'per_page' => $individuals->perPage(),
                    'to' => $individuals->lastItem(),
                    'total' => $individuals->total(),
                ],
            ],
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Individuals/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIndividualRequest $request)
    {
        Individual::create($request->validated());
        
        return Redirect::route('individuals.index')->with('success', 'Individuo creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $individual = Individual::with(['legalCases.caseType'])->findOrFail($id);
        
        return Inertia::render('Individuals/Show', [
            'individual' => $individual
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $individual = Individual::findOrFail($id);
        
        return Inertia::render('Individuals/Edit', [
            'individual' => $individual
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIndividualRequest $request, string $id)
    {
        $individual = Individual::findOrFail($id);
        $individual->update($request->validated());
        
        return Redirect::route('individuals.index')->with('success', 'Individuo actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $individual = Individual::findOrFail($id);
        $individual->delete();
        
        return Redirect::route('individuals.index')->with('success', 'Individuo eliminado exitosamente.');
    }
}
