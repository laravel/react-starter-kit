<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class PassImageService
{
    protected string $imagesDisk;

    protected string $imagesPath;

    protected array $sizes;

    protected string $defaultResizeMode;

    protected float $qualityWarningRatio;

    public function __construct()
    {
        $this->imagesDisk = (string) config('passkit.storage.images_disk');
        $this->imagesPath = (string) config('passkit.storage.images_path');
        $this->sizes = (array) config('passkit.images.sizes', []);
        $this->defaultResizeMode = (string) config('passkit.images.resize_mode', 'contain');
        $this->qualityWarningRatio = (float) config('passkit.images.quality_warning_ratio', 1.0);
    }

    /**
     * @return array{original: array<string, mixed>, variants: array<int, array<string, mixed>>}
     */
    public function process(UploadedFile $file, string $slot, string $platform, ?string $resizeMode, int $userId): array
    {
        $platformSizes = Arr::get($this->sizes, $platform, []);
        $slotSizes = Arr::get($platformSizes, $slot, []);

        if (empty($slotSizes) || ! is_array($slotSizes)) {
            throw new RuntimeException('Unsupported image slot or platform.');
        }

        [$sourceImage, $sourceWidth, $sourceHeight, $mime] = $this->loadImage($file);

        $originalPath = $this->storeOriginal($sourceImage, $slot, $userId);
        $disk = Storage::disk($this->imagesDisk);

        $variants = [];
        $mode = $resizeMode ?: $this->defaultResizeMode;

        foreach ($slotSizes as $scale => $dimensions) {
            $targetWidth = (int) Arr::get($dimensions, 'width');
            $targetHeight = (int) Arr::get($dimensions, 'height');

            if ($targetWidth <= 0 || $targetHeight <= 0) {
                continue;
            }

            $variantImage = $this->resizeImage($sourceImage, $sourceWidth, $sourceHeight, $targetWidth, $targetHeight, $mode);
            $variantPath = $this->storeVariant($variantImage, $slot, $platform, $scale, $userId);
            imagedestroy($variantImage);

            $variants[] = [
                'platform' => $platform,
                'slot' => $slot,
                'scale' => $scale,
                'path' => $variantPath,
                'url' => $disk->url($variantPath),
                'width' => $targetWidth,
                'height' => $targetHeight,
                'quality_warning' => $this->isLowQuality($sourceWidth, $sourceHeight, $targetWidth, $targetHeight),
            ];
        }

        imagedestroy($sourceImage);

        return [
            'original' => [
                'path' => $originalPath,
                'url' => $disk->url($originalPath),
                'width' => $sourceWidth,
                'height' => $sourceHeight,
                'mime' => $mime,
            ],
            'variants' => $variants,
        ];
    }

    /**
     * @return array{original: array<string, mixed>, variants: array<int, array<string, mixed>>}
     */
    public function processFromPath(string $originalPath, string $slot, string $platform, ?string $resizeMode, int $userId): array
    {
        $disk = Storage::disk($this->imagesDisk);
        $content = $disk->get($originalPath);

        $tempPath = tempnam(sys_get_temp_dir(), 'passimg_');
        if ($tempPath === false) {
            throw new RuntimeException('Unable to create temp file for image processing.');
        }

        if (file_put_contents($tempPath, $content) === false) {
            @unlink($tempPath);
            throw new RuntimeException('Unable to write temp image file.');
        }

        [$sourceImage, $sourceWidth, $sourceHeight, $mime] = $this->loadImageFromPath($tempPath);

        @unlink($tempPath);

        $platformSizes = Arr::get($this->sizes, $platform, []);
        $slotSizes = Arr::get($platformSizes, $slot, []);

        if (empty($slotSizes) || ! is_array($slotSizes)) {
            throw new RuntimeException('Unsupported image slot or platform.');
        }

        $variants = [];
        $mode = $resizeMode ?: $this->defaultResizeMode;

        foreach ($slotSizes as $scale => $dimensions) {
            $targetWidth = (int) Arr::get($dimensions, 'width');
            $targetHeight = (int) Arr::get($dimensions, 'height');

            if ($targetWidth <= 0 || $targetHeight <= 0) {
                continue;
            }

            $variantImage = $this->resizeImage($sourceImage, $sourceWidth, $sourceHeight, $targetWidth, $targetHeight, $mode);
            $variantPath = $this->storeVariant($variantImage, $slot, $platform, $scale, $userId);
            imagedestroy($variantImage);

            $variants[] = [
                'platform' => $platform,
                'slot' => $slot,
                'scale' => $scale,
                'path' => $variantPath,
                'url' => $disk->url($variantPath),
                'width' => $targetWidth,
                'height' => $targetHeight,
                'quality_warning' => $this->isLowQuality($sourceWidth, $sourceHeight, $targetWidth, $targetHeight),
            ];
        }

        imagedestroy($sourceImage);

        return [
            'original' => [
                'path' => $originalPath,
                'url' => $disk->url($originalPath),
                'width' => $sourceWidth,
                'height' => $sourceHeight,
                'mime' => $mime,
            ],
            'variants' => $variants,
        ];
    }

    /**
     * @return array{0: \GdImage, 1: int, 2: int, 3: string}
     */
    protected function loadImage(UploadedFile $file): array
    {
        $path = $file->getRealPath();
        if ($path === false) {
            throw new RuntimeException('Invalid image upload.');
        }

        return $this->loadImageFromPath($path);
    }

    /**
     * @return array{0: \GdImage, 1: int, 2: int, 3: string}
     */
    protected function loadImageFromPath(string $path): array
    {
        $info = getimagesize($path);
        if ($info === false) {
            throw new RuntimeException('Unable to read image metadata.');
        }

        [$width, $height] = $info;
        $mime = (string) ($info['mime'] ?? '');

        return [$this->createImageResource($path, $mime), $width, $height, $mime];
    }

    protected function createImageResource(string $path, string $mime): \GdImage
    {
        $resource = match ($mime) {
            'image/png' => imagecreatefrompng($path),
            'image/jpeg' => imagecreatefromjpeg($path),
            'image/webp' => $this->createWebpResource($path),
            default => throw new RuntimeException('Unsupported image format.'),
        };

        if ($resource === false) {
            throw new RuntimeException('Unable to read the uploaded image.');
        }

        return $resource;
    }

    protected function createWebpResource(string $path): \GdImage
    {
        if (! function_exists('imagecreatefromwebp')) {
            throw new RuntimeException('WEBP images are not supported by this server.');
        }

        return imagecreatefromwebp($path);
    }

    protected function resizeImage(\GdImage $source, int $sourceWidth, int $sourceHeight, int $targetWidth, int $targetHeight, string $mode): \GdImage
    {
        $canvas = imagecreatetruecolor($targetWidth, $targetHeight);
        imagealphablending($canvas, false);
        imagesavealpha($canvas, true);
        $transparent = imagecolorallocatealpha($canvas, 0, 0, 0, 127);
        imagefilledrectangle($canvas, 0, 0, $targetWidth, $targetHeight, $transparent);

        if ($mode === 'cover') {
            $scale = max($targetWidth / $sourceWidth, $targetHeight / $sourceHeight);
            $scaledWidth = (int) ceil($sourceWidth * $scale);
            $scaledHeight = (int) ceil($sourceHeight * $scale);

            $temp = imagecreatetruecolor($scaledWidth, $scaledHeight);
            imagealphablending($temp, false);
            imagesavealpha($temp, true);
            $tempTransparent = imagecolorallocatealpha($temp, 0, 0, 0, 127);
            imagefilledrectangle($temp, 0, 0, $scaledWidth, $scaledHeight, $tempTransparent);

            imagecopyresampled($temp, $source, 0, 0, 0, 0, $scaledWidth, $scaledHeight, $sourceWidth, $sourceHeight);

            $srcX = (int) floor(($scaledWidth - $targetWidth) / 2);
            $srcY = (int) floor(($scaledHeight - $targetHeight) / 2);
            imagecopy($canvas, $temp, 0, 0, $srcX, $srcY, $targetWidth, $targetHeight);
            imagedestroy($temp);

            return $canvas;
        }

        $scale = min($targetWidth / $sourceWidth, $targetHeight / $sourceHeight);
        $scaledWidth = (int) floor($sourceWidth * $scale);
        $scaledHeight = (int) floor($sourceHeight * $scale);
        $dstX = (int) floor(($targetWidth - $scaledWidth) / 2);
        $dstY = (int) floor(($targetHeight - $scaledHeight) / 2);

        imagecopyresampled($canvas, $source, $dstX, $dstY, 0, 0, $scaledWidth, $scaledHeight, $sourceWidth, $sourceHeight);

        return $canvas;
    }

    protected function storeOriginal(\GdImage $image, string $slot, int $userId): string
    {
        $path = $this->imagesPath.'/'.$userId.'/originals/'.$slot.'/'.Str::uuid().'.png';
        $this->storePng($image, $path);

        return $path;
    }

    protected function storeVariant(\GdImage $image, string $slot, string $platform, string $scale, int $userId): string
    {
        $path = $this->imagesPath.'/'.$userId.'/variants/'.$platform.'/'.$slot.'/'.$scale.'/'.Str::uuid().'.png';
        $this->storePng($image, $path);

        return $path;
    }

    protected function storePng(\GdImage $image, string $path): void
    {
        $tempPath = tempnam(sys_get_temp_dir(), 'passimg_');
        if ($tempPath === false) {
            throw new RuntimeException('Unable to create temp file for image export.');
        }

        if (! imagepng($image, $tempPath)) {
            @unlink($tempPath);
            throw new RuntimeException('Failed to write PNG image.');
        }

        $content = file_get_contents($tempPath);
        @unlink($tempPath);

        if ($content === false) {
            throw new RuntimeException('Failed to read PNG image content.');
        }

        if (! Storage::disk($this->imagesDisk)->put($path, $content)) {
            throw new RuntimeException('Failed to store PNG image.');
        }
    }

    protected function isLowQuality(int $sourceWidth, int $sourceHeight, int $targetWidth, int $targetHeight): bool
    {
        $ratio = $this->qualityWarningRatio;

        return $sourceWidth < ($targetWidth * $ratio) || $sourceHeight < ($targetHeight * $ratio);
    }
}
