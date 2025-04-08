import { useCallback, useEffect, useState } from "react";

export type Appearance = "light";

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === "undefined") {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

export function initializeTheme() {
    // Removed dark mode logic
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>("light");

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);

        // Store in localStorage for client-side persistence...
        localStorage.setItem("appearance", mode);

        // Store in cookie for SSR...
        setCookie("appearance", mode);

        // Removed applyTheme call
    }, []);

    useEffect(() => {
        const savedAppearance = localStorage.getItem(
            "appearance",
        ) as Appearance | null;
        updateAppearance(savedAppearance || "light");

        // Removed event listener logic
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
