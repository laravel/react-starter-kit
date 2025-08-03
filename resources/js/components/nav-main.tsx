import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useLanguage } from '@/hooks/use-language';

const labels = {
    en: 'Platform',
    ar: 'المنصة',
};

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { language } = useLanguage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{labels[language]}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
