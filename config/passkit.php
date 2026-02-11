<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Apple Wallet Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for generating Apple Wallet passes (.pkpass files).
    | Requires a valid pass certificate and WWDR intermediate certificate.
    |
    */

    'apple' => [
        'certificate_path' => env('APPLE_PASS_CERTIFICATE_PATH'),
        'certificate_password' => env('APPLE_PASS_CERTIFICATE_PASSWORD'),
        'wwdr_certificate_path' => env('APPLE_WWDR_CERTIFICATE_PATH'),
        'team_identifier' => env('APPLE_TEAM_IDENTIFIER'),
        'pass_type_identifier' => env('APPLE_PASS_TYPE_IDENTIFIER'),
        'organization_name' => env('APPLE_ORGANIZATION_NAME'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Google Wallet Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for generating Google Wallet passes via REST API.
    | Requires a service account JSON file.
    |
    */

    'google' => [
        'service_account_path' => env('GOOGLE_SERVICE_ACCOUNT_PATH'),
        'issuer_id' => env('GOOGLE_WALLET_ISSUER_ID'),
        'application_name' => env('GOOGLE_WALLET_APP_NAME', 'PassKit SaaS'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Subscription Plans
    |--------------------------------------------------------------------------
    |
    | Define the available subscription tiers and their limits.
    |
    */

    'plans' => [
        'free' => [
            'name' => 'Free',
            'pass_limit' => 25,
            'platforms' => ['apple', 'google'],
            'stripe_price_id' => null,
        ],
        'starter' => [
            'name' => 'Starter',
            'pass_limit' => 100,
            'platforms' => ['apple', 'google'],
            'stripe_price_id' => env('STRIPE_STARTER_PRICE_ID'),
        ],
        'growth' => [
            'name' => 'Growth',
            'pass_limit' => 500,
            'platforms' => ['apple', 'google'],
            'stripe_price_id' => env('STRIPE_GROWTH_PRICE_ID'),
        ],
        'business' => [
            'name' => 'Business',
            'pass_limit' => 2000,
            'platforms' => ['apple', 'google'],
            'stripe_price_id' => env('STRIPE_BUSINESS_PRICE_ID'),
        ],
        'enterprise' => [
            'name' => 'Enterprise',
            'pass_limit' => null,
            'platforms' => ['apple', 'google'],
            'stripe_price_id' => env('STRIPE_ENTERPRISE_PRICE_ID'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Storage Configuration
    |--------------------------------------------------------------------------
    |
    | Configure storage locations for certificates, passes, and images.
    |
    */

    'storage' => [
        'certificates_disk' => env('PASSKIT_CERTIFICATES_DISK', 'local'),
        'passes_disk' => env('PASSKIT_PASSES_DISK', 'local'),
        'passes_path' => env('PASSKIT_PASSES_PATH', 'passes'),
        'images_disk' => env('PASSKIT_IMAGES_DISK', 'public'),
        'images_path' => env('PASSKIT_IMAGES_PATH', 'pass-images'),
    ],

];
