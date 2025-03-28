import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSideBar } from '@/hooks/use-sidebar';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    breadcrumbs?: BreadcrumbItemType[];
}

const Shell = ({ children, breadcrumbs = [] }: AppShellProps) => {
    const { state: desktopOpened, toggle: toggleDesktop } = useSideBar();
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

    const isMobile = useIsMobile();

    const collapsed = isMobile ? false : !desktopOpened;

    return (
        <AppShell
            padding="md"
            layout="alt"
            className="bg-background!"
            header={{ height: 60 }}
            navbar={{
                width: isMobile ? 260 : desktopOpened ? 260 : 64,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: false },
            }}
        >
            <AppShell.Header>
                <AppHeader breadcrumbs={breadcrumbs} toggleDesktop={toggleDesktop} toggleMobile={toggleMobile} />
            </AppShell.Header>
            <AppShell.Navbar style={{ ...(!isMobile && { transition: 'width 0.2s ease' }) }}>
                <AppSidebar toggleMobile={toggleMobile} className="group peer" collapsed={collapsed} />
            </AppShell.Navbar>
            <AppShell.Main className="flex h-full w-full flex-col">
                <AppContent>{children}</AppContent>
            </AppShell.Main>
        </AppShell>
    );
};

export default Shell;
