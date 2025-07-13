import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Search,
    Play,
    Target,
    Lock,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';

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
        subtitle: 'Choose the perfect assessment tool for your evaluation needs',
        startAssessment: 'Start Assessment',
        noTools: 'No assessment tools are currently available.',
        searchPlaceholder: 'Search assessment tools...',
        upgradeNow: 'Upgrade Now',
        requestAccess: 'Request Access',
        freePlan: 'Free Plan',
        premiumPlan: 'Premium Plan',
        assessmentLimit: 'Assessment Limit',
        estimatedTime: 'Estimated Time',
        minutes: 'minutes',
        criteria: 'criteria',
        domains: 'domains',
    },
    ar: {
        title: 'أدوات التقييم',
        subtitle: 'اختر أداة التقييم المثالية لاحتياجات التقييم الخاصة بك',
        startAssessment: 'بدء التقييم',
        noTools: 'لا توجد أدوات تقييم متاحة حالياً.',
        searchPlaceholder: 'البحث في أدوات التقييم...',
        upgradeNow: 'ترقية الآن',
        requestAccess: 'طلب الوصول',
        freePlan: 'الخطة المجانية',
        premiumPlan: 'الخطة المدفوعة',
        assessmentLimit: 'حد التقييمات',
        estimatedTime: 'الوقت المقدر',
        minutes: 'دقيقة',
        criteria: 'معايير',
        domains: 'مجالات',
    },
} as const;

/* ---------- breadcrumbs ---------- */
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Assessment Tools', href: '/assessment-tools' },
];

/* ======================================================================= */

export default function AssessmentTools({ tools, userLimits }: AssessmentToolsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = translations[language];

    /* helper that picks the right lang string */
    const getText = (tool: Tool, field: 'name' | 'description') =>
        language === 'ar'
            ? field === 'name'
                ? tool.name_ar
                : tool.description_ar ?? ''
            : field === 'name'
                ? tool.name_en
                : tool.description_en ?? '';

    /* filter list by search */
    const filtered = tools.filter(
        (tool) =>
            getText(tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
            getText(tool, 'description').toLowerCase().includes(searchTerm.toLowerCase()),
    );

    /* ---------- component ---------- */
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div
                className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${
                    isArabic ? 'rtl' : 'ltr'
                } p-6`}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                {/* page heading */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-600" />
                        {t.title}
                    </h1>
                </div>

                {/* search box */}
                <div className="relative mb-8 max-w-md">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ps-10"
                    />
                </div>

                {/* tools grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.length ? (
                        filtered.map((tool) => {
                            const canStart =
                                userLimits.can_create_more &&
                                tool.status === 'active' &&
                                tool.has_access;

                            const showRequest = tool.status === 'active' && !tool.has_access;

                            return (
                                <Card
                                    key={tool.id}
                                    className="flex flex-col overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                                >
                                    {tool.image && (
                                        <img
                                            src={tool.image}
                                            alt={getText(tool, 'name')}
                                            className="h-40 w-full object-cover"
                                        />
                                    )}

                                    <CardContent className="flex flex-col flex-1 p-4 space-y-4">
                                        {/* title & description */}
                                        <div>
                                            <CardTitle className="text-lg font-semibold">
                                                {getText(tool, 'name')}
                                            </CardTitle>
                                            <CardDescription className="text-sm text-gray-600">
                                                {getText(tool, 'description')}
                                            </CardDescription>
                                        </div>

                                        {/* meta row */}
                                        <div
                                            className={`flex justify-between text-xs text-gray-500 ${
                                                isArabic ? 'flex-row-reverse' : ''
                                            }`}
                                        >
                                            <span>
                                                {tool.total_domains} {t.domains}
                                            </span>
                                            <span>
                                                {tool.total_criteria} {t.criteria}
                                            </span>
                                            <span>
                                                {tool.estimated_time} {t.minutes}
                                            </span>
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-auto">
                                            {canStart && (
                                                <Link href={route('assessment.start', tool.id)}>
                                                    <Button className="w-full mt-4">
                                                        <Play className="w-4 h-4 me-2" />
                                                        {t.startAssessment}
                                                    </Button>
                                                </Link>
                                            )}

                                            {showRequest && (
                                                <Link href={`/tools/request/${tool.id}`}>
                                                    <Button variant="secondary" className="w-full mt-4">
                                                        {t.requestAccess}
                                                    </Button>
                                                </Link>
                                            )}

                                            {!canStart && !showRequest && (
                                                <Link href="/subscription">
                                                    <Button variant="secondary" className="w-full mt-4">
                                                        <Lock className="w-4 h-4 me-2" />
                                                        {t.upgradeNow}
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-gray-600">{t.noTools}</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
