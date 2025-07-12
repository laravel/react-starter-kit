<?php

// database/migrations/xxxx_xx_xx_create_accounts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Account holder name
            $table->string('bank_name');
            $table->string('account_number');
            $table->string('iban');
            $table->string('swift_code')->nullable(); // Optional but recommended
            $table->string('currency')->default('SAR'); // Optional
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
