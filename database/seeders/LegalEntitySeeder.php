<?php

namespace Database\Seeders;

use App\Models\LegalEntity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LegalEntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $legalEntities = [
            [
                'rif' => 'J-29876543-2',
                'business_name' => 'Inversiones Caracas, C.A.',
                'trade_name' => 'InverCaracas',
                'legal_entity_type' => 'compania_anonima',
                'registration_number' => 'Tomo 45, Folio 78',
                'registration_date' => '2010-05-20',
                'fiscal_address_line_1' => 'Av. Libertador, Edificio Centro Empresarial, Piso 5',
                'fiscal_city' => 'Caracas',
                'fiscal_state' => 'Distrito Capital',
                'email_1' => 'info@invercaracas.com.ve',
                'phone_number_1' => '0212-9876543',
                'website' => 'www.invercaracas.com.ve'
            ],
            [
                'rif' => 'J-30987654-3',
                'business_name' => 'Constructora Andes, S.R.L.',
                'trade_name' => 'CONANDES',
                'legal_entity_type' => 'sociedad_de_responsabilidad_limitada',
                'registration_number' => 'Tomo 32, Folio 56',
                'registration_date' => '2008-11-15',
                'fiscal_address_line_1' => 'Calle Sucre, Edificio Torres, Piso 3, Oficina 3-B',
                'fiscal_city' => 'Mérida',
                'fiscal_state' => 'Mérida',
                'email_1' => 'contacto@conandes.com.ve',
                'phone_number_1' => '0274-8765432',
                'website' => 'www.conandes.com.ve'
            ],
            [
                'rif' => 'J-12098765-4',
                'business_name' => 'Distribuidora Zulia, C.A.',
                'trade_name' => 'DisZulia',
                'legal_entity_type' => 'compania_anonima',
                'registration_number' => 'Tomo 67, Folio 89',
                'registration_date' => '2015-03-10',
                'fiscal_address_line_1' => 'Av. 5 de Julio, Centro Comercial Las Mercedes, Local 12',
                'fiscal_city' => 'Maracaibo',
                'fiscal_state' => 'Zulia',
                'email_1' => 'ventas@diszulia.com.ve',
                'phone_number_1' => '0261-7654321',
                'website' => 'www.diszulia.com.ve'
            ],
            [
                'rif' => 'J-45678901-5',
                'business_name' => 'Fundación Ayuda Social',
                'legal_entity_type' => 'fundacion',
                'registration_number' => 'Tomo 12, Folio 34',
                'registration_date' => '2012-09-05',
                'fiscal_address_line_1' => 'Urb. El Trigal, Calle Los Robles, Casa 45',
                'fiscal_city' => 'Valencia',
                'fiscal_state' => 'Carabobo',
                'email_1' => 'contacto@ayudasocial.org.ve',
                'phone_number_1' => '0241-6543210',
                'website' => 'www.ayudasocial.org.ve'
            ],
            [
                'rif' => 'J-56789012-6',
                'business_name' => 'Cooperativa Agrícola El Sembrador',
                'trade_name' => 'CoopSembrador',
                'legal_entity_type' => 'cooperativa',
                'registration_number' => 'Tomo 23, Folio 45',
                'registration_date' => '2014-06-18',
                'fiscal_address_line_1' => 'Carretera Nacional, Sector La Morita, Km 5',
                'fiscal_city' => 'Barquisimeto',
                'fiscal_state' => 'Lara',
                'email_1' => 'info@coopsembrador.com.ve',
                'phone_number_1' => '0251-5432109',
                'website' => 'www.coopsembrador.com.ve'
            ]
        ];

        foreach ($legalEntities as $legalEntity) {
            LegalEntity::create($legalEntity);
        }
    }
}
