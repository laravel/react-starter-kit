import { ExternalLink } from "lucide-react"
import { type NavItemType } from '@/types'
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuAction
} from "@/components/ui/sidebar"

export function NavFooter({ 
    items, 
    className,
    ...props 
}: React.ComponentPropsWithoutRef<typeof SidebarGroup> & { 
    items: NavItemType[] 
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
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
