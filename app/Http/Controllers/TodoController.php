<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

final class TodoController extends Controller
{
    private function ensureAjaxOrJson(Request $request): void
    {
        if (!($request->wantsJson() || $request->ajax())) {
            abort(404);
        }
    }

    public function index(Request $request, TodoList $todoList)
    {
        $this->ensureAjaxOrJson($request);
        $todos = $todoList->todos()->orderBy('created_at')->get();
        return response()->json(['todos' => $todos]);
    }

    public function store(Request $request, TodoList $todoList)
    {
        $this->ensureAjaxOrJson($request);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);
        $todoList->todos()->create([
            'title' => $validated['title'],
            'is_completed' => false,
        ]);
        $todos = $todoList->todos()->orderBy('created_at')->get();
        return response()->json(['todos' => $todos]);
    }

    public function update(Request $request, TodoList $todoList, Todo $todo)
    {
        $this->ensureAjaxOrJson($request);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'is_completed' => 'required|boolean',
        ]);
        $todo->update($validated);
        $todos = $todoList->todos()->orderBy('created_at')->get();
        return response()->json(['todos' => $todos]);
    }

    public function destroy(Request $request, TodoList $todoList, Todo $todo)
    {
        $this->ensureAjaxOrJson($request);
        $todo->delete();
        $todos = $todoList->todos()->orderBy('created_at')->get();
        return response()->json(['todos' => $todos]);
    }
} 