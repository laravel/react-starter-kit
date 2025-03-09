import { Link, usePage } from '@inertiajs/react';
import { Button } from '@mantine/core';
import { IconBook, IconFolder, IconGridDots } from '@tabler/icons-react';

import { SharedData, type NavItem } from '@/types';

import AppLogo from './app-logo';
import { NavUser } from './nav-user';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: IconGridDots,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: IconFolder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: IconBook,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user || {};

    return (
        <div className="bg-sidebar text-sidebar-foreground flex h-full flex-col">
            <div className="flex items-center justify-center p-4">
                <Button
                    component={Link}
                    href={route('dashboard')}
                    prefetch
                    size="md"
                    color="gray"
                    variant="subtle"
                    justify="start"
                    className="flex-1 transition-none"
                >
                    <AppLogo />
                </Button>
            </div>
            <div id="main-nav" className="flex flex-1 flex-col items-start items-stretch justify-start gap-y-2 px-4">
                <div className="text-sidebar-foreground text-xs">Platform</div>
                {mainNavItems.map((item) => (
                    <Button
                        key={item.title}
                        component={Link}
                        href={item.url}
                        className="text-foreground w-full"
                        styles={{
                            root: {
                                backgroundColor: 'var(--color-muted)',
                                color: 'var(--foreground)',
                            },
                        }}
                        justify="start"
                        selected={true}
                        variant="subtle"
                        leftSection={item.icon && <item.icon size={20} />}
                        color="gray"
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
            <div id="footer-nav">
                <div className="mb-2 flex flex-1 flex-col items-stretch justify-start gap-y-2 px-6">
                    {footerNavItems.map((item) => (
                        <Button
                            key={item.title}
                            component="a"
                            href={item.url}
                            size="sm"
                            className="w-full"
                            justify="start"
                            variant="subtle"
                            leftSection={item.icon && <item.icon size={20} />}
                            color="gray"
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
                <div className="flex flex-1 flex-col items-stretch justify-start p-4">
                    <NavUser />
                </div>
            </div>
        </div>
    );
}
