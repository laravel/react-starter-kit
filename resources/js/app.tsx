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


/*
*  Dark/Light Mode Initialization
*  - This needs to be added to every page so that way the correct appearance is loaded
*/
(function() {
    const savedAppearance = localStorage.getItem('appearance') || 'system';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = 
        savedAppearance === 'dark' || 
        (savedAppearance === 'system' && prefersDark);
    
    if (isDark) {
        document.documentElement.classList.add('dark');
    }
})();

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