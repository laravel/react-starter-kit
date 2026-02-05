<?php
namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index() {
        $todos = Todo::all();
        return view('index')->with('todos', $todos);
    }

    public function create() {
        return view('create');
    }

public function store(Request $request) 
{
    $request->validate([
        'name'        => ['required'],
        'description' => ['required']
    ]);

    $todo = new Todo();
    $todo->name = $request->input('name');
    $todo->description = $request->input('description');
    $todo->save();

    session()->flash('success', 'Todo created successfully');
    return redirect('/');
}

    public function details(Todo $todo) {
        return view('details')->with('todos', $todo);
    }

    public function edit(Todo $todo) {
        return view('edit')->with('todos', $todo);
    }

public function update(Request $request, Todo $todo) 
{
    $request->validate([
        'name'        => ['required'],
        'description' => ['required']
    ]);

    $todo->name = $request->input('name');
    $todo->description = $request->input('description');
    $todo->save();

    session()->flash('success', 'Todo updated successfully');
    return redirect('/');
}
    public function delete(Todo $todo) {
        $todo->delete();
        session()->flash('success', 'Todo deleted successfully');
        return redirect('/');
    }
}