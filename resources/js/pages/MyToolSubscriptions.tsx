import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Subscription {
    id: number;
    tool: {
        id: number;
        name_en: string;
        image?: string;
    };
    plan_type: string;
    status: string;
    started_at: string;
    expires_at: string | null;
}

interface Props {
    subscriptions: Subscription[];
}

export default function MyToolSubscriptions({ subscriptions }: Props) {
    return (
        <AppLayout>
            <Head title="My Assessment Tools" />
            <div className="min-h-screen bg-black p-6 text-white">
                <h1 className="mb-6 text-3xl font-bold">My Assessment Tools</h1>
                {subscriptions.length ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {subscriptions.map((sub) => (
                            <Card key={sub.id} className="flex flex-col border-gray-700 bg-gray-900 text-white">
                                <CardHeader className="border-b border-gray-700">
                                    <CardTitle>{sub.tool.name_en}</CardTitle>
                                </CardHeader>
                                {sub.tool.image && <img src={sub.tool.image} alt={sub.tool.name_en} className="h-32 w-full object-cover" />}
                                <CardContent className="flex flex-1 flex-col space-y-2">
                                    <div className="text-sm text-gray-400">Plan: {sub.plan_type}</div>
                                    <div className="text-sm text-gray-400">Status: {sub.status}</div>
                                    {sub.expires_at && (
                                        <div className="text-sm text-gray-400">Expires: {new Date(sub.expires_at).toLocaleDateString()}</div>
                                    )}
                                    <Link href={`/tools/${sub.tool.id}/details`} className="mt-auto">
                                        <Button className="w-full bg-white text-black hover:bg-gray-200">View Tool</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">You have no tool subscriptions.</p>
                )}
            </div>
        </AppLayout>
    );
}
