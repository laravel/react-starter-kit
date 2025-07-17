import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { useLanguage } from '@/hooks/use-language';
import AssessmentHeader from '@/components/assessment-header';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Crown, FileText, Send } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
}

interface User {
    name: string;
    email: string;
    organization?: string;
}

interface ToolRequestProps {
    tool: Tool;
    user?: User | null;
}

// --- TRANSLATIONS ---
const translations = {
    en: {
        pageTitle: 'Request Tool Access',
        name: 'Full Name',
        email: 'Email Address',
        organization: 'Organization (Optional)',
        message: 'Message (Optional)',
        messagePlaceholder: 'Include any specific details or questions...',
        submitting: 'Submitting...',
        submit: 'Submit Request',
        toolDetails: 'Tool Details',
        requestForm: 'Access Request Form',
        successTitle: 'Request Sent!',
        successMessage: 'Thank you for your interest. Our team will review your request and get back to you shortly.',
        backToTools: 'Back to Tools',
        freePlan: 'Free Plan',
    },
    ar: {
        pageTitle: 'طلب الوصول إلى الأداة',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        organization: 'المنظمة (اختياري)',
        message: 'رسالة (اختياري)',
        messagePlaceholder: 'أضف أي تفاصيل أو أسئلة محددة...',
        submitting: 'جارٍ الإرسال...',
        submit: 'إرسال الطلب',
        toolDetails: 'تفاصيل الأداة',
        requestForm: 'نموذج طلب الوصول',
        successTitle: 'تم إرسال الطلب!',
        successMessage: 'شكراً لاهتمامك. سيقوم فريقنا بمراجعة طلبك والرد عليك قريباً.',
        backToTools: 'العودة إلى الأدوات',
        freePlan: 'الخطة المجانية',
    },
} as const;

// --- SUB-COMPONENTS for a cleaner layout ---

const ToolInfoCard = ({ tool, t, language }: { tool: Tool, t: any, language: string }) => {
    const toolName = language === 'ar' ? tool.name_ar : tool.name_en;
    const toolDescription = language === 'ar' ? tool.description_ar : tool.description_en;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600">{t.toolDetails}</h2>
                    <h1 className="text-3xl font-bold text-gray-900">{toolName}</h1>
                </div>
            </div>
            {tool.image && (
                <img src={tool.image} alt={toolName} className="w-full h-48 rounded-lg object-cover shadow-md" />
            )}
            <p className="text-lg text-gray-600 leading-relaxed">
                {toolDescription || 'No description available.'}
            </p>
        </div>
    );
};

const RequestForm = ({ tool, user, t }: { tool: Tool, user?: User | null, t: any }) => {
    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id,
        name: user?.name || '',
        email: user?.email || '',
        organization: user?.organization || '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tool-requests', {
            preserveScroll: true,
        });
    };

    return (
        <Card className="border-0 shadow-xl">
            <CardHeader>
                <CardTitle>{t.requestForm}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
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
                        <Textarea id="message" value={data.message} onChange={e => setData('message', e.target.value)} placeholder={t.messagePlaceholder} rows={4} />
                        <InputError message={errors.message} />
                    </div>
                    <Button type="submit" disabled={processing} className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700">
                        <Send className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                        {processing ? t.submitting : t.submit}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

const SuccessMessage = ({ t }: { t: any }) => (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-100">
        <CardContent className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white mb-6">
                <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h2>
            <p className="text-gray-600 mb-6">{t.successMessage}</p>
            <Button asChild>
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    {t.backToTools}
                </Link>
            </Button>
        </CardContent>
    </Card>
);

// --- MAIN COMPONENT ---
export default function ToolRequest({ tool, user }: ToolRequestProps) {
    const { language } = useLanguage();
    const t = translations[language];
    const { flash } = usePage().props as any;

    return (
        <>
            <Head title={t.pageTitle} />
            <div className="min-h-screen bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <AssessmentHeader
                    title={t.pageTitle}
                    userName={user?.name}
                    language={language}
                    rightContent={
                        <Badge className="bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                            <Crown className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            {t.freePlan}
                        </Badge>
                    }
                />
                <main className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            {/* Left Column: Tool Information */}
                            <div className="lg:pr-8">
                                <ToolInfoCard tool={tool} t={t} language={language} />
                            </div>

                            {/* Right Column: Form or Success Message */}
                            <div>
                                {/* THE FIX: Use optional chaining (?.) to safely access the success property. */}
                                {flash?.success ? (
                                    <SuccessMessage t={t} />
                                ) : (
                                    <RequestForm tool={tool} user={user} t={t} />
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
