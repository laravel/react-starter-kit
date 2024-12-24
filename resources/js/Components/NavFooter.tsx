import { type LucideIcon, ExternalLink } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuAction,
} from "@/Components/ui/sidebar"

interface NavItem {
    title: string
    url: string
    icon: LucideIcon
}

interface NavFooterProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
    items: NavItem[]
}

export function NavFooter({ items, ...props }: NavFooterProps) {
    const renderNavItem = (item: NavItem) => (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
                <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <item.icon />
                    <span>{item.title}</span>
                </a>
            </SidebarMenuButton>
            <SidebarMenuAction showOnHover>
                <ExternalLink />
            </SidebarMenuAction>
        </SidebarMenuItem>
    )

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(renderNavItem)}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
