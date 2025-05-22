<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('tools', function (Blueprint $table) {
    $table->id();
    $table->string('name_en');
    $table->string('name_ar');
    $table->text('description_en')->nullable();
    $table->text('description_ar')->nullable();
    $table->string('image')->nullable();
    $table->enum('status', ['active', 'inactive'])->default('active');
    $table->timestamps();
    });

    Schema::create('domains', function (Blueprint $table) {
    $table->id();
    $table->foreignId('tool_id')->constrained()->cascadeOnDelete();
    $table->string('name_en');
    $table->string('name_ar');
    $table->text('description_en')->nullable();
    $table->text('description_ar')->nullable();
    $table->integer('order')->default(0);
    $table->enum('status', ['active', 'inactive'])->default('active');
    $table->timestamps();
    });

    Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->foreignId('domain_id')->constrained()->cascadeOnDelete();
    $table->string('name_en');
    $table->string('name_ar');
    $table->text('description_en')->nullable();
    $table->text('description_ar')->nullable();
    $table->integer('order')->default(0);
    $table->enum('status', ['active', 'inactive'])->default('active');
    $table->timestamps();
    });

    Schema::create('criteria', function (Blueprint $table) {
    $table->id();
    $table->foreignId('category_id')->constrained()->cascadeOnDelete();
    $table->string('name_en');
    $table->string('name_ar');
    $table->text('description_en')->nullable();
    $table->text('description_ar')->nullable();
    $table->integer('order')->default(0);
    $table->enum('status', ['active', 'inactive'])->default('active');
    $table->timestamps();
    });

    Schema::create('assessments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('tool_id')->constrained();
    $table->foreignId('user_id')->nullable()->constrained();
    $table->string('guest_email')->nullable();
    $table->string('guest_name')->nullable();
    $table->string('organization')->nullable();
    $table->enum('status', ['draft', 'completed', 'in_progress', 'archived'])->default('draft');
    $table->timestamps();
    });

    Schema::create('assessment_responses', function (Blueprint $table) {
    $table->id();
    $table->foreignId('assessment_id')->constrained()->cascadeOnDelete();
    $table->foreignId('criterion_id')->constrained();
    $table->boolean('is_available')->default(false);
    $table->text('notes')->nullable();
    $table->timestamps();
    });

    // Add premium_until field to users table
    Schema::table('users', function (Blueprint $table) {
    $table->timestamp('premium_until')->nullable();
    });
    }

    public function down(): void
    {
    Schema::dropIfExists('assessment_responses');
    Schema::dropIfExists('assessments');
    Schema::dropIfExists('criteria');
    Schema::dropIfExists('categories');
    Schema::dropIfExists('domains');
    Schema::dropIfExists('tools');

    Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('premium_until');
    });
    }
    };
