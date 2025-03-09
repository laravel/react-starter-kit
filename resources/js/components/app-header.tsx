import { Button } from '@mantine/core';

import { BreadcrumbItem } from '@/types';
import { IconLayoutSidebar } from '@tabler/icons-react';
import { Breadcrumbs } from './breadcrumbs';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    toggleDesktop: () => void;
    toggleMobile: () => void;
}

export function AppHeader({ breadcrumbs, toggleDesktop, toggleMobile }: AppHeaderProps) {
    return (
        <div className="bg-background flex h-full w-full flex-1 items-center justify-start gap-x-4 px-2">
            <Button
                variant="subtle"
                className="p-0"
                color="gray"
                style={{ paddingLeft: 8, paddingRight: 8 }}
                size="xs"
                onClick={toggleDesktop}
                visibleFrom="sm"
            >
                <IconLayoutSidebar size={20} color="var(--foreground)" />
            </Button>
            <Button
                variant="subtle"
                className="p-0"
                color="gray"
                style={{ paddingLeft: 8, paddingRight: 8 }}
                size="xs"
                onClick={toggleMobile}
                hiddenFrom="sm"
            >
                <IconLayoutSidebar size={80} stroke={1.5} color="var(--mantine-color-blue-filled)" />
            </Button>

            {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        </div>
    );
}
