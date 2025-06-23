import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppSidebar from '@/components/app-sidebar';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AppSidebar />
            <main className="flex-1">
                {title && <Head title={title} />}
                {children}
            </main>
        </div>
    );
}
