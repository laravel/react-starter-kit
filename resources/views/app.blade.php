<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- Enhanced theme detection and application --}}
    <script>
        (function() {
            // Function to get stored appearance preference
            function getStoredAppearance() {
                // Check localStorage first
                const stored = localStorage.getItem('appearance');
                if (stored && ['light', 'dark', 'system'].includes(stored)) {
                    return stored;
                }

                // Check cookie as fallback
                const cookies = document.cookie.split(';');
                const appearanceCookie = cookies.find(cookie => cookie.trim().startsWith('appearance='));
                if (appearanceCookie) {
                    const value = appearanceCookie.split('=')[1];
                    if (['light', 'dark', 'system'].includes(value)) {
                        return value;
                    }
                }

                // Default to light mode
                return 'light';
            }

            // Function to apply theme
            function applyTheme(appearance) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark);

                if (isDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }

            // Get and apply the theme immediately
            const appearance = getStoredAppearance();
            applyTheme(appearance);

            // Listen for system theme changes if using system preference
            if (appearance === 'system') {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', () => applyTheme('system'));
            }

            // Store default preference if none exists
            if (!localStorage.getItem('appearance') && !document.cookie.includes('appearance=')) {
                localStorage.setItem('appearance', 'light');
                document.cookie = 'appearance=light;path=/;max-age=31536000;SameSite=Lax';
            }
        })();
    </script>

    {{-- CSS custom properties for themes --}}
    <style>
        html {
            background-color: oklch(1 0 0);
            transition: background-color 0.3s ease;
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }

        /* Prevent flash of unstyled content */
        body {
            visibility: hidden;
        }

        body.loaded {
            visibility: visible;
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @if (!app()->runningUnitTests())
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @endif
    @inertiaHead
    @paddleJS
</head>
<body class="font-sans antialiased">
@inertia

{{-- Show body after theme is applied --}}
<script>
    document.body.classList.add('loaded');
</script>
</body>
</html>
