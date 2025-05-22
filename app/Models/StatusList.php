<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class StatusList extends Model
{
    use HasFactory;

    protected $table = 'status_lists';

    protected $fillable = [
        'name',
        'description',
    ];
} 