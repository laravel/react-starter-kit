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

    /*
    |--------------------------------------------------------------------------
    | Image Resizing
    |--------------------------------------------------------------------------
    |
    | Centralized image sizing rules for pass assets.
    |
    */

    'images' => [
        'resize_mode' => env('PASSKIT_IMAGE_RESIZE_MODE', 'contain'),
        'max_upload_kb' => env('PASSKIT_IMAGE_MAX_UPLOAD_KB', 1024),
        'quality_warning_ratio' => env('PASSKIT_IMAGE_QUALITY_WARNING_RATIO', 1.0),
        'sizes' => [
            'apple' => [
                'icon' => [
                    '1x' => ['width' => 29, 'height' => 29],
                    '2x' => ['width' => 58, 'height' => 58],
                    '3x' => ['width' => 87, 'height' => 87],
                ],
                'logo' => [
                    '1x' => ['width' => 160, 'height' => 50],
                    '2x' => ['width' => 320, 'height' => 100],
                    '3x' => ['width' => 480, 'height' => 150],
                ],
                'strip' => [
                    '1x' => ['width' => 375, 'height' => 123],
                    '2x' => ['width' => 750, 'height' => 246],
                    '3x' => ['width' => 1125, 'height' => 369],
                ],
                'thumbnail' => [
                    '1x' => ['width' => 90, 'height' => 90],
                    '2x' => ['width' => 180, 'height' => 180],
                    '3x' => ['width' => 270, 'height' => 270],
                ],
                'background' => [
                    '1x' => ['width' => 180, 'height' => 220],
                    '2x' => ['width' => 360, 'height' => 440],
                    '3x' => ['width' => 540, 'height' => 660],
                ],
                'footer' => [
                    '1x' => ['width' => 286, 'height' => 15],
                    '2x' => ['width' => 572, 'height' => 30],
                    '3x' => ['width' => 858, 'height' => 45],
                ],
            ],
            'google' => [
                'icon' => [
                    '1x' => ['width' => 48, 'height' => 48],
                ],
                'logo' => [
                    '1x' => ['width' => 160, 'height' => 50],
                ],
                'strip' => [
                    '1x' => ['width' => 375, 'height' => 123],
                ],
                'thumbnail' => [
                    '1x' => ['width' => 90, 'height' => 90],
                ],
                'background' => [
                    '1x' => ['width' => 180, 'height' => 220],
                ],
                'footer' => [
                    '1x' => ['width' => 286, 'height' => 15],
                ],
            ],
        ],
    ],

];
