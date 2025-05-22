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
        Schema::create('case_individuals', function (Blueprint $table) {
            $table->foreignId('legal_case_id')->constrained()->onDelete('cascade')->comment('ID del caso legal relacionado');
            $table->foreignId('individual_id')->constrained()->onDelete('cascade')->comment('ID del individuo relacionado');
            $table->primary(['legal_case_id', 'individual_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_individuals');
    }
};
