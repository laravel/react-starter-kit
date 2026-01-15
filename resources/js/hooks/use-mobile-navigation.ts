import { useCallback } from 'react';

import type { CleanupFn } from '@/types';

export function useMobileNavigation(): CleanupFn {
    return useCallback(() => {
        // Remove pointer-events style from body...
        document.body.style.removeProperty('pointer-events');
    }, []);
}
