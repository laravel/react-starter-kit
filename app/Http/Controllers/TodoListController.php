<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class TodoListController extends Controller
{
    private function ensureAjaxOrJson(Request $request): void
    {
        if (!($request->wantsJson() || $request->ajax())) {
            abort(404);
        }
    }

    public function index(Request $request)
    {
        $this->ensureAjaxOrJson($request);
        $lists = TodoList::where('user_id', Auth::id())
            ->withCount('todos')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(['lists' => $lists]);
    }

    public function store(Request $request)
    {
        $this->ensureAjaxOrJson($request);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:todo_lists,name',
        ]);
        TodoList::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
        ]);
        $lists = TodoList::where('user_id', Auth::id())
            ->withCount('todos')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(['lists' => $lists]);
    }

    public function update(Request $request, TodoList $todoList)
    {
        $this->ensureAjaxOrJson($request);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:todo_lists,name,' . $todoList->id,
        ]);
        $todoList->update($validated);
        $lists = TodoList::where('user_id', Auth::id())
            ->withCount('todos')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(['lists' => $lists]);
    }

    public function destroy(Request $request, TodoList $todoList)
    {
        $this->ensureAjaxOrJson($request);
        $todoList->delete();
        $lists = TodoList::where('user_id', Auth::id())
            ->withCount('todos')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(['lists' => $lists]);
    }
} 