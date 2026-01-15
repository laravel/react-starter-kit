// Credit: https://usehooks-ts.com/
import { useCallback, useState } from 'react';

import type { CopiedValue, CopyFn, UseClipboardReturn } from '@/types';

export function useClipboard(): UseClipboardReturn {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);

    const copy: CopyFn = useCallback(async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');

            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);

            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);

            return false;
        }
    }, []);

    return [copiedText, copy];
}
