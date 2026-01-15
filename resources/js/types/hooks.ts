import type { InertiaLinkProps } from '@inertiajs/react';

// useAppearance
export type Appearance = 'light' | 'dark' | 'system';

export interface UseAppearanceReturn {
    readonly appearance: Appearance;
    readonly updateAppearance: (mode: Appearance) => void;
}

// useActiveUrl
export type UrlIsActiveFn = (urlToCheck: NonNullable<InertiaLinkProps['href']>, currentUrl?: string) => boolean;

export interface UseActiveUrlReturn {
    currentUrl: string;
    urlIsActive: UrlIsActiveFn;
}

// useInitials
export type GetInitialsFn = (fullName: string) => string;

// useMobileNavigation
export type CleanupFn = () => void;
