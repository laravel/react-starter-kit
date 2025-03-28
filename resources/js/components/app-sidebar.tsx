import { IconBook, IconFolder, IconGridDots, IconX } from '@tabler/icons-react';

import { type NavItem } from '@/types';

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
        href: '/dashboard',
        icon: IconGridDots,
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
        href: 'https://laravel.com/docs/starter-kits',
        icon: IconBook,
    },
];

const SidebarGroupLabel = ({ children }: { children: React.ReactNode }) => (
    <div
        className={cn(
            'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        )}
    >
        {children}
    </div>
);

export function AppSidebar({ collapsed, className, toggleMobile }: { collapsed: boolean; className?: string; toggleMobile: () => void }) {
    const pathname = window.location.pathname;
    const isMobile = useIsMobile();
    return (
        <div
            data-collapsible={collapsed ? 'icon' : ''}
            className={cn('bg-sidebar text-sidebar-foreground flex h-full flex-col', collapsed && 'items-center', className)}
        >
            <div className={cn('flex items-center justify-center px-4 pt-4', collapsed ? 'mb-2 px-1.5' : 'pb-4')}>
                <SidebarMenuButton
                    component={Link}
                    href={route('dashboard')}
                    prefetch
                    icon={<AppLogo showName={!collapsed} />}
                    iconOnly={collapsed}
                    className="h-12! flex-1"
                />
                {isMobile && (
                    <Button onClick={toggleMobile} variant="icon" className="hover:bg-muted! bg-transparent! p-0! px-2!" aria-label="Close sidebar">
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
                            component="a"
                            href={item.href}
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
                    <NavUser variant="sidebar" collapsed={collapsed} />
                </div>
            </div>
        </div>
    );
}
