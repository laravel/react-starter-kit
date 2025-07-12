import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
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
    const { flash } = usePage().props as { flash?: { success?: string } };
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
            <div className="mx-auto max-w-2xl space-y-6 rounded-xl bg-black p-6 text-white shadow-lg">
                {flash?.success && <div className="rounded bg-green-100 p-4 text-green-800">{flash.success}</div>}
                <Card className="border-gray-700 bg-gray-900 text-white">
                    <CardHeader className="border-b border-gray-700">
                        <CardTitle>{tool.name}</CardTitle>
                    </CardHeader>
                    {tool.image && <img src={tool.image} alt={tool.name} className="h-48 w-full object-cover" />}
                    <CardContent>
                        <p className="mb-4 text-gray-300">{tool.description}</p>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-400">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    className="border-gray-700 bg-transparent"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-400">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="border-gray-700 bg-transparent"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="organization" className="text-gray-400">
                                    Organization (optional)
                                </Label>
                                <Input
                                    id="organization"
                                    className="border-gray-700 bg-transparent"
                                    value={data.organization}
                                    onChange={(e) => setData('organization', e.target.value)}
                                />
                                <InputError message={errors.organization} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-gray-400">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    className="border-gray-700 bg-transparent"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={4}
                                />
                                <InputError message={errors.message} />
                            </div>
                            <Button type="submit" disabled={processing} className="w-full bg-white text-black hover:bg-gray-200">
                                {processing ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
