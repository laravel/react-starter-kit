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
        Schema::create('passes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('pass_template_id')->nullable()->constrained('pass_templates')->nullOnDelete();
            $table->string('platform');
            $table->string('pass_type');
            $table->string('serial_number')->unique();
            $table->string('status')->default('active');
            $table->json('pass_data');
            $table->json('barcode_data')->nullable();
            $table->json('images')->nullable();
            $table->string('pkpass_path')->nullable();
            $table->text('google_save_url')->nullable();
            $table->string('google_class_id')->nullable();
            $table->string('google_object_id')->nullable();
            $table->timestamp('last_generated_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'platform', 'status']);
            $table->index('serial_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passes');
    }
};
