# Data Model: Pass Image Resize & Platform Preview

## Overview

This feature extends existing `passes.images` and `pass_templates.images` JSON
structures to include original uploads and derived variants per platform and
image slot. No new tables are required.

## Entities

### PassImageSlot
Represents a logical image slot used by pass generation and previews.

**Slots** (current + planned):
- `icon`, `logo`, `strip`, `thumbnail`, `background`, `footer`

### PassImageOriginal
Represents the raw user-uploaded file for a slot.

**Fields**:
- `path`: string (storage path)
- `width`: int
- `height`: int
- `mime`: string
- `size_bytes`: int
- `created_at`: datetime

### PassImageVariant
Represents a resized output for a given platform, slot, and scale.

**Fields**:
- `platform`: `apple` | `google`
- `slot`: PassImageSlot
- `scale`: `1x` | `2x` | `3x`
- `width`: int
- `height`: int
- `path`: string (storage path)
- `quality_warning`: bool
- `generated_at`: datetime

### PreviewSelection (UI state)
Represents the currently selected preview platform in the UI.

**Fields**:
- `platform`: `apple` | `google`

## Storage Shape (JSON)

Stored on `passes.images` and `pass_templates.images` as JSON. Proposed shape:

```json
{
  "originals": {
    "icon": { "path": "...", "width": 1024, "height": 1024, "mime": "image/png", "size_bytes": 48212, "created_at": "..." }
  },
  "variants": {
    "apple": {
      "icon": {
        "1x": { "path": "...", "width": 29, "height": 29, "quality_warning": false },
        "2x": { "path": "...", "width": 58, "height": 58, "quality_warning": false }
      }
    },
    "google": {
      "icon": {
        "1x": { "path": "...", "width": 48, "height": 48, "quality_warning": true }
      }
    }
  }
}
```

## Validation Rules

- Uploaded file must be an image (PNG preferred; other formats normalized to PNG).
- Maximum upload size 1MB (existing constraint).
- `slot` must be one of the defined image slots.
- `platform` must be `apple` or `google`.
- `resize_mode` must be `contain` (default) or `cover` if enabled.

## Notes

- Apple pass generation should read Apple variants from the `variants.apple`
  map or adapt to a flattened mapping if required.
- Templates and passes should both use the same image metadata structure.
