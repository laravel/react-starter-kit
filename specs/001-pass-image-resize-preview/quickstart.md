# Quickstart: Pass Image Resize & Platform Preview

## Prerequisites

- App dependencies installed
- Storage disk configured for pass images (`PASSKIT_IMAGES_DISK`, `PASSKIT_IMAGES_PATH`)

## Manual Verification

1. Open the pass creation flow.
2. Upload a large image to an image slot.
3. Confirm the upload returns a resized variant and warning when undersized.
4. Toggle the preview platform between Apple and Google and confirm the preview updates.

## Expected Result

- Resized variants are stored and used in previews.
- Users can switch the preview platform without losing their inputs.
- A warning appears when an upload is too small for the target size.

## Test Command (to be added in tasks)

```
php artisan test --compact tests/Feature/PassImageUploadTest.php
```
