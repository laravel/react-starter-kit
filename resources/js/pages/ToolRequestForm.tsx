import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { useLanguage } from '@/hooks/use-language';

interface ToolRequestFormProps {
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
        description_en?: string;
        description_ar?: string;
        image?: string;
    };
    user?: {
        name: string;
        email: string;
        organization?: string;
    } | null;
}

const translations = {
    en: {
        pageTitle: 'Request Tool Access',
        name: 'Full Name',
        email: 'Email',
        organization: 'Organization (optional)',
        message: 'Message',
        submitting: 'Submitting...',
        submit: 'Submit Request',
    },
    ar: {
        pageTitle: 'طلب الوصول إلى الأداة',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        organization: 'المنظمة (اختياري)',
        message: 'رسالة',
        submitting: 'جارٍ الإرسال...',
        submit: 'إرسال الطلب',
    },
} as const;

export default function ToolRequestForm({ tool, user }: ToolRequestFormProps) {
    const { language } = useLanguage();
    const t = translations[language];
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

    const toolName = language === 'ar' ? tool.name_ar : tool.name_en;
    const toolDescription = language === 'ar' ? tool.description_ar : tool.description_en;

    return (
        <AppLayout>
            <Head title={t.pageTitle} />
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                {flash?.success && (
                    <div className="p-4 bg-green-100 text-green-800 rounded">
                        {flash.success}
                    </div>
                )}
                <Card>
                    <CardHeader>
                        <CardTitle>{toolName}</CardTitle>
                    </CardHeader>
                    {tool.image && (
                        <img src={tool.image} alt={toolName} className="w-full h-48 object-cover" />
                    )}
                    <CardContent>
                        <p className="mb-4 text-gray-700">{toolDescription}</p>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t.name}</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t.email}</Label>
                                <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="organization">{t.organization}</Label>
                                <Input id="organization" value={data.organization} onChange={e => setData('organization', e.target.value)} />
                                <InputError message={errors.organization} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">{t.message}</Label>
                                <Textarea id="message" value={data.message} onChange={e => setData('message', e.target.value)} rows={4} />
                                <InputError message={errors.message} />
                            </div>
                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? t.submitting : t.submit}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
