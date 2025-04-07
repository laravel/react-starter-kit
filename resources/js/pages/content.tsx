import { ContentHeader } from "@/components/content-header";
import { ContentList } from "@/components/content-list";
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
                <ContentHeader />
                <ContentList />
            </div>
        </AppLayout>
    );
}
