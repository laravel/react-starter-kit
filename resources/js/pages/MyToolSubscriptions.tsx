import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Subscription {
    id: number;
    plan_type: string;
    status: string;
    started_at: string;
    expires_at: string | null;
    tool: {
        id: number;
        name_en: string;
        image?: string;
    };
}

interface Props {
    subscriptions: Subscription[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'My Assessment Tools', href: '/my-tool-subscriptions' }];

export default function MyToolSubscriptions({ subscriptions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Assessment Tools" />
            <div className="min-h-screen bg-neutral-900 p-6 text-white">
                <div className="mx-auto max-w-4xl space-y-6">
                    {subscriptions.map((sub) => (
                        <Card key={sub.id} className="bg-white text-black transition-colors hover:bg-neutral-800 hover:text-white">
                            <CardContent className="flex items-center gap-6 p-6">
                                {sub.tool.image && <img src={sub.tool.image} alt={sub.tool.name_en} className="h-16 w-16 rounded-lg object-cover" />}
                                <div className="flex-1">
                                    <CardTitle className="text-lg font-semibold">{sub.tool.name_en}</CardTitle>
                                    <CardDescription className="mt-1">
                                        {sub.plan_type} - {sub.status}
                                    </CardDescription>
                                </div>
                                <Link href={`/tools/${sub.tool.id}/details`}>
                                    <Button variant="outline">Details</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                    {subscriptions.length === 0 && <p className="text-center text-gray-400">You have no tool subscriptions yet.</p>}
                </div>
            </div>
        </AppLayout>
    );
}
