<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\CaseEvent;
use App\Models\LegalCase;
use App\Models\User;
use Illuminate\Database\Seeder;

final class CaseEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $legalCases = LegalCase::take(2)->get();
        $user = User::first();

        if ($legalCases->isEmpty() || !$user) {
            $this->command->warn('No hay casos legales o usuarios para asociar eventos.');
            return;
        }

        foreach ($legalCases as $case) {
            CaseEvent::create([
                'legal_case_id' => $case->id,
                'user_id' => $user->id,
                'title' => 'Apertura del expediente',
                'description' => 'Se procede a la apertura formal del expediente legal.',
                'date' => now()->subDays(10),
            ]);
            CaseEvent::create([
                'legal_case_id' => $case->id,
                'user_id' => $user->id,
                'title' => 'Asignación de juez',
                'description' => 'Se asigna el juez encargado del caso.',
                'date' => now()->subDays(8),
            ]);
            CaseEvent::create([
                'legal_case_id' => $case->id,
                'user_id' => $user->id,
                'title' => 'Notificación a las partes',
                'description' => 'Se procede a notificar a todas las partes involucradas.',
                'date' => now()->subDays(5),
            ]);
        }
    }
}
