import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

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
    const { flash } = usePage().props as any;
    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id,
        name: user?.name || '',
        email: user?.email || '',
        organization: user?.organization || '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tool-requests');
    };

    return (
        <AppLayout>
            <Head title="Request Tool Access" />
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                {flash?.success && (
                    <div className="p-4 bg-green-100 text-green-800 rounded">
                        {flash.success}
                    </div>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle>{tool.name}</CardTitle>
                    </CardHeader>
                    {tool.image && (
                        <img src={tool.image} alt={tool.name} className="w-full h-48 object-cover" />
                    )}
                    <CardContent>
                        <p className="mb-4 text-gray-700">{tool.description}</p>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="organization">Organization (optional)</Label>
                                <Input id="organization" value={data.organization} onChange={e => setData('organization', e.target.value)} />
                                <InputError message={errors.organization} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" value={data.message} onChange={e => setData('message', e.target.value)} rows={4} />
                                <InputError message={errors.message} />
                            </div>
                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
