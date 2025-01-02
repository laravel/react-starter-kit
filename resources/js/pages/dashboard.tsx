import { Head } from '@inertiajs/react'
import AppLayout from "@/Layouts/AppLayout"

interface BreadcrumbItem {
    title: string
    href: string
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    }
]

export default function Dashboard() {
    return (
        <AppLayout breadcrumbItems={breadcrumbItems}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
        </AppLayout>
    )
}
