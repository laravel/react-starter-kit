import { AppContent } from '@/components/app-content';
import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import HeaderMenuButton from '@/components/header-menu-button';
import { NavUser } from '@/components/nav-user';
import { NavItem, type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { AppShell, Burger, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Icon, IconBook, IconFolder, IconLayoutGrid, IconSearch } from '@tabler/icons-react';
import type { PropsWithChildren } from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: IconLayoutGrid,
    },
];

const footerNavItems: (NavItem & { icon: Icon })[] = [
    {
        title: 'Repository',
        href: 'https://github.com/adrum/laravel-react-mantine-starter-kit',
        icon: IconFolder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: IconBook,
    },
];

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const [opened, { toggle }] = useDisclosure();

    const currentPath = window.location.pathname;
    return (
        <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}>
            <AppShell.Header className="bg-background!">
                <div className="md:mx-w-7xl flex h-full items-center justify-between px-6 md:px-4">
                    <Group h="100%">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Group h="100%" justify="space-between" style={{ flex: 1 }}>
                            <HeaderMenuButton component={Link} prefetch href={route('dashboard')} className="bg-transparent! px-2!">
                                <AppLogo />
                            </HeaderMenuButton>
                            <Group h="100%" ml="xl" gap={0} visibleFrom="sm">
                                {mainNavItems.map((item) => (
                                    <HeaderMenuButton
                                        key={item.href}
                                        component={Link}
                                        href={item.href}
                                        isActive={currentPath.startsWith(item.href)}
                                        leftSection={item.icon && <item.icon size={20} />}
                                    >
                                        {item.title}
                                    </HeaderMenuButton>
                                ))}
                            </Group>
                        </Group>
                    </Group>
                    <div className="flex h-full items-center gap-x-2">
                        <HeaderMenuButton
                            tooltip="Search"
                            classNames={{
                                root: 'bg-transparent! hover:bg-muted! px-2! hidden! md:block!',
                            }}
                        >
                            <IconSearch color="var(--foreground)" className="!size-5 opacity-80 group-hover:opacity-100" />
                        </HeaderMenuButton>
                        {footerNavItems.map((item) => (
                            <HeaderMenuButton
                                key={item.href}
                                component={item.href.indexOf('://') > -1 ? 'a' : Link}
                                href={item.href}
                                tooltip={item.title}
                                classNames={{
                                    root: 'bg-transparent! hover:bg-muted! px-2! hidden! md:block!',
                                }}
                            >
                                {item.icon && <item.icon size={20} />}
                            </HeaderMenuButton>
                        ))}
                        <NavUser variant="header" />
                    </div>
                </div>
                {breadcrumbs && breadcrumbs.length > 1 && (
                    <div className="border-sidebar-border/70 flex w-full border-b">
                        <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                        </div>
                    </div>
                )}
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <div className="flex h-full flex-col justify-between">
                    <div className="flex flex-col gap-y-2">
                        {mainNavItems.map((item) => (
                            <Button
                                key={item.href}
                                component={Link}
                                href={item.href}
                                justify="start"
                                size="sm"
                                leftSection={item.icon && <item.icon size={20} />}
                                classNames={{
                                    root: 'bg-transparent! hover:bg-muted!',
                                }}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        {footerNavItems.map((item) => (
                            <Button
                                key={item.href}
                                component={Link}
                                href={item.href}
                                justify="start"
                                size="sm"
                                leftSection={item.icon && <item.icon size={20} />}
                                classNames={{
                                    root: 'bg-transparent! hover:bg-muted!',
                                }}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </div>
                </div>
            </AppShell.Navbar>

            <AppShell.Main className="bg-background flex h-full w-full flex-col rounded-xl">
                <AppContent>{children}</AppContent>
            </AppShell.Main>
        </AppShell>
    );
}
