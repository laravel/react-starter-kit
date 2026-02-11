<!--
Sync Impact Report
- Version change: (uninitialized) -> 1.0.0
- Modified principles: [PRINCIPLE_1_NAME] -> I. Laravel-First Architecture; [PRINCIPLE_2_NAME] -> II. Type-Safe Routing & Inertia Navigation; [PRINCIPLE_3_NAME] -> III. Test-Backed Changes (NON-NEGOTIABLE); [PRINCIPLE_4_NAME] -> IV. Security & Tenant Isolation; [PRINCIPLE_5_NAME] -> V. Performance & Reliability
- Added sections: Product Constraints; Workflow & Quality Gates
- Removed sections: None
- Templates requiring updates: .specify/templates/plan-template.md (✅ updated), .specify/templates/spec-template.md (✅ updated), .specify/templates/tasks-template.md (✅ updated)
- Follow-up TODOs: None
-->
# LaraPassKit Constitution

## Core Principles

### I. Laravel-First Architecture
Build features using Laravel conventions: Eloquent models and relationships, Form
Request validation, policies/gates for authorization, and Inertia renders for UI
routes. Avoid raw SQL when Eloquent can express the query, and do not introduce
new base folders or dependencies without explicit approval.

### II. Type-Safe Routing & Inertia Navigation
All frontend navigation and API links MUST use Wayfinder route helpers from
`@/routes` or `@/actions`. Hardcoded URLs are not allowed. Inertia pages live
under `resources/js/pages`, and navigation must use Inertia `Link` with
prefetching when appropriate.

### III. Test-Backed Changes (NON-NEGOTIABLE)
Every change requires new or updated tests and a minimal test run that exercises
the change. Use PHPUnit feature tests by default, with unit tests only when they
offer clearer coverage. Tests must cover happy path and failure path behavior.

### IV. Security & Tenant Isolation
All user data access MUST be authorized via policies, and data must be scoped to
the current user or tenant context. Validate all input with Form Requests, use
Sanctum for API auth, and never read secrets outside configuration files.

### V. Performance & Reliability
Pass generation and other heavy tasks MUST run via queues where latency could
impact request time. Avoid N+1 queries, prefer eager loading, and ensure storage
paths and file operations are resilient and logged for debugging.

## Product Constraints

- Build Apple and Google pass generation in-house using PHP OpenSSL and native
	libraries; no third-party pass-generation dependencies.
- Use first-party Laravel packages only (`laravel/*`) for framework extensions.
- Subscription and billing are implemented with Laravel Cashier (Stripe).
- Support Apple Wallet and Google Wallet as the primary delivery platforms.

## Workflow & Quality Gates

- Every spec and plan MUST include a Constitution Check section that maps the
	work to these principles before implementation starts.
- All changes require a code review that verifies compliance with the Core
	Principles and Product Constraints.
- Run the minimal test subset that proves the change; note the command in the
	plan or tasks when relevant.
- Format PHP changes with Laravel Pint before finalizing.
- Create or modify documentation files only when explicitly requested.

## Governance

- The Constitution is the highest-level rule set and supersedes other guidance.
- Amendments require a documented change, updated version, and rationale in the
	constitution header. Follow semantic versioning: MAJOR for removals or
	redefinitions, MINOR for new principles or material expansions, PATCH for
	clarifications.
- PRs and reviews MUST verify Constitution compliance and note any approved
	exceptions explicitly in the plan or spec.

**Version**: 1.0.0 | **Ratified**: 2026-02-11 | **Last Amended**: 2026-02-11
