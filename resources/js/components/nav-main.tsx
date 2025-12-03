import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [activeMenu, setActiveMenu] = useState<string | null>(page.url);
    const { state } = useSidebar();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => {
                    const hasChildren = item.items && item.items.length > 0;
                    const menuKey = item.href && item.href !== "#" ? String(item.href) : `#menu-${index}`;
                    const childMatch = hasChildren && item.items!.some((c) => page.url.startsWith(resolveUrl(c.href)));
                    const isOpen = hasChildren
                        ? activeMenu === menuKey || childMatch // active parent menu if child menu in active state
                        : activeMenu === menuKey || page.url.startsWith(resolveUrl(item.href)); 
                    const isDropdownOpen = activeMenu === menuKey;
                    const MenuLabel = (
                        <>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            {hasChildren && state === "expanded" && (
                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            )}
                        </>
                    );
                    return (
                        <SidebarMenuItem key={item.title}>
                            {state === "expanded" && (
                                <Collapsible open={isOpen} onOpenChange={() => { setActiveMenu(isOpen ? null : menuKey); }} className="group/collapsible">
                                    <CollapsibleTrigger asChild disabled={!hasChildren}>
                                        <SidebarMenuButton asChild isActive={isOpen} tooltip={{ children: item.title }}>
                                            <Link href={item.href} onClick={() => setActiveMenu(menuKey)} preserveState >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                {hasChildren && (
                                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {hasChildren && (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items!.map((sub) => {
                                                    const subActive = page.url.startsWith(resolveUrl(sub.href));
                                                    return (
                                                        <SidebarMenuSubItem key={sub.title}>
                                                            <SidebarMenuSubButton asChild isActive={subActive}>
                                                                <Link href={sub.href} preserveState>
                                                                    {sub.icon && <sub.icon />}
                                                                    <span>{sub.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    )}
                                </Collapsible>
                            )}
                            {state === "collapsed" && (
                                <DropdownMenu
                                    open={isDropdownOpen}
                                    onOpenChange={(o) => setActiveMenu(o ? menuKey : null)}
                                >
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton
                                            asChild
                                            onMouseEnter={() => hasChildren && setActiveMenu(menuKey)}
                                            tooltip={!hasChildren ? { children: item.title } : undefined}
                                        >
                                            <Link href={item.href !== "#" ? item.href : "#"} preserveState >
                                                {MenuLabel}
                                            </Link>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    {hasChildren && (
                                        <DropdownMenuContent align="end" side="right" onMouseLeave={() => setActiveMenu(null)} >
                                            {item.items!.map((sub) => {
                                                 const subActive = page.url.startsWith(resolveUrl(sub.href));
                                                return (
                                                    <SidebarMenuSubItem key={sub.title}>
                                                        <SidebarMenuSubButton asChild isActive = {subActive}>
                                                            <Link href={sub.href}>
                                                                {sub.icon && <sub.icon />}
                                                                <span>{sub.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </DropdownMenuContent>
                                    )}
                                </DropdownMenu>
                            )}
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}