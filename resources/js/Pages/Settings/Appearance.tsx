import { FormEventHandler } from 'react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'

import AppearanceTabs from '@/Components/AppearanceTabs';
import SettingsHeading from "@/Components/Settings/Heading";
import { Label } from "@/Components/ui/label";

import AppLayout from '@/Layouts/AppLayout'
import SettingsLayout from './Layout'

interface BreadcrumbItem {
    title: string
    href: string
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        title: 'Appearance',
        href: '/settings/appearance'
    }
]

export default function Appearance() {

    return (
        <AppLayout
            breadcrumbItems={breadcrumbItems}
        >
            <Head title="Appearance Settings" />

            <SettingsLayout>   
                <div>
                    <SettingsHeading 
                        title="Appearance Settings"
                        description="Update your account's appearance settings"
                    />
                    <div className="flex flex-col gap-4 items-start">
                        <Label>Appearance</Label>
                        <AppearanceTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}