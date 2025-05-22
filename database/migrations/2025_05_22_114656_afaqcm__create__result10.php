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
        Schema::table('assessments', function (Blueprint $table) {
            $table->timestamp('started_at')->nullable()->after('status');
            $table->timestamp('completed_at')->nullable()->after('started_at');
        });

        Schema::table('assessment_responses', function (Blueprint $table) {
            // Add the new response column
            $table->enum('response', ['yes', 'no', 'na'])->after('criterion_id');

            // Add unique constraint to prevent duplicate responses
            $table->unique(['assessment_id', 'criterion_id'], 'unique_assessment_criterion');
        });

        // Migrate existing data from is_available to response
        DB::table('assessment_responses')->update([
            'response' => DB::raw("
                CASE
                    WHEN is_available = 1 THEN 'yes'
                    WHEN is_available = 0 THEN 'no'
                    WHEN is_available IS NULL THEN 'na'
                    ELSE 'na'
                END
            ")
        ]);

        // Drop the old column after data migration
        Schema::table('assessment_responses', function (Blueprint $table) {
            $table->dropColumn('is_available');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->dropColumn(['started_at', 'completed_at']);
        });

        Schema::table('assessment_responses', function (Blueprint $table) {
            // Add back the is_available column
            $table->boolean('is_available')->nullable()->after('criterion_id');

            // Drop the unique constraint
            $table->dropUnique('unique_assessment_criterion');
        });

        // Migrate data back from response to is_available
        DB::table('assessment_responses')->update([
            'is_available' => DB::raw("
                CASE
                    WHEN response = 'yes' THEN 1
                    WHEN response = 'no' THEN 0
                    WHEN response = 'na' THEN NULL
                    ELSE NULL
                END
            ")
        ]);

        // Drop the response column
        Schema::table('assessment_responses', function (Blueprint $table) {
            $table->dropColumn('response');
        });
    }
};
