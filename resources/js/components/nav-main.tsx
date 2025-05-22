import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { StickyNote } from 'lucide-react';

interface NavMainProps {
    items?: NavItem[];
    onOpenTodoPanel?: () => void;
}

export function NavMain({ items = [], onOpenTodoPanel }: NavMainProps) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, idx) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton  
                            asChild isActive={item.href === page.url}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                {/* Botón de tareas debajo de Entidades Legales, mismo estilo que los demás */}
                <SidebarMenuItem>
                    <SidebarMenuButton
                        onClick={onOpenTodoPanel}
                        tooltip={{ children: 'Lista de Tareas' }}
                        asChild={false}
                        isActive={page.url === '/tareas'}
                    >
                        <StickyNote className="h-5 w-5" />
                        <span>Lista de Tareas</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
