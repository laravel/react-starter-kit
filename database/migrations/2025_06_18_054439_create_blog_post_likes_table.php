<?php
// database/migrations/2025_06_17_create_blog_post_likes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_post_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_post_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('session_id')->nullable(); // For guest likes
            $table->ipAddress('ip_address')->nullable();
            $table->timestamps();

            $table->unique(['blog_post_id', 'user_id']);
            $table->unique(['blog_post_id', 'session_id']);
            $table->index(['blog_post_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_post_likes');
    }
};
