<?php

namespace App\Services;

use App\Models\Pass;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class GooglePassService
{
    protected array $serviceAccount;
    protected string $issuerId;
    protected string $applicationName;
    protected string $baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

    public function __construct()
    {
        $serviceAccountPath = config('passkit.google.service_account_path');

        if (!$serviceAccountPath || !file_exists($serviceAccountPath)) {
            throw new RuntimeException("Google service account file not found");
        }

        $content = file_get_contents($serviceAccountPath);
        $this->serviceAccount = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException("Invalid service account JSON: " . json_last_error_msg());
        }

        $this->issuerId = config('passkit.google.issuer_id');
        $this->applicationName = config('passkit.google.application_name');
    }

    /**
     * Generate a Google Wallet save URL for the given pass.
     *
     * @param Pass $pass
     * @return string The save URL
     * @throws RuntimeException
     */
    public function generate(Pass $pass): string
    {
        if ($pass->platform !== 'google') {
            throw new RuntimeException('Pass must be for Google platform');
        }

        // Ensure pass class exists
        $classId = $this->ensurePassClass($pass);

        // Build pass object
        $objectData = $this->buildPassObject($pass, $classId);

        // Generate JWT save URL
        $jwt = $this->generateSaveJwt($pass->pass_type, $objectData);
        $saveUrl = "https://pay.google.com/gp/v/save/{$jwt}";

        // Update pass record
        $pass->update([
            'google_save_url' => $saveUrl,
            'google_class_id' => $classId,
            'google_object_id' => $objectData['id'],
            'last_generated_at' => now(),
        ]);

        return $saveUrl;
    }

    /**
     * Get OAuth2 access token using service account.
     *
     * @return string
     * @throws RuntimeException
     */
    protected function getAccessToken(): string
    {
        $now = time();
        $exp = $now + 3600;

        $header = [
            'alg' => 'RS256',
            'typ' => 'JWT',
        ];

        $payload = [
            'iss' => $this->serviceAccount['client_email'],
            'scope' => 'https://www.googleapis.com/auth/wallet_object.issuer',
            'aud' => 'https://oauth2.googleapis.com/token',
            'iat' => $now,
            'exp' => $exp,
        ];

        $jwt = $this->encodeJwt($header, $payload);

        $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' => $jwt,
        ]);

        if (!$response->successful()) {
            throw new RuntimeException("Failed to get access token: " . $response->body());
        }

        return $response->json()['access_token'];
    }

    /**
     * Ensure the pass class exists, create if not.
     *
     * @param Pass $pass
     * @return string The class ID
     * @throws RuntimeException
     */
    protected function ensurePassClass(Pass $pass): string
    {
        $templateId = $pass->pass_template_id ?? 'default';
        $classId = "{$this->issuerId}.{$pass->pass_type}_{$templateId}";

        $accessToken = $this->getAccessToken();
        $classEndpoint = $this->getClassEndpoint($pass->pass_type);

        // Check if class exists
        $response = Http::withToken($accessToken)
            ->get("{$this->baseUrl}/{$classEndpoint}/{$classId}");

        if ($response->successful()) {
            return $classId;
        }

        // Class doesn't exist, create it
        if ($response->status() === 404) {
            $classData = $this->buildPassClass($pass, $classId);

            $createResponse = Http::withToken($accessToken)
                ->post("{$this->baseUrl}/{$classEndpoint}", $classData);

            if (!$createResponse->successful()) {
                throw new RuntimeException("Failed to create pass class: " . $createResponse->body());
            }

            return $classId;
        }

        throw new RuntimeException("Failed to check pass class: " . $response->body());
    }

    /**
     * Build pass class data.
     *
     * @param Pass $pass
     * @param string $classId
     * @return array
     */
    protected function buildPassClass(Pass $pass, string $classId): array
    {
        $passData = $pass->pass_data;
        $issuerName = $this->applicationName;

        $classData = [
            'id' => $classId,
            'issuerName' => $issuerName,
            'reviewStatus' => 'UNDER_REVIEW',
        ];

        switch ($pass->pass_type) {
            case 'offer':
            case 'coupon':
                $classData['provider'] = $issuerName;
                $classData['title'] = $passData['description'] ?? 'Special Offer';
                break;

            case 'loyalty':
            case 'storeCard':
            case 'stampCard':
                $classData['programName'] = $passData['description'] ?? 'Loyalty Program';
                if (!empty($passData['logo'])) {
                    $classData['programLogo'] = [
                        'sourceUri' => [
                            'uri' => asset('storage/' . $passData['logo']),
                        ],
                    ];
                }
                break;

            case 'eventTicket':
                $classData['eventName'] = [
                    'defaultValue' => [
                        'language' => 'en',
                        'value' => $passData['description'] ?? 'Event',
                    ],
                ];
                break;

            case 'boardingPass':
            case 'transit':
                $classData['transitType'] = $passData['transitType'] ?? 'OTHER';
                break;

            case 'generic':
            default:
                $classData['classTemplateInfo'] = [
                    'cardTemplateOverride' => [
                        'cardRowTemplateInfos' => [
                            [
                                'oneItem' => [
                                    'item' => [
                                        'firstValue' => [
                                            'fields' => [
                                                [
                                                    'fieldPath' => 'object.textModulesData["primary"]',
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ];
                break;
        }

        return $classData;
    }

    /**
     * Build pass object data.
     *
     * @param Pass $pass
     * @param string $classId
     * @return array
     */
    protected function buildPassObject(Pass $pass, string $classId): array
    {
        $passData = $pass->pass_data;
        $barcodeData = $pass->barcode_data;

        $objectData = [
            'id' => "{$this->issuerId}.{$pass->serial_number}",
            'classId' => $classId,
            'state' => 'ACTIVE',
        ];

        // Add barcode if present
        if (!empty($barcodeData) && is_array($barcodeData)) {
            $objectData['barcode'] = [
                'type' => $this->convertBarcodeFormat($barcodeData['format'] ?? 'PKBarcodeFormatQR'),
                'value' => $barcodeData['message'] ?? '',
            ];

            if (!empty($barcodeData['altText'])) {
                $objectData['barcode']['alternateText'] = $barcodeData['altText'];
            }
        }

        // Add text modules from primaryFields
        if (!empty($passData['primaryFields']) && is_array($passData['primaryFields'])) {
            $objectData['textModulesData'] = [];
            foreach ($passData['primaryFields'] as $index => $field) {
                $objectData['textModulesData'][] = [
                    'id' => $field['key'] ?? "field_{$index}",
                    'header' => $field['label'] ?? '',
                    'body' => $field['value'] ?? '',
                ];
            }
        }

        // Add hero image if available
        if (!empty($pass->images['strip']) && is_array($pass->images)) {
            $objectData['heroImage'] = [
                'sourceUri' => [
                    'uri' => asset('storage/' . $pass->images['strip']),
                ],
            ];
        }

        return $objectData;
    }

    /**
     * Generate JWT for save URL.
     *
     * @param string $passType
     * @param array $objectData
     * @return string
     */
    protected function generateSaveJwt(string $passType, array $objectData): string
    {
        $now = time();

        $header = [
            'alg' => 'RS256',
            'typ' => 'JWT',
        ];

        $objectKey = $this->getObjectKey($passType);

        $payload = [
            'iss' => $this->serviceAccount['client_email'],
            'aud' => 'google',
            'typ' => 'savetowallet',
            'iat' => $now,
            'origins' => [config('app.url')],
            'payload' => [
                $objectKey => [$objectData],
            ],
        ];

        return $this->encodeJwt($header, $payload);
    }

    /**
     * Encode JWT with RS256 algorithm.
     *
     * @param array $header
     * @param array $payload
     * @return string
     * @throws RuntimeException
     */
    protected function encodeJwt(array $header, array $payload): string
    {
        $headerEncoded = $this->base64UrlEncode(json_encode($header));
        $payloadEncoded = $this->base64UrlEncode(json_encode($payload));
        $signingInput = "{$headerEncoded}.{$payloadEncoded}";

        $privateKey = openssl_pkey_get_private($this->serviceAccount['private_key']);
        if ($privateKey === false) {
            throw new RuntimeException("Failed to read private key: " . openssl_error_string());
        }

        $signature = '';
        $signResult = openssl_sign($signingInput, $signature, $privateKey, OPENSSL_ALGO_SHA256);

        openssl_pkey_free($privateKey);

        if (!$signResult) {
            throw new RuntimeException("Failed to sign JWT: " . openssl_error_string());
        }

        $signatureEncoded = $this->base64UrlEncode($signature);

        return "{$signingInput}.{$signatureEncoded}";
    }

    /**
     * Base64 URL encode.
     *
     * @param string $data
     * @return string
     */
    protected function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Convert Apple barcode format to Google format.
     *
     * @param string $appleFormat
     * @return string
     */
    protected function convertBarcodeFormat(string $appleFormat): string
    {
        $mapping = [
            'PKBarcodeFormatQR' => 'QR_CODE',
            'PKBarcodeFormatPDF417' => 'PDF_417',
            'PKBarcodeFormatAztec' => 'AZTEC',
            'PKBarcodeFormatCode128' => 'CODE_128',
        ];

        return $mapping[$appleFormat] ?? 'QR_CODE';
    }

    /**
     * Get the class endpoint for the pass type.
     *
     * @param string $passType
     * @return string
     */
    protected function getClassEndpoint(string $passType): string
    {
        $mapping = [
            'offer' => 'offerClass',
            'coupon' => 'offerClass',
            'loyalty' => 'loyaltyClass',
            'storeCard' => 'loyaltyClass',
            'stampCard' => 'loyaltyClass',
            'eventTicket' => 'eventTicketClass',
            'boardingPass' => 'transitClass',
            'transit' => 'transitClass',
            'generic' => 'genericClass',
        ];

        return $mapping[$passType] ?? 'genericClass';
    }

    /**
     * Get the object key for the pass type in JWT payload.
     *
     * @param string $passType
     * @return string
     */
    protected function getObjectKey(string $passType): string
    {
        $mapping = [
            'offer' => 'offerObjects',
            'coupon' => 'offerObjects',
            'loyalty' => 'loyaltyObjects',
            'storeCard' => 'loyaltyObjects',
            'stampCard' => 'loyaltyObjects',
            'eventTicket' => 'eventTicketObjects',
            'boardingPass' => 'transitObjects',
            'transit' => 'transitObjects',
            'generic' => 'genericObjects',
        ];

        return $mapping[$passType] ?? 'genericObjects';
    }
}
