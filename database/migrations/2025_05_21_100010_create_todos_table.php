<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('todo_list_id');
            $table->string('title');
            $table->boolean('is_completed')->default(false);
            $table->timestamps();

            $table->foreign('todo_list_id')->references('id')->on('todo_lists')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
}; 