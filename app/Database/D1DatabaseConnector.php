<?php

namespace App\Database;

use Illuminate\Database\Connectors\SQLiteConnector;

class D1DatabaseConnector extends SQLiteConnector
{
    /**
     * Establish a database connection.
     *
     * @param  array  $config
     * @return \PDO
     */
    public function connect(array $config)
    {
        // Always use in-memory SQLite for local development
        $config['database'] = ':memory:';
        
        return parent::connect($config);
    }
}