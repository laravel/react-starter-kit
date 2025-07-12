import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Globe, Lock, Play, Search, Target } from 'lucide-react';
import { useState } from 'react';

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

    const filteredTools = tools.filter(
        (tool) =>
            getText(tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
            getText(tool, 'description').toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />
            <div
                className={`${language === 'ar' ? 'rtl' : 'ltr'} min-h-screen bg-neutral-900 p-6 text-white`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="flex items-center gap-2 text-3xl font-bold">
                        <Target className="h-6 w-6 text-white" />
                        {t.title}
                    </h1>
                    <Button variant="outline" size="sm" onClick={toggleLanguage}>
                        <Globe className="mr-1 h-4 w-4" />
                        {language === 'en' ? 'عربي' : 'English'}
                    </Button>
                </div>

                <div className="relative mb-8 max-w-md">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white pl-10 text-black"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTools.length > 0 ? (
                        filteredTools.map((tool) => {
                            const canStart = userLimits.can_create_more && tool.status === 'active' && tool.has_access;

                            const showRequest = tool.status === 'active' && !tool.has_access;
                            return (
                                <Card
                                    key={tool.id}
                                    className="flex flex-col overflow-hidden bg-white text-black shadow-md transition-colors hover:bg-neutral-800 hover:text-white"
                                >
                                    {tool.image && <img src={tool.image} alt={getText(tool, 'name')} className="h-40 w-full object-cover" />}
                                    <CardContent className="flex flex-1 flex-col space-y-4 p-4">
                                        <div>
                                            <CardTitle className="text-lg font-semibold">{getText(tool, 'name')}</CardTitle>
                                            <CardDescription className="text-sm text-gray-600">{getText(tool, 'description')}</CardDescription>
                                        </div>

                                        <div className="flex justify-between text-xs text-gray-500">
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

                                        <div className="mt-auto">
                                            {canStart ? (
                                                <Link href={route('assessment.start', tool.id)}>
                                                    <Button className="mt-4 w-full">
                                                        <Play className="mr-2 h-4 w-4" />
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
                                                    <Button variant="secondary" className="mt-4 w-full">
                                                        <Lock className="mr-2 h-4 w-4" />
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
