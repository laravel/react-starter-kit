<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StatusList;

final class StatusListSeeder extends Seeder
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
        foreach ($statuses as $status) {
            StatusList::firstOrCreate([
                'name' => $status
            ], [
                'description' => 'Estatus de ejemplo inicial'
            ]);
        }
    }
} 