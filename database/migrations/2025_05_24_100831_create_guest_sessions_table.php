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
        Schema::create('guest_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained()->onDelete('cascade');
            $table->string('email');
            $table->string('name');

            // Request Information
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();

            // Device Information
            $table->string('device_type')->nullable(); // Mobile, Desktop, Tablet
            $table->string('browser')->nullable();
            $table->string('browser_version')->nullable();
            $table->string('operating_system')->nullable();

            // Location Information
            $table->string('country')->nullable();
            $table->string('country_code', 2)->nullable();
            $table->string('region')->nullable();
            $table->string('city')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('timezone')->nullable();
            $table->string('isp')->nullable();

            // Additional Session Data
            $table->json('session_data')->nullable(); // For any additional data
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();

            // Indexes
            $table->index(['email', 'created_at']);
            $table->index(['country_code', 'created_at']);
            $table->index(['device_type', 'created_at']);
            $table->index(['ip_address', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guest_sessions');
    }
};
