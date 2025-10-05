import { AppContent } from '@/components/app-content';
import { AppHeader, AppHeaderNavBar } from '@/components/app-header';
import { type BreadcrumbItem } from '@/types';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { desktop: true, mobile: !opened },
            }}
        >
            <AppShell.Header className="bg-background!">
                <AppHeader
                    breadcrumbs={breadcrumbs}
                    opened={opened}
                    toggle={toggle}
                />
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <AppHeaderNavBar />
            </AppShell.Navbar>

            <AppShell.Main className="flex h-full w-full flex-col rounded-xl bg-background">
                <AppContent>{children}</AppContent>
            </AppShell.Main>
        </AppShell>
    );
}
