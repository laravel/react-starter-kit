<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Digit extends Model
{
    protected $fillable = ['number'];
    protected $table = 'numbers';

}
