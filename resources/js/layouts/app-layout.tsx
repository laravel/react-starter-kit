import { Fragment, useState } from 'react'
import { AppSidebar } from "@/components/AppSidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

interface BreadcrumbItemType {
    title: string
    href: string
}

interface AppLayoutProps {
    children: React.ReactNode
    breadcrumbItems?: BreadcrumbItemType[]
}

export default function App({ 
    children,
    breadcrumbItems = [],
}: AppLayoutProps) {

    const [isOpen, setIsOpen] = useState(() => 
        typeof window !== 'undefined' ? 
            localStorage.getItem('sidebar') === 'true' : 
            true
    );

    const handleSidebarChange = (open: boolean) => {
        setIsOpen(open);
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar', String(open));
        }
    };

    return (
        <SidebarProvider 
            defaultOpen={isOpen} 
            open={isOpen}
            onOpenChange={handleSidebarChange}
        >  
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center w-full justify-between gap-2 border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        {breadcrumbItems.length > 0 && (
                            <>
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {breadcrumbItems.map((item, index) => {
                                            const isLast = index === breadcrumbItems.length - 1;

                                            return (
                                                <Fragment key={index}>
                                                    <BreadcrumbItem>
                                                        {isLast ? (
                                                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                                        ) : (
                                                            <BreadcrumbLink href={item.href}>
                                                                {item.title}
                                                            </BreadcrumbLink>
                                                        )}
                                                    </BreadcrumbItem>
                                                    {!isLast && (
                                                        <BreadcrumbSeparator />
                                                    )}
                                                </Fragment>
                                            );
                                        })}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </>
                        )}
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
