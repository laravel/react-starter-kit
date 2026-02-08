<?php

namespace App\Services;

use App\Models\Pass;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use ZipArchive;

class ApplePassService
{
    protected string $certificatePath;
    protected string $certificatePassword;
    protected string $wwdrCertificatePath;
    protected string $teamIdentifier;
    protected string $passTypeIdentifier;
    protected string $organizationName;
    protected string $passesDisk;
    protected string $passesPath;
    protected string $imagesDisk;
    protected string $imagesPath;

    public function __construct()
    {
        $this->certificatePath = config('passkit.apple.certificate_path');
        $this->certificatePassword = config('passkit.apple.certificate_password');
        $this->wwdrCertificatePath = config('passkit.apple.wwdr_certificate_path');
        $this->teamIdentifier = config('passkit.apple.team_identifier');
        $this->passTypeIdentifier = config('passkit.apple.pass_type_identifier');
        $this->organizationName = config('passkit.apple.organization_name');
        $this->passesDisk = config('passkit.storage.passes_disk');
        $this->passesPath = config('passkit.storage.passes_path');
        $this->imagesDisk = config('passkit.storage.images_disk');
        $this->imagesPath = config('passkit.storage.images_path');
    }

    /**
     * Generate a .pkpass file for the given pass.
     *
     * @param Pass $pass
     * @return string The storage path to the generated .pkpass file
     * @throws RuntimeException
     */
    public function generate(Pass $pass): string
    {
        if ($pass->platform !== 'apple') {
            throw new RuntimeException('Pass must be for Apple platform');
        }

        $tempDir = null;

        try {
            // Create temporary directory
            $tempDir = $this->createTempDirectory();

            // Build pass.json
            $passJson = $this->buildPassJson($pass);
            file_put_contents($tempDir . '/pass.json', json_encode($passJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

            // Copy images
            $this->copyImages($pass, $tempDir);

            // Create manifest
            $manifest = $this->createManifest($tempDir);
            file_put_contents($tempDir . '/manifest.json', json_encode($manifest, JSON_PRETTY_PRINT));

            // Sign manifest
            $this->signManifest($tempDir);

            // Create .pkpass file
            $pkpassPath = $this->createPkpass($tempDir, $pass);

            // Update pass record
            $pass->update([
                'pkpass_path' => $pkpassPath,
                'last_generated_at' => now(),
            ]);

            return $pkpassPath;
        } finally {
            if ($tempDir && is_dir($tempDir)) {
                $this->cleanupTempDirectory($tempDir);
            }
        }
    }

    /**
     * Build the pass.json structure.
     *
     * @param Pass $pass
     * @return array
     */
    protected function buildPassJson(Pass $pass): array
    {
        $passData = $pass->pass_data;
        $barcodeData = $pass->barcode_data;

        $json = [
            'formatVersion' => 1,
            'passTypeIdentifier' => $this->passTypeIdentifier,
            'serialNumber' => $pass->serial_number,
            'teamIdentifier' => $this->teamIdentifier,
            'organizationName' => $this->organizationName,
            'description' => $passData['description'] ?? 'Digital Pass',
        ];

        // Add colors
        if (!empty($passData['backgroundColor'])) {
            $json['backgroundColor'] = $passData['backgroundColor'];
        }
        if (!empty($passData['foregroundColor'])) {
            $json['foregroundColor'] = $passData['foregroundColor'];
        }
        if (!empty($passData['labelColor'])) {
            $json['labelColor'] = $passData['labelColor'];
        }

        // Add pass type specific structure
        $passTypeKey = $this->getPassTypeKey($pass->pass_type);
        $json[$passTypeKey] = [];

        // Add field groups
        foreach (['headerFields', 'primaryFields', 'secondaryFields', 'auxiliaryFields', 'backFields'] as $fieldGroup) {
            if (!empty($passData[$fieldGroup]) && is_array($passData[$fieldGroup])) {
                $json[$passTypeKey][$fieldGroup] = $passData[$fieldGroup];
            }
        }

        // Add transit type for boarding passes
        if ($pass->pass_type === 'boardingPass' && !empty($passData['transitType'])) {
            $json[$passTypeKey]['transitType'] = $passData['transitType'];
        }

        // Add barcodes
        if (!empty($barcodeData) && is_array($barcodeData)) {
            $json['barcodes'] = [$barcodeData];
            // Deprecated but still supported for older iOS versions
            $json['barcode'] = $barcodeData;
        }

        return $json;
    }

    /**
     * Get the pass type key for pass.json.
     *
     * @param string $passType
     * @return string
     */
    protected function getPassTypeKey(string $passType): string
    {
        $mapping = [
            'generic' => 'generic',
            'coupon' => 'coupon',
            'eventTicket' => 'eventTicket',
            'boardingPass' => 'boardingPass',
            'storeCard' => 'storeCard',
            'loyalty' => 'storeCard',
            'stampCard' => 'storeCard',
        ];

        return $mapping[$passType] ?? 'generic';
    }

    /**
     * Create manifest.json with SHA1 hashes of all files.
     *
     * @param string $tempDir
     * @return array
     */
    protected function createManifest(string $tempDir): array
    {
        $manifest = [];
        $files = glob($tempDir . '/*');

        foreach ($files as $file) {
            if (is_file($file)) {
                $filename = basename($file);
                $manifest[$filename] = sha1_file($file);
            }
        }

        return $manifest;
    }

    /**
     * Sign the manifest with PKCS#7 detached signature.
     *
     * @param string $tempDir
     * @throws RuntimeException
     */
    protected function signManifest(string $tempDir): void
    {
        if (!file_exists($this->certificatePath)) {
            throw new RuntimeException("Certificate file not found at: {$this->certificatePath}");
        }

        if (!file_exists($this->wwdrCertificatePath)) {
            throw new RuntimeException("WWDR certificate file not found at: {$this->wwdrCertificatePath}");
        }

        // Read the .p12 certificate
        $p12Content = file_get_contents($this->certificatePath);
        if ($p12Content === false) {
            throw new RuntimeException("Failed to read certificate file");
        }

        $certs = [];
        if (!openssl_pkcs12_read($p12Content, $certs, $this->certificatePassword)) {
            throw new RuntimeException("Failed to read PKCS12 certificate: " . openssl_error_string());
        }

        // Extract certificate and private key
        $certResource = openssl_x509_read($certs['cert']);
        if ($certResource === false) {
            throw new RuntimeException("Failed to read X509 certificate: " . openssl_error_string());
        }

        $keyResource = openssl_pkey_get_private($certs['pkey']);
        if ($keyResource === false) {
            throw new RuntimeException("Failed to read private key: " . openssl_error_string());
        }

        // Sign the manifest
        $manifestPath = $tempDir . '/manifest.json';
        $signaturePath = $tempDir . '/signature';
        $signaturePemPath = $tempDir . '/signature.pem';

        $signResult = openssl_pkcs7_sign(
            $manifestPath,
            $signaturePemPath,
            $certResource,
            $keyResource,
            [],
            PKCS7_BINARY | PKCS7_DETACHED,
            $this->wwdrCertificatePath
        );

        if (!$signResult) {
            throw new RuntimeException("Failed to sign manifest: " . openssl_error_string());
        }

        // Convert PEM signature to DER format
        $pemContent = file_get_contents($signaturePemPath);
        if ($pemContent === false) {
            throw new RuntimeException("Failed to read PEM signature");
        }

        // Extract the base64 content between headers
        $lines = explode("\n", $pemContent);
        $base64Content = '';
        $inContent = false;

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) {
                $inContent = true; // Content starts after blank line in S/MIME format
                continue;
            }
            if ($inContent && !str_starts_with($line, '-')) {
                $base64Content .= $line;
            }
        }

        if (empty($base64Content)) {
            throw new RuntimeException("Failed to extract signature content from PEM");
        }

        // Decode base64 to get DER format
        $derSignature = base64_decode($base64Content);
        if ($derSignature === false) {
            throw new RuntimeException("Failed to decode signature to DER format");
        }

        // Write DER signature
        if (file_put_contents($signaturePath, $derSignature) === false) {
            throw new RuntimeException("Failed to write DER signature");
        }

        // Clean up temporary PEM file
        @unlink($signaturePemPath);

        // Clean up resources
        openssl_x509_free($certResource);
        openssl_pkey_free($keyResource);
    }

    /**
     * Copy images from storage to temp directory.
     *
     * @param Pass $pass
     * @param string $tempDir
     */
    protected function copyImages(Pass $pass, string $tempDir): void
    {
        if (empty($pass->images) || !is_array($pass->images)) {
            return;
        }

        $imageMapping = [
            'icon' => 'icon.png',
            'icon_2x' => 'icon@2x.png',
            'icon_3x' => 'icon@3x.png',
            'logo' => 'logo.png',
            'logo_2x' => 'logo@2x.png',
            'logo_3x' => 'logo@3x.png',
            'strip' => 'strip.png',
            'strip_2x' => 'strip@2x.png',
            'strip_3x' => 'strip@3x.png',
            'thumbnail' => 'thumbnail.png',
            'thumbnail_2x' => 'thumbnail@2x.png',
            'thumbnail_3x' => 'thumbnail@3x.png',
            'background' => 'background.png',
            'background_2x' => 'background@2x.png',
            'background_3x' => 'background@3x.png',
            'footer' => 'footer.png',
            'footer_2x' => 'footer@2x.png',
            'footer_3x' => 'footer@3x.png',
        ];

        $disk = Storage::disk($this->imagesDisk);

        foreach ($pass->images as $key => $path) {
            if (isset($imageMapping[$key]) && $disk->exists($path)) {
                $content = $disk->get($path);
                $targetFile = $tempDir . '/' . $imageMapping[$key];
                file_put_contents($targetFile, $content);
            }
        }
    }

    /**
     * Create the .pkpass ZIP file.
     *
     * @param string $tempDir
     * @param Pass $pass
     * @return string Storage path
     * @throws RuntimeException
     */
    protected function createPkpass(string $tempDir, Pass $pass): string
    {
        $disk = Storage::disk($this->passesDisk);
        $relativePath = $this->passesPath . '/' . $pass->user_id . '/pass_' . $pass->serial_number . '.pkpass';

        // Ensure directory exists
        $directory = dirname($relativePath);
        if (!$disk->exists($directory)) {
            $disk->makeDirectory($directory);
        }

        $fullPath = $disk->path($relativePath);

        $zip = new ZipArchive();
        if ($zip->open($fullPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new RuntimeException("Failed to create ZIP archive");
        }

        // Add all files from temp directory
        $files = glob($tempDir . '/*');
        foreach ($files as $file) {
            if (is_file($file)) {
                $zip->addFile($file, basename($file));
            }
        }

        $zip->close();

        return $relativePath;
    }

    /**
     * Create a temporary directory.
     *
     * @return string
     * @throws RuntimeException
     */
    protected function createTempDirectory(): string
    {
        $tempDir = sys_get_temp_dir() . '/pkpass_' . uniqid();

        if (!mkdir($tempDir, 0755, true)) {
            throw new RuntimeException("Failed to create temporary directory");
        }

        return $tempDir;
    }

    /**
     * Clean up temporary directory and its contents.
     *
     * @param string $tempDir
     */
    protected function cleanupTempDirectory(string $tempDir): void
    {
        if (!is_dir($tempDir)) {
            return;
        }

        $files = glob($tempDir . '/*');
        foreach ($files as $file) {
            if (is_file($file)) {
                @unlink($file);
            }
        }

        @rmdir($tempDir);
    }
}
