import { Fragment } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { type BreadcrumbItem } from '@/types'

export default function App({ 
    children,
    breadcrumbs = [],
}: {
    children: React.ReactNode
    breadcrumbs?: BreadcrumbItem[]
}) {
    return (
        <AppSidebar>
            <AppHeader breadcrumbs={breadcrumbs} />
            {children}
        </AppSidebar>
    )
}
