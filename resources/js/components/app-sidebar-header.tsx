import { Button } from '@mantine/core';
import { IconLayoutSidebar } from '@tabler/icons-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
    toggle: () => void;
};

export function AppSidebarHeader({ breadcrumbs = [], toggle }: Props) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <Button
                variant="subtle"
                className="p-0"
                color="gray"
                style={{ paddingLeft: 8, paddingRight: 8 }}
                size="xs"
                onClick={toggle}
            >
                <IconLayoutSidebar size={20} color="var(--foreground)" />
            </Button>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            )}
        </header>
    );
}
