import type { InertiaLinkProps } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

import { toUrl } from '@/lib/utils';
import type { UseActiveUrlReturn } from '@/types';

export function useActiveUrl(): UseActiveUrlReturn {
    const page = usePage();
    const currentUrlPath = new URL(page.url, window?.location.origin).pathname;

    function urlIsActive(urlToCheck: NonNullable<InertiaLinkProps['href']>, currentUrl?: string) {
        const urlToCompare = currentUrl ?? currentUrlPath;
        return toUrl(urlToCheck) === urlToCompare;
    }

    return {
        currentUrl: currentUrlPath,
        urlIsActive,
    };
}
