<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\ModelStatus\Status;
use App\Models\LegalCase;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            'EN TRAMITE',
            'EN FASE DE SUSTANCIACIÓN',
            'EN FASE DE SENTENCIA DENTRO DEL LAPSO',
            'EN FASE DE SENTENCIA FUERA DEL LAPSO',
            'EN FASE DE NOTIFICACIÓN, INTERPOSICIÓN DE RECURSO',
            'EN FASE DE EJECUCIÓN DE SENTENCIA',
            'DISTRIBUIDOS SIN ACEPTAR',
            'DISTRIBUIDOS Y ACEPTADOS SIN AUTO DE ADMISIÓN',
            'EXPEDIENTES PROVENIENTES DE ARCHIVO JUDICIAL',
            'SUSPENDIDOS',
            'PARALIZADOS',
            'PARALIZADOS EN EJECUCIÓN DE SENTENCIA',
            'TERMINADOS',
            'TERMINADOS POR REMITIR AL ARCHIVO JUDICIAL',
        ];

        // Crear un expediente de ejemplo si no existe
        $case = LegalCase::first();
        if (!$case) {
            $case = LegalCase::factory()->create();
        }

        // Asignar cada estatus al expediente de ejemplo
        foreach ($statuses as $status) {
            $case->setStatus($status, 'Estatus de ejemplo inicial');
        }
    }
} 