import { BookOpenText, FolderGit2, LayoutDashboard, type LucideIcon } from "lucide-react"
import { Link } from "@inertiajs/react"
import { NavMain } from "@/components/nav-main"
import { NavFooter } from "@/components/nav-footer"
import { NavUser } from "@/components/nav-user"
import { type NavItemType } from '@/types'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import ApplicationLogo from "./application-logo"

const mainNavItems: NavItemType[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
]

const footerNavItems: NavItemType[] = [
    {
        title: "Repository",
        url: "https://github.com/laravel/react-starter-kit",
        icon: FolderGit2,
    },
    {
        title: "Documentation",
        url: "https://laravel.com/docs/starter-kits",
        icon: BookOpenText,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" className="flex items-center gap-3" prefetch>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                    <ApplicationLogo className="size-5 text-white fill-current" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Laravel</span>
                                    <span className="truncate text-xs">Starter Kit</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
