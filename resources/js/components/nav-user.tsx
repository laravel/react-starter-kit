import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSideBar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Avatar, Menu } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import SidebarMenuButton from './sidebar-menu-button';
import { UserMenuContent } from './user-menu-content';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state: desktopOpened } = useSideBar();
    const isMobile = useIsMobile();

    const collapsed = isMobile ? false : !desktopOpened;
    const getInitials = useInitials();

    return (
        <Menu shadow="md" width={230} position={collapsed ? 'right-end' : 'top-start'}>
            <Menu.Target>
                <SidebarMenuButton
                    component="button"
                    className={cn('group h-12! p-0.5! px-1!')}
                    classNames={{
                        inner: 'items-stretch! justify-between!',
                    }}
                    rightSection={!collapsed && <IconSelector color="var(--foreground)" size={20} />}
                >
                    <Avatar
                        src={auth.user.avatar}
                        name={getInitials(auth.user.name)}
                        size="md"
                        radius="xl"
                        imageProps={{ src: auth.user.avatar, alt: auth.user.name }}
                    />

                    <div className="px-2 text-sm font-medium text-foreground">
                        <span>{auth.user.name}</span>
                    </div>
                </SidebarMenuButton>
            </Menu.Target>
            <UserMenuContent user={auth.user} />
        </Menu>
    );
}
