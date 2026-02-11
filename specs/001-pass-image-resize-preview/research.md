# Research: Pass Image Resize & Platform Preview

## Decision 1: Use native PHP GD for resizing

**Decision**: Implement image resizing with the built-in GD extension (no third-party libraries).

**Rationale**:
- Product constraints prohibit third-party pass/image dependencies.
- Current backend already stores uploads without any image processing.
- GD is widely available and sufficient for PNG resizing with transparency.

**Alternatives considered**:
- Imagick extension (richer features but additional server dependency).
- Third-party libraries (e.g., Intervention) (disallowed by constraints).

## Decision 2: Store original + derived variants in the images disk

**Decision**: Persist the original upload and generated variants in the configured
`passkit.storage.images_disk` and `passkit.storage.images_path`.

**Rationale**:
- Matches FR-002 and existing storage configuration.
- Allows re-generation of variants if sizing rules change.
- Keeps Apple pass generation compatible with stored variant paths.

**Alternatives considered**:
- Store only variants (loses original for future changes).
- Generate variants on-demand (slower, inconsistent with upload flow).

## Decision 3: Standardize a single resize rule (contain with padding)

**Decision**: Use a consistent “contain” resize strategy that preserves full
content and pads with transparency to the required size.

**Rationale**:
- Matches FR-003 requirement to preserve full image content.
- Avoids unexpected cropping for user-provided logos and icons.

**Alternatives considered**:
- Cover/crop (can remove content; less predictable for users).

## Decision 4: Centralize size definitions per platform/slot

**Decision**: Define a shared size map (Apple + Google) in configuration or a
single backend source to avoid UI-only constants.

**Rationale**:
- Removes duplication across multiple pages and reduces drift.
- Enables consistent server-side resizing and frontend display guidance.

**Alternatives considered**:
- Hardcode sizes only in the UI (easy to drift from backend behavior).
- Keep sizes per page (hard to maintain and validate).

## Decision 5: Quality warning for undersized uploads

**Decision**: Flag uploads whose original dimensions are smaller than the target
size and return a warning in the upload response.

**Rationale**:
- Meets FR-007 and helps users avoid blurry passes.
- Allows processing to continue without blocking the flow.

**Alternatives considered**:
- Hard-fail small uploads (higher friction for users).
- No warning (poor pass quality likely to slip through).
