<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register the D1 database driver
        \Illuminate\Support\Facades\DB::extend('d1', function($config, $name) {
            $connector = new \App\Database\D1DatabaseConnector();
            $connection = $connector->connect($config);
            
            return new \App\Database\D1Connection($connection, $config['database'], $config['prefix'], $config);
        });
    }
}
