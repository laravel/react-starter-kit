<?php

namespace App\Services;

use Exception;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use WorkOS\UserManagement;

class WorkOs
{
    public static function decodeAccessToken(Request $request): array|bool
    {
        $accessToken = $request->session()->get('workos_access_token');

        if (! $accessToken) {
            return false;
        }

        $jwksUrl = (new UserManagement)->getJwksUrl(config('services.workos.client_id'));

        $jwks = Http::get($jwksUrl)->json();

        try {
            return (array) JWT::decode($accessToken, JWK::parseKeySet($jwks));
        } catch (Exception $e) {
            //
        }

        return false;
    }
}
