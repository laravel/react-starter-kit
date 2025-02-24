<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/dashboard', 'dashboard')->name('dashboard')->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
