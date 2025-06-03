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
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('criterion_id'); // Changed to unsignedBigInteger for compatibility
            $table->text('action_ar'); // Arabic description
            $table->text('action_en'); // English description
            $table->boolean('flag')->default(true); // true = Improvement Action, false = Corrective Action
            $table->timestamps();

            // Add foreign key constraint
            $table->foreign('criterion_id')->references('id')->on('criteria')->onDelete('cascade');

            // Add index for better performance
            $table->index(['criterion_id', 'flag']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
