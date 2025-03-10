import { Link, router } from '@inertiajs/react';
import { Menu } from '@mantine/core';
import { IconLogout, IconSelector, IconSettings } from '@tabler/icons-react';

import { UserInfo } from '@/components/user-info';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import SidebarMenuButton from './sidebar-nav-link';

export function NavUser({ variant, collapsed = false }: { variant: 'header' | 'sidebar'; collapsed?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Menu shadow="md" width={230} position={variant === 'header' ? 'bottom-end' : collapsed ? 'right-end' : 'top-start'}>
                <Menu.Target>
                    <SidebarMenuButton
                        component="button"
                        className={cn(variant == 'header' ? 'p-0!' : 'h-12!', collapsed && 'p-1!')}
                        justify="between"
                        rightSection={variant == 'sidebar' && !collapsed && <IconSelector color="var(--foreground)" size={20} />}
                    >
                        <UserInfo user={auth.user} showName={variant == 'sidebar' && !collapsed} />
                    </SidebarMenuButton>
                </Menu.Target>

                <Menu.Dropdown className="border-border border-2">
                    <Menu.Label>
                        <UserInfo user={auth.user} showEmail={true} />
                    </Menu.Label>

                    <Menu.Divider />

                    <Menu.Item component={Link} href={route('profile.edit')} leftSection={<IconSettings color="gray" size={20} />}>
                        Settings
                    </Menu.Item>
                    <Menu.Divider />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.post(route('logout'));
                        }}
                    >
                        <Menu.Item leftSection={<IconLogout color="gray" />} type="submit">
                            Log Out
                        </Menu.Item>
                    </form>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
