<?php

namespace App\Providers;

use App\Models\User;
use Filament\Facades\Filament;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
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
        Gate::guessPolicyNamesUsing(function (string $modelClass) {
            return str_replace('Models', 'Policies', $modelClass) . 'Policy';
        });
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        Filament::serving(function () {
            // Only allow admin users to access Filament
            Gate::define('viewFilament', function (User $user) {
                return $user->isAdmin();
            });
        });

        // Configure Filament auth guard and redirects
        config([
            'filament.auth.guard' => 'web',
            'filament.path' => 'admin',
            'filament.domain' => null,
            'filament.home_url' => '/',
            'filament.auth.pages.login' => \Filament\Http\Livewire\Auth\Login::class,
        ]);


    }
}

