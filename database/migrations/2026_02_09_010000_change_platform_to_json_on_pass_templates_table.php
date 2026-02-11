<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add the new JSON column
        Schema::table('pass_templates', function (Blueprint $table) {
            $table->json('platforms')->after('pass_type')->nullable();
        });

        // Migrate existing data: convert single platform string to JSON array
        DB::table('pass_templates')->get()->each(function ($template) {
            DB::table('pass_templates')
                ->where('id', $template->id)
                ->update(['platforms' => json_encode([$template->platform])]);
        });

        // Drop the old column
        Schema::table('pass_templates', function (Blueprint $table) {
            $table->dropColumn('platform');
        });

        // Make the new column non-nullable
        // SQLite doesn't support modifying columns, so we leave it nullable
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pass_templates', function (Blueprint $table) {
            $table->string('platform')->after('pass_type')->default('apple');
        });

        DB::table('pass_templates')->get()->each(function ($template) {
            $platforms = json_decode($template->platforms, true);
            DB::table('pass_templates')
                ->where('id', $template->id)
                ->update(['platform' => $platforms[0] ?? 'apple']);
        });

        Schema::table('pass_templates', function (Blueprint $table) {
            $table->dropColumn('platforms');
        });
    }
};
