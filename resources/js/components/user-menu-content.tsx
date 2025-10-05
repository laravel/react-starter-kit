import { Link, router } from '@inertiajs/react';
import { Menu } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';

import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import { User } from '@/types';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
        router.post(logout());
    };

    return (
        <>
            <Menu.Dropdown className="border-2 border-border">
                <Menu.Label>
                    <UserInfo user={user} showEmail={true} />
                </Menu.Label>

                <Menu.Divider />

                <Menu.Item
                    component={Link}
                    href={edit()}
                    leftSection={<IconSettings color="gray" size={20} />}
                >
                    Settings
                </Menu.Item>
                <Menu.Divider />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogout();
                    }}
                >
                    <Menu.Item
                        leftSection={<IconLogout color="gray" />}
                        type="submit"
                        data-test="logout-button"
                    >
                        Log Out
                    </Menu.Item>
                </form>
            </Menu.Dropdown>
        </>
    );
}
