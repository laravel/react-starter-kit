import Heading from '@/components/heading';
import { appearance } from '@/routes';
import { edit as editPassword } from '@/routes/password';
import { edit } from '@/routes/profile';

import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@mantine/core';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: appearance(),
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

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${typeof item.href === 'string' ? item.href : item.href.url}-${index}`}
                                href={typeof item.href === 'string' ? item.href : item.href.url}
                                component={Link}
                                prefetch
                                size="sm"
                                justify="start"
                                color="gray"
                                variant="subtle"
                                leftSection={item.icon && <item.icon className="h-4 w-4" />}
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

                <div className="my-6 border-2 bg-border lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
