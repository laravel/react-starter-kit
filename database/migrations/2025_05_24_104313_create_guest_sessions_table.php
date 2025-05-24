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
        Schema::table('guest_sessions', function (Blueprint $table) {
            // Check if columns don't exist before adding them
            if (!Schema::hasColumn('guest_sessions', 'session_id')) {
                $table->string('session_id')->after('assessment_id')->index();
            }
            if (!Schema::hasColumn('guest_sessions', 'name')) {
                $table->string('name')->after('session_id');
            }
            if (!Schema::hasColumn('guest_sessions', 'email')) {
                $table->string('email')->after('name');
            }
            if (!Schema::hasColumn('guest_sessions', 'ip_address')) {
                $table->string('ip_address', 45)->nullable()->after('email');
            }
            if (!Schema::hasColumn('guest_sessions', 'user_agent')) {
                $table->text('user_agent')->nullable()->after('ip_address');
            }
            if (!Schema::hasColumn('guest_sessions', 'device_type')) {
                $table->string('device_type', 50)->nullable()->after('user_agent');
            }
            if (!Schema::hasColumn('guest_sessions', 'browser')) {
                $table->string('browser', 100)->nullable()->after('device_type');
            }
            if (!Schema::hasColumn('guest_sessions', 'browser_version')) {
                $table->string('browser_version', 50)->nullable()->after('browser');
            }
            if (!Schema::hasColumn('guest_sessions', 'operating_system')) {
                $table->string('operating_system', 100)->nullable()->after('browser_version');
            }
            if (!Schema::hasColumn('guest_sessions', 'country')) {
                $table->string('country', 100)->nullable()->after('operating_system');
            }
            if (!Schema::hasColumn('guest_sessions', 'country_code')) {
                $table->string('country_code', 2)->nullable()->after('country');
            }
            if (!Schema::hasColumn('guest_sessions', 'region')) {
                $table->string('region', 100)->nullable()->after('country_code');
            }
            if (!Schema::hasColumn('guest_sessions', 'city')) {
                $table->string('city', 100)->nullable()->after('region');
            }
            if (!Schema::hasColumn('guest_sessions', 'latitude')) {
                $table->decimal('latitude', 10, 6)->nullable()->after('city');
            }
            if (!Schema::hasColumn('guest_sessions', 'longitude')) {
                $table->decimal('longitude', 10, 6)->nullable()->after('latitude');
            }
            if (!Schema::hasColumn('guest_sessions', 'timezone')) {
                $table->string('timezone', 50)->nullable()->after('longitude');
            }
            if (!Schema::hasColumn('guest_sessions', 'isp')) {
                $table->string('isp', 255)->nullable()->after('timezone');
            }
            if (!Schema::hasColumn('guest_sessions', 'session_data')) {
                $table->json('session_data')->nullable()->after('isp');
            }
            if (!Schema::hasColumn('guest_sessions', 'started_at')) {
                $table->timestamp('started_at')->nullable()->after('session_data');
            }
            if (!Schema::hasColumn('guest_sessions', 'completed_at')) {
                $table->timestamp('completed_at')->nullable()->after('started_at');
            }
            if (!Schema::hasColumn('guest_sessions', 'last_activity')) {
                $table->timestamp('last_activity')->nullable()->after('completed_at');
            }
        });

        // Add indexes if they don't exist
        try {
            Schema::table('guest_sessions', function (Blueprint $table) {
                $table->index('ip_address');
                $table->index('started_at');
                $table->index('last_activity');
            });
        } catch (\Exception $e) {
            // Indexes might already exist, ignore the error
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('guest_sessions', function (Blueprint $table) {
            $table->dropColumn([
                'session_id', 'name', 'email', 'ip_address', 'user_agent',
                'device_type', 'browser', 'browser_version', 'operating_system',
                'country', 'country_code', 'region', 'city', 'latitude',
                'longitude', 'timezone', 'isp', 'session_data',
                'started_at', 'completed_at', 'last_activity'
            ]);
        });
    }
};
