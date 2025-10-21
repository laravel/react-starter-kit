import { useCallback, useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// --- Changed type from string union to enum ---
export enum Appearance {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system',
}

// --- Centralized labels ---
export const AppearanceLabels: Record<Appearance, string> = {
    [Appearance.LIGHT]: 'Light',
    [Appearance.DARK]: 'Dark',
    [Appearance.SYSTEM]: 'System',
};

// --- Centralized icons ---
export const AppearanceIcons: Record<Appearance, LucideIcon> = {
    [Appearance.LIGHT]: Sun,
    [Appearance.DARK]: Moon,
    [Appearance.SYSTEM]: Monitor,
};

const APPEARANCE_KEY = 'appearance';

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
    const isDark =
        appearance === Appearance.DARK || (appearance === Appearance.SYSTEM && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || Appearance.SYSTEM);
};

export function initializeTheme() {
    const savedAppearance =
        (localStorage.getItem('appearance') as Appearance) || Appearance.SYSTEM;

    applyTheme(savedAppearance);

    // Add the event listener for system theme changes...
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>(Appearance.SYSTEM);

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', mode);

        // Store in cookie for SSR...
        setCookie('appearance', mode);

        applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedAppearance = localStorage.getItem(
            'appearance',
        ) as Appearance | null;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        updateAppearance(savedAppearance || Appearance.SYSTEM);

        return () =>
            mediaQuery()?.removeEventListener(
                'change',
                handleSystemThemeChange,
            );
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
