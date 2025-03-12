<?php

namespace App\Database;

use Illuminate\Database\SQLiteConnection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;

class D1Connection extends SQLiteConnection
{
    /**
     * Run a select statement against the database.
     *
     * @param  string  $query
     * @param  array  $bindings
     * @param  bool  $useReadPdo
     * @return array
     */
    public function select($query, $bindings = [], $useReadPdo = true)
    {
        // In local development, use the SQLite in-memory implementation
        if (app()->environment('local', 'testing')) {
            return parent::select($query, $bindings, $useReadPdo);
        }

        // In production, use the D1 API
        $databaseId = Config::get('d1.database_id');
        $apiToken = Config::get('d1.api_token');
        $accountId = Config::get('d1.account_id');

        if (!$databaseId || !$apiToken || !$accountId) {
            throw new \Exception('D1 credentials not found. Please check your configuration.');
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiToken,
            'Content-Type' => 'application/json',
        ])->post("https://api.cloudflare.com/client/v4/accounts/{$accountId}/d1/database/{$databaseId}/query", [
            'sql' => $this->prepareBindings($query, $bindings),
        ]);

        if ($response->failed()) {
            throw new \Exception('D1 API call failed: ' . $response->body());
        }

        $result = $response->json();
        
        // Extract the result rows from the D1 API response
        return Arr::get($result, 'result', []);
    }

    /**
     * Run a SQL statement and get the number of rows affected.
     *
     * @param  string  $query
     * @param  array  $bindings
     * @return int
     */
    public function statement($query, $bindings = [])
    {
        // In local development, use the SQLite in-memory implementation
        if (app()->environment('local', 'testing')) {
            return parent::statement($query, $bindings);
        }

        // In production, use the D1 API
        $databaseId = Config::get('d1.database_id');
        $apiToken = Config::get('d1.api_token');
        $accountId = Config::get('d1.account_id');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiToken,
            'Content-Type' => 'application/json',
        ])->post("https://api.cloudflare.com/client/v4/accounts/{$accountId}/d1/database/{$databaseId}/query", [
            'sql' => $this->prepareBindings($query, $bindings),
        ]);

        if ($response->failed()) {
            throw new \Exception('D1 API call failed: ' . $response->body());
        }

        return 1; // Assume 1 row affected if successful
    }

    /**
     * Prepare the query bindings for execution.
     * 
     * @param  string  $query
     * @param  array  $bindings
     * @return string
     */
    protected function prepareBindings($query, array $bindings)
    {
        $bindings = array_map(function ($binding) {
            if (is_string($binding)) {
                return "'" . addslashes($binding) . "'";
            } elseif (is_bool($binding)) {
                return $binding ? '1' : '0';
            } elseif (is_null($binding)) {
                return 'NULL';
            }
            return $binding;
        }, $bindings);
        
        if (!empty($bindings)) {
            $search = [];
            foreach ($bindings as $key => $binding) {
                // PDO statement placeholders are 1-indexed
                $search[] = is_string($key) ? ":{$key}" : "?";
            }
            
            $query = str_replace($search, $bindings, $query);
        }
        
        return $query;
    }
}