import type { InertiaLinkProps } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';
import { toUrl } from '@/lib/utils';

export type IsCurrentUrlFn = (
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    currentUrl?: string,
    startsWith?: boolean,
) => boolean;

export type IsCurrentOrParentUrlFn = (
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    currentUrl?: string,
) => boolean;

export type WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    ifTrue: TIfTrue,
    ifFalse?: TIfFalse,
) => TIfTrue | TIfFalse;

export type UseCurrentUrlReturn = {
    currentUrl: string;
    isCurrentUrl: IsCurrentUrlFn;
    isCurrentOrParentUrl: IsCurrentOrParentUrlFn;
    whenCurrentUrl: WhenCurrentUrlFn;
};

export function useCurrentUrl(): UseCurrentUrlReturn {
    const page = usePage();
    const currentUrlPath = new URL(
        page.url,
        typeof window !== 'undefined'
            ? window.location.origin
            : 'http://localhost',
    ).pathname;

    const isCurrentUrl: IsCurrentUrlFn = useCallback(
        (
            urlToCheck: NonNullable<InertiaLinkProps['href']>,
            currentUrl?: string,
            startsWith: boolean = false,
        ) => {
            const urlToCompare = currentUrl ?? currentUrlPath;
            const urlString = toUrl(urlToCheck);

            const comparePath = (path: string): boolean =>
                startsWith
                    ? urlToCompare.startsWith(path)
                    : path === urlToCompare;

            if (!urlString.startsWith('http')) {
                return comparePath(urlString);
            }

            try {
                const absoluteUrl = new URL(urlString);

                return comparePath(absoluteUrl.pathname);
            } catch {
                return false;
            }
        },
        [currentUrlPath],
    );

    const isCurrentOrParentUrl: IsCurrentOrParentUrlFn = useCallback(
        (
            urlToCheck: NonNullable<InertiaLinkProps['href']>,
            currentUrl?: string,
        ) => {
            return isCurrentUrl(urlToCheck, currentUrl, true);
        },
        [isCurrentUrl],
    );

    const whenCurrentUrl: WhenCurrentUrlFn = useCallback(
        <TIfTrue, TIfFalse = null>(
            urlToCheck: NonNullable<InertiaLinkProps['href']>,
            ifTrue: TIfTrue,
            ifFalse: TIfFalse = null as TIfFalse,
        ): TIfTrue | TIfFalse => {
            return isCurrentUrl(urlToCheck) ? ifTrue : ifFalse;
        },
        [isCurrentUrl],
    );

    return {
        currentUrl: currentUrlPath,
        isCurrentUrl,
        isCurrentOrParentUrl,
        whenCurrentUrl,
    };
}
