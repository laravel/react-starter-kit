<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Update domains table
        Schema::table('domains', function (Blueprint $table) {
            $table->decimal('weight_percentage', 5, 2)->nullable()->after('name_ar');
        });

        // Update categories table
        Schema::table('categories', function (Blueprint $table) {
            $table->decimal('weight_percentage', 5, 2)->nullable()->after('name_ar');
        });


    }

    public function down(): void
    {
        Schema::table('domains', function (Blueprint $table) {
            $table->dropColumn(['weight_percentage',]);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['weight_percentage',]);
        });



    }
};
