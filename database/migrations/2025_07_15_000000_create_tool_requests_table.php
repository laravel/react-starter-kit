<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tool_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('tool_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('organization')->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'quoted', 'done'])->default('pending');
            $table->timestamp('quotation_sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tool_requests');
    }
};
