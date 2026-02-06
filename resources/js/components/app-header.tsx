import { Breadcrumbs } from '@/components/breadcrumbs';
import { useInitials } from '@/hooks/use-initials';
import { useActiveUrl } from '@/hooks/use-active-url';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { NavItem, type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Avatar, Burger, Button, Group, Menu } from '@mantine/core';
import {
    Icon,
    IconBook,
    IconFolder,
    IconLayoutGrid,
    IconSearch,
} from '@tabler/icons-react';
import AppLogo from './app-logo';
import HeaderMenuButton from './header-menu-button';
import SidebarMenuButton from './sidebar-menu-button';
import { UserMenuContent } from './user-menu-content';
interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    opened: boolean;
    toggle: () => void;
}

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: IconLayoutGrid,
    },
];

const rightNavItems: (NavItem & { icon: Icon })[] = [
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

export function AppHeader({
    breadcrumbs = [],
    opened,
    toggle,
}: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { urlIsActive } = useActiveUrl();
    return (
        <>
            <div className="flex h-full items-center justify-between px-6 md:mx-auto md:max-w-7xl md:px-4">
                <Group h="100%">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Group h="100%" justify="space-between" style={{ flex: 1 }}>
                        <HeaderMenuButton
                            component={Link}
                            prefetch
                            href={dashboard()}
                            className="bg-transparent! px-2!"
                        >
                            <AppLogo />
                        </HeaderMenuButton>
                        <Group h="100%" ml="xl" gap={0} visibleFrom="sm">
                            {mainNavItems.map((item) => (
                                <HeaderMenuButton
                                    key={toUrl(item.href)}
                                    component={Link}
                                    href={toUrl(item.href)}
                                    isActive={urlIsActive(item.href)}
                                    leftSection={
                                        item.icon && <item.icon size={20} />
                                    }
                                >
                                    {item.title}
                                </HeaderMenuButton>
                            ))}
                        </Group>
                    </Group>
                </Group>
                <div className="flex h-full items-center md:gap-x-2">
                    <HeaderMenuButton
                        tooltip="Search"
                        classNames={{
                            root: 'bg-transparent! hover:bg-muted! px-2!',
                        }}
                    >
                        <IconSearch
                            color="var(--foreground)"
                            className="!size-5 opacity-80 group-hover:opacity-100"
                        />
                    </HeaderMenuButton>
                    {rightNavItems.map((item) => (
                        <HeaderMenuButton
                            key={toUrl(item.href)}
                            component={Link}
                            href={toUrl(item.href)}
                            tooltip={item.title}
                            classNames={{
                                root: 'bg-transparent! hover:bg-muted! px-2! hidden! md:block!',
                            }}
                        >
                            {item.icon && <item.icon size={20} />}
                        </HeaderMenuButton>
                    ))}

                    <Menu
                        shadow="md"
                        width={230}
                        position={'bottom-end'}
                        classNames={{ dropdown: 'border-1! -mt-2' }}
                    >
                        <Menu.Target>
                            <SidebarMenuButton
                                component="button"
                                className={cn('group h-12! p-0.5! px-1!')}
                                classNames={{
                                    inner: 'items-stretch! justify-between!',
                                }}
                            >
                                <Avatar
                                    src={auth.user.avatar}
                                    name={getInitials(auth.user.name)}
                                    size="md"
                                    radius="xl"
                                    imageProps={{
                                        src: auth.user.avatar,
                                        alt: auth.user.name,
                                    }}
                                />
                            </SidebarMenuButton>
                        </Menu.Target>
                        <UserMenuContent user={auth.user} />
                    </Menu>
                </div>
            </div>
            {breadcrumbs && breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}

export function AppHeaderNavBar() {
    return (
        <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-y-2">
                {mainNavItems.map((item) => (
                    <Button
                        key={
                            typeof item.href === 'string'
                                ? item.href
                                : item.href.url
                        }
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
                {rightNavItems.map((item) => (
                    <Button
                        key={
                            typeof item.href === 'string'
                                ? item.href
                                : item.href.url
                        }
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
    );
}
