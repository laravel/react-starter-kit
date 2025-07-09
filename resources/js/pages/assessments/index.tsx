import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Search, Globe, Play, Award } from 'lucide-react';

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
    locale: string;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

interface Translations {
    en: {
        title: string;
        searchPlaceholder: string;
        continueAssessment: string;
        viewResults: string;
        noAssessments: string;
    };
    ar: {
        title: string;
        searchPlaceholder: string;
        continueAssessment: string;
        viewResults: string;
        noAssessments: string;
    };
}

const translations: Translations = {
    en: {
        title: 'My Assessments',
        searchPlaceholder: 'Search assessments...',
        continueAssessment: 'Continue',
        viewResults: 'View Results',
        noAssessments: 'No assessments found.'
    },
    ar: {
        title: 'تقييماتي',
        searchPlaceholder: 'البحث في التقييمات...',
        continueAssessment: 'متابعة',
        viewResults: 'عرض النتائج',
        noAssessments: 'لا توجد تقييمات.'
    }
};

export default function AssessmentsIndex({ assessments, locale, auth }: AssessmentsIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');

    const t = translations[language];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t.title,
            href: '/assessments',
        },
    ];

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
    };

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

            <div className={`${language === 'ar' ? 'rtl' : 'ltr'} p-6`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" /> {t.title}
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
                    {filtered.length ? (
                        filtered.map((a) => {
                            const isComplete = a.status === 'completed';
                            const url = isComplete ? resultsUrl(a) : continueUrl(a);
                            return (
                                <Card key={a.id} className="flex flex-col overflow-hidden">
                                    {a.tool.image && (
                                        <img
                                            src={a.tool.image}
                                            alt={getText(a.tool, 'name')}
                                            className="h-32 w-full object-cover"
                                        />
                                    )}
                                    <CardContent className="flex flex-col flex-1 p-4 space-y-4">
                                        <div>
                                            <CardTitle className="text-lg">{getText(a.tool, 'name')}</CardTitle>
                                            {a.organization && <CardDescription>{a.organization}</CardDescription>}
                                        </div>
                                        <div className="mt-auto">
                                            <Link href={url}>
                                                <Button className="w-full">
                                                    {isComplete ? (
                                                        <Award className="w-4 h-4 mr-2" />
                                                    ) : (
                                                        <Play className="w-4 h-4 mr-2" />
                                                    )}
                                                    {isComplete ? t.viewResults : t.continueAssessment}
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-gray-600">{t.noAssessments}</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
