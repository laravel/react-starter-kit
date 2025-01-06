import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/heading";
import { cn } from "@/lib/utils"
import { type NavItemType } from '@/types/navigation'

import { Separator } from "@/components/ui/separator"

interface LayoutProps {
    children: React.ReactNode
}

const sidebarNavItems: NavItemType[] = [
    {
        title: "Profile",
        url: "/settings/profile",
        icon: null
    },
    {
        title: "Password",
        url: "/settings/password",
        icon: null
    },
    {
        title: "Appearance",
        url: "/settings/appearance",
        icon: null
    }
]

export default function SettingsLayout({ 
    children
}: LayoutProps) {
    const currentPath = window.location.pathname
    const currentItem = sidebarNavItems.find(item => currentPath === item.url)

    return (
        <div className="p-5 sm:p-8 md:p-10">

            <Heading 
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
                <aside className="md:w-1/3 lg:w-1/4 xl:w-1/5 w-full">
                    <nav className="flex-col space-x-0 space-y-1 flex">
                        {sidebarNavItems.map((item) => (
                            <Button 
                                key={item.url}
                                size="sm" 
                                variant="ghost" 
                                asChild
                                className={cn(
                                    "w-full justify-center justify-start",
                                    currentPath === item.url ? "bg-muted" : "hover:underline"
                                )}
                            > 
                                <Link href={item.url} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="md:hidden my-6" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    )
}
