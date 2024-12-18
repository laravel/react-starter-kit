import * as React from "react"
import {
    Map,
    PieChart,
    Github,
    BookOpenText,
    AppWindowMac,
    Rocket,
} from "lucide-react"

import { NavMain } from "@/Components/NavMain"
import { NavProjects } from "@/Components/NavProjects"
import { NavSecondary } from "@/Components/NavSecondary"
import { NavUser } from "@/Components/NavUser"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import ApplicationLogo from "./ApplicationLogo"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Sidebar Menu Item",
            url: "#",
            icon: AppWindowMac,
            isActive: false,
            items: [
                {
                    title: "Link 1",
                    url: "#",
                },
                {
                    title: "Link 2",
                    url: "#",
                },
                {
                    title: "Link 3",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Github Repo",
            url: "https://github.com/laravel/react-starter-kit",
            icon: Github,
        },
        {
            title: "Documentation",
            url: "https://laravel.com/docs/starter-kits",
            icon: BookOpenText,
        },
    ],
    projects: [
        {
            title: "Project 1",
            url: "#",
            icon: Rocket,
        },
        {
            title: "Project 2",
            url: "#",
            icon: PieChart,
        },
        {
            title: "Project 3",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                    <ApplicationLogo className="size-5 text-white fill-current" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Laravel</span>
                                    <span className="truncate text-xs">Starter Kit</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
