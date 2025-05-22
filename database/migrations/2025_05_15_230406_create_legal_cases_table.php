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
        if (!Schema::hasTable('legal_cases')) {
            Schema::create('legal_cases', function (Blueprint $table) {
                $table->id();
                $table->string('code', 50)->unique();
                $table->date('entry_date');
                $table->foreignId('case_type_id')->constrained()->onDelete('cascade');
                $table->date('sentence_date')->nullable();
                $table->date('closing_date')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No eliminamos la tabla aquí para evitar conflictos con otras migraciones
    }
};
