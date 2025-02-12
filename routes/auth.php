<?php

use App\Models\User;
use App\Services\WorkOs;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use WorkOS\UserManagement;

Route::get('login', function (Request $request) {
    $userManagement = new UserManagement;

    $url = $userManagement->getAuthorizationUrl(
        config('services.workos.redirect_url'),
        $state = Str::random(20),
        'authkit',
    );

    $request->session()->put('state', $state);

    return Inertia::location($url);
})->middleware(['guest'])->name('login');

Route::get('workos', function (Request $request) {
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

Route::post('logout', function (Request $request) {
    $workOsSession = WorkOs::decodeAccessToken($request);

    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    if (! $workOsSession) {
        return redirect('/');
    }

    return Inertia::location((new UserManagement)->getLogoutUrl(
        $workOsSession['sid'],
    ));
})->middleware(['auth'])->name('logout');
