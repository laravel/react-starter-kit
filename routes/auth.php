<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Laravel\WorkOS\Http\Requests\AuthKitAuthenticationRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLoginRequest;
use Laravel\WorkOS\Http\Requests\AuthKitLogoutRequest;
use Laravel\WorkOS\User as UserFromWorkOS;

Route::get('login', function (AuthKitLoginRequest $request) {
    return $request->redirect();
})->middleware(['guest'])->name('login');

Route::get('workos', function (AuthKitAuthenticationRequest $request) {
    $user = $request->authenticate(
        findUsing: function (string $id) {
            return User::where('workos_id', $id)->first();
        },
        createUsing: function (UserFromWorkOS $user) {
            return User::create([
                'name' => $user->firstName.' '.$user->lastName,
                'email' => $user->email,
                'email_verified_at' => now(),
                'workos_id' => $user->id,
                'avatar' => $user->avatar ?? '',
            ]);
        },
        updateUsing: function (User $user, UserFromWorkOS $userFromWorkOS) {
            $user->update([
                'name' => $userFromWorkOS->firstName.' '.$userFromWorkOS->lastName,
                'avatar' => $userFromWorkOS->avatar ?? '',
            ]);
        },
    );

    return redirect('/dashboard');
});

Route::post('logout', function (AuthKitLogoutRequest $request) {
    return $request->logout();
})->middleware(['auth'])->name('logout');
