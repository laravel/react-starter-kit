<?php

namespace Database\Seeders;

use App\Models\CaseType;
use App\Models\Individual;
use App\Models\LegalCase;
use App\Models\LegalEntity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LegalCaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar que existen los tipos de casos
        $caseTypes = CaseType::all();
        if ($caseTypes->isEmpty()) {
            $this->command->info('Se requieren tipos de casos para crear expedientes. Por favor ejecute primero CaseTypeSeeder.');
            return;
        }

        // Verificar que existen individuos
        $individuals = Individual::all();
        if ($individuals->isEmpty()) {
            $this->command->info('Se requieren individuos para asociar a los expedientes. Por favor ejecute primero IndividualSeeder.');
            return;
        }

        // Verificar que existen entidades legales
        $legalEntities = LegalEntity::all();
        if ($legalEntities->isEmpty()) {
            $this->command->info('Se requieren entidades legales para asociar a los expedientes. Por favor ejecute primero LegalEntitySeeder.');
            return;
        }

        // Crear algunos expedientes de ejemplo
        $legalCases = [
            [
                'code' => 'EXP-2023-001',
                'entry_date' => '2023-01-15',
                'case_type_id' => $caseTypes->where('name', 'Divorcio')->first()->id,
                'sentence_date' => '2023-06-20',
                'closing_date' => '2023-07-05'
            ],
            [
                'code' => 'EXP-2023-002',
                'entry_date' => '2023-02-10',
                'case_type_id' => $caseTypes->where('name', 'Manutención')->first()->id,
                'sentence_date' => null,
                'closing_date' => null
            ],
            [
                'code' => 'EXP-2023-003',
                'entry_date' => '2023-03-05',
                'case_type_id' => $caseTypes->where('name', 'Título Supletorio')->first()->id,
                'sentence_date' => '2023-09-15',
                'closing_date' => null
            ],
            [
                'code' => 'EXP-2023-004',
                'entry_date' => '2023-04-20',
                'case_type_id' => $caseTypes->where('name', 'Demanda por Daños y Perjuicios')->first()->id,
                'sentence_date' => null,
                'closing_date' => null
            ],
            [
                'code' => 'EXP-2023-005',
                'entry_date' => '2023-05-12',
                'case_type_id' => $caseTypes->where('name', 'Partición de Herencia')->first()->id,
                'sentence_date' => null,
                'closing_date' => null
            ]
        ];

        foreach ($legalCases as $legalCaseData) {
            // Crear caso legal
            $legalCase = LegalCase::create($legalCaseData);

            // Asociar individuos (aleatorios)
            $randomIndividuals = $individuals->random(rand(1, 3));
            foreach ($randomIndividuals as $individual) {
                $legalCase->individuals()->attach($individual->id);
            }

            // Asociar entidades legales (aleatorias, pueden no tener)
            if (rand(0, 1)) { // 50% de probabilidad
                $randomLegalEntities = $legalEntities->random(rand(1, 2));
                foreach ($randomLegalEntities as $legalEntity) {
                    $legalCase->legalEntities()->attach($legalEntity->id);
                }
            }
        }
    }
}
