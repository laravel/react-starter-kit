import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

import { AppContent } from './app-content';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    breadcrumbs?: BreadcrumbItemType[];
}

const Shell = ({ children, breadcrumbs = [] }: AppShellProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            padding="md"
            layout="alt"
            header={{ height: 60 }}
            navbar={{
                width: 260,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header>
                <AppHeader breadcrumbs={breadcrumbs} toggleDesktop={toggleDesktop} toggleMobile={toggleMobile} />
            </AppShell.Header>
            <AppShell.Navbar>
                <AppSidebar collapsed={desktopOpened} toggleMobile={toggleMobile} />
            </AppShell.Navbar>
            <AppShell.Main className="bg-background flex h-full w-full flex-col rounded-xl">
                <AppContent>{children}</AppContent>
            </AppShell.Main>
        </AppShell>
    );
};

export { Shell as AppShell };
