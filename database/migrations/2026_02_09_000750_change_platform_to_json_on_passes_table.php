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
        Schema::table('passes', function (Blueprint $table) {
            $table->json('platforms')->nullable()->after('pass_template_id');
        });

        // Migrate existing data: convert single platform string to JSON array
        DB::table('passes')->whereNotNull('platform')->chunkById(100, function ($passes) {
            foreach ($passes as $pass) {
                DB::table('passes')->where('id', $pass->id)->update([
                    'platforms' => json_encode([$pass->platform]),
                ]);
            }
        });

        Schema::table('passes', function (Blueprint $table) {
            $table->dropIndex('passes_user_id_platform_status_index');
            $table->dropColumn('platform');
        });

        Schema::table('passes', function (Blueprint $table) {
            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('passes', function (Blueprint $table) {
            $table->string('platform')->nullable()->after('pass_template_id');
        });

        // Migrate back: take first platform from JSON array
        DB::table('passes')->whereNotNull('platforms')->chunkById(100, function ($passes) {
            foreach ($passes as $pass) {
                $platforms = json_decode($pass->platforms, true);
                DB::table('passes')->where('id', $pass->id)->update([
                    'platform' => $platforms[0] ?? 'apple',
                ]);
            }
        });

        Schema::table('passes', function (Blueprint $table) {
            $table->dropIndex('passes_user_id_status_index');
            $table->dropColumn('platforms');
        });

        Schema::table('passes', function (Blueprint $table) {
            $table->index(['user_id', 'platform', 'status'], 'passes_user_id_platform_status_index');
        });
    }
};
