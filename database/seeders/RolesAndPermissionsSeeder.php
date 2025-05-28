<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Assessment permissions
            'view_assessments',
            'create_assessments',
            'edit_assessments',
            'delete_assessments',
            'unlimited_assessments',

            // Report permissions
            'view_basic_reports',
            'view_full_reports',
            'download_reports',
            'export_reports',

            // Dashboard permissions
            'view_dashboard',
            'view_analytics',
            'view_advanced_analytics',

            // User management permissions
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'manage_subscriptions',

            // Admin permissions
            'access_admin_panel',
            'manage_system_settings',
            'view_system_logs',

            // API permissions
            'access_api',
            'manage_api_keys',

            // Team permissions
            'manage_team',
            'invite_team_members',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions

        // Super Admin Role
        $superAdmin = Role::create(['name' => 'super_admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Premium Role
        $premium = Role::create(['name' => 'premium']);
        $premium->givePermissionTo([
            'view_assessments',
            'create_assessments',
            'edit_assessments',
            'delete_assessments',
            'unlimited_assessments',
            'view_full_reports',
            'download_reports',
            'export_reports',
            'view_dashboard',
            'view_analytics',
            'view_advanced_analytics',
            'access_api',
            'manage_team',
            'invite_team_members',
        ]);

        // Free Role
        $free = Role::create(['name' => 'free']);
        $free->givePermissionTo([
            'view_assessments',
            'create_assessments',
            'edit_assessments',
            'view_basic_reports',
            'download_reports',
        ]);

        // Create default admin user if it doesn't exist
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@afaqcm.com'],
            [
                'name' => 'System Administrator',
                'email_verified_at' => now(),
                'password' => bcrypt('admin123!@#'),
            ]
        );

        // Assign super admin role
        $adminUser->assignRole('super_admin');

        // Create admin user details
        $adminUser->details()->firstOrCreate([
            'user_id' => $adminUser->id
        ], [
            'phone' => '+966501234567',
            'company_name' => 'AFAQ CM',
            'company_type' => 'service',
            'position' => 'System Administrator',
            'preferred_language' => 'en',
        ]);

        // Create admin subscription
        $adminUser->subscriptions()->firstOrCreate([
            'user_id' => $adminUser->id
        ], [
            'plan_type' => 'premium',
            'status' => 'active',
            'started_at' => now(),
            'expires_at' => null, // Never expires for admin
            'features' => [
                'assessments_limit' => null,
                'pdf_reports' => 'full',
                'advanced_analytics' => true,
                'team_management' => true,
                'api_access' => true,
                'priority_support' => true,
                'custom_branding' => true,
                'admin_access' => true,
            ]
        ]);

        $this->command->info('Roles and permissions created successfully!');
        $this->command->info('Default admin user created with email: admin@afaqcm.com and password: admin123!@#');
    }
}
