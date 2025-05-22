<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;

class LegalEntity extends Model implements Searchable
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'rif',
        'business_name',
        'trade_name',
        'legal_entity_type',
        'registration_number',
        'registration_date',
        'fiscal_address_line_1',
        'fiscal_address_line_2',
        'fiscal_city',
        'fiscal_state',
        'fiscal_country',
        'email_1',
        'email_2',
        'phone_number_1',
        'phone_number_2',
        'website',
        'legal_representative_id',
    ];

    public function getSearchResult(): SearchResult
    {
        // Título con nombre comercial y legal
        $title = $this->business_name;
        if ($this->trade_name) {
            $title .= " ({$this->trade_name})";
        }
        
        // URL para ver el detalle de esta entidad
        $url = route('legal-entities.show', $this->id);
        
        return new SearchResult(
            $this,
            $title,
            $url
        );
    }

    // Relaciones
    public function legalRepresentative()
    {
        return $this->belongsTo(Individual::class, 'legal_representative_id');
    }
    
    public function legalCases()
    {
        return $this->belongsToMany(LegalCase::class, 'case_legal_entities')
                    ->withPivot('role')
                    ->withTimestamps();
    }
} 