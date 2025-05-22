<?php

namespace Database\Seeders;

use App\Models\Individual;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndividualSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $individuals = [
            [
                'national_id' => 'V-12345678',
                'first_name' => 'María',
                'middle_name' => 'José',
                'last_name' => 'Rodríguez',
                'second_last_name' => 'Gómez',
                'birth_date' => '1980-05-15',
                'gender' => 'female',
                'civil_status' => 'married',
                'rif' => 'V-123456789',
                'email_1' => 'maria.rodriguez@ejemplo.com',
                'phone_number_1' => '0414-1234567',
                'address_line_1' => 'Av. Francisco de Miranda',
                'city' => 'Caracas',
                'state' => 'Distrito Capital',
                'occupation' => 'Abogada'
            ],
            [
                'national_id' => 'V-23456789',
                'first_name' => 'Carlos',
                'middle_name' => 'Eduardo',
                'last_name' => 'Pérez',
                'second_last_name' => 'Martínez',
                'birth_date' => '1975-10-22',
                'gender' => 'male',
                'civil_status' => 'divorced',
                'rif' => 'V-234567890',
                'email_1' => 'carlos.perez@ejemplo.com',
                'phone_number_1' => '0424-2345678',
                'address_line_1' => 'Urb. El Paraíso',
                'city' => 'Maracaibo',
                'state' => 'Zulia',
                'occupation' => 'Ingeniero'
            ],
            [
                'national_id' => 'V-34567890',
                'first_name' => 'Ana',
                'last_name' => 'González',
                'second_last_name' => 'Fernández',
                'birth_date' => '1990-03-08',
                'gender' => 'female',
                'civil_status' => 'single',
                'email_1' => 'ana.gonzalez@ejemplo.com',
                'phone_number_1' => '0412-3456789',
                'address_line_1' => 'Calle Bolívar',
                'city' => 'Valencia',
                'state' => 'Carabobo',
                'occupation' => 'Médico'
            ],
            [
                'national_id' => 'V-45678901',
                'first_name' => 'Luis',
                'middle_name' => 'Alberto',
                'last_name' => 'Ramírez',
                'birth_date' => '1985-07-30',
                'gender' => 'male',
                'civil_status' => 'married',
                'rif' => 'V-456789012',
                'email_1' => 'luis.ramirez@ejemplo.com',
                'phone_number_1' => '0416-4567890',
                'address_line_1' => 'Urb. Las Mercedes',
                'city' => 'Barquisimeto',
                'state' => 'Lara',
                'occupation' => 'Arquitecto'
            ],
            [
                'national_id' => 'V-56789012',
                'first_name' => 'Pedro',
                'last_name' => 'Mendoza',
                'second_last_name' => 'Rivera',
                'birth_date' => '1978-12-10',
                'gender' => 'male',
                'civil_status' => 'widowed',
                'email_1' => 'pedro.mendoza@ejemplo.com',
                'phone_number_1' => '0426-5678901',
                'address_line_1' => 'Av. Libertador',
                'city' => 'Mérida',
                'state' => 'Mérida',
                'occupation' => 'Profesor'
            ]
        ];

        foreach ($individuals as $individual) {
            Individual::create($individual);
        }
    }
}
