// Enhanced assessment-tools.tsx with user limits and subscription prompts

import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Search,
    Play,
    Clock,
    Users,
    Target,
    Star,
    Zap,
    ArrowRight,
    Globe,
    Filter,
    BarChart3,
    CheckCircle,
    Sparkles,
    TrendingUp,
    Award,
    BookOpen,
    Calendar,
    Eye,
    Heart,
    Share2,
    Lock,
    Crown,
    AlertTriangle,
    Infinity
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

    const usagePercentage = userLimits.assessment_limit
        ? (userLimits.current_assessments / userLimits.assessment_limit) * 100
        : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex h-full flex-1 flex-col gap-8 p-6 lg:p-8">
                    {/* Enhanced Header */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                        {t.title}
                                    </h1>
                                    <p className="text-lg text-gray-600 mt-1">
                                        {t.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{language === 'en' ? 'عربي' : 'English'}</span>
                            </Button>

                            {!userLimits.is_premium && (
                                <Link href="/subscription">
                                    <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                                        <Crown className="h-4 w-4" />
                                        {t.upgradeNow}
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Usage Stats Card */}
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                        userLimits.is_premium
                                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                                            : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                                    }`}>
                                        {userLimits.is_premium ? <Crown className="w-5 h-5 text-white" /> : <Target className="w-5 h-5 text-white" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {userLimits.is_premium ? t.premiumPlan : t.freePlan}
                                        </h3>
                                        <p className="text-sm text-gray-600">{t.currentUsage}</p>
                                    </div>
                                </div>
                                <Badge className={`${
                                    userLimits.is_premium
                                        ? 'bg-purple-100 text-purple-800 border-purple-300'
                                        : 'bg-blue-100 text-blue-800 border-blue-300'
                                }`}>
                                    {userLimits.subscription_status}
                                </Badge>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{t.assessmentLimit}</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {userLimits.current_assessments} / {userLimits.assessment_limit ? userLimits.assessment_limit : t.unlimited}
                                    </span>
                                </div>

                                {userLimits.assessment_limit && (
                                    <Progress
                                        value={usagePercentage}
                                        className={`h-2 ${usagePercentage >= 100 ? 'bg-red-100' : 'bg-blue-100'}`}
                                    />
                                )}

                                {userLimits.assessment_limit && usagePercentage >= 100 && (
                                    <Alert className="border-red-200 bg-red-50">
                                        <AlertTriangle className="h-4 w-4 text-red-600" />
                                        <AlertDescription className="text-red-800">
                                            {t.limitReached}. <Link href="/subscription" className="underline font-semibold">{t.upgradeNow}</Link>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Search */}
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    placeholder={t.searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tools Grid */}
                    {filteredTools.length === 0 ? (
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                            <CardContent className="flex flex-col items-center justify-center py-20">
                                <div className="text-center space-y-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                                        <Target className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            {searchTerm ? 'No matching tools found' : t.noTools}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                            {searchTerm
                                                ? 'Try adjusting your search criteria'
                                                : 'Assessment tools will appear here once they are available.'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTools.map((tool) => {
                                const canStartAssessment = userLimits.can_create_more;

                                return (
                                    <Card key={tool.id} className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl ${canStartAssessment ? 'hover:scale-105' : 'opacity-75'} group`}>
                                        <div className="relative">
                                            {tool.image ? (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={tool.image}
                                                        alt={getToolName(tool)}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                    <Target className="w-12 h-12 text-blue-600" />
                                                </div>
                                            )}

                                            {/* Limit overlay */}
                                            {!canStartAssessment && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <div className="text-center text-white">
                                                        <Lock className="w-8 h-8 mx-auto mb-2" />
                                                        <p className="text-sm font-semibold">{t.upgradeRequired}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Premium badge */}
                                            {userLimits.is_premium && (
                                                <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                                    <Crown className="w-3 h-3 inline mr-1" />
                                                    Premium
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="p-6 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                    {getToolName(tool)}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-3">
                                                    {getToolDescription(tool)}
                                                </p>
                                            </div>

                                            {/* Tool Stats */}
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div className="p-2 bg-blue-50 rounded-lg">
                                                    <div className="text-sm font-bold text-blue-900">{tool.total_domains}</div>
                                                    <div className="text-xs text-blue-700">{t.domains}</div>
                                                </div>
                                                <div className="p-2 bg-green-50 rounded-lg">
                                                    <div className="text-sm font-bold text-green-900">{tool.total_criteria}</div>
                                                    <div className="text-xs text-green-700">{t.criteria}</div>
                                                </div>
                                                <div className="p-2 bg-purple-50 rounded-lg">
                                                    <div className="text-sm font-bold text-purple-900">{tool.estimated_time}</div>
                                                    <div className="text-xs text-purple-700">{t.minutes}</div>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {canStartAssessment ? (
                                                <Link href={route('assessment.start', tool.id)}>
                                                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                                        <Play className="w-4 h-4 mr-2" />
                                                        {t.startAssessment}
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Link href="/subscription">
                                                    <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                                                        <Crown className="w-4 h-4 mr-2" />
                                                        {t.upgradeNow}
                                                    </Button>
                                                </Link>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {/* Upgrade CTA for free users */}
                    {!userLimits.is_premium && (
                        <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-500 via-pink-600 to-orange-500 text-white overflow-hidden">
                            <CardContent className="p-8 text-center relative">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10 space-y-4">
                                    <Crown className="w-16 h-16 mx-auto text-yellow-200" />
                                    <h3 className="text-3xl font-bold">Ready for Unlimited Access?</h3>
                                    <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                                        Upgrade to premium and unlock unlimited assessments, advanced analytics, detailed reports, and priority support.
                                    </p>
                                    <div className="flex justify-center pt-4">
                                        <Link href="/subscription">
                                            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 shadow-xl px-8 py-3 text-lg font-semibold">
                                                <Sparkles className="w-5 h-5 mr-2" />
                                                Upgrade to Premium
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
