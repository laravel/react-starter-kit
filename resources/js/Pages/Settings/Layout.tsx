import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

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
        title: "Account Removal",
        href: "/settings/delete",
    }
]

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function Layout({ 
    children,
    title,
    description 
}: LayoutProps) {
    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="block lg:hidden w-full [&>button]:w-full pb-2 space-y-2">
                <Label>Settings Menu</Label>
                <Select className="w-full" onValueChange={(href) => window.location.href = href} value={window.location.pathname}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={sidebarNavItems.find(item => window.location.pathname === item.href)?.title || "Settings Menu"}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        {sidebarNavItems.map((item) => (
                            <SelectItem selected={window.location.pathname == item.href} key={item.href} value={item.href}>
                                {item.title}
                            </SelectItem>
                        ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-0.5 lg:block hidden">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your profile and account settings
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="lg:w-1/5">
                    <nav className="hidden flex-col space-x-0 space-y-1 lg:flex">
                        {sidebarNavItems.map((item) => (
                            <Button size="sm" key={item.href} variant="ghost" 
                                asChild
                                className={cn(
                                    "w-full justify-center md:justify-start",
                                    window.location.pathname == item.href
                                        ? "bg-muted"
                                        : "hover:underline"
                                )}> 
                                <Link 
                                    href={item.href} 
                                    
                                >
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    <section className="max-w-xl">
                        <div className="space-y-6">
                            <header>
                                <h3 className="text-lg font-medium">{title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {description}
                                </p>
                            </header>
                            <Separator />
                            {children}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}