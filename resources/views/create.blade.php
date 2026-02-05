@extends('layouts.app')
@section('content')
    <h1>Create Todo</h1>
    <form action="/store-data" method="POST">
        @csrf
        <div class="mb-3">
            <label>Name</label>
            <input type="text" name="name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label>Description</label>
            <textarea name="description" class="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">Save Todo</button>
    </form>
@endsection