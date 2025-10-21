import { useCallback, useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// --- Define enum for theme modes ---
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

// --- Key for localStorage & cookies ---
const APPEARANCE_KEY = 'appearance';

// Detect OS-level dark mode
const prefersDark = (): boolean =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set cookie (SSR-friendly)
const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

// Apply theme to <html>
const applyTheme = (appearance: Appearance) => {
    const isDark =
        appearance === Appearance.DARK ||
        (appearance === Appearance.SYSTEM && prefersDark());
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

// Listen to system theme changes
const getMediaQuery = (): MediaQueryList | null =>
    typeof window === 'undefined'
        ? null
        : window.matchMedia('(prefers-color-scheme: dark)');

export function initializeTheme() {
    const saved =
        (typeof localStorage !== 'undefined'
            ? (localStorage.getItem(APPEARANCE_KEY) as Appearance | null)
            : null) || Appearance.SYSTEM;

    applyTheme(saved);

    const mq = getMediaQuery();
    if (mq) {
        const listener = () => {
            const current =
                (localStorage.getItem(APPEARANCE_KEY) as Appearance) ||
                Appearance.SYSTEM;
            applyTheme(current);
        };
        mq.addEventListener('change', listener);
    }
}

export function useAppearance() {
    const getInitial = (): Appearance => {
        if (typeof window === 'undefined') return Appearance.SYSTEM;
        return (
            (localStorage.getItem(APPEARANCE_KEY) as Appearance) ||
            Appearance.SYSTEM
        );
    };

    const [appearance, setAppearance] = useState<Appearance>(getInitial);

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);
        localStorage.setItem(APPEARANCE_KEY, mode);
        setCookie(APPEARANCE_KEY, mode);
        applyTheme(mode);
    }, []);

    useEffect(() => {
        const mq = getMediaQuery();
        const handleChange = () => {
            const current =
                (localStorage.getItem(APPEARANCE_KEY) as Appearance) ||
                Appearance.SYSTEM;
            applyTheme(current);
        };
        mq?.addEventListener('change', handleChange);
        return () => mq?.removeEventListener('change', handleChange);
    }, []);

    return { appearance, updateAppearance } as const;
}
