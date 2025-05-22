<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained()->onDelete('cascade');
            $table->foreignId('domain_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('cascade');
            $table->integer('total_criteria')->default(0);
            $table->integer('applicable_criteria')->default(0);
            $table->integer('yes_count')->default(0);
            $table->integer('no_count')->default(0);
            $table->integer('na_count')->default(0);
            $table->decimal('score_percentage', 5, 2)->default(0);
            $table->decimal('weighted_score', 5, 2)->default(0);
            $table->timestamps();

            $table->index(['assessment_id', 'domain_id']);
            $table->index(['assessment_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_results');
    }
};
