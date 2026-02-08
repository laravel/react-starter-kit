import type { ComponentPropsWithoutRef } from 'react';
import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
        >
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                            >
                                {item.external ? (
                                    <a
                                        href={toUrl(item.href)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.icon && (
                                            <item.icon className="h-5 w-5" />
                                        )}
                                        <span>{item.title}</span>
                                    </a>
                                ) : (
                                    <Link href={item.href}>
                                        {item.icon && (
                                            <item.icon className="h-5 w-5" />
                                        )}
                                        <span>{item.title}</span>
                                    </Link>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
