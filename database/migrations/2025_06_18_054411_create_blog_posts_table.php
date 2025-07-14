<?php
// database/migrations/2025_06_17_create_blog_posts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_ar')->nullable();
            $table->string('slug')->unique();
            $table->text('excerpt');
            $table->text('excerpt_ar')->nullable();
            $table->longText('content');
            $table->longText('content_ar')->nullable();
            $table->string('featured_image')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->json('tags')->nullable();
            $table->json('meta_data')->nullable(); // SEO and other metadata
            $table->timestamp('published_at')->nullable();
            $table->foreignId('author_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('views_count')->default(0);
            $table->unsignedInteger('likes_count')->default(0);
            $table->unsignedInteger('comments_count')->default(0);
            $table->timestamps();

            $table->index(['status', 'published_at']);
            $table->index('author_id');
            if (Schema::getConnection()->getDriverName() !== 'sqlite') {
                $table->fullText(['title', 'excerpt', 'content']);
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
