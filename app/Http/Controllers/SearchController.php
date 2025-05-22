<?php

namespace App\Http\Controllers;

use App\Models\Individual;
use App\Models\LegalCase;
use App\Models\LegalEntity;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Searchable\Search;

final class SearchController extends Controller
{
    public function index()
    {
        return Inertia::render('Search/Index');
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        $searchResults = (new Search())
            
            // Búsqueda en personas naturales
            ->registerModel(Individual::class, [
                'national_id', 
                'passport',
                'first_name', 
                'middle_name', 
                'last_name', 
                'second_last_name',
                'rif',
                'email_1',
                'email_2',
                'phone_number_1',
                'phone_number_2'
            ])
            
            // Búsqueda en personas jurídicas
            ->registerModel(LegalEntity::class, [
                'rif', 
                'business_name', 
                'trade_name',
                'registration_number',
                'email_1',
                'email_2',
                'phone_number_1',
                'phone_number_2',
                'website'
            ])
            
            // Búsqueda en expedientes
            ->registerModel(LegalCase::class, ['code'])
            
            ->search($query);

        return Inertia::render('Search/Results', [
            'results' => $searchResults->groupByType(),
            'query' => $query
        ]);
    }
} 