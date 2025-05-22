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
        Schema::create('individuals', function (Blueprint $table) {
            $table->id();
            $table->string('national_id', 20)->unique()->comment('Cédula de Identidad venezolana');
            $table->string('passport', 30)->unique()->nullable()->comment('Número de pasaporte');
            $table->string('first_name', 100)->comment('Primer nombre del individuo');
            $table->string('middle_name', 100)->nullable()->comment('Segundo nombre del individuo');
            $table->string('last_name', 100)->comment('Primer apellido del individuo');
            $table->string('second_last_name', 100)->nullable()->comment('Segundo apellido del individuo');
            $table->date('birth_date')->nullable()->comment('Fecha de nacimiento');
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->comment('Género');
            $table->enum('civil_status', ['single', 'married', 'divorced', 'widowed', 'cohabiting'])->nullable()->comment('Estado civil');
            $table->string('rif', 15)->unique()->nullable()->comment('Registro de Información Fiscal');
            $table->string('email_1', 255)->unique()->nullable()->comment('Primer correo electrónico');
            $table->string('email_2', 255)->unique()->nullable()->comment('Segundo correo electrónico');
            $table->string('phone_number_1', 20)->nullable()->comment('Primer número de teléfono');
            $table->string('phone_number_2', 20)->nullable()->comment('Segundo número de teléfono');
            $table->string('address_line_1', 255)->nullable()->comment('Primera línea de dirección');
            $table->string('address_line_2', 255)->nullable()->comment('Segunda línea de dirección');
            $table->string('city', 100)->nullable()->comment('Ciudad de residencia');
            $table->string('state', 100)->nullable()->comment('Estado de residencia');
            $table->string('country', 100)->default('Venezuela')->comment('País de residencia');
            $table->string('nationality', 100)->default('Venezolana')->comment('Nacionalidad');
            $table->string('occupation', 100)->nullable()->comment('Profesión u ocupación');
            $table->string('educational_level', 100)->nullable()->comment('Nivel educativo');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('individuals');
    }
};
