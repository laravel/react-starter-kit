<?php

// Database Migration - Create tool_subscriptions table
// Create a new migration file: create_tool_subscriptions_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateToolSubscriptionsTable extends Migration
{
    public function up()
    {
        Schema::create('tool_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('tool_id')->constrained()->onDelete('cascade');
            $table->enum('plan_type', ['free', 'premium'])->default('free');
            $table->enum('status', ['active', 'inactive', 'expired'])->default('active');
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('expires_at')->nullable();
            $table->json('features')->nullable();
            $table->timestamps();

            // Prevent duplicate subscriptions for same user-tool combination
            $table->unique(['user_id', 'tool_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('tool_subscriptions');
    }
}
