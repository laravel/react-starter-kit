import Heading from '@/components/heading';

import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@mantine/core';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.href}
                                href={item.href}
                                component={Link}
                                prefetch
                                size="sm"
                                justify="start"
                                color="gray"
                                variant="subtle"
                                styles={{
                                    root: {
                                        ...(currentPath === item.href && {
                                            backgroundColor: 'var(--color-muted)',
                                        }),
                                    },
                                }}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <div className="bg-border my-6 border-2 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
