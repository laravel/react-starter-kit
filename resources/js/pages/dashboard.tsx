import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Skeleton } from '@mantine/core';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <Skeleton animate={false} className="h-full!" mb="xl" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <Skeleton animate={false} className="h-full!" mb="xl" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <Skeleton animate={false} className="h-full!" mb="xl" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Skeleton
                        animate={false}
                        classNames={{
                            root: 'mb-0!',
                        }}
                        mb="xl"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
