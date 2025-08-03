<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateToolPerformanceLevelsTable extends Migration
{
    public function up()
    {
        Schema::create('tool_performance_levels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tool_id')->constrained('tools')->onDelete('cascade');
            $table->string('code');            // e.g. 'excellent', 'good', etc.
            $table->float('min_percentage');   // e.g. 90, 75, 60, etc.
            $table->string('color', 7);        // Color code like '#28a745'
            $table->string('name_en');
            $table->string('name_ar');
            $table->string('text_en')->nullable();
            $table->string('text_ar')->nullable();
            $table->text('recommendation_en')->nullable();
            $table->text('recommendation_ar')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tool_performance_levels');
    }
}
