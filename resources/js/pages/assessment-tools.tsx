import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Search,
    Play,
    Target,
    Lock,
    BarChart3,
    FileText,
    Clock,
    Crown,
    Star,
    ArrowRight
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

/* ---------- types ---------- */
interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    status: string;
    total_criteria: number;
    total_domains: number;
    estimated_time: number;
    has_access: boolean;
}

interface UserLimits {
    current_assessments: number;
    assessment_limit: number | null;
    can_create_more: boolean;
    is_premium: boolean;
    subscription_status: string;
}

interface AssessmentToolsProps {
    tools: Tool[];
    userLimits: UserLimits;
}

/* ---------- translations ---------- */
const translations = {
    en: {
        title: 'Assessment Tools',
        subtitle: 'Choose from our suite of evidence-based tools to evaluate and elevate your organization.',
        startAssessment: 'Start Assessment',
        noTools: 'No assessment tools match your search.',
        searchPlaceholder: 'Search assessment tools...',
        upgradeNow: 'Upgrade Now',
        requestAccess: 'Request Access',
        freePlan: 'Free Plan',
        premiumPlan: 'Premium Plan',
        assessmentLimit: 'Assessment Limit',
        assessmentsUsed: 'Assessments Used',
        estimatedTime: 'Estimated Time',
        minutes: 'minutes',
        criteria: 'criteria',
        domains: 'domains',
        unlimited: 'Unlimited',
        upgradeForUnlimited: 'Upgrade for unlimited assessments and advanced features.',
        accessLocked: 'Access Locked',
    },
    ar: {
        title: 'أدوات التقييم',
        subtitle: 'اختر من مجموعة أدواتنا القائمة على الأدلة لتقييم مؤسستك والارتقاء بها.',
        startAssessment: 'بدء التقييم',
        noTools: 'لا توجد أدوات تقييم تطابق بحثك.',
        searchPlaceholder: 'البحث في أدوات التقييم...',
        upgradeNow: 'الترقية الآن',
        requestAccess: 'طلب الوصول',
        freePlan: 'الخطة المجانية',
        premiumPlan: 'الخطة المدفوعة',
        assessmentLimit: 'حد التقييمات',
        assessmentsUsed: 'التقييمات المستخدمة',
        estimatedTime: 'الوقت المقدر',
        minutes: 'دقيقة',
        criteria: 'معايير',
        domains: 'مجالات',
        unlimited: 'غير محدود',
        upgradeForUnlimited: 'قم بالترقية للحصول على تقييمات غير محدودة وميزات متقدمة.',
        accessLocked: 'الوصول مقفل',
    },
} as const;

/* ---------- breadcrumbs ---------- */
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Assessment Tools', href: '/assessment-tools' },
];

/* ======================================================================= */
// --- SUB-COMPONENTS for a cleaner UI ---

const PageHeader = ({ t, searchTerm, onSearchChange }: any) => (
    <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        <div className="relative mt-6 max-w-md mx-auto">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="ps-12 h-12 rounded-full shadow-sm"
            />
        </div>
    </div>
);

const UserStatusCard = ({ limits, t }: { limits: UserLimits, t: any }) => (
    <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                    {limits.is_premium ? <Crown className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="font-bold text-lg">{limits.is_premium ? t.premiumPlan : t.freePlan}</h3>
                    <p className="text-sm opacity-80">{t.assessmentLimit}</p>
                </div>
            </div>
            <div className="w-full sm:w-auto text-center sm:text-right">
                {limits.is_premium ? (
                    <Badge className="bg-green-400/90 text-green-900 text-base px-4 py-2">{t.unlimited}</Badge>
                ) : (
                    <>
                        <div className="flex items-center gap-4 justify-center">
                            <span className="font-bold text-xl">{limits.current_assessments} / {limits.assessment_limit ?? t.unlimited}</span>
                            <Progress value={(limits.current_assessments / (limits.assessment_limit || 1)) * 100} className="w-24 h-2 bg-white/30" />
                        </div>
                        <p className="text-xs opacity-80 mt-1">{t.assessmentsUsed}</p>
                    </>
                )}
            </div>
            {!limits.is_premium && (
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-bold">
                    <Link href="/subscription">{t.upgradeNow} <ArrowRight className="w-4 h-4 ms-2" /></Link>
                </Button>
            )}
        </CardContent>
    </Card>
);

const ToolCard = ({ tool, userLimits, t, getText }: { tool: Tool, userLimits: UserLimits, t: any, getText: any }) => {
    const canStart = userLimits.can_create_more && tool.status === 'active' && tool.has_access;
    const showRequest = tool.status === 'active' && !tool.has_access;

    console.log(tool.image);
    return (
        <Card className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img
                    src={'storage/'+ tool.image || 'https://placehold.co/600x400/e2e8f0/334155?text=AFAQ'}
                    alt={getText(tool, 'name')}
                    className="h-48 w-full object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${canStart ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {canStart ? 'Available' : t.accessLocked}
                </Badge>
            </div>

            <CardContent className="flex flex-col flex-1 p-5 space-y-4">
                <div>
                    <CardTitle className="text-xl font-bold text-gray-800">{getText(tool, 'name')}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1 h-10">
                        {getText(tool, 'description')}
                    </CardDescription>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center border-t border-b py-3">
                    <div className="text-xs text-gray-600"><BarChart3 className="w-5 h-5 mx-auto mb-1 text-blue-500" />{tool.total_domains} {t.domains}</div>
                    <div className="text-xs text-gray-600"><FileText className="w-5 h-5 mx-auto mb-1 text-blue-500" />{tool.total_criteria} {t.criteria}</div>
                    <div className="text-xs text-gray-600"><Clock className="w-5 h-5 mx-auto mb-1 text-blue-500" />~{tool.estimated_time} {t.minutes}</div>
                </div>

                <div className="mt-auto pt-2">
                    {canStart ? (
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                            <Link href={route('assessment.start', tool.id)}>
                                <Play className="w-4 h-4 me-2" />{t.startAssessment}
                            </Link>
                        </Button>
                    ) : showRequest ? (
                        <Button asChild variant="secondary" className="w-full">
                            <Link href={`/tools/request/${tool.id}`}>{t.requestAccess}</Link>
                        </Button>
                    ) : (
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/subscription">
                                <Lock className="w-4 h-4 me-2" />{t.upgradeNow}
                            </Link>
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default function AssessmentTools({ tools, userLimits }: AssessmentToolsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = translations[language];

    const getText = (tool: Tool, field: 'name' | 'description') =>
        language === 'ar'
            ? (field === 'name' ? tool.name_ar : tool.description_ar) || ''
            : (field === 'name' ? tool.name_en : tool.description_en) || '';

    const filteredTools = tools.filter(
        (tool) =>
            getText(tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
            getText(tool, 'description').toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div className={`min-h-screen bg-slate-50 p-6`} dir={isArabic ? 'rtl' : 'ltr'}>
                <div className="max-w-7xl mx-auto">
                    <PageHeader t={t} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    <UserStatusCard limits={userLimits} t={t} />

                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTools.length > 0 ? (
                            filteredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} userLimits={userLimits} t={t} getText={getText} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-600 py-16">{t.noTools}</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
