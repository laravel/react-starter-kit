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
    locale: string;
}

<<<<<<< HEAD
const translations = {
=======
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
        requestAccess: string;
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
        requestAccess: string;
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
>>>>>>> 25c9c33af4c90bdbcae5e426e58d2a7f2ecf7dde
    en: {
        title: "Assessment Tools",
        subtitle: "Choose the perfect assessment tool for your evaluation needs",
        startAssessment: "Start Assessment",
        noTools: "No assessment tools are currently available.",
        searchPlaceholder: "Search assessment tools...",
        upgradeNow: "Upgrade Now",
<<<<<<< HEAD
=======
        requestAccess: "Request Access",
        freePlan: "Free Plan",
        premiumPlan: "Premium Plan",
        assessmentLimit: "Assessment Limit",
>>>>>>> 25c9c33af4c90bdbcae5e426e58d2a7f2ecf7dde
        estimatedTime: "Estimated Time",
        minutes: "minutes",
        criteria: "criteria",
        domains: "domains"
    },
    ar: {
        title: "أدوات التقييم",
        subtitle: "اختر أداة التقييم المثالية لاحتياجات التقييم الخاصة بك",
        startAssessment: "بدء التقييم",
        noTools: "لا توجد أدوات تقييم متاحة حالياً.",
        searchPlaceholder: "البحث في أدوات التقييم...",
        upgradeNow: "ترقية الآن",
<<<<<<< HEAD
=======
        requestAccess: "طلب الوصول",
        freePlan: "الخطة المجانية",
        premiumPlan: "الخطة المدفوعة",
        assessmentLimit: "حد التقييمات",
>>>>>>> 25c9c33af4c90bdbcae5e426e58d2a7f2ecf7dde
        estimatedTime: "الوقت المقدر",
        minutes: "دقيقة",
        criteria: "معايير",
        domains: "مجالات"
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
        setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
    };

    const getText = (tool: Tool, field: 'name' | 'description') => {
        const en = field === 'name' ? tool.name_en : tool.description_en;
        const ar = field === 'name' ? tool.name_ar : tool.description_ar;
        return language === 'ar' ? ar || '' : en || '';
    };

    const filteredTools = tools.filter((tool) =>
        getText(tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
        getText(tool, 'description').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />
            <div className={`${language === 'ar' ? 'rtl' : 'ltr'} p-6`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-600" />
                        {t.title}
                    </h1>
                    <Button variant="outline" size="sm" onClick={toggleLanguage}>
                        <Globe className="w-4 h-4 mr-1" />
                        {language === 'en' ? 'عربي' : 'English'}
                    </Button>
                </div>

                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTools.length > 0 ? (
                        filteredTools.map((tool) => {
                            const canStart =
                                userLimits.can_create_more &&
                                tool.status === 'active' &&
                                tool.has_access;
<<<<<<< HEAD

=======
                            const showRequest = tool.status === 'active' && !tool.has_access;
>>>>>>> 25c9c33af4c90bdbcae5e426e58d2a7f2ecf7dde
                            return (
                                <Card key={tool.id} className="flex flex-col overflow-hidden shadow-md">
                                    {tool.image && (
                                        <img
                                            src={tool.image}
                                            alt={getText(tool, 'name')}
                                            className="h-40 w-full object-cover"
                                        />
                                    )}
                                    <CardContent className="flex flex-col flex-1 p-4 space-y-4">
                                        <div>
                                            <CardTitle className="text-lg font-semibold">{getText(tool, 'name')}</CardTitle>
                                            <CardDescription className="text-sm text-gray-600">
                                                {getText(tool, 'description')}
                                            </CardDescription>
                                        </div>

                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>{tool.total_domains} {t.domains}</span>
                                            <span>{tool.total_criteria} {t.criteria}</span>
                                            <span>{tool.estimated_time} {t.minutes}</span>
                                        </div>

                                        <div className="mt-auto">
                                            {canStart ? (
                                                <Link href={route('assessment.start', tool.id)}>
                                                    <Button className="w-full mt-4">
                                                        <Play className="w-4 h-4 mr-2" />
                                                        {t.startAssessment}
                                                    </Button>
                                                </Link>
                                            ) : showRequest ? (
                                                <Link href={`/tools/request/${tool.id}`}>
                                                    <Button variant="secondary" className="w-full">
                                                        {t.requestAccess}
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Link href="/subscription">
                                                    <Button variant="secondary" className="w-full mt-4">
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
