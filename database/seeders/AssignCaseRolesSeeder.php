<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AssignCaseRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar que las tablas existan antes de intentar actualizarlas
        if (!Schema::hasTable('case_individuals') || !Schema::hasTable('case_legal_entities')) {
            $this->command->error('Las tablas case_individuals o case_legal_entities no existen.');
            return;
        }
        
        // Verificar que existan relaciones para asignar roles
        $caseIndividualsCount = DB::table('case_individuals')->count();
        $caseLegalEntitiesCount = DB::table('case_legal_entities')->count();
        
        if ($caseIndividualsCount === 0 && $caseLegalEntitiesCount === 0) {
            $this->command->error('No existen relaciones en las tablas de case_individuals o case_legal_entities para asignar roles.');
            return;
        }
        
        $this->command->info('Asignando roles a personas naturales relacionadas con expedientes...');
        
        // Obtener todos los individuos relacionados con casos
        $caseIndividuals = DB::table('case_individuals')->get();
        
        // Agrupar por caso para asignar roles específicos por caso
        $caseIndividualsGrouped = $caseIndividuals->groupBy('legal_case_id');
        
        foreach ($caseIndividualsGrouped as $legalCaseId => $individuals) {
            $count = 0;
            
            foreach ($individuals as $individual) {
                $role = $this->assignRoleForIndividual($count);
                
                DB::table('case_individuals')
                    ->where('individual_id', $individual->individual_id)
                    ->where('legal_case_id', $individual->legal_case_id)
                    ->update(['role' => $role]);
                
                $count++;
            }
        }
        
        $this->command->info('Asignando roles a personas jurídicas relacionadas con expedientes...');
        
        // Obtener todas las entidades legales relacionadas con casos
        $caseLegalEntities = DB::table('case_legal_entities')->get();
        
        // Agrupar por caso para asignar roles específicos por caso
        $caseLegalEntitiesGrouped = $caseLegalEntities->groupBy('legal_case_id');
        
        foreach ($caseLegalEntitiesGrouped as $legalCaseId => $entities) {
            $count = 0;
            
            foreach ($entities as $entity) {
                $role = $this->assignRoleForLegalEntity($count);
                
                DB::table('case_legal_entities')
                    ->where('legal_entity_id', $entity->legal_entity_id)
                    ->where('legal_case_id', $entity->legal_case_id)
                    ->update(['role' => $role]);
                
                $count++;
            }
        }
        
        $this->command->info('Roles asignados correctamente.');
    }
    
    /**
     * Asigna un rol específico a un individuo basado en su posición en el caso
     */
    private function assignRoleForIndividual(int $position): string
    {
        return match($position) {
            0 => 'Juez',
            1 => 'Solicitante',
            2 => 'Abogado de Solicitante',
            3 => 'Demandado',
            4 => 'Abogado de Demandado',
            default => 'Testigo',
        };
    }
    
    /**
     * Asigna un rol específico a una entidad legal basado en su posición en el caso
     */
    private function assignRoleForLegalEntity(int $position): string
    {
        return match($position) {
            0 => 'Demandado',
            1 => 'Solicitante',
            default => 'Parte interesada',
        };
    }
}
