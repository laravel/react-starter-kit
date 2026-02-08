# PassKit SaaS — Full Project Specification & Implementation Plan

## Context

We are building a **PassKit SaaS platform** — a web application that allows users to create, manage, and distribute digital wallet passes for **Apple Wallet** and **Google Wallet**. Users can design passes (loyalty cards, coupons, event tickets, boarding passes, gift cards, membership cards, stamp cards), generate them, and provide "Add to Wallet" links for their customers.

**Production reference**: [passkit.com/samples](https://passkit.com/samples/) — shows the end-goal UX: pass previews with "Save to Phone" buttons that add passes directly to Apple/Google Wallets.

**Stack**: Laravel 12, Inertia.js v2, React 19, TypeScript, Tailwind CSS v4, shadcn/ui components.
**Constraint**: First-party Laravel packages only (`laravel/*`). Pass generation built from scratch using PHP OpenSSL.
**Billing**: Laravel Cashier (Stripe) with 4 tiers: Free (25 passes), Pro Apple, Pro Google, Unlimited.

---

## Project Overview

### Architecture Summary

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│  React 19 + Inertia + TypeScript + Tailwind     │
│  Pages: Dashboard, Passes, Templates, Billing   │
│  Components: PassPreview, FieldEditor, etc.     │
├─────────────────────────────────────────────────┤
│                   Backend                        │
│  Laravel 12 + Fortify (Auth)                    │
│  Controllers: Pass, Template, Billing, Download │
│  Services: ApplePass, GooglePass, PassLimit     │
│  Middleware: EnforcePassLimit                    │
├─────────────────────────────────────────────────┤
│                Infrastructure                    │
│  MSSql DB | Queue (horizon) | Storage (local)    │
│  Stripe Webhooks | Certificate Storage          │
└─────────────────────────────────────────────────┘
```

### Pass Types Supported

| Type | Apple | Google | Description |
|------|-------|--------|-------------|
| Generic | ✅ | ✅ | General-purpose pass |
| Coupon | ✅ | ✅ (Offer) | Discount coupons |
| Event Ticket | ✅ | ✅ | Concert/event tickets |
| Boarding Pass | ✅ | ✅ (Transit) | Airline/transit boarding |
| Store Card | ✅ | ✅ (Loyalty) | Loyalty/stamp cards |
| Gift Card | ✅ | ✅ | Digital gift cards |
| Membership | ✅ (Generic) | ✅ (Generic) | Membership cards |
|Stamp Card |
|Loyalty Card|

### Billing Tiers

| Plan | Price | Passes | Platforms |
|------|-------|--------|-----------|
| Free | $0 | 25 total | Apple + Google |
| Pro Apple | $29/mo | Unlimited | Apple only |
| Pro Google | $29/mo | Unlimited | Google only |
| Unlimited | $49/mo | Unlimited | Apple + Google |

---

## Phase Breakdown

### Phase 1: Foundation — Database, Models, Configuration
### Phase 2: Apple Wallet Pass Generation Service
### Phase 3: Google Wallet Pass Generation Service
### Phase 4: Plan Limits & Billing Integration
### Phase 5: Backend Controllers, Routes & Policies
### Phase 6: Queue Jobs for Async Generation
### Phase 7: Frontend Types & Shared Components
### Phase 8: Frontend Pages (Dashboard, Passes, Templates, Billing)
### Phase 9: Public Pass Distribution (Add to Wallet)
### Phase 10: Testing & Stripe Webhooks

---

## Phase 1: Foundation

**Goal**: Set up the data layer, config, and models that everything else depends on.

### Tasks

- [ ] 1.1 Install Laravel Cashier: `composer require laravel/cashier`
- [ ] 1.2 Publish & run Cashier migrations
- [ ] 1.3 Create `pass_templates` migration
- [ ] 1.4 Create `passes` migration
- [ ] 1.5 Create `config/passkit.php` configuration file
- [ ] 1.6 Update `.env.example` with all new env vars
- [ ] 1.7 Create `PassTemplate` model with factory
- [ ] 1.8 Create `Pass` model with factory
- [ ] 1.9 Update `User` model (add Billable trait, relationships)
- [ ] 1.10 Register services in `AppServiceProvider`

### Key Files

**Create:**
- `config/passkit.php`
- `database/migrations/xxxx_create_pass_templates_table.php`
- `database/migrations/xxxx_create_passes_table.php`
- `app/Models/Pass.php`
- `app/Models/PassTemplate.php`
- `database/factories/PassFactory.php`
- `database/factories/PassTemplateFactory.php`

**Modify:**
- `app/Models/User.php` — add `Billable` trait, `passes()`, `passTemplates()` relationships
- `app/Providers/AppServiceProvider.php` — register singletons
- `.env.example` — add Apple/Google/Stripe env vars
- `composer.json` — add `laravel/cashier`

### Database Schema

**pass_templates:**
```
id, user_id (FK→users), name, description, pass_type, platform, design_data (JSON), images (JSON), timestamps, soft_deletes
```

**passes:**
```
id, user_id (FK→users), pass_template_id (FK→pass_templates, nullable), platform (apple|google), pass_type, serial_number (unique), status (active|voided|expired), pass_data (JSON), barcode_data (JSON), images (JSON), pkpass_path, google_save_url, google_class_id, google_object_id, last_generated_at, timestamps, soft_deletes
```

### Config Structure (`config/passkit.php`)
```php
[
    'apple' => [
        'certificate_path', 'certificate_password', 'wwdr_certificate_path',
        'team_identifier', 'pass_type_identifier', 'organization_name'
    ],
    'google' => [
        'service_account_path', 'issuer_id', 'application_name'
    ],
    'plans' => [
        'free' => ['name', 'pass_limit' => 25, 'platforms' => ['apple','google'], 'stripe_price_id' => null],
        'pro_apple' => ['pass_limit' => null, 'platforms' => ['apple']],
        'pro_google' => ['pass_limit' => null, 'platforms' => ['google']],
        'unlimited' => ['pass_limit' => null, 'platforms' => ['apple','google']],
    ],
    'storage' => ['certificates_disk', 'passes_disk', 'passes_path', 'images_disk', 'images_path'],
]
```

### AI Agent Prompt — Phase 1

```
You are implementing Phase 1 (Foundation) of a PassKit SaaS built on Laravel 12 + Inertia + React.

EXISTING PROJECT: A Laravel 12 starter kit with:
- Auth via Fortify (login, register, 2FA, email verification)
- React 19 + Inertia + TypeScript + Tailwind CSS v4
- SQLite database, database queue, existing User model with TwoFactorAuthenticatable
- Existing migrations: users, sessions, cache, jobs

YOUR TASKS:
1. Run: composer require laravel/cashier
2. Run: php artisan vendor:publish --tag=cashier-migrations && php artisan migrate
3. Create migration for `pass_templates` table with columns: id, user_id (FK→users, cascadeOnDelete), name (string), description (string nullable), pass_type (string), platform (string), design_data (JSON), images (JSON nullable), timestamps, softDeletes. Index on [user_id, pass_type].
4. Create migration for `passes` table with columns: id, user_id (FK→users, cascadeOnDelete), pass_template_id (FK→pass_templates, nullable, nullOnDelete), platform (string), pass_type (string), serial_number (string unique), status (string default 'active'), pass_data (JSON), barcode_data (JSON nullable), images (JSON nullable), pkpass_path (string nullable), google_save_url (string nullable), google_class_id (string nullable), google_object_id (string nullable), last_generated_at (timestamp nullable), timestamps, softDeletes. Index on [user_id, platform, status] and [serial_number].
5. Run: php artisan migrate
6. Create config/passkit.php with Apple credentials (certificate_path, certificate_password, wwdr_certificate_path, team_identifier, pass_type_identifier, organization_name), Google credentials (service_account_path, issuer_id, application_name), plans definitions (free/pro_apple/pro_google/unlimited with pass_limit and platforms), and storage config (certificates_disk, passes_disk, passes_path, images_disk, images_path). All values from env().
7. Update .env.example with: APPLE_PASS_CERTIFICATE_PATH, APPLE_PASS_CERTIFICATE_PASSWORD, APPLE_WWDR_CERTIFICATE_PATH, APPLE_TEAM_IDENTIFIER, APPLE_PASS_TYPE_IDENTIFIER, APPLE_ORGANIZATION_NAME, GOOGLE_SERVICE_ACCOUNT_PATH, GOOGLE_WALLET_ISSUER_ID, GOOGLE_WALLET_APP_NAME, STRIPE_KEY, STRIPE_SECRET, STRIPE_WEBHOOK_SECRET, STRIPE_PRO_APPLE_PRICE_ID, STRIPE_PRO_GOOGLE_PRICE_ID, STRIPE_UNLIMITED_PRICE_ID.
8. Create app/Models/PassTemplate.php with: HasFactory, SoftDeletes, fillable fields, casts (design_data→array, images→array), user() BelongsTo, passes() HasMany.
9. Create app/Models/Pass.php with: HasFactory, SoftDeletes, fillable fields, casts (pass_data→array, barcode_data→array, images→array, last_generated_at→datetime), user() BelongsTo, template() BelongsTo.
10. Modify app/Models/User.php: add `use Laravel\Cashier\Billable;` trait, add passes() HasMany and passTemplates() HasMany relationships.
11. Create database/factories/PassFactory.php and database/factories/PassTemplateFactory.php with realistic fake data.
12. In app/Providers/AppServiceProvider.php register() method, bind singletons for ApplePassService, GooglePassService, and PassLimitService (these classes don't exist yet, just prepare the bindings).

CONVENTIONS TO FOLLOW:
- Match existing code style (see app/Models/User.php, database/migrations/, config/ for patterns)
- Use Laravel 12 conventions (function casts() instead of $casts property)
- Factories use Database\Factories namespace with fake() helper
- All env vars use env() with null defaults

After completing all tasks, run: php artisan migrate:fresh to verify everything works.
```

---

## Phase 2: Apple Wallet Pass Generation

**Goal**: Build a service that generates signed `.pkpass` files from scratch using PHP OpenSSL.

### Tasks

- [ ] 2.1 Create `ApplePassService` with pass.json builder
- [ ] 2.2 Implement SHA1 manifest creation
- [ ] 2.3 Implement PKCS#7 signing (openssl_pkcs7_sign → DER conversion)
- [ ] 2.4 Implement ZIP packaging to .pkpass
- [ ] 2.5 Implement image bundling
- [ ] 2.6 Support all Apple pass types (generic, coupon, boardingPass, eventTicket, storeCard)

### Key File

**Create:** `app/Services/ApplePassService.php`

### Technical Details

The `.pkpass` format is a ZIP containing:
```
pass.json       → Pass definition (JSON)
manifest.json   → SHA1 hash of every other file
signature       → PKCS#7 detached signature of manifest.json (DER format)
icon.png        → Required 29x29
icon@2x.png     → Required 58x58
logo.png        → Optional 160x50
strip.png       → Optional 375x123
thumbnail.png   → Optional 90x90
background.png  → Optional 180x220
```

**Signing process:**
1. Build `pass.json` from Pass model data
2. Copy images into temp directory
3. SHA1 hash each file → `manifest.json`
4. `openssl_pkcs12_read()` to extract cert + key from .p12
5. `openssl_pkcs7_sign()` with PKCS7_BINARY | PKCS7_DETACHED flags, passing WWDR cert as extra certs
6. Convert PEM/S-MIME output to DER by stripping headers and base64-decoding
7. `ZipArchive` to package all files as .pkpass

**pass.json structure:**
```json
{
    "formatVersion": 1,
    "passTypeIdentifier": "pass.com.example",
    "serialNumber": "uuid",
    "teamIdentifier": "ABC123",
    "organizationName": "Company",
    "description": "Pass description",
    "backgroundColor": "rgb(255,255,255)",
    "foregroundColor": "rgb(0,0,0)",
    "coupon": {
        "headerFields": [{"key":"k","label":"L","value":"V"}],
        "primaryFields": [],
        "secondaryFields": [],
        "auxiliaryFields": [],
        "backFields": []
    },
    "barcodes": [{
        "format": "PKBarcodeFormatQR",
        "message": "data",
        "messageEncoding": "iso-8859-1"
    }]
}
```

### AI Agent Prompt — Phase 2

```
You are implementing Phase 2 (Apple Wallet Pass Generation) of a PassKit SaaS.

EXISTING STATE: Phase 1 is complete. You have:
- Pass model at app/Models/Pass.php with: pass_data (JSON cast), barcode_data (JSON cast), images (JSON cast), serial_number, platform, pass_type, pkpass_path, user_id
- PassTemplate model at app/Models/PassTemplate.php
- Config at config/passkit.php with apple.certificate_path, apple.certificate_password, apple.wwdr_certificate_path, apple.team_identifier, apple.pass_type_identifier, apple.organization_name, storage.passes_disk, storage.passes_path, storage.images_disk, storage.images_path

YOUR TASK: Create app/Services/ApplePassService.php

The service must:

1. __construct(): Read all Apple config from config('passkit.apple.*') and config('passkit.storage.*')

2. generate(Pass $pass): string — Main method that:
   a. Creates a temp directory (sys_get_temp_dir() . '/pkpass_' . random)
   b. Calls buildPassJson() to create pass.json in temp dir
   c. Calls copyImages() to copy pass images into temp dir
   d. Calls createManifest() to SHA1-hash all files into manifest.json
   e. Calls signManifest() to create PKCS#7 detached signature
   f. Calls createPkpass() to ZIP everything into a .pkpass
   g. Updates the Pass model with pkpass_path and last_generated_at
   h. Cleans up temp directory in a finally block
   i. Returns the storage path

3. buildPassJson(Pass $pass): array — Builds the pass.json structure:
   - Required: formatVersion=1, passTypeIdentifier, serialNumber, teamIdentifier, organizationName, description
   - The pass_type field on the model (generic|coupon|boardingPass|eventTicket|storeCard) becomes a key in the JSON containing the field structure
   - Field groups: headerFields, primaryFields, secondaryFields, auxiliaryFields, backFields — each an array of {key, label, value} objects from pass_data
   - Colors: backgroundColor, foregroundColor, labelColor from pass_data (rgb format)
   - Barcodes from barcode_data: format (PKBarcodeFormatQR|PKBarcodeFormatPDF417|PKBarcodeFormatAztec|PKBarcodeFormatCode128), message, messageEncoding, altText
   - For boardingPass: include transitType from pass_data

4. createManifest(string $tempDir): array — glob all files in temp dir, SHA1 hash each with sha1_file(), return as [filename => hash]

5. signManifest(string $tempDir): void — The critical signing step:
   - Read .p12 with openssl_pkcs12_read($p12Content, $certs, $password)
   - Extract cert with openssl_x509_read($certs['cert'])
   - Extract key with openssl_pkey_get_private($certs['pkey'])
   - Call openssl_pkcs7_sign(manifest.json path, signature.pem path, cert, key, [], PKCS7_BINARY | PKCS7_DETACHED, wwdr_cert_path)
   - Convert PEM to DER: read the .pem output, find the base64 content after the blank line separator (skip S/MIME headers), strip any boundary markers, base64_decode to get DER bytes
   - Write DER bytes to signature file
   - Delete the temp .pem file

6. createPkpass(string $tempDir, Pass $pass): string — Use ZipArchive to create .pkpass:
   - Path: storage/{passes_path}/{user_id}/pass_{serial_number}.pkpass
   - Ensure parent directory exists
   - Add all files from temp dir to ZIP
   - Return the relative storage path

7. copyImages(Pass $pass, string $tempDir): void — Map image keys to Apple filenames:
   icon→icon.png, icon_2x→icon@2x.png, logo→logo.png, logo_2x→logo@2x.png, strip→strip.png, strip_2x→strip@2x.png, thumbnail→thumbnail.png, thumbnail_2x→thumbnail@2x.png, background→background.png, background_2x→background@2x.png
   Copy from Storage::disk(images_disk) to temp dir

8. Helper methods: createTempDirectory(), cleanupTempDirectory()

IMPORTANT: Use only PHP built-in functions (openssl_*, ZipArchive, file operations). No third-party packages.

Throw \RuntimeException with descriptive messages on any failure (bad cert, signing failure, ZIP failure).

Follow existing Laravel code style in the project.
```

---

## Phase 3: Google Wallet Pass Generation

**Goal**: Build a service that creates Google Wallet passes via REST API and generates "Add to Wallet" JWT links.

### Tasks

- [ ] 3.1 Create `GooglePassService` with JWT encoding (RS256)
- [ ] 3.2 Implement OAuth2 access token retrieval via service account
- [ ] 3.3 Implement pass class creation via REST API
- [ ] 3.4 Implement pass object building for each type
- [ ] 3.5 Implement save URL generation
- [ ] 3.6 Support all Google pass types (generic, offer, loyalty, eventTicket, transit)

### Key File

**Create:** `app/Services/GooglePassService.php`

### Technical Details

**Google Wallet flow:**
1. Authenticate with service account → get OAuth2 access token
2. Create/check pass class (template) via REST API: `POST https://walletobjects.googleapis.com/walletobjects/v1/{classEndpoint}`
3. Build pass object with data
4. Sign a JWT containing the pass object → `https://pay.google.com/gp/v/save/{JWT}`

**JWT structure for save links:**
```json
{
    "iss": "service-account@project.iam.gserviceaccount.com",
    "aud": "google",
    "typ": "savetowallet",
    "iat": 1234567890,
    "origins": ["https://yourapp.com"],
    "payload": {
        "genericObjects": [{ "id": "...", "classId": "...", "..." }]
    }
}
```

**Class endpoints by type:**
- generic → `genericClass`
- offer → `offerClass`
- loyalty → `loyaltyClass`
- eventTicket → `eventTicketClass`
- boardingPass/transit → `transitClass`

### AI Agent Prompt — Phase 3

```
You are implementing Phase 3 (Google Wallet Pass Generation) of a PassKit SaaS.

EXISTING STATE: Phases 1-2 complete. You have:
- Pass model at app/Models/Pass.php with pass_data, barcode_data, images, serial_number, platform, pass_type, google_save_url, google_class_id, google_object_id
- Config at config/passkit.php with google.service_account_path, google.issuer_id, google.application_name
- ApplePassService already created at app/Services/ApplePassService.php

YOUR TASK: Create app/Services/GooglePassService.php

The service must:

1. __construct(): Load service account JSON from config('passkit.google.service_account_path'), store as array. Store issuer_id. Set baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1'.

2. generate(Pass $pass): string — Main method that:
   a. Calls ensurePassClass() to create the class (template) if it doesn't exist
   b. Calls buildPassObject() to build the object data
   c. Calls generateSaveJwt() to create a signed JWT
   d. Builds save URL: "https://pay.google.com/gp/v/save/{jwt}"
   e. Updates Pass model with google_save_url, google_class_id, google_object_id, last_generated_at
   f. Returns the save URL

3. getAccessToken(): string — OAuth2 via service account JWT:
   - Build JWT with iss=client_email, scope='https://www.googleapis.com/auth/wallet_object.issuer', aud='https://oauth2.googleapis.com/token', iat=now, exp=now+3600
   - Sign with encodeJwt()
   - POST to https://oauth2.googleapis.com/token with grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion={jwt}
   - Use Laravel Http::asForm()->post()
   - Return access_token from response

4. ensurePassClass(Pass $pass): string — Check if class exists, create if not:
   - classId = "{issuerId}.{slug(pass_type)}_{template_id|default}"
   - GET {baseUrl}/{classEndpoint}/{classId} with bearer token
   - If 404: POST {baseUrl}/{classEndpoint} with buildPassClass() data
   - Return classId

5. buildPassClass(Pass $pass, string $classId): array — Type-specific class data:
   - offer: id, issuerName, provider, title, reviewStatus='UNDER_REVIEW'
   - loyalty: id, issuerName, programName, programLogo, reviewStatus
   - eventTicket: id, issuerName, eventName (with localizedString), reviewStatus
   - transit: id, issuerName, transitType, reviewStatus
   - generic: id, classTemplateInfo, reviewStatus

6. buildPassObject(Pass $pass, string $classId): array — Build object with:
   - id = "{issuerId}.{serial_number}"
   - classId
   - state = 'ACTIVE'
   - barcode from barcode_data (map Apple formats to Google: PKBarcodeFormatQR→QR_CODE, PKBarcodeFormatPDF417→PDF_417, etc.)
   - textModulesData from primaryFields [{header, body, id}]
   - imageModulesData from images (using asset('storage/...') URLs)

7. generateSaveJwt(array $objectData): string — JWT for save link:
   - header: {alg: RS256, typ: JWT}
   - payload: {iss: client_email, aud: 'google', typ: 'savetowallet', iat: now, origins: [config('app.url')], payload: {genericObjects: [objectData]}}
   - Note: use type-specific key in payload (offerObjects, loyaltyObjects, etc.) based on pass type

8. encodeJwt(array $header, array $payload): string — RS256 JWT encoding:
   - base64url encode header and payload
   - Sign with openssl_sign(signingInput, signature, privateKey, OPENSSL_ALGO_SHA256)
   - Private key from serviceAccount['private_key'] via openssl_pkey_get_private()
   - Append base64url-encoded signature
   - Return dot-separated string

9. base64UrlEncode(string $data): string — rtrim(strtr(base64_encode($data), '+/', '-_'), '=')

10. getClassEndpoint(string $passType): string — Map: offer→offerClass, loyalty→loyaltyClass, eventTicket→eventTicketClass, boardingPass/transit→transitClass, default→genericClass

11. getObjectEndpoint(string $passType): string — Same pattern but with Object suffix

USE ONLY: Laravel Http facade (Illuminate\Support\Facades\Http) for HTTP requests, PHP openssl_* functions for JWT signing. No third-party JWT libraries.

Follow existing code style. Handle errors with RuntimeException.
```

---

## Phase 4: Plan Limits & Billing

**Goal**: Enforce pass creation limits based on subscription tier using Laravel Cashier.

### Tasks

- [ ] 4.1 Create `PassLimitService` (plan detection, limit checking)
- [ ] 4.2 Create `EnforcePassLimit` middleware
- [ ] 4.3 Register middleware alias in `bootstrap/app.php`
- [ ] 4.4 Add subscription data to Inertia shared props

### Key Files

**Create:**
- `app/Services/PassLimitService.php`
- `app/Http/Middleware/EnforcePassLimit.php`

**Modify:**
- `bootstrap/app.php` — register middleware alias, add CSRF exception for `stripe/*`
- `app/Http/Middleware/HandleInertiaRequests.php` — share subscription data

### AI Agent Prompt — Phase 4

```
You are implementing Phase 4 (Plan Limits & Billing) of a PassKit SaaS.

EXISTING STATE: Phases 1-3 complete. You have:
- User model with Billable trait at app/Models/User.php
- Pass model at app/Models/Pass.php
- Config at config/passkit.php with plans definitions (free, pro_apple, pro_google, unlimited) each having: name, pass_limit (int|null), platforms (array), stripe_price_id (string|null)
- Laravel Cashier installed and migrated

YOUR TASKS:

1. Create app/Services/PassLimitService.php:
   - getCurrentPlan(User $user): string — Loop through plans config, check $user->subscribedToPrice($priceId) for each paid plan. Return plan key ('free' if no match).
   - canCreatePass(User $user, string $platform): bool — Get plan config, check platform is in allowed platforms array, check pass count < limit (null limit = unlimited).
   - getRemainingPasses(User $user): ?int — Return null for unlimited, or max(0, limit - count) for limited.
   - getPlanConfig(User $user): array — Return the full plan config array for the user's current plan.

2. Create app/Http/Middleware/EnforcePassLimit.php:
   - Inject PassLimitService via constructor
   - In handle(): get platform from request input, call canCreatePass()
   - If cannot create: return back()->withErrors(['limit' => 'You have reached your pass creation limit. Please upgrade your plan.'])
   - Otherwise: pass to $next

3. Modify bootstrap/app.php:
   - In withMiddleware(), add: $middleware->alias(['enforce.pass.limit' => \App\Http\Middleware\EnforcePassLimit::class])
   - Add CSRF exception: $middleware->validateCsrfTokens(except: ['stripe/*'])

4. Modify app/Http/Middleware/HandleInertiaRequests.php:
   - In share() method, add 'subscription' key to returned array:
     ```
     'subscription' => $request->user() ? [
         'plan' => app(PassLimitService::class)->getCurrentPlan($request->user()),
         'passCount' => $request->user()->passes()->count(),
         'passLimit' => config('passkit.plans.' . app(PassLimitService::class)->getCurrentPlan($request->user()) . '.pass_limit'),
         'platforms' => config('passkit.plans.' . app(PassLimitService::class)->getCurrentPlan($request->user()) . '.platforms'),
     ] : null,
     ```
   - Add the use statement for PassLimitService

CONVENTIONS: Follow existing middleware patterns (see HandleInertiaRequests.php, HandleAppearance.php). Inject dependencies via constructor. Use config() helper for plan configs.
```

---

## Phase 5: Backend Controllers, Routes & Policies

**Goal**: Build all CRUD controllers, form requests, authorization policies, and route definitions.

### Tasks

- [ ] 5.1 Create `PassController` (index, create, store, show, edit, update, destroy)
- [ ] 5.2 Create `PassTemplateController` (index, create, store, show, edit, update, destroy)
- [ ] 5.3 Create `PassDownloadController` (downloadApple, generateGoogleLink)
- [ ] 5.4 Create `PassImageController` (store)
- [ ] 5.5 Create `BillingController` (index, checkout, portal)
- [ ] 5.6 Create `StorePassRequest` and `UpdatePassRequest`
- [ ] 5.7 Create `StorePassTemplateRequest` and `UpdatePassTemplateRequest`
- [ ] 5.8 Create `PassPolicy` and `PassTemplatePolicy`
- [ ] 5.9 Create `routes/passes.php` with all routes
- [ ] 5.10 Update `routes/web.php` to require passes.php
- [ ] 5.11 Update dashboard route to provide stats

### Key Files

**Create:**
- `app/Http/Controllers/PassController.php`
- `app/Http/Controllers/PassTemplateController.php`
- `app/Http/Controllers/PassDownloadController.php`
- `app/Http/Controllers/PassImageController.php`
- `app/Http/Controllers/BillingController.php`
- `app/Http/Requests/Pass/StorePassRequest.php`
- `app/Http/Requests/Pass/UpdatePassRequest.php`
- `app/Http/Requests/PassTemplate/StorePassTemplateRequest.php`
- `app/Http/Requests/PassTemplate/UpdatePassTemplateRequest.php`
- `app/Policies/PassPolicy.php`
- `app/Policies/PassTemplatePolicy.php`
- `routes/passes.php`

**Modify:**
- `routes/web.php` — add `require __DIR__.'/passes.php'`, update dashboard

### AI Agent Prompt — Phase 5

```
You are implementing Phase 5 (Controllers, Routes & Policies) of a PassKit SaaS.

EXISTING STATE: Phases 1-4 complete. You have:
- Models: User (with Billable, passes(), passTemplates()), Pass, PassTemplate
- Services: ApplePassService (generate(Pass)), GooglePassService (generate(Pass)), PassLimitService (getCurrentPlan, canCreatePass, getRemainingPasses)
- Middleware: EnforcePassLimit (aliased as 'enforce.pass.limit')
- Config: config/passkit.php with plans
- Existing controller pattern: see app/Http/Controllers/Settings/ProfileController.php
- Existing form request pattern: see app/Http/Requests/Settings/ProfileUpdateRequest.php
- Existing route pattern: see routes/web.php, routes/settings.php

YOUR TASKS:

1. Create app/Http/Controllers/PassController.php:
   - index(Request): Inertia::render('passes/index', ['passes' => paginated passes with template, 'filters' => request filters])
   - create(Request): Inertia::render('passes/create', ['templates' => user's templates])
   - store(StorePassRequest): Create pass with serial_number=Str::uuid(), status='active', redirect to passes.show
   - show(Request, Pass): authorize('view', $pass), Inertia::render('passes/show', ['pass' => pass with template])
   - edit(Request, Pass): authorize('update'), Inertia::render('passes/edit', ['pass', 'templates'])
   - update(UpdatePassRequest, Pass): authorize('update'), update, redirect to passes.show
   - destroy(Request, Pass): authorize('delete'), soft delete, redirect to passes.index

2. Create app/Http/Controllers/PassTemplateController.php: Same CRUD pattern for templates.

3. Create app/Http/Controllers/PassDownloadController.php:
   - downloadApple(Request, Pass, ApplePassService): authorize, generate, return Storage::download with Content-Type: application/vnd.apple.pkpass
   - generateGoogleLink(Request, Pass, GooglePassService): authorize, generate, return back()->with('googleSaveUrl', $url)

4. Create app/Http/Controllers/PassImageController.php:
   - store(Request): validate image (png, max 1MB) and type (icon|icon_2x|logo|logo_2x|strip|strip_2x|thumbnail|thumbnail_2x|background|background_2x), store to images_disk, return JSON {path}

5. Create app/Http/Controllers/BillingController.php:
   - index(Request): Inertia::render('billing/index', ['plans' => config, 'currentPlan', 'invoices'])
   - checkout(Request): $user->newSubscription('default', $request->price_id)->checkout([success_url, cancel_url])
   - portal(Request): $user->redirectToBillingPortal(route('billing.index'))

6. Create app/Http/Requests/Pass/StorePassRequest.php:
   - Validate: platform (required, in:apple,google), pass_type (required, in:generic,coupon,boardingPass,eventTicket,storeCard,loyalty,offer,transit), pass_template_id (nullable, exists), pass_data (required array with description required string), barcode_data (nullable array), images (nullable array)

7. Create app/Http/Requests/Pass/UpdatePassRequest.php: Same but all optional.

8. Create template form requests with similar patterns.

9. Create app/Policies/PassPolicy.php: view/update/delete all check $user->id === $pass->user_id. Register in AppServiceProvider or auto-discovered.

10. Create app/Policies/PassTemplatePolicy.php: Same pattern.

11. Create routes/passes.php:
    ```php
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::resource('passes', PassController::class);
        Route::post('passes/{pass}/download/apple', [PassDownloadController::class, 'downloadApple'])->name('passes.download.apple');
        Route::post('passes/{pass}/generate/google', [PassDownloadController::class, 'generateGoogleLink'])->name('passes.generate.google');
        Route::post('passes/images', [PassImageController::class, 'store'])->name('passes.images.store');
        Route::resource('templates', PassTemplateController::class);
        Route::get('billing', [BillingController::class, 'index'])->name('billing.index');
        Route::post('billing/checkout', [BillingController::class, 'checkout'])->name('billing.checkout');
        Route::get('billing/portal', [BillingController::class, 'portal'])->name('billing.portal');
    });
    ```
    Apply 'enforce.pass.limit' middleware only to passes.store route.

12. Modify routes/web.php: Add require __DIR__.'/passes.php' at the bottom. Update dashboard route to pass stats (totalPasses, applePasses, googlePasses, recentPasses).

CONVENTIONS: Use $this->authorize() for policy checks. Use to_route() for redirects. Inertia::render page names lowercase with slashes (e.g., 'passes/index'). Follow existing controller patterns exactly.
```

---

## Phase 6: Queue Jobs

**Goal**: Enable async pass generation for better UX and batch operations.

### Tasks

- [ ] 6.1 Create `GeneratePassJob`
- [ ] 6.2 Create `BatchGeneratePassesJob`
- [ ] 6.3 Dispatch jobs from controllers where appropriate

### AI Agent Prompt — Phase 6

```
You are implementing Phase 6 (Queue Jobs) of a PassKit SaaS.

EXISTING STATE: Phases 1-5 complete. The jobs table migration already exists.

YOUR TASKS:

1. Create app/Jobs/GeneratePassJob.php:
   - Implements ShouldQueue, uses Queueable trait
   - Constructor: public Pass $pass
   - handle(ApplePassService, GooglePassService): if platform=apple call appleService->generate(), if google call googleService->generate()

2. Create app/Jobs/BatchGeneratePassesJob.php:
   - Implements ShouldQueue, uses Queueable
   - Constructor: public PassTemplate $template, public array $passDataList (array of individual pass data)
   - handle(): For each item in passDataList, create a Pass record, then dispatch GeneratePassJob for each

3. Optionally update PassDownloadController to dispatch GeneratePassJob instead of calling service directly (for large files). Keep synchronous generation as default, add async option.

CONVENTIONS: Use Laravel's Queueable trait (not the older Queue/InteractsWithQueue pattern). Follow existing job patterns in the codebase.
```

---

## Phase 7: Frontend Types & Shared Components

**Goal**: Define TypeScript types and build reusable UI components needed by all pages.

### Tasks

- [ ] 7.1 Create `resources/js/types/pass.ts` with all pass-related types
- [ ] 7.2 Update `resources/js/types/index.ts` to export pass types and update SharedData
- [ ] 7.3 Install additional Radix UI packages (tabs, progress)
- [ ] 7.4 Create `ui/tabs.tsx` component (shadcn/ui style)
- [ ] 7.5 Create `ui/progress.tsx` component
- [ ] 7.6 Create `pass-preview.tsx` — live CSS preview of pass
- [ ] 7.7 Create `color-picker.tsx` — color input outputting rgb()
- [ ] 7.8 Create `pass-field-editor.tsx` — dynamic field list editor
- [ ] 7.9 Create `image-uploader.tsx` — PNG upload with validation
- [ ] 7.10 Create `plan-card.tsx` — plan comparison card
- [ ] 7.11 Create `usage-bar.tsx` — pass limit progress bar
- [ ] 7.12 Create `stat-card.tsx` — dashboard stat card

### AI Agent Prompt — Phase 7

```
You are implementing Phase 7 (Frontend Types & Components) of a PassKit SaaS.

EXISTING STATE: Phases 1-6 (backend) complete. The frontend is React 19 + TypeScript + Tailwind CSS v4 + Inertia.

EXISTING PATTERNS (follow these exactly):
- UI components at resources/js/components/ui/ using Radix UI + class-variance-authority + cn() utility
- See resources/js/components/ui/button.tsx for the shadcn/ui component pattern
- cn() utility at resources/js/lib/utils.ts: import { cn } from '@/lib/utils'
- Icons from lucide-react
- Types at resources/js/types/
- SharedData type at resources/js/types/index.ts includes auth, name, sidebarOpen

YOUR TASKS:

1. Create resources/js/types/pass.ts:
   - PassPlatform = 'apple' | 'google'
   - PassStatus = 'active' | 'voided' | 'expired'
   - ApplePassType = 'generic' | 'coupon' | 'boardingPass' | 'eventTicket' | 'storeCard'
   - GooglePassType = 'generic' | 'offer' | 'loyalty' | 'eventTicket' | 'boardingPass' | 'transit'
   - PassType = ApplePassType | GooglePassType
   - BarcodeFormat = 'PKBarcodeFormatQR' | 'PKBarcodeFormatPDF417' | 'PKBarcodeFormatAztec' | 'PKBarcodeFormatCode128'
   - PassField = { key: string; label: string; value: string }
   - PassData = { description: string; backgroundColor?: string; foregroundColor?: string; labelColor?: string; headerFields?: PassField[]; primaryFields?: PassField[]; secondaryFields?: PassField[]; auxiliaryFields?: PassField[]; backFields?: PassField[]; transitType?: string }
   - BarcodeData = { format: BarcodeFormat; message: string; messageEncoding?: string; altText?: string }
   - PassImages = { icon?: string; icon_2x?: string; logo?: string; logo_2x?: string; strip?: string; strip_2x?: string; thumbnail?: string; thumbnail_2x?: string; background?: string; background_2x?: string }
   - Pass = { id, user_id, pass_template_id, platform, pass_type, serial_number, status, pass_data, barcode_data, images, pkpass_path, google_save_url, created_at, updated_at, template? }
   - PassTemplate = { id, user_id, name, description, pass_type, platform, design_data, images, created_at, updated_at }
   - PlanKey = 'free' | 'pro_apple' | 'pro_google' | 'unlimited'
   - Plan = { name: string; pass_limit: number | null; platforms: PassPlatform[]; stripe_price_id: string | null }
   - SubscriptionData = { plan: PlanKey; passCount: number; passLimit: number | null; platforms: PassPlatform[] }

2. Update resources/js/types/index.ts: Add export from pass.ts. Update SharedData to include subscription: SubscriptionData | null.

3. Run: npm install @radix-ui/react-tabs @radix-ui/react-progress

4. Create resources/js/components/ui/tabs.tsx — shadcn/ui Tabs using @radix-ui/react-tabs (Root, List, Trigger, Content with cn() styling)

5. Create resources/js/components/ui/progress.tsx — shadcn/ui Progress bar

6. Create resources/js/components/pass-preview.tsx:
   - Props: { passData: PassData; passType: PassType; platform: PassPlatform; barcodeData?: BarcodeData; className?: string }
   - Renders a CSS card that looks like a wallet pass with:
     - Colored background/foreground matching passData colors
     - Header fields at top, primary fields large in middle, secondary/auxiliary below
     - Barcode representation at bottom (QR icon or barcode lines)
     - Rounded corners, shadow, appropriate dimensions (~340x440px)
   - Different layouts for different pass types (coupon has strip area, boardingPass has departure/arrival layout)

7. Create resources/js/components/color-picker.tsx:
   - Props: { value: string; onChange: (value: string) => void; label: string }
   - HTML color input that converts hex to rgb(r,g,b) format for Apple passes
   - Display the current color as a swatch + rgb text

8. Create resources/js/components/pass-field-editor.tsx:
   - Props: { fields: PassField[]; onChange: (fields: PassField[]) => void; label: string; maxFields?: number }
   - Renders a list of field inputs (key, label, value) with add/remove buttons
   - Uses existing Input, Button, Label components

9. Create resources/js/components/image-uploader.tsx:
   - Props: { label: string; type: string; value?: string; onUpload: (path: string) => void }
   - Drag-and-drop or click to upload PNG
   - POSTs to passes.images.store route
   - Shows preview after upload

10. Create resources/js/components/plan-card.tsx:
    - Props: { plan: Plan; planKey: PlanKey; isCurrent: boolean; onSelect: () => void }
    - Card showing plan name, price indicator, pass limit, platforms, select button
    - Highlighted if current plan

11. Create resources/js/components/usage-bar.tsx:
    - Props: { used: number; limit: number | null }
    - Progress bar showing usage. If limit null, show "Unlimited" text.

12. Create resources/js/components/stat-card.tsx:
    - Props: { title: string; value: string | number; icon?: ReactNode; description?: string }
    - Simple card with title, large value, optional icon

CONVENTIONS: Use cn() for conditional classes. Use existing UI components (Button, Card, Input, Label, Badge from resources/js/components/ui/). Follow React 19 patterns. Export components as named exports.
```

---

## Phase 8: Frontend Pages

**Goal**: Build all user-facing pages for the SaaS.

### Tasks

- [ ] 8.1 Update sidebar navigation with new items
- [ ] 8.2 Revamp dashboard with real stats
- [ ] 8.3 Create passes/index.tsx (list with filters)
- [ ] 8.4 Create passes/create.tsx (multi-step wizard)
- [ ] 8.5 Create passes/show.tsx (detail view + download)
- [ ] 8.6 Create passes/edit.tsx (edit form)
- [ ] 8.7 Create templates/index.tsx
- [ ] 8.8 Create templates/create.tsx
- [ ] 8.9 Create templates/edit.tsx
- [ ] 8.10 Create billing/index.tsx (plans + invoices)

### AI Agent Prompt — Phase 8

```
You are implementing Phase 8 (Frontend Pages) of a PassKit SaaS.

EXISTING STATE: Phases 1-7 complete. You have all backend routes, controllers, and frontend components ready.

EXISTING PAGE PATTERNS:
- See resources/js/pages/dashboard.tsx for basic page structure with AppLayout and breadcrumbs
- See resources/js/pages/settings/profile.tsx for form page pattern with useForm
- AppLayout expects: breadcrumbs prop as BreadcrumbItem[] = [{title, href}]
- Pages use: import { Head, useForm, usePage, router } from '@inertiajs/react'
- Forms use useForm hook: const { data, setData, post, put, processing, errors } = useForm({...})
- Wayfinder route helpers imported from @/routes (auto-generated)

COMPONENTS AVAILABLE (from Phase 7):
- PassPreview, ColorPicker, PassFieldEditor, ImageUploader, PlanCard, UsageBar, StatCard
- UI: Button, Card/CardHeader/CardContent/CardTitle, Input, Label, Badge, Dialog, Select, Tabs, Progress, Separator, Skeleton

YOUR TASKS:

1. Modify resources/js/components/app-sidebar.tsx:
   - Add nav items: Passes (Smartphone icon, href=passes.index), Templates (Layers icon, href=templates.index), Billing (CreditCard icon, href=billing.index)
   - Keep existing Dashboard item, add new items after it

2. Revamp resources/js/pages/dashboard.tsx:
   - Props: { stats: { totalPasses, applePasses, googlePasses, used, limit }, recentPasses: Pass[] }
   - Grid of 4 StatCards (total, apple, google, plan usage)
   - UsageBar below stats
   - Card with recent passes table (serial_number, platform badge, type, status badge, created_at, link to show)
   - Quick action buttons: Create Pass, View All Passes

3. Create resources/js/pages/passes/index.tsx:
   - Props: { passes: PaginatedData<Pass>, filters: { platform?, status?, type? } }
   - Filter bar: platform select (all/apple/google), status select (all/active/voided/expired), type select
   - Table/grid of passes with: platform icon/badge, type, description, serial_number, status badge, created_at, actions (view, edit, delete)
   - Pagination at bottom
   - "Create Pass" button in header
   - Empty state if no passes

4. Create resources/js/pages/passes/create.tsx (MOST COMPLEX PAGE):
   - Props: { templates: PassTemplate[] }
   - Multi-step wizard using state to track current step (1-5):

   Step 1 - Platform & Type:
   - Platform selector: Apple / Google (large clickable cards)
   - Pass type grid: show available types for selected platform as visual cards with icons
   - Optional: select from template dropdown

   Step 2 - Design:
   - ColorPicker for backgroundColor, foregroundColor, labelColor
   - Description input
   - PassFieldEditor for each field group (headerFields, primaryFields, secondaryFields, auxiliaryFields, backFields)
   - TransitType selector (if boardingPass)

   Step 3 - Barcode:
   - Toggle: include barcode yes/no
   - Format select: QR, PDF417, Aztec, Code128
   - Message input
   - Alt text input

   Step 4 - Images:
   - ImageUploader for each image slot (icon required, others optional)
   - Size guidance text

   Step 5 - Preview & Submit:
   - PassPreview component with live data
   - JSON preview toggle
   - Submit button

   - Navigation: Previous/Next buttons, step indicator
   - useForm with post to passes.store

5. Create resources/js/pages/passes/show.tsx:
   - Props: { pass: Pass }
   - PassPreview on the left
   - Details card on the right: serial_number, platform, type, status, dates
   - Actions: Download Apple (.pkpass), Generate Google Link, Edit, Delete (with confirmation dialog)
   - Show Google save URL if available (as "Add to Google Wallet" button)

6. Create resources/js/pages/passes/edit.tsx:
   - Props: { pass: Pass, templates: PassTemplate[] }
   - Same form as create but pre-populated, uses put method
   - No platform/type changing (read-only display)

7. Create resources/js/pages/templates/index.tsx:
   - Grid of template cards with PassPreview thumbnails, name, type, platform badge, actions

8. Create resources/js/pages/templates/create.tsx:
   - Similar to pass create but saves as template (no barcode step needed)

9. Create resources/js/pages/templates/edit.tsx:
   - Edit existing template

10. Create resources/js/pages/billing/index.tsx:
    - Props: { plans: Record<PlanKey, Plan>, currentPlan: PlanKey, invoices: Invoice[] }
    - Current plan banner with UsageBar
    - "Manage Subscription" button (links to Stripe portal)
    - Plan comparison grid: 4 PlanCards side by side
    - Invoice history table below

CONVENTIONS: Every page wraps in <AppLayout breadcrumbs={...}>. Use <Head title="..." /> for page title. Forms use Inertia useForm. Navigation uses router.visit() or Link component. Follow existing TypeScript patterns strictly.
```

---

## Phase 9: Public Pass Distribution

**Goal**: Allow pass creators to share public links where end-users can add passes to their wallets (like passkit.com/samples).

### Tasks

- [ ] 9.1 Create public pass route (no auth required)
- [ ] 9.2 Create public pass page with "Add to Apple Wallet" / "Add to Google Wallet" buttons
- [ ] 9.3 Create public download endpoint for .pkpass files
- [ ] 9.4 Add share/distribution URL to pass detail page

### AI Agent Prompt — Phase 9

```
You are implementing Phase 9 (Public Pass Distribution) of a PassKit SaaS.

This is the key user-facing feature: pass creators need shareable public URLs where their customers can add passes to Apple/Google Wallets. Think passkit.com/samples — a preview page with "Save to Phone" buttons.

EXISTING STATE: Phases 1-8 complete. Passes can be created, generated, and downloaded.

YOUR TASKS:

1. Create app/Http/Controllers/PublicPassController.php:
   - show(string $serialNumber): Find pass by serial_number (active only), render public page
   - downloadApple(string $serialNumber): Find pass, generate .pkpass if needed, return download
   - These routes are PUBLIC (no auth middleware)

2. Add routes to routes/passes.php (outside auth middleware group):
   - GET /p/{serialNumber} → PublicPassController@show (name: passes.public.show)
   - GET /p/{serialNumber}/apple → PublicPassController@downloadApple (name: passes.public.apple)

3. Create resources/js/pages/passes/public.tsx:
   - Props: { pass: Pass, appleDownloadUrl: string, googleSaveUrl: string | null }
   - Uses a minimal layout (NOT AppLayout — no sidebar/auth needed)
   - Clean, centered page showing:
     - PassPreview component (large, centered)
     - Pass description and organization name
     - "Add to Apple Wallet" button (official Apple Wallet badge/icon, links to download)
     - "Add to Google Wallet" button (official Google Wallet button, links to google save URL)
     - Powered by footer with your app name
   - Mobile-responsive (most users will view on phone)

4. Update resources/js/pages/passes/show.tsx:
   - Add "Share" section showing the public URL: {APP_URL}/p/{serial_number}
   - Copy-to-clipboard button for the public URL
   - QR code of the public URL (for in-store/print use) — generate client-side with a simple QR library or SVG

5. Create resources/js/layouts/public-layout.tsx:
   - Minimal layout: centered content, no sidebar, no auth header
   - App logo at top, clean background

CONVENTIONS: Public routes have no auth middleware. Use Inertia::render for the public page. The page should work perfectly on mobile devices.
```

---

## Phase 10: Testing & Webhooks

**Goal**: Comprehensive test coverage and Stripe webhook integration.

### Tasks

- [ ] 10.1 Create unit tests for ApplePassService
- [ ] 10.2 Create unit tests for GooglePassService
- [ ] 10.3 Create unit tests for PassLimitService
- [ ] 10.4 Create feature tests for PassController
- [ ] 10.5 Create feature tests for PassTemplateController
- [ ] 10.6 Create feature tests for BillingController
- [ ] 10.7 Create feature tests for PublicPassController
- [ ] 10.8 Set up Stripe webhook listener
- [ ] 10.9 Run full test suite and fix failures

### AI Agent Prompt — Phase 10

```
You are implementing Phase 10 (Testing & Webhooks) of a PassKit SaaS.

EXISTING STATE: Phases 1-9 complete. Full application is built.

EXISTING TEST PATTERNS:
- See tests/Feature/DashboardTest.php for the pattern: use RefreshDatabase, User::factory(), $this->actingAs(), assert responses
- PHPUnit 11 is used

YOUR TASKS:

1. Create tests/Unit/Services/PassLimitServiceTest.php:
   - test_free_plan_detected_for_users_without_subscription
   - test_pass_limit_enforced_at_25_for_free_tier
   - test_unlimited_passes_for_paid_tiers
   - test_platform_restriction_for_pro_apple (can't create google)
   - test_platform_restriction_for_pro_google (can't create apple)
   - test_remaining_passes_calculation

2. Create tests/Feature/PassControllerTest.php:
   - test_guests_redirected_to_login
   - test_authenticated_users_can_view_passes_index
   - test_users_can_create_pass
   - test_users_cannot_exceed_free_tier_limit (create 25 passes, attempt 26th)
   - test_users_can_only_view_own_passes (create pass for user1, user2 gets 403)
   - test_users_can_update_own_pass
   - test_users_can_delete_own_pass
   - test_store_validates_required_fields

3. Create tests/Feature/PassTemplateControllerTest.php: Similar CRUD tests.

4. Create tests/Feature/BillingControllerTest.php:
   - test_billing_page_accessible
   - test_billing_page_shows_plans

5. Create tests/Feature/PublicPassControllerTest.php:
   - test_public_pass_page_accessible_without_auth
   - test_public_pass_shows_pass_data
   - test_nonexistent_pass_returns_404
   - test_voided_pass_returns_404

6. Set up Stripe webhook handling:
   - Create app/Listeners/StripeEventListener.php
   - Listen for Laravel\Cashier\Events\WebhookReceived
   - Handle customer.subscription.deleted (optional: void passes or just log)
   - Register listener in AppServiceProvider boot()

7. Run: php artisan test — ensure all tests pass

CONVENTIONS: Use RefreshDatabase trait. Use factories for test data. Follow existing test file naming and structure. Test both happy paths and error cases.
```

---

## Verification Plan

After all phases are complete, verify end-to-end:

1. **Auth**: Register, login, 2FA — all existing auth still works
2. **Create Pass**: Create an Apple generic pass with all fields filled
3. **Download**: Download the .pkpass file, verify it opens in Apple Wallet simulator
4. **Google**: Create a Google pass, verify the save URL works
5. **Public Link**: Share the public URL, verify unauthenticated access works
6. **Limits**: On free plan, verify the 25-pass limit is enforced
7. **Billing**: Test Stripe checkout flow, verify plan upgrades remove limits
8. **Templates**: Create a template, create a pass from it
9. **Tests**: `php artisan test` — all green
10. **Build**: `npm run build` — no TypeScript/build errors

---

## File Inventory Summary

### New Files: ~45 total
- **Backend (PHP)**: ~30 files (models, services, controllers, requests, policies, jobs, tests, config, routes, migrations)
- **Frontend (TSX)**: ~15 files (types, components, pages, layouts)

### Modified Files: ~9 total
- `app/Models/User.php`
- `app/Providers/AppServiceProvider.php`
- `app/Http/Middleware/HandleInertiaRequests.php`
- `bootstrap/app.php`
- `routes/web.php`
- `.env.example`
- `resources/js/types/index.ts`
- `resources/js/components/app-sidebar.tsx`
- `resources/js/pages/dashboard.tsx`
- `package.json`
