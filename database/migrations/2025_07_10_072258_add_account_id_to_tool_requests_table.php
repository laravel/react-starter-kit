<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasTable('tool_requests')) {
            Schema::table('tool_requests', function (Blueprint $table) {
                $table->foreignId('account_id')->nullable()->constrained()->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('tool_requests')) {
            Schema::table('tool_requests', function (Blueprint $table) {
                $table->dropConstrainedForeignId('account_id');
            });
        }
    }
};

