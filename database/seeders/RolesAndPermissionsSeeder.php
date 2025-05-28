<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

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
            'view assessments',
            'create assessments',
            'edit assessments',
            'delete assessments',
            'view reports',
            'generate reports',
            'view analytics',
            'manage users',
            'manage subscriptions',
            'access admin panel',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions

        // Free role
        $freeRole = Role::firstOrCreate(['name' => 'free']);
        $freeRole->givePermissionTo([
            'view assessments',
            'create assessments',
            'view reports',
            'generate reports',
        ]);

        // Premium role
        $premiumRole = Role::firstOrCreate(['name' => 'premium']);
        $premiumRole->givePermissionTo([
            'view assessments',
            'create assessments',
            'edit assessments',
            'view reports',
            'generate reports',
            'view analytics',
        ]);

        // Admin role
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Super Admin role
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
        $superAdminRole->givePermissionTo(Permission::all());

        $this->command->info('Roles and permissions created successfully!');
    }
}
