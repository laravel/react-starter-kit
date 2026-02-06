import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import theme from '@/theme';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ColorSchemeScript
                    nonce="8IBTHwOdqNKAWeKl7plt8g=="
                    defaultColorScheme="auto"
                />
                <MantineProvider defaultColorScheme="auto" theme={theme}>
                    <ModalsProvider>
                        <Notifications />
                        <App {...props} />
                    </ModalsProvider>
                </MantineProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
