<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Button Text
    |--------------------------------------------------------------------------
    |
    | Here you may define the text for the social login button.
    | The {provider} placeholder will be replaced with the provider name.
    |
    */
    'button_text' => '{provider}',

    /*
    |--------------------------------------------------------------------------
    | Providers
    |--------------------------------------------------------------------------
    |
    | Here you may define the providers for the social login.
    |
    | active: true or false
    |
    | branded: true or false, if true, the button will be branded with the provider's color
    |
    | name: the name of the provider
    |
    | icon: the icon of the provider located in the components/icons folder
    |
    | client_id: the client id of the provider
    |
    | client_secret: the client secret of the provider
    |
    | redirect: the redirect url of the provider
    */
    'providers' => [

        'google' => [
            'active' => true,
            'branded' => false,
            'name' => 'Google',
            'icon' => 'GoogleIcon',
            'client_id' => env('GOOGLE_CLIENT_ID'),
            'client_secret' => env('GOOGLE_CLIENT_SECRET'),
            'redirect' => env('GOOGLE_REDIRECT'),
        ],

        'facebook' => [
            'active' => true,
            'branded' => false,
            'name' => 'Facebook',
            'icon' => 'FacebookIcon',
            'client_id' => env('FACEBOOK_CLIENT_ID'),
            'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
            'redirect' => env('FACEBOOK_REDIRECT'),
        ],

        'github' => [
            'active' => false,
            'branded' => false,
            'name' => 'GitHub',
            'icon' => 'GitHubIcon',
            'client_id' => env('GITHUB_CLIENT_ID'),
            'client_secret' => env('GITHUB_CLIENT_SECRET'),
            'redirect' => env('GITHUB_REDIRECT'),
        ],

        'linkedin' => [
            'active' => false,
            'branded' => false,
            'name' => 'LinkedIn',
            'icon' => 'LinkedInIcon',
            'client_id' => env('LINKEDIN_CLIENT_ID'),
            'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
            'redirect' => env('LINKEDIN_REDIRECT'),
        ],
    ],
];
