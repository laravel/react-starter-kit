@extends('layouts.app')
@section('content')
    <h1>{{ $todos->name }}</h1>
    <p>{{ $todos->description }}</p>
    <a href="/edit/{{ $todos->id }}" class="btn btn-warning">Edit</a>
    <a href="/delete/{{ $todos->id }}" class="btn btn-danger">Delete</a>
@endsection