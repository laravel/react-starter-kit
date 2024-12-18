import { AppSidebar } from "@/Components/AppSidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { PropsWithChildren, Fragment } from 'react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbItems?: BreadcrumbItem[];
}

export default function App({ 
    children,
    breadcrumbItems = [],
}: AppLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
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
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </>
                    )}
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
