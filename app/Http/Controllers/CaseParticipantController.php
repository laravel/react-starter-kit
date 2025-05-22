<?php

namespace App\Http\Controllers;

use App\Models\Individual;
use App\Models\LegalCase;
use App\Models\LegalEntity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Searchable\Search;

class CaseParticipantController extends Controller
{
    /**
     * Muestra el formulario para asociar un nuevo participante a un caso
     */
    public function addForm($caseId)
    {
        $legalCase = LegalCase::findOrFail($caseId);
        
        $rolesDisponibles = [
            'Juez',
            'Solicitante',
            'Demandado',
            'Abogado de Solicitante',
            'Abogado de Demandado',
            'Testigo'
        ];

        return Inertia::render('LegalCases/AddParticipant', [
            'legalCase' => $legalCase,
            'availableRoles' => $rolesDisponibles
        ]);
    }

    /**
     * Busca personas o entidades para asociar
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|min:2|max:50',
        ]);

        $results = (new Search())
            ->registerModel(Individual::class, ['first_name', 'last_name', 'national_id'])
            ->registerModel(LegalEntity::class, ['business_name', 'trade_name', 'rif'])
            ->search($validated['query']);

        return response()->json([
            'results' => $results->map(function ($result) {
                $model = $result->searchable;
                
                // Determinar el tipo y los datos según el modelo
                if ($model instanceof Individual) {
                    $fullName = trim("{$model->first_name} {$model->middle_name} {$model->last_name} {$model->second_last_name}");
                    return [
                        'id' => $model->id,
                        'type' => 'individual',
                        'name' => $fullName,
                        'identifier' => $model->national_id,
                    ];
                } elseif ($model instanceof LegalEntity) {
                    $name = $model->trade_name 
                        ? "{$model->business_name} ({$model->trade_name})"
                        : $model->business_name;
                    return [
                        'id' => $model->id,
                        'type' => 'entity',
                        'name' => $name,
                        'identifier' => $model->rif,
                    ];
                }
            })
        ]);
    }

    /**
     * Asocia un participante (Individual o LegalEntity) a un caso legal
     */
    public function associate(Request $request, $caseId)
    {
        $validated = $request->validate([
            'type' => 'required|in:individual,entity',
            'id' => 'required|numeric',
            'role' => 'required|string|max:100',
        ]);

        $legalCase = LegalCase::findOrFail($caseId);

        if ($validated['type'] === 'individual') {
            $individual = Individual::findOrFail($validated['id']);
            
            // Verificar si ya está asociado
            if (!$legalCase->individuals()->where('individual_id', $individual->id)->exists()) {
                $legalCase->individuals()->attach($individual->id, ['role' => $validated['role']]);
            } else {
                // Actualizar el rol si ya existe
                $legalCase->individuals()->updateExistingPivot($individual->id, ['role' => $validated['role']]);
            }
        } else {
            $entity = LegalEntity::findOrFail($validated['id']);
            
            // Verificar si ya está asociado
            if (!$legalCase->legalEntities()->where('legal_entity_id', $entity->id)->exists()) {
                $legalCase->legalEntities()->attach($entity->id, ['role' => $validated['role']]);
            } else {
                // Actualizar el rol si ya existe
                $legalCase->legalEntities()->updateExistingPivot($entity->id, ['role' => $validated['role']]);
            }
        }

        return Redirect::route('legal-cases.show', $legalCase->id)
            ->with('success', 'Participante asociado correctamente al expediente.');
    }

    /**
     * Elimina la asociación de un participante con un caso legal
     */
    public function remove(Request $request, $caseId)
    {
        $validated = $request->validate([
            'type' => 'required|in:individual,entity',
            'id' => 'required|numeric',
        ]);

        $legalCase = LegalCase::findOrFail($caseId);

        if ($validated['type'] === 'individual') {
            $legalCase->individuals()->detach($validated['id']);
        } else {
            $legalCase->legalEntities()->detach($validated['id']);
        }

        return Redirect::route('legal-cases.show', $legalCase->id)
            ->with('success', 'Participante eliminado correctamente del expediente.');
    }
} 