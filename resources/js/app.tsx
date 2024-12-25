import '../css/app.css';
import './bootstrap';

import {
    createInertiaApp
} from '@inertiajs/react';
import {
    resolvePageComponent
} from 'laravel-vite-plugin/inertia-helpers';
import {
    createRoot
} from 'react-dom/client';

const appName =
    import.meta.env.VITE_APP_NAME || 'Laravel';

// window.appearance = 'system';

// // Initialize appearance
// if (typeof window !== 'undefined') {
//     const appearance = localStorage.getItem('appearance') || 'system';
//     window.appearance = appearance;
    
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     const shouldBeDark = appearance === 'dark' || (appearance === 'system' && prefersDark);
    
//     if (shouldBeDark) {
//         document.body.classList.add('dark');
//     }
// }

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({
        el,
        App,
        props
    }) {
        const root = createRoot(el);

        root.render(<App {
            ...props
        }
        />);
    },
    progress: {
        color: '#4B5563',
    },
});