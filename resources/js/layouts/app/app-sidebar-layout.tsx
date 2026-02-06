import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { type PropsWithChildren } from 'react';
import { AppContent } from '@/components/app-content';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSideBar } from '@/hooks/use-sidebar';
import { type BreadcrumbItem } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { state: desktopOpened, toggle: toggleDesktop } = useSideBar();
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

    const isMobile = useIsMobile();

    const collapsed = isMobile ? false : !desktopOpened;

    const toggle = () => {
        if (isMobile) {
            toggleMobile();
        } else {
            toggleDesktop();
        }
    };

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
                <AppSidebarHeader breadcrumbs={breadcrumbs} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar
                style={{ ...(!isMobile && { transition: 'width 0.2s ease' }) }}
            >
                <AppSidebar
                    toggle={toggle}
                    className="group peer"
                    collapsed={collapsed}
                />
            </AppShell.Navbar>
            <AppShell.Main className="flex h-full w-full flex-col">
                <AppContent className="overflow-x-hidden">
                    {children}
                </AppContent>
            </AppShell.Main>
        </AppShell>
    );
}
