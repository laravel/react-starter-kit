"use client"

import { type LucideIcon } from "lucide-react"
import { Link } from "@inertiajs/react"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
}

interface NavMainProps {
    items?: NavItem[]
}

export function NavMain({ items = [] }: NavMainProps) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                            <Link href={item.url} prefetch>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
