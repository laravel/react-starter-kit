import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Search,
    Play,
    Award,
    Calendar,
    Building,
    BarChart3,
    ChevronRight,
    FolderKanban
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Progress } from '@/components/ui/progress';

// --- TYPE DEFINITIONS ---
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

// --- TRANSLATIONS ---
const translations = {
    en: {
        title: 'My Assessments',
        searchPlaceholder: 'Search by tool or organization...',
        continueAssessment: 'Continue Assessment',
        viewResults: 'View Results',
        noAssessments: 'No assessments found.',
        noResultsFound: 'No assessments match your search.',
        completed: 'Completed',
        inProgress: 'In Progress',
        createdAt: 'Created on',
        organization: 'Organization',
        progress: 'Progress',
    },
    ar: {
        title: 'تقييماتي',
        searchPlaceholder: 'ابحث بالأداة أو المؤسسة...',
        continueAssessment: 'متابعة التقييم',
        viewResults: 'عرض النتائج',
        noAssessments: 'لم يتم العثور على تقييمات.',
        noResultsFound: 'لا توجد تقييمات تطابق بحثك.',
        completed: 'مكتمل',
        inProgress: 'قيد التنفيذ',
        createdAt: 'تاريخ الإنشاء',
        organization: 'المؤسسة',
        progress: 'التقدم',
    }
};

// --- SUB-COMPONENTS for a cleaner UI ---

const PageHeader = ({ t, total, searchTerm, onSearchChange }: any) => (
    <Card className="mb-8 border-0 shadow-sm bg-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                    <Award className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
                    <p className="text-gray-500">{total} {total === 1 ? 'assessment' : 'assessments'}</p>
                </div>
            </div>
            <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="ps-10 h-10 rounded-lg"
                />
            </div>
        </CardContent>
    </Card>
);

const AssessmentCard = ({ assessment, auth, t, getText, language }: any) => { // THE FIX, Part 1: Added `language` to props
    const isComplete = assessment.status === 'completed';
    const isUserAssessment = assessment.user_id === auth.user.id;

    // Determine the correct URL based on completion status and ownership
    const url = isComplete
        ? route('assessment.results', assessment.id)
        : isUserAssessment
            ? route('assessment.start', assessment.tool.id)
            : route('assessment.take', assessment.id);

    console.log(assessment);
    return (
        <Card className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-40 bg-gray-200">
                {assessment.tool.image ? (
                    <img
                        src={assessment.tool.image}
                        alt={getText(assessment.tool, 'name')}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                        <BarChart3 className="w-12 h-12 text-slate-400" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/30"></div>
                <Badge className={`absolute top-3 right-3 rtl:left-3 rtl:right-auto text-xs font-bold ${isComplete ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {isComplete ? t.completed : t.inProgress}
                </Badge>
            </div>

            <div className="p-5 flex flex-col flex-grow bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{getText(assessment.tool, 'name')}</h3>

                <div className="text-xs text-gray-500 space-y-1 mb-4">
                    {assessment.organization && (
                        <div className="flex items-center gap-2">
                            <Building className="w-3.5 h-3.5" />
                            <span>{assessment.organization}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.createdAt}: {new Date(assessment.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                    </div>
                </div>

                {!isComplete && assessment.completion_percentage !== undefined && (
                    <div className="my-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{t.progress}</span>
                            <span>{Math.round(assessment.completion_percentage)}%</span>
                        </div>
                        <Progress value={assessment.completion_percentage} className="h-1.5" />
                    </div>
                )}

                <div className="mt-auto pt-4">
                    <Button asChild className="w-full">
                        <Link href={url}>
                            {isComplete ? t.viewResults : t.continueAssessment}
                            <ChevronRight className="w-4 h-4 ms-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const NoAssessmentsFound = ({ t, isSearch }: { t: any, isSearch: boolean }) => (
    <div className="col-span-full text-center py-20">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 mb-4">
            <FolderKanban className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{isSearch ? t.noResultsFound : t.noAssessments}</h3>
        {!isSearch && <p className="text-gray-500 mt-2">Start a new evaluation from the Assessment Tools page.</p>}
    </div>
);

// --- MAIN COMPONENT ---
export default function AssessmentsIndex({ assessments, auth }: AssessmentsIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { language } = useLanguage();
    const t = translations[language];
    const isArabic = language === 'ar';

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t.title, href: route('assessments.index') },
    ];

    const getText = (item: any, field: string): string =>
        language === 'ar' ? item[`${field}_ar`] : item[`${field}_en`];

    const filteredAssessments = assessments.filter(
        (a) =>
            getText(a.tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (a.organization && a.organization.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div className="min-h-screen bg-slate-50 p-4 sm:p-6" dir={isArabic ? 'rtl' : 'ltr'}>
                <div className="max-w-7xl mx-auto">
                    <PageHeader t={t} total={assessments.length} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                    {assessments.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAssessments.length > 0 ? (
                                filteredAssessments.map((assessment) => (
                                    <AssessmentCard
                                        key={assessment.id}
                                        assessment={assessment}
                                        auth={auth}
                                        t={t}
                                        getText={getText}
                                        language={language} // THE FIX, Part 2: Pass `language` down as a prop
                                    />
                                ))
                            ) : (
                                <NoAssessmentsFound t={t} isSearch={true} />
                            )}
                        </div>
                    ) : (
                        <NoAssessmentsFound t={t} isSearch={false} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
