import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;

const mql = (): MediaQueryList | null => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
};

function mediaQueryListener(callback: (event: MediaQueryListEvent) => void) {
    mql()?.addEventListener('change', callback);

    return () => {
        mql()?.removeEventListener('change', callback);
    };
}

function isSmallerThanBreakpoint() {
    return mql()?.matches || false;
}

export function useIsMobile() {
    return useSyncExternalStore(
        mediaQueryListener,
        isSmallerThanBreakpoint,
        () => false,
    );
}
