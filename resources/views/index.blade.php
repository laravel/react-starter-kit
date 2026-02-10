@extends('layouts.app')
@section('content')
    <h1>All Todos.</h1>
    <ul class="list-group">
        @foreach($todos as $todo)
            @if ($todo->updated_at->ne($todo->created_at))
                <span class="badge bg-secondary">Updated</span>
            @endif
            <li class="list-group-item d-flex justify-content-between">
                {{ $todo->name }}
                <a href="/details/{{ $todo->id }}" class="btn btn-info btn-sm">View</a>
            </li>
        @endforeach
        
    </ul>
@endsection