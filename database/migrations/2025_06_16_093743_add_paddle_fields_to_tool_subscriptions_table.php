<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('tool_subscriptions', function (Blueprint $table) {
            $table->string('paddle_subscription_id')->nullable();
            $table->string('paddle_customer_id')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->json('paddle_data')->nullable(); // Store additional Paddle data
        });
    }

    public function down()
    {
        Schema::table('tool_subscriptions', function (Blueprint $table) {
            $table->dropColumn([
                'paddle_subscription_id',
                'paddle_customer_id',
                'amount',
                'currency',
                'paddle_data',
            ]);
        });
    }
};
