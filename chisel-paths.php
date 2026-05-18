<?php

return [
    'login' => 'resources/js/pages/auth/login.tsx',
    'register' => 'resources/js/pages/auth/register.tsx',
    'welcome' => 'resources/js/pages/welcome.tsx',
    'profile' => 'resources/js/pages/settings/profile.tsx',
    'security' => 'resources/js/pages/settings/security.tsx',
    'verify_email' => 'resources/js/pages/auth/verify-email.tsx',
    'two_factor_challenge' => 'resources/js/pages/auth/two-factor-challenge.tsx',
    'confirm_password' => 'resources/js/pages/auth/confirm-password.tsx',
    'auth_types' => 'resources/js/types/auth.ts',

    'two_factor_files' => [
        'resources/js/components/manage-two-factor.tsx',
        'resources/js/components/two-factor-setup-modal.tsx',
        'resources/js/components/two-factor-recovery-codes.tsx',
        'resources/js/components/ui/input-otp.tsx',
        'resources/js/hooks/use-two-factor-auth.ts',
    ],

    'two_factor_otp_package' => 'input-otp',

    'passkey_files' => [
        'resources/js/components/passkey-item.tsx',
        'resources/js/components/passkey-register.tsx',
        'resources/js/components/passkey-verify.tsx',
        'resources/js/components/manage-passkeys.tsx',
    ],
];
