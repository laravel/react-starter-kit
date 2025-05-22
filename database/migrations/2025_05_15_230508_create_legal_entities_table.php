<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('legal_entities', function (Blueprint $table) {
            $table->id();
            $table->string('rif', 15)->unique()->comment('Registro de Información Fiscal');
            $table->string('business_name', 255)->comment('Denominación comercial');
            $table->string('trade_name', 255)->nullable()->comment('Nombre comercial');
            $table->enum('legal_entity_type', [
                'sociedad_anonima',
                'compania_anonima',
                'sociedad_de_responsabilidad_limitada',
                'cooperativa',
                'fundacion',
                'asociacion_civil',
                'otro'
            ])->comment('Tipo de entidad legal');
            $table->string('registration_number', 50)->unique()->nullable()->comment('Número de registro mercantil');
            $table->date('registration_date')->nullable()->comment('Fecha de registro mercantil');
            $table->string('fiscal_address_line_1', 255)->comment('Primera línea de dirección fiscal');
            $table->string('fiscal_address_line_2', 255)->nullable()->comment('Segunda línea de dirección fiscal');
            $table->string('fiscal_city', 100)->comment('Ciudad de dirección fiscal');
            $table->string('fiscal_state', 100)->comment('Estado de dirección fiscal');
            $table->string('fiscal_country', 100)->default('Venezuela')->comment('País de dirección fiscal');
            $table->string('email_1', 255)->unique()->nullable()->comment('Primer correo electrónico');
            $table->string('email_2', 255)->unique()->nullable()->comment('Segundo correo electrónico');
            $table->string('phone_number_1', 20)->nullable()->comment('Primer número de teléfono');
            $table->string('phone_number_2', 20)->nullable()->comment('Segundo número de teléfono');
            $table->string('website', 255)->nullable()->comment('Sitio web');
            $table->foreignId('legal_representative_id')->nullable()->constrained('individuals')->nullOnDelete()->comment('Representante legal');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legal_entities');
    }
};
