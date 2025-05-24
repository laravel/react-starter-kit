import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
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
