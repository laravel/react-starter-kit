// Enhanced assessment-tools.tsx with user limits and subscription prompts

import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Search,
    Play,
    Target,
    Globe,
    Lock
} from 'lucide-react';

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
    locale: string;
}

interface Translations {
    en: {
        title: string;
        subtitle: string;
        selectTool: string;
        startAssessment: string;
        noTools: string;
        searchPlaceholder: string;
        upgradeRequired: string;
        limitReached: string;
        unlimited: string;
        currentUsage: string;
        upgradeNow: string;
        freePlan: string;
        premiumPlan: string;
        assessmentLimit: string;
        estimatedTime: string;
        minutes: string;
        criteria: string;
        domains: string;
        viewDetails: string;
        popular: string;
        new: string;
        recommended: string;
    };
    ar: {
        title: string;
        subtitle: string;
        selectTool: string;
        startAssessment: string;
        noTools: string;
        searchPlaceholder: string;
        upgradeRequired: string;
        limitReached: string;
        unlimited: string;
        currentUsage: string;
        upgradeNow: string;
        freePlan: string;
        premiumPlan: string;
        assessmentLimit: string;
        estimatedTime: string;
        minutes: string;
        criteria: string;
        domains: string;
        viewDetails: string;
        popular: string;
        new: string;
        recommended: string;
    };
}

const translations: Translations = {
    en: {
        title: "Assessment Tools",
        subtitle: "Choose the perfect assessment tool for your evaluation needs",
        selectTool: "Select an Assessment Tool",
        startAssessment: "Start Assessment",
        noTools: "No assessment tools are currently available.",
        searchPlaceholder: "Search assessment tools...",
        upgradeRequired: "Upgrade Required",
        limitReached: "Assessment Limit Reached",
        unlimited: "Unlimited",
        currentUsage: "Current Usage",
        upgradeNow: "Upgrade Now",
        freePlan: "Free Plan",
        premiumPlan: "Premium Plan",
        assessmentLimit: "Assessment Limit",
        estimatedTime: "Estimated Time",
        minutes: "minutes",
        criteria: "criteria",
        domains: "domains",
        viewDetails: "View Details",
        popular: "Popular",
        new: "New",
        recommended: "Recommended"
    },
    ar: {
        title: "أدوات التقييم",
        subtitle: "اختر أداة التقييم المثالية لاحتياجات التقييم الخاصة بك",
        selectTool: "اختر أداة التقييم",
        startAssessment: "بدء التقييم",
        noTools: "لا توجد أدوات تقييم متاحة حالياً.",
        searchPlaceholder: "البحث في أدوات التقييم...",
        upgradeRequired: "الترقية مطلوبة",
        limitReached: "تم الوصول لحد التقييمات",
        unlimited: "غير محدود",
        currentUsage: "الاستخدام الحالي",
        upgradeNow: "ترقية الآن",
        freePlan: "الخطة المجانية",
        premiumPlan: "الخطة المدفوعة",
        assessmentLimit: "حد التقييمات",
        estimatedTime: "الوقت المقدر",
        minutes: "دقيقة",
        criteria: "معايير",
        domains: "مجالات",
        viewDetails: "عرض التفاصيل",
        popular: "شائع",
        new: "جديد",
        recommended: "موصى به"
    }
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assessment Tools',
        href: '/assessment-tools',
    },
];

export default function AssessmentTools({ tools, userLimits, locale }: AssessmentToolsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');

    const t = translations[language];

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const getToolName = (tool: Tool): string => {
        return language === 'ar' ? tool.name_ar : tool.name_en;
    };

    const getToolDescription = (tool: Tool): string => {
        const description = language === 'ar' ? tool.description_ar : tool.description_en;
        return description || (language === 'ar' ? 'لا يوجد وصف متاح.' : 'No description available.');
    };

    // Filter tools
    const filteredTools = tools.filter(tool =>
        getToolName(tool).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getToolDescription(tool).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div className={`${language === 'ar' ? 'rtl' : 'ltr'} p-6`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" /> {t.title}
                    </h1>
                    <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>{language === 'en' ? 'عربي' : 'English'}</span>
                    </Button>
                </div>

                <div className="relative mb-6 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTools.length ? (
                        filteredTools.map((tool) => {
                            const canStart = userLimits.can_create_more && tool.status === 'active';
                            return (
                                <Card key={tool.id} className="flex flex-col overflow-hidden">
                                    {tool.image && (
                                        <img src={tool.image} alt={getToolName(tool)} className="h-32 w-full object-cover" />
                                    )}
                                    <CardContent className="flex flex-col flex-1 p-4 space-y-4">
                                        <div>
                                            <CardTitle className="text-lg">{getToolName(tool)}</CardTitle>
                                            <CardDescription>{getToolDescription(tool)}</CardDescription>
                                        </div>
                                        <div className="mt-auto">
                                            {canStart ? (
                                                <Link href={route('assessment.start', tool.id)}>
                                                    <Button className="w-full">
                                                        <Play className="w-4 h-4 mr-2" />
                                                        {t.startAssessment}
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Link href="/subscription">
                                                    <Button variant="secondary" className="w-full">
                                                        <Lock className="w-4 h-4 mr-2" />
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
