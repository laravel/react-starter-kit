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
        // Create user_details table
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->enum('company_type', ['commercial', 'government', 'service'])->nullable();
            $table->string('company_name')->nullable();
            $table->string('city')->nullable();
            $table->string('position')->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('country')->nullable();
            $table->string('industry')->nullable();
            $table->integer('company_size')->nullable(); // Number of employees
            $table->year('established_year')->nullable();
            $table->decimal('annual_revenue', 15, 2)->nullable();
            // Social links
            $table->string('linkedin_profile')->nullable();
            $table->string('twitter_profile')->nullable();
            $table->string('facebook_profile')->nullable();
            // Preferences
            $table->string('preferred_language', 5)->default('en');
            $table->string('timezone')->nullable();
            $table->json('communication_preferences')->nullable(); // email, sms, whatsapp preferences
            $table->json('interests')->nullable(); // Areas of interest
            // Marketing
            $table->string('how_did_you_hear')->nullable(); // How they found us
            $table->boolean('marketing_emails')->default(true);
            $table->boolean('newsletter_subscription')->default(false);
            $table->timestamps();

            // Indexes
            $table->index('phone');
            $table->index('company_name');
            $table->index('city');
            $table->index('country');
            $table->index('industry');
        });

        // Create user_subscriptions table
        Schema::create('user_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('plan_type', ['free', 'premium'])->default('free');
            $table->enum('status', ['active', 'expired', 'cancelled', 'pending'])->default('active');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->string('payment_method')->nullable(); // stripe, paypal, bank_transfer, etc.
            $table->string('payment_reference')->nullable();
            $table->json('features')->nullable(); // What features this subscription includes
            $table->text('notes')->nullable(); // Admin notes
            $table->timestamp('cancelled_at')->nullable();
            $table->string('cancelled_reason')->nullable();
            $table->timestamps();

            // Indexes
            $table->index(['user_id', 'status']);
            $table->index(['plan_type', 'status']);
            $table->index('expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_subscriptions');
        Schema::dropIfExists('user_details');
    }
};
