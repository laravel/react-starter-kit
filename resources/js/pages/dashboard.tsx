import { Button } from "@/components/catalyst/button";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
];

interface DashboardProps {
    subscribed: boolean;
}

export default function Dashboard({ subscribed }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    {!subscribed && (
                        <div className="bg-rajah-50 border-l-4 border-rajah-400 p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-6 w-6 text-rajah-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-lg font-medium text-yellow-800">
                                            Unlock Premium Features
                                        </h3>
                                        <div className="mt-2 text-sm text-yellow-700">
                                            <p>
                                                You don't have an active
                                                subscription. Subscribe now to
                                                access all premium features and
                                                benefits.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6">
                                    <Button
                                        color="sea-nymph"
                                        href="/subscription-checkout"
                                    >
                                        Subscribe Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {subscribed && (
                        <div className="p-6">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Welcome to Your Metisio Dashboard
                            </h1>
                        </div>
                    )}
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="p-6 min-h-[240px] flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Additional dashboard content will appear here
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
