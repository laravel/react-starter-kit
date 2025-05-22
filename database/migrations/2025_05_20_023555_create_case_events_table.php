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
        Schema::create('case_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('legal_case_id')->constrained()->onDelete('cascade')->comment('Expediente relacionado');
            $table->foreignId('user_id')->constrained()->comment('Usuario que registra el evento');
            $table->string('title')->comment('Título del evento');
            $table->text('description')->comment('Descripción detallada del evento');
            $table->date('date')->comment('Fecha del evento');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_events');
    }
};
