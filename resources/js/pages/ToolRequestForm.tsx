import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';

interface ToolRequestFormProps {
    tool: {
        id: number;
        name: string;
        description?: string;
        image?: string;
    };
    user?: {
        name: string;
        email: string;
        organization?: string;
    } | null;
}

export default function ToolRequestForm({ tool, user }: ToolRequestFormProps) {
    const { auth, flash } = usePage<SharedData>().props;
    const currentUser = user ?? auth.user;
    const currentOrg = (currentUser as { organization?: string } | undefined)?.organization ?? '';
    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id,
        name: currentUser?.name ?? '',
        email: currentUser?.email ?? '',
        organization: currentOrg,
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tool-requests');
    };

    return (
        <AppLayout>
            <Head title="Request Tool Access" />
            <div className="flex min-h-screen items-center justify-center bg-neutral-900 py-10 text-white">
                <div className="w-full max-w-xl space-y-6">
                    {flash?.success && <div className="rounded bg-green-100 p-4 text-green-800">{flash.success}</div>}
                    <Card className="bg-white text-black shadow-lg">
                        <CardHeader>
                            <CardTitle>{tool.name}</CardTitle>
                        </CardHeader>
                        {tool.image && <img src={tool.image} alt={tool.name} className="h-48 w-full object-cover" />}
                        <CardContent>
                            <p className="mb-4 text-gray-700">{tool.description}</p>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="organization">Organization (optional)</Label>
                                    <Input id="organization" value={data.organization} onChange={(e) => setData('organization', e.target.value)} />
                                    <InputError message={errors.organization} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" value={data.message} onChange={(e) => setData('message', e.target.value)} rows={4} />
                                    <InputError message={errors.message} />
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Submitting...' : 'Submit Request'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
