<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Digit;

class CounterController extends Controller
{

    public function show()
    {
        return view('home');
    }

}
