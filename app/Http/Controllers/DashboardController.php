<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $subscribed = $request->user()->subscribed();

        return Inertia::render('dashboard', [
            'subscribed' => $subscribed,
        ]);
    }
}
