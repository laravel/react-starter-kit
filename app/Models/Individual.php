<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;

class Individual extends Model implements Searchable
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'national_id',
        'passport',
        'first_name',
        'middle_name',
        'last_name',
        'second_last_name',
        'birth_date',
        'gender',
        'civil_status',
        'rif',
        'email_1',
        'email_2',
        'phone_number_1',
        'phone_number_2',
        'address_line_1',
        'address_line_2',
        'city',
        'state',
        'country',
        'nationality',
        'occupation',
        'educational_level',
    ];

    public function getSearchResult(): SearchResult
    {
        // El título será el nombre completo
        $title = trim("{$this->first_name} {$this->middle_name} {$this->last_name} {$this->second_last_name}");
        
        // URL para ver el detalle de esta persona
        $url = route('individuals.show', $this->id);
        
        return new SearchResult(
            $this,
            $title,
            $url
        );
    }

    // Relaciones
    public function legalCases()
    {
        return $this->belongsToMany(LegalCase::class, 'case_individuals')
                    ->withPivot('role')
                    ->withTimestamps();
    }
} 