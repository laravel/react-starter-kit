<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make the first user an admin
        User::query()
            ->orderBy('id')
            ->first()
            ?->update(['is_admin' => true]);
    }
}
