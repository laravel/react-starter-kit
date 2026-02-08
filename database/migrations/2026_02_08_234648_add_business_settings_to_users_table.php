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
        Schema::table('users', function (Blueprint $table) {
            // Business Information
            $table->string('business_name')->nullable();
            $table->text('business_address')->nullable();
            $table->string('business_phone')->nullable();
            $table->string('business_email')->nullable();
            $table->string('business_website')->nullable();

            // Google Wallet Configuration
            $table->text('google_service_account_json')->nullable();
            $table->string('google_issuer_id')->nullable();

            // Apple Wallet Configuration
            $table->text('apple_certificate')->nullable();
            $table->text('apple_certificate_password')->nullable();
            $table->string('apple_team_id')->nullable();
            $table->string('apple_pass_type_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'business_name',
                'business_address',
                'business_phone',
                'business_email',
                'business_website',
                'google_service_account_json',
                'google_issuer_id',
                'apple_certificate',
                'apple_certificate_password',
                'apple_team_id',
                'apple_pass_type_id',
            ]);
        });
    }
};
