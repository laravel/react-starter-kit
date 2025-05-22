<?php

namespace App\Http\Controllers;

use App\Models\LegalEntity;
use App\Models\Individual;
use App\Http\Requests\LegalEntity\StoreLegalEntityRequest;
use App\Http\Requests\LegalEntity\UpdateLegalEntityRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class LegalEntityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = LegalEntity::query();
        
        // Filtrado
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('business_name', 'like', "%{$search}%")
                  ->orWhere('trade_name', 'like', "%{$search}%")
                  ->orWhere('rif', 'like', "%{$search}%");
            });
        }
        
        $legalEntities = $query->orderBy('id', 'desc')
                              ->paginate(10)
                              ->withQueryString();
        
        return Inertia::render('LegalEntities/Index', [
            'legalEntities' => [
                'data' => $legalEntities->items(),
                'links' => [
                    'first' => $legalEntities->url(1),
                    'last' => $legalEntities->url($legalEntities->lastPage()),
                    'prev' => $legalEntities->previousPageUrl(),
                    'next' => $legalEntities->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $legalEntities->currentPage(),
                    'from' => $legalEntities->firstItem(),
                    'last_page' => $legalEntities->lastPage(),
                    'links' => $legalEntities->linkCollection()->toArray(),
                    'path' => $legalEntities->path(),
                    'per_page' => $legalEntities->perPage(),
                    'to' => $legalEntities->lastItem(),
                    'total' => $legalEntities->total(),
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
        // Obtener representantes legales potenciales
        $representatives = Individual::select('id', 'first_name', 'last_name', 'national_id')
                                    ->orderBy('last_name')
                                    ->get();
        
        return Inertia::render('LegalEntities/Create', [
            'representatives' => $representatives
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLegalEntityRequest $request)
    {
        LegalEntity::create($request->validated());
        
        return Redirect::route('legal-entities.index')->with('success', 'Entidad legal creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $legalEntity = LegalEntity::with(['legalCases.caseType', 'legalRepresentative'])->findOrFail($id);
        
        return Inertia::render('LegalEntities/Show', [
            'legalEntity' => $legalEntity
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $legalEntity = LegalEntity::findOrFail($id);
        
        // Obtener representantes legales potenciales
        $representatives = Individual::select('id', 'first_name', 'last_name', 'national_id')
                                    ->orderBy('last_name')
                                    ->get();
        
        return Inertia::render('LegalEntities/Edit', [
            'legalEntity' => $legalEntity,
            'representatives' => $representatives
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLegalEntityRequest $request, string $id)
    {
        $legalEntity = LegalEntity::findOrFail($id);
        $legalEntity->update($request->validated());
        
        return Redirect::route('legal-entities.index')->with('success', 'Entidad legal actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $legalEntity = LegalEntity::findOrFail($id);
        $legalEntity->delete();
        
        return Redirect::route('legal-entities.index')->with('success', 'Entidad legal eliminada exitosamente.');
    }
}
