<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

final class UserController extends Controller
{
    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }
} 