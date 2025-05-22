<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\LegalCase;
use App\Models\CaseType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;

final class LegalCaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        
        $query = LegalCase::with(['caseType', 'individuals', 'legalEntities']);
        
        if ($search) {
            $query->where('code', 'like', "%{$search}%");
        }
        
        $legalCases = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('LegalCases/Index', [
            'legalCases' => $legalCases,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $caseTypes = CaseType::orderBy('name')->get();
        return Inertia::render('LegalCases/Create', [
            'caseTypes' => $caseTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:legal_cases',
            'entry_date' => 'required|date',
            'case_type_id' => 'required|exists:case_types,id',
        ]);

        LegalCase::create($validated);

        return Redirect::route('legal-cases.index')
            ->with('success', 'Expediente creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $legalCase = LegalCase::with(['caseType', 'individuals', 'legalEntities'])->findOrFail($id);
        $events = $legalCase->events()->with('user')->orderByDesc('date')->get();

        // Obtener la próxima fecha importante directamente de la base de datos
        $nextImportantDate = $legalCase->importantDates()
            ->where('is_expired', false)
            ->whereDate('end_date', '>=', now()->toDateString())
            ->orderBy('end_date')
            ->first();
        
        // Depurar los datos de roles
        Log::debug('Individuos con roles:', $legalCase->individuals->map(function($individual) {
            return [
                'id' => $individual->id,
                'name' => $individual->first_name . ' ' . $individual->last_name,
                'role' => $individual->pivot->role ?? 'Sin rol definido'
            ];
        })->toArray());
        
        Log::debug('Entidades con roles:', $legalCase->legalEntities->map(function($entity) {
            return [
                'id' => $entity->id,
                'name' => $entity->business_name,
                'role' => $entity->pivot->role ?? 'Sin rol definido'
            ];
        })->toArray());
        
        return Inertia::render('LegalCases/Show', [
            'legalCase' => $legalCase,
            'events' => $events,
            'nextImportantDate' => $nextImportantDate ? [
                'id' => $nextImportantDate->id,
                'title' => $nextImportantDate->title,
                'end_date' => $nextImportantDate->end_date->toDateString(),
            ] : null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $legalCase = LegalCase::with(['caseType'])->findOrFail($id);
        $caseTypes = CaseType::orderBy('name')->get();

        return Inertia::render('LegalCases/Edit', [
            'legalCase' => $legalCase,
            'caseTypes' => $caseTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $legalCase = LegalCase::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:legal_cases,code,' . $id,
            'entry_date' => 'required|date',
            'case_type_id' => 'required|exists:case_types,id',
        ]);

        $legalCase->update($validated);

        return Redirect::route('legal-cases.index')
            ->with('success', 'Expediente actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $legalCase = LegalCase::findOrFail($id);
        $legalCase->delete();

        return Redirect::route('legal-cases.index')
            ->with('success', 'Expediente eliminado exitosamente.');
    }

    /**
     * Obtener historial de estatus del expediente.
     */
    public function statuses(string $id)
    {
        $legalCase = LegalCase::findOrFail($id);
        $statuses = $legalCase->statuses()->orderByDesc('created_at')->get();
        return response()->json($statuses);
    }

    /**
     * Cambiar el estatus del expediente.
     */
    public function setStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|string|max:255',
            'reason' => 'nullable|string|max:1000',
        ]);
        $legalCase = LegalCase::findOrFail($id);
        $legalCase->setStatus($request->input('status'), $request->input('reason'));
        return response()->json(['success' => true]);
    }

    /**
     * Listar estatus disponibles (pueden venir de la base de datos o ser configurables).
     */
    public function availableStatuses()
    {
        // Obtener los nombres de los estatus desde la nueva tabla status_lists
        $statuses = \App\Models\StatusList::orderBy('name')->pluck('name');
        return response()->json($statuses);
    }
}
