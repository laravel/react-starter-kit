<?php

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Requests\AuthKitAuthenticationRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLoginRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLogoutRequest;
use WorkOS\UserManagement;

Route::get('login', function (AuthKitLoginRequest $request) {
    return $request->redirect();
})->middleware(['guest'])->name('login');

Route::get('workos', function (AuthKitAuthenticationRequest $request) {
    // $response = $request->authenticate();

    $user = (new UserManagement)->authenticateWithCode(
        config('services.workos.client_id'),
        $request->query('code'),
    );

    [$user, $accessToken, $refreshToken] = [
        $user->user,
        $user->access_token,
        $user->refresh_token,
    ];

    $existingUser = User::where('workos_id', $user->id)->first();

    if (! $existingUser) {
        $existingUser = User::create([
            'workos_id' => $user->id,
            'email' => $user->email,
            'name' => $user->firstName.' '.$user->lastName,
            'email_verified_at' => now(),
        ]);

        event(new Registered($existingUser));
    }

    Auth::login($existingUser);

    $request->session()->put('workos_access_token', $accessToken);
    $request->session()->put('workos_refresh_token', $refreshToken);

    Session::regenerate();

    return redirect('/dashboard');
});

Route::post('logout', function (AuthKitLogoutRequest $request) {
    return $request->logout();
})->middleware(['auth'])->name('logout');
