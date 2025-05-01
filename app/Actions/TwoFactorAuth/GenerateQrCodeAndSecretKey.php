<?php

namespace App\Actions\TwoFactorAuth;

use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use App\Models\User;
use PragmaRX\Google2FA\Google2FA;

class GenerateQrCodeAndSecretKey
{
    public string $companyName;

    /**
     * Generate new recovery codes for the user.
     *
     * @return array{string, string}
     */
    public function __invoke($user): array
    {
        // Create a new Google2FA instance with explicit configuration
        $google2fa = new Google2FA();
        $google2fa->setOneTimePasswordLength(6);
        
        // Generate a standard 16-character secret key
        $secret_key = $google2fa->generateSecretKey(16);
        
        // Set company name from config
        $this->companyName = config('app.name', 'Laravel');
        
        // Generate the QR code URL
        $g2faUrl = $google2fa->getQRCodeUrl(
            $this->companyName,
            $user->email,
            $secret_key
        );
        
        // Create the QR code image
        $writer = new Writer(
            new ImageRenderer(
                new RendererStyle(400),
                new SvgImageBackEnd()
            )
        );
        
        // Generate the QR code as a base64 encoded SVG
        $qrcode_image = base64_encode($writer->writeString($g2faUrl));
        
        return [$qrcode_image, $secret_key];

    }
}