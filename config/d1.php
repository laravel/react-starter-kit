<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cloudflare D1 Database Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the configuration for connecting to Cloudflare D1
    | databases. D1 is Cloudflare's SQL database for serverless applications.
    |
    */

    'database_id' => env('D1_DATABASE_ID'),
    'api_token' => env('D1_API_TOKEN'),
    'account_id' => env('D1_ACCOUNT_ID'),
];