# Implementation Plan: Pass Image Resize & Platform Preview

**Branch**: `001-pass-image-resize-preview` | **Date**: 2026-02-11 | **Spec**: [specs/001-pass-image-resize-preview/spec.md](specs/001-pass-image-resize-preview/spec.md)
**Input**: Feature specification from [specs/001-pass-image-resize-preview/spec.md](specs/001-pass-image-resize-preview/spec.md)

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enable pass creators to upload any image and automatically resize it to the
required platform-specific sizes (contain with transparent padding), while
adding a platform toggle to preview Apple vs Google layouts on pass/template
create and edit screens.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: PHP 8.3, TypeScript 5.7, React 19  
**Primary Dependencies**: Laravel 12, Inertia.js v2, Tailwind CSS v4, Wayfinder  
**Storage**: SQL Server (default `sqlsrv`), Laravel filesystem disks (local/public)  
**Testing**: PHPUnit feature tests, eslint/tsc for frontend checks  
**Target Platform**: Web app (server-rendered Inertia SPA)  
**Project Type**: Web application (Laravel backend + Inertia React frontend)  
**Performance Goals**: Image processing completes < 2s for 95% of uploads; preview toggle updates < 1s for 95% of interactions  
**Constraints**: No third-party pass/image packages; use native PHP + Laravel only; PNG outputs required for Apple passes  
**Scale/Scope**: Affects pass creation/editing and template creation/editing flows, plus image upload API

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Laravel-First Architecture: uses Eloquent, Form Requests, policies, and
  Inertia renders; no new dependencies or base folders without approval.
- Type-Safe Routing & Inertia Navigation: Wayfinder routes used, no hardcoded
  URLs, pages live under `resources/js/pages`.
- Test-Backed Changes: test plan added with minimal test run documented.
- Security & Tenant Isolation: authorization and scoping are explicit.
- Performance & Reliability: heavy work queued, N+1 avoided, storage paths
  resilient.

## Project Structure

### Documentation (this feature)

```text
specs/001-pass-image-resize-preview/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
app/
├── Http/
│   ├── Controllers/
│   └── Requests/
├── Jobs/
└── Services/

config/
routes/
resources/
└── js/
  ├── components/
  ├── pages/
  │   ├── passes/
  │   └── templates/
  └── types/

tests/
└── Feature/
```

**Structure Decision**: Laravel monolith with Inertia React frontend under
`resources/js`. Backend changes live in `app/` and `routes/`, frontend changes
live in `resources/js`, and tests in `tests/Feature`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

No violations.

## Phase 0: Outline & Research

- Research completed in [specs/001-pass-image-resize-preview/research.md](specs/001-pass-image-resize-preview/research.md).
- Decisions cover native PHP resizing, size map centralization, preview toggle scope, and contain padding.

## Phase 1: Design & Contracts

- Data model documented in [specs/001-pass-image-resize-preview/data-model.md](specs/001-pass-image-resize-preview/data-model.md).
- API contract documented in [specs/001-pass-image-resize-preview/contracts/pass-images.yml](specs/001-pass-image-resize-preview/contracts/pass-images.yml).
- Quickstart documented in [specs/001-pass-image-resize-preview/quickstart.md](specs/001-pass-image-resize-preview/quickstart.md).

## Phase 1: Agent Context Update

- Run `.specify/scripts/bash/update-agent-context.sh copilot` (completed below).

## Constitution Check (Post-Design)

- Laravel-first patterns preserved by keeping upload logic in controller + service.
- Wayfinder routing remains the source of upload URLs and preview navigation.
- Test plan documented in quickstart and will be expanded in tasks.
- Authorization remains scoped to authenticated users.
- Resizing can be queued if performance metrics require it.

**Status**: PASS
