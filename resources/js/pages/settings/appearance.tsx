import { FormEventHandler } from 'react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'

import AppearanceTabs from '@/components/appearance-tabs';
import { type BreadcrumbItem } from '@/types'
import SettingsHeading from "@/components/settings/heading";
import { Label } from "@/components/ui/label";

import AppLayout from '@/layouts/app-layout'
import SettingsLayout from './layout'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance Settings',
        href: '/settings/appearance'
    }
]

export default function Appearance() {

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
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
