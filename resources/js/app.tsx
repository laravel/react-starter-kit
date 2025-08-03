import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
// 👇 UPDATED IMPORT - Note the .tsx extension
import { ToastProvider } from './components/ui/use-toast';
import { LanguageProvider } from './hooks/use-language';
import AppWrapper from './AppWrapper';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // 👇 WRAP THE APP WITH TOAST PROVIDER
        root.render(
            <ToastProvider>
                <LanguageProvider>
                    <AppWrapper>
                        <App {...props} />
                    </AppWrapper>
                </LanguageProvider>
            </ToastProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Initialize theme immediately when the app loads
// This ensures consistent theme handling across all pages
if (typeof window !== 'undefined') {
    // Set default to light mode if no preference is stored
    if (!localStorage.getItem('appearance') && !document.cookie.includes('appearance=')) {
        localStorage.setItem('appearance', 'light');
        document.cookie = 'appearance=light;path=/;max-age=31536000;SameSite=Lax';
    }

    initializeTheme();
}
