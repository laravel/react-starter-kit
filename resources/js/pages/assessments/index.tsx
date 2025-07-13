import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Search,
    Play,
    Award,
    Calendar,
    Building,
    Target,
    BarChart3
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';

interface Assessment {
    id: number;
    title_en: string;
    title_ar: string;
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
        description_en?: string;
        description_ar?: string;
        image?: string;
    };
    guest_name: string;
    guest_email: string;
    organization?: string;
    status: string;
    created_at: string;
    updated_at: string;
    overall_score?: number;
    completion_percentage?: number;
    user_id?: number;
}

interface AssessmentsIndexProps {
    assessments: Assessment[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

const translations = {
    en: {
        title: 'My Assessments',
        searchPlaceholder: 'Search assessments...',
        continueAssessment: 'Continue',
        viewResults: 'View Results',
        noAssessments: 'No assessments found.',
        completed: 'Completed',
        inProgress: 'In Progress',
        createdAt: 'Created on'
    },
    ar: {
        title: 'تقييماتي',
        searchPlaceholder: 'البحث في التقييمات...',
        continueAssessment: 'متابعة',
        viewResults: 'عرض النتائج',
        noAssessments: 'لا توجد تقييمات.',
        completed: 'مكتمل',
        inProgress: 'قيد المعالجة',
        createdAt: 'تاريخ الإنشاء'
    }
};

export default function AssessmentsIndex({ assessments, auth }: AssessmentsIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useLanguage();
    const t = translations[language];
    const isArabic = language === 'ar';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t.title,
            href: '/assessments',
        },
    ];

    const getText = (item: any, field: string): string =>
        language === 'ar' ? item[`${field}_ar`] : item[`${field}_en`];

    const filtered = assessments.filter(
        (a) =>
            getText(a.tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.guest_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isUserAssessment = (a: Assessment) => a.user_id === auth.user.id;
    const continueUrl = (a: Assessment) =>
        isUserAssessment(a) ? route('assessment.start', a.tool.id) : route('assessment.take', a.id);
    const resultsUrl = (a: Assessment) => route('assessment.results', a.id);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Page Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <Award className="w-6 h-6 text-blue-600" />
                            {t.title}
                        </h1>
                    </div>

                    {/* Search */}
                    <div className="relative mb-8 max-w-xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder={t.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Assessments Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.length ? (
                            filtered.map((a) => {
                                const isComplete = a.status === 'completed';
                                const url = isComplete ? resultsUrl(a) : continueUrl(a);
                                return (
                                    <Card key={a.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-100 rounded-xl">
                                        {a.tool.image && (
                                            <img
                                                src={a.tool.image}
                                                alt={getText(a.tool, 'name')}
                                                className="h-40 w-full object-cover"
                                            />
                                        )}
                                        <CardHeader className="bg-white border-b">
                                            <CardTitle className="text-lg text-gray-900">
                                                {getText(a.tool, 'name')}
                                            </CardTitle>
                                            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                {t.createdAt}:{' '}
                                                {new Date(a.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                                {a.organization && (
                                                    <>
                                                        <span className="mx-2">•</span>
                                                        <Building className="w-4 h-4" />
                                                        {a.organization}
                                                    </>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-5">
                                            <div className="flex justify-between items-center mb-4">
                                                <Badge className={`px-3 py-1 ${isComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                    {isComplete ? t.completed : t.inProgress}
                                                </Badge>
                                                {a.overall_score && (
                                                    <span className="text-sm text-gray-500 font-medium">
                                                        {Math.round(a.overall_score)}%
                                                    </span>
                                                )}
                                            </div>
                                            <Link href={url}>
                                                <Button className="w-full">
                                                    {isComplete ? (
                                                        <BarChart3 className="w-4 h-4 mr-2" />
                                                    ) : (
                                                        <Play className="w-4 h-4 mr-2" />
                                                    )}
                                                    {isComplete ? t.viewResults : t.continueAssessment}
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <p className="col-span-full text-center text-gray-600">{t.noAssessments}</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
