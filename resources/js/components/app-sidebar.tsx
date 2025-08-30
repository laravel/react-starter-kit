import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { IconBook, IconFolder, IconLayoutGrid, IconX } from '@tabler/icons-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Button } from '@mantine/core';
import AppLogo from './app-logo';
import { NavUser } from './nav-user';
import SidebarMenuButton from './sidebar-menu-button';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: IconLayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/adrum/laravel-react-mantine-starter-kit',
        icon: IconFolder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: IconBook,
    },
];

const SidebarGroupLabel = ({ children }: { children: React.ReactNode }) => (
    <div
        className={cn(
            'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        )}
    >
        {children}
    </div>
);

export function AppSidebar({ collapsed, className, toggle }: { collapsed: boolean; className?: string; toggle: () => void }) {
    const pathname = window.location.pathname;
    const isMobile = useIsMobile();
    return (
        <div
            data-collapsible={collapsed ? 'icon' : ''}
            className={cn('flex h-full flex-col bg-sidebar text-sidebar-foreground', collapsed && 'items-center', className)}
        >
            <div className={cn('flex items-center justify-center px-4 pt-4', collapsed ? 'mb-2 px-1.5' : 'pb-4')}>
                <SidebarMenuButton
                    component={Link}
                    href={dashboard()}
                    prefetch
                    icon={<AppLogo showName={!collapsed} />}
                    iconOnly={collapsed}
                    className="h-12! flex-1"
                />
                {isMobile && (
                    <Button onClick={toggle} variant="icon" className="bg-transparent! p-0! px-2! hover:bg-muted!" aria-label="Close sidebar">
                        <IconX size={24} color="var(--sidebar-foreground)" />
                    </Button>
                )}
            </div>
            <div id="main-nav" className={cn('flex flex-1 flex-col gap-y-2', collapsed ? 'items-center' : 'items-stretch justify-start px-4')}>
                {!collapsed && <SidebarGroupLabel>Platform</SidebarGroupLabel>}
                {mainNavItems.map((item) => (
                    <SidebarMenuButton
                        key={item.title}
                        href={item.href}
                        tooltip={item.title}
                        size="sm"
                        className={cn('font-medium!')}
                        isActive={pathname === item.href}
                        icon={item.icon && <item.icon size={16} />}
                        iconOnly={collapsed}
                    >
                        {item.title}
                    </SidebarMenuButton>
                ))}
            </div>
            <div id="footer-nav">
                <div className={cn('mb-2 flex flex-1 flex-col gap-y-2', collapsed ? 'items-center' : 'items-stretch justify-start px-6')}>
                    {footerNavItems.map((item) => (
                        <SidebarMenuButton
                            key={item.title}
                            href={typeof item.href === 'string' ? item.href : item.href.url}
                            component="a"
                            className={cn('font-light!')}
                            tooltip={item.title}
                            icon={item.icon && <item.icon size={20} />}
                            iconOnly={collapsed}
                            styles={{
                                root: {
                                    color: 'var(--muted-foreground)',
                                },
                            }}
                        >
                            {item.title}
                        </SidebarMenuButton>
                    ))}
                </div>
                <div className="flex flex-1 flex-col items-stretch justify-start p-4">
                    <NavUser />
                </div>
            </div>
        </div>
    );
}
