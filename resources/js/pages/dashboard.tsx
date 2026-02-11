import { Head, Link } from '@inertiajs/react';
import { StatCard } from '@/components/stat-card';
import { UsageBar } from '@/components/usage-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import * as passes from '@/routes/passes';
import * as templates from '@/routes/templates';
import * as billing from '@/routes/billing';
import type { BreadcrumbItem, Pass } from '@/types';
import { Apple, Chrome, Plus, Wallet } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        totalPasses: number;
        applePasses: number;
        googlePasses: number;
        used: number;
        limit: number | null;
    };
    recentPasses: Pass[];
}

export default function Dashboard({ stats, recentPasses }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Passes"
                        value={stats.totalPasses}
                        icon={<Wallet className="h-4 w-4" />}
                        description="All digital wallet passes"
                    />
                    <StatCard
                        title="Apple Wallet"
                        value={stats.applePasses}
                        icon={<Apple className="h-4 w-4" />}
                        description="iOS passes created"
                    />
                    <StatCard
                        title="Google Wallet"
                        value={stats.googlePasses}
                        icon={<Chrome className="h-4 w-4" />}
                        description="Android passes created"
                    />
                    <StatCard
                        title="Plan Usage"
                        value={stats.limit === null ? 'Unlimited' : `${stats.used}/${stats.limit}`}
                        description="Passes created this period"
                    />
                </div>

                {/* Usage Bar */}
                <Card>
                    <CardContent className="pt-6">
                        <UsageBar used={stats.used} limit={stats.limit} />
                    </CardContent>
                </Card>

                {/* Recent Passes & Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Passes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentPasses.length === 0 ? (
                                <div className="py-12 text-center text-muted-foreground">
                                    <Wallet className="mx-auto mb-3 h-12 w-12 opacity-50" />
                                    <p>No passes created yet</p>
                                    <Button asChild className="mt-4">
                                        <Link href={passes.create().url}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Your First Pass
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentPasses.map((pass) => (
                                        <Link
                                            key={pass.id}
                                            href={passes.show({ pass: pass.id }).url}
                                            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                    <Wallet className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{pass.serial_number.substring(0, 8)}...</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {pass.pass_data.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {pass.platforms.map((p) => (
                                                    <Badge key={p} variant={p === 'apple' ? 'default' : 'secondary'}>
                                                        {p}
                                                    </Badge>
                                                ))}
                                                <Badge variant={pass.status === 'active' ? 'default' : 'outline'}>
                                                    {pass.status}
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button asChild className="w-full">
                                <Link href={passes.create().url}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Pass
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href={passes.index().url}>View All Passes</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href={templates.create().url}>New Template</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href={billing.index().url}>Manage Billing</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
