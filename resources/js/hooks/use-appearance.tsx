import { useCallback, useEffect, useMemo, useState } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

// Global state management
const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'system';

// Utility functions
const prefersDark = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('appearance') as Appearance) || 'system';
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') return;
    const isDark = isDarkMode(appearance);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void => {
    applyTheme(currentAppearance);
    notify();
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') return;

    const storedAppearance = getStoredAppearance();

    // Initialize default appearance if none exists
    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'system');
        setCookie('appearance', 'system');
    }

    currentAppearance = storedAppearance;
    applyTheme(currentAppearance);

    // Set up system theme change listener
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] =
        useState<Appearance>(getStoredAppearance);

    useEffect(() => {
        const handleChange = (): void => {
            const newAppearance = getStoredAppearance();
            setAppearance(newAppearance);
        };

        listeners.add(handleChange);
        mediaQuery()?.addEventListener('change', handleChange);

        return () => {
            listeners.delete(handleChange);
            mediaQuery()?.removeEventListener('change', handleChange);
        };
    }, []);

    const resolvedAppearance: ResolvedAppearance = useMemo(
        () => (isDarkMode(appearance) ? 'dark' : 'light'),
        [appearance],
    );

    const updateAppearance = useCallback((mode: Appearance): void => {
        currentAppearance = mode;
        setAppearance(mode);

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', mode);

        // Store in cookie for SSR...
        setCookie('appearance', mode);

        applyTheme(mode);
        notify();
    }, []);

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
