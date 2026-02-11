# Tasks: Pass Image Resize & Platform Preview

**Input**: Design documents from [specs/001-pass-image-resize-preview/](specs/001-pass-image-resize-preview/)
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED for any change unless a governance-approved waiver is documented in spec.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Shared configuration and scaffolding for image resizing and previews.

- [ ] T001 [P] Add image size map and resize defaults in config/passkit.php
- [ ] T002 [P] Add image metadata types (originals/variants) and slot/platform helpers in resources/js/types/pass.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core backend services and validation needed before user story work.

- [ ] T003 Create PassImageRequest with validation for image, slot, platform, resize_mode in app/Http/Requests/PassImageRequest.php
- [ ] T004 Implement PassImageService with GD resizing (contain + transparent padding) and variant storage in app/Services/PassImageService.php
- [ ] T005 [P] Add ProcessPassImageJob for optional async resizing when uploads exceed threshold in app/Jobs/ProcessPassImageJob.php
- [ ] T006 Update PassImageController to use PassImageRequest + PassImageService and return contract response in app/Http/Controllers/PassImageController.php

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Auto-Resize Uploaded Images (Priority: P1) 🎯 MVP

**Goal**: Upload any image, store original + platform-specific variants, and surface the resized output in creation flows.

**Independent Test**: Upload a large image and confirm stored variants match required sizes and are returned by the API.

### Tests for User Story 1 (REQUIRED) ⚠️

- [ ] T007 [P] [US1] Add feature test for successful upload + variant response in tests/Feature/PassImageUploadTest.php
- [ ] T008 [P] [US1] Add feature test for invalid file type/size/slot validation errors in tests/Feature/PassImageUploadTest.php

### Implementation for User Story 1

- [ ] T009 [US1] Update pass creation image handling to store upload metadata (originals/variants) in resources/js/pages/passes/create.tsx
- [ ] T010 [US1] Update pass edit image handling to store upload metadata (originals/variants) in resources/js/pages/passes/edit.tsx
- [ ] T011 [US1] Update template creation image handling to store upload metadata in resources/js/pages/templates/create.tsx
- [ ] T012 [US1] Update template edit image handling to store upload metadata in resources/js/pages/templates/edit.tsx
- [ ] T013 [US1] Update ImageUploader to send slot/platform/resize_mode and accept variant responses in resources/js/components/image-uploader.tsx
- [ ] T014 [US1] Align pass/template store validation for new images JSON shape in app/Http/Controllers/PassController.php and app/Http/Controllers/PassTemplateController.php
- [ ] T015 [US1] Map Apple pass image selection to new variants structure in app/Services/ApplePassService.php

**Checkpoint**: User Story 1 fully functional and independently testable.

---

## Phase 4: User Story 2 - Platform-Specific Preview Toggle (Priority: P2)

**Goal**: Allow users to toggle preview between Apple and Google on pass/template create/edit pages.

**Independent Test**: Switch preview platform on create/edit screens and verify the preview updates without losing form state.

### Tests for User Story 2 (REQUIRED) ⚠️

- [ ] T016 [P] [US2] Add feature test coverage for preview platform availability on create/edit pages in tests/Feature/PassPreviewPlatformTest.php

### Implementation for User Story 2

- [ ] T017 [US2] Add preview platform toggle and state to pass create/edit screens in resources/js/pages/passes/create.tsx and resources/js/pages/passes/edit.tsx
- [ ] T018 [US2] Add preview platform toggle and state to template create/edit screens in resources/js/pages/templates/create.tsx and resources/js/pages/templates/edit.tsx
- [ ] T019 [US2] Update PassPreview to render platform-specific layout differences (if applicable) in resources/js/components/pass-preview.tsx

**Checkpoint**: User Story 2 works independently on create/edit flows.

---

## Phase 5: User Story 3 - Image Quality Feedback (Priority: P3)

**Goal**: Warn users when uploads are too small and may appear blurry after resizing.

**Independent Test**: Upload an undersized image and verify the warning appears while upload still succeeds.

### Tests for User Story 3 (REQUIRED) ⚠️

- [ ] T020 [P] [US3] Add feature test for undersized image warning flag in tests/Feature/PassImageUploadTest.php

### Implementation for User Story 3

- [ ] T021 [US3] Display quality warning messaging in ImageUploader using response metadata in resources/js/components/image-uploader.tsx

**Checkpoint**: User Story 3 works independently and surfaces warnings.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation and cross-story cleanup.

- [ ] T022 [P] Run quickstart validation steps and update specs/001-pass-image-resize-preview/quickstart.md if needed
- [ ] T023 [P] Run minimal test command and record in tasks notes (php artisan test --compact tests/Feature/PassImageUploadTest.php) in specs/001-pass-image-resize-preview/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories after Foundational.
- **US2 (P2)**: Depends on US1 image metadata being available for previews.
- **US3 (P3)**: Depends on US1 upload pipeline and response metadata.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T003 and T004 should precede T006 but can be developed in parallel with T005.
- T009–T012 can be done in parallel across pass/template pages.
- T016 can be authored while T017–T019 are in progress.
- T020 can be written in parallel with T021.

---

## Parallel Example: User Story 1

```bash
Task: "Add feature test for successful upload + variant response in tests/Feature/PassImageUploadTest.php"
Task: "Add feature test for invalid file type/size/slot validation errors in tests/Feature/PassImageUploadTest.php"

Task: "Update pass creation image handling to store upload metadata in resources/js/pages/passes/create.tsx"
Task: "Update template creation image handling to store upload metadata in resources/js/pages/templates/create.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate US1 with tests in tests/Feature/PassImageUploadTest.php

### Incremental Delivery

1. US1: Upload + resize pipeline
2. US2: Platform preview toggle
3. US3: Quality warnings
4. Polish: Quickstart validation
