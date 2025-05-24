import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    if (typeof document === 'undefined') return;

    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') return 'light';

    // Check localStorage first
    const stored = localStorage.getItem('appearance') as Appearance;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored;
    }

    // Check cookie as fallback
    const cookies = document.cookie.split(';');
    const appearanceCookie = cookies.find(cookie => cookie.trim().startsWith('appearance='));
    if (appearanceCookie) {
        const value = appearanceCookie.split('=')[1] as Appearance;
        if (['light', 'dark', 'system'].includes(value)) {
            return value;
        }
    }

    // Default to light mode
    return 'light';
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance);
};

export function initializeTheme() {
    const savedAppearance = getStoredAppearance();

    // Apply theme immediately to prevent flash
    applyTheme(savedAppearance);

    // Add the event listener for system theme changes
    const mq = mediaQuery();
    if (mq) {
        mq.addEventListener('change', handleSystemThemeChange);
    }
}

export function cleanupTheme() {
    const mq = mediaQuery();
    if (mq) {
        mq.removeEventListener('change', handleSystemThemeChange);
    }
}

export function useAppearance() {
    const [appearance, setAppearanceState] = useState<Appearance>('light');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearanceState(mode);

        // Store in localStorage for client-side persistence
        localStorage.setItem('appearance', mode);

        // Store in cookie for SSR
        setCookie('appearance', mode);

        // Apply theme immediately
        applyTheme(mode);
    }, []);

    useEffect(() => {
        // Get the saved appearance on mount
        const savedAppearance = getStoredAppearance();
        setAppearanceState(savedAppearance);

        // Apply the theme
        applyTheme(savedAppearance);

        // Set up system theme change listener
        const mq = mediaQuery();
        if (mq) {
            mq.addEventListener('change', handleSystemThemeChange);
        }

        return () => {
            if (mq) {
                mq.removeEventListener('change', handleSystemThemeChange);
            }
        };
    }, []);

    return { appearance, updateAppearance } as const;
}
