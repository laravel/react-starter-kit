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
        Schema::create('case_legal_entities', function (Blueprint $table) {
            $table->foreignId('legal_case_id')->constrained()->onDelete('cascade')->comment('ID del caso legal relacionado');
            $table->foreignId('legal_entity_id')->constrained()->onDelete('cascade')->comment('ID de la entidad legal relacionada');
            $table->primary(['legal_case_id', 'legal_entity_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_legal_entities');
    }
};
