import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Content",
        href: "/content",
    },
];

interface ContentProps {
    subscribed: boolean;
}

export default function Content({ subscribed }: ContentProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Content" />
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 relative overflow-hidden rounded-xl border">
                    <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Content Page
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            This is a placeholder for your content page.
                        </p>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="p-6 min-h-[240px] flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Your custom content will appear here
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
