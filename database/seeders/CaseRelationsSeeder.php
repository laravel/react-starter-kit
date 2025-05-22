<?php

namespace Database\Seeders;

use App\Models\Individual;
use App\Models\LegalCase;
use App\Models\LegalEntity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CaseRelationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar que existen los expedientes, individuos y entidades legales
        $legalCases = LegalCase::all();
        $individuals = Individual::all();
        $legalEntities = LegalEntity::all();
        
        if ($legalCases->isEmpty() || $individuals->isEmpty() || $legalEntities->isEmpty()) {
            $this->command->info('Se requiere que existan expedientes, individuos y entidades legales. Por favor ejecute los seeders correspondientes primero.');
            return;
        }
        
        // Para cada individuo, asignar al menos un expediente si no tiene ninguno
        foreach ($individuals as $individual) {
            if ($individual->legalCases()->count() === 0) {
                // Asignar 1-3 expedientes aleatorios
                $randomCases = $legalCases->random(rand(1, 3));
                foreach ($randomCases as $case) {
                    // Evitar duplicados
                    if (!$individual->legalCases->contains($case->id)) {
                        $individual->legalCases()->attach($case->id);
                    }
                }
            }
        }
        
        // Para cada entidad legal, asignar al menos un expediente si no tiene ninguno
        foreach ($legalEntities as $entity) {
            if ($entity->legalCases()->count() === 0) {
                // Asignar 1-2 expedientes aleatorios
                $randomCases = $legalCases->random(rand(1, 2));
                foreach ($randomCases as $case) {
                    // Evitar duplicados
                    if (!$entity->legalCases->contains($case->id)) {
                        $entity->legalCases()->attach($case->id);
                    }
                }
            }
        }
        
        // Para cada expediente, asegurar que tiene al menos un individuo y una entidad legal relacionada
        foreach ($legalCases as $case) {
            // Si no tiene individuos asociados, asociar al menos uno
            if ($case->individuals()->count() === 0) {
                $randomIndividuals = $individuals->random(rand(1, 3));
                foreach ($randomIndividuals as $individual) {
                    $case->individuals()->attach($individual->id);
                }
            }
            
            // Si no tiene entidades legales asociadas, asociar al menos una
            if ($case->legalEntities()->count() === 0) {
                $randomEntities = $legalEntities->random(rand(1, 2));
                foreach ($randomEntities as $entity) {
                    $case->legalEntities()->attach($entity->id);
                }
            }
        }
    }
} 