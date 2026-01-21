import type { InertiaLinkProps } from '@inertiajs/react';

// useAppearance
export type Appearance = 'light' | 'dark' | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

// useCurrentUrl
export type IsCurrentUrlFn = (urlToCheck: NonNullable<InertiaLinkProps['href']>, currentUrl?: string) => boolean;

export type WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    ifTrue: TIfTrue,
    ifFalse?: TIfFalse,
) => TIfTrue | TIfFalse;

export type UseCurrentUrlReturn = {
    currentUrl: string;
    isCurrentUrl: IsCurrentUrlFn;
    whenCurrentUrl: WhenCurrentUrlFn;
};

// useInitials
export type GetInitialsFn = (fullName: string) => string;

// useMobileNavigation
export type CleanupFn = () => void;
