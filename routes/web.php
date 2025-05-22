<?php

use App\Http\Controllers\IndividualController;
use App\Http\Controllers\LegalCaseController;
use App\Http\Controllers\LegalEntityController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CaseParticipantController;
use App\Http\Controllers\CaseEventController;
use App\Http\Controllers\TodoListController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\StatusListController;
use App\Http\Controllers\CaseTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Listas de tareas
    Route::resource('todo-lists', TodoListController::class)->except(['create', 'edit', 'show']);
    // Tareas dentro de una lista
    Route::resource('todo-lists.todos', TodoController::class)->except(['create', 'edit', 'show']);
});

// Búsqueda pública
Route::get('/search', [SearchController::class, 'index'])->name('search.index');
Route::get('/search/results', [SearchController::class, 'search'])->name('search.results');

// Detalle de usuario
Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');

// CRUD Individuos (Personas Naturales)
Route::resource('individuals', IndividualController::class);

// CRUD Entidades Legales
Route::resource('legal-entities', LegalEntityController::class);

// CRUD Expedientes Legales
Route::resource('legal-cases', LegalCaseController::class);

// Rutas para gestionar participantes en expedientes
Route::get('/legal-cases/{case}/participants/add', [CaseParticipantController::class, 'addForm'])->name('case-participants.add-form');
Route::post('/legal-cases/{case}/participants/search', [CaseParticipantController::class, 'search'])->name('case-participants.search');
Route::post('/legal-cases/{case}/participants', [CaseParticipantController::class, 'associate'])->name('case-participants.associate');
Route::delete('/legal-cases/{case}/participants', [CaseParticipantController::class, 'remove'])->name('case-participants.remove');

// Gestión de estatus de expedientes
Route::get('/legal-cases/{legalCase}/statuses', [LegalCaseController::class, 'statuses'])->name('legal-cases.statuses');
Route::post('/legal-cases/{legalCase}/status', [LegalCaseController::class, 'setStatus'])->name('legal-cases.set-status');
Route::get('/legal-cases/statuses/available', [LegalCaseController::class, 'availableStatuses'])->name('legal-cases.available-statuses');

// Rutas para eventos procesales
Route::post('/legal-cases/{legalCase}/events', [CaseEventController::class, 'store'])->name('case-events.store');
Route::put('/legal-cases/{legalCase}/events/{event}', [CaseEventController::class, 'update'])->name('case-events.update');
Route::delete('/legal-cases/{legalCase}/events/{event}', [CaseEventController::class, 'destroy'])->name('case-events.destroy');

// Gestión de fechas importantes de expedientes
Route::get('/legal-cases/{legalCase}/important-dates', [\App\Http\Controllers\CaseImportantDateController::class, 'index'])->name('legal-cases.important-dates.index');
Route::post('/legal-cases/{legalCase}/important-dates', [\App\Http\Controllers\CaseImportantDateController::class, 'store'])->name('legal-cases.important-dates.store');
Route::patch('/legal-cases/{legalCase}/important-dates/{importantDate}/set-expired', [\App\Http\Controllers\CaseImportantDateController::class, 'setExpired'])->name('legal-cases.important-dates.set-expired');
Route::put('/legal-cases/{legalCase}/important-dates/{importantDate}', [\App\Http\Controllers\CaseImportantDateController::class, 'update'])->name('legal-cases.important-dates.update');
Route::delete('/legal-cases/{legalCase}/important-dates/{importantDate}', [\App\Http\Controllers\CaseImportantDateController::class, 'destroy'])->name('legal-cases.important-dates.destroy');

// Rutas para gestión de estatus generales
Route::resource('status-lists', StatusListController::class);

// CRUD Tipos de Casos
Route::resource('case-types', CaseTypeController::class);

Route::middleware(['auth'])->group(function () {
    Route::resource('statuses', StatusController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
