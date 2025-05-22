<?php

namespace Database\Seeders;

use App\Models\CaseType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CaseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $caseTypes = [
            [
                'name' => 'Divorcio',
                'description' => 'Procedimiento legal para la disolución del vínculo matrimonial'
            ],
            [
                'name' => 'Manutención',
                'description' => 'Casos relacionados con obligaciones de manutención a menores o dependientes'
            ],
            [
                'name' => 'Título Supletorio',
                'description' => 'Procedimiento para obtener un título de propiedad cuando se carece del mismo'
            ],
            [
                'name' => 'Demanda por Daños y Perjuicios',
                'description' => 'Reclamación por daños materiales o morales causados por un tercero'
            ],
            [
                'name' => 'Partición de Herencia',
                'description' => 'Procedimiento para dividir los bienes dejados por una persona fallecida'
            ]
        ];

        foreach ($caseTypes as $caseType) {
            CaseType::create($caseType);
        }
    }
}
