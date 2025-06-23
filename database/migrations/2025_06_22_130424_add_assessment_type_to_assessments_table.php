<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddAssessmentTypeToAssessmentsTable extends Migration
{ public function up()
{
    Schema::table('tools', function (Blueprint $table) {
        $table->boolean('has_free_plan')->default(false)->after('status');

        // Add index for better query performance
        $table->index(['is_active', 'has_free_plan']);
    });

    // Enable free plan for first tool as example
    DB::table('tools')->limit(1)->update(['has_free_plan' => true]);
}

    public function down()
    {
        Schema::table('tools', function (Blueprint $table) {
            $table->dropIndex(['status', 'has_free_plan']);
            $table->dropColumn('has_free_plan');
        });
    }
}
