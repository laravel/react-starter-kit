import { useCallback } from 'react';

export function useMobileNavigation() {
    const cleanup = useCallback(() => {
        // Remove pointer-events style from body...
        document.body.style.removeProperty('pointer-events');

        // Find and click the close button of any open sheet...
        const closeButton = document.querySelector('[data-radix-collection-item]');

        if (closeButton instanceof HTMLElement) {
            closeButton.click();
        }
    }, []);

    return cleanup;
}
