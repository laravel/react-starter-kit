import { Separator } from "@/components/ui/separator"
import SidebarNav from "@/Pages/Profile/SidebarNav"

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/settings/profile",
    },
    {
        title: "Password",
        href: "/settings/password",
    },
    {
        title: "Deletion",
        href: "/settings/delete",
    }
]

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your profile and account settings
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    )
}