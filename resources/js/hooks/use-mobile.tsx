import { px } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
    const isMobile = useMediaQuery(`(max-width: ${px(MOBILE_BREAKPOINT)})`);

    return !!isMobile;
}
