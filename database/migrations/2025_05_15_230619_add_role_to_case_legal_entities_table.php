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
        Schema::table('case_legal_entities', function (Blueprint $table) {
            $table->string('role')->nullable()->after('legal_case_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('case_legal_entities', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
}; 