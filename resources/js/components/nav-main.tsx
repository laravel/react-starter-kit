"use client"

import { LayoutDashboard, type LucideIcon } from "lucide-react"
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
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                        <Link href={route('dashboard')}>
                            <LayoutDashboard />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                            <Link href={item.url}>
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
