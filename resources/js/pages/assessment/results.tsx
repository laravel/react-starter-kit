
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    CheckCircle,
    Download,
    Award,
    BarChart3,
    Target,
    ChevronDown,
    Lightbulb,
    AlertCircle,
    TrendingUp // FIX: Added the missing icon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/use-language';
import PDFGeneratorComponent from '@/components/PDFGeneratorComponent';

// --- TYPE DEFINITIONS ---
interface AssessmentResult {
    id: number;
    name: string;
    email: string;
    organization?: string;
    status: string;
    completed_at?: string;
    created_at: string;
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
    };
}

interface DomainResult {
    domain_id: number;
    domain_name_en: string;
    domain_name_ar: string;
    score_percentage: number;
}

interface CategoryResult {
    category_id: number;
    category_name_en: string;
    category_name_ar: string;
    score_percentage: number;
}

interface AssessmentResultsData {
    overall_percentage: number;
    total_criteria: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    domain_results: DomainResult[];
    category_results: Record<string, CategoryResult[]>;
}

interface AssessmentResultsProps {
    assessment: AssessmentResult;
    results: AssessmentResultsData;
    isGuest?: boolean;
}

// --- TRANSLATIONS ---
const translations = {
    en: {
        assessmentResults: 'Assessment Results',
        overallScore: 'Overall Score',
        detailedResults: 'Detailed Results',
        recommendations: 'Recommendations',
        yesResponses: 'Yes',
        noResponses: 'No',
        notApplicable: 'N/A',
        successRate: 'Success Rate',
        completedOn: 'Completed on',
        domainPerformance: 'Domain Performance',
        categoryBreakdown: 'Category Breakdown',
        downloadPDF: 'Download PDF Report',
        excellent: 'Excellent',
        good: 'Good',
        fair: 'Fair',
        needsImprovement: 'Needs Improvement',
        excellentPerformance: 'Excellent Performance!',
        focusOnImprovement: 'Consider focusing on improving processes in this area.',
        criteriaThatNeedAttention: 'criteria that need attention',
        insights: 'Key Insights',
        nextSteps: 'Recommended Next Steps',
        highPerformingDomains: 'High-Performing Domains',
        improvementAreas: 'Areas for Improvement',
        applicableCriteria: 'Applicable Criteria',
        allDomainsPerforming: 'All domains are performing excellently. Keep up the great work!',
    },
    ar: {
        assessmentResults: 'نتائج التقييم',
        overallScore: 'النتيجة الإجمالية',
        detailedResults: 'النتائج التفصيلية',
        recommendations: 'التوصيات',
        yesResponses: 'نعم',
        noResponses: 'لا',
        notApplicable: 'غير قابل للتطبيق',
        successRate: 'نسبة النجاح',
        completedOn: 'اكتمل في',
        domainPerformance: 'أداء المجالات',
        categoryBreakdown: 'تفصيل الفئات',
        downloadPDF: 'تحميل تقرير PDF',
        excellent: 'ممتاز',
        good: 'جيد',
        fair: 'مقبول',
        needsImprovement: 'يحتاج تحسين',
        excellentPerformance: 'أداء ممتاز!',
        focusOnImprovement: 'يوصى بالتركيز على تحسين العمليات في هذا المجال.',
        criteriaThatNeedAttention: 'معايير تحتاج إلى اهتمام',
        insights: 'الرؤى الرئيسية',
        nextSteps: 'الخطوات التالية الموصى بها',
        highPerformingDomains: 'المجالات عالية الأداء',
        improvementAreas: 'مجالات التحسين',
        applicableCriteria: 'المعايير القابلة للتطبيق',
        allDomainsPerforming: 'جميع المجالات تحقق أداءً ممتازًا. استمروا في العمل الرائع!',
    }
};

// --- HELPER COMPONENTS ---

const PageHeader = ({ t, assessment, results, language, isGuest, getName }: any) => (
    <Card className="mb-8 border-0 shadow-sm bg-white">
        <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">{t.assessmentResults}</h1>
                    <p className="text-sm text-gray-600">{getName(assessment.tool)}</p>
                </div>
            </div>
            <PDFGeneratorComponent assessment={assessment} results={results} locale={language} isGuest={isGuest}>
                <Button><Download className="h-4 w-4 me-2" />{t.downloadPDF}</Button>
            </PDFGeneratorComponent>
        </CardContent>
    </Card>
);

const CircularProgress = ({ value, size = 120, strokeWidth = 10 }: { value: number, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;
    const color = value >= 80 ? '#10B981' : value >= 60 ? '#F59E0B' : '#EF4444';

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="transparent" />
                <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                {Math.round(value)}%
            </div>
        </div>
    );
};

const InsightCard = ({ icon, title, value, description, color }: any) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
            <h3 className="font-semibold text-gray-700">{title}</h3>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
);

const DomainAccordion = ({ domain, categories, t, language }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const scoreLevel = getScoreLevel(domain.score_percentage, t);
    const scoreBadgeColor = getScoreBadgeColor(domain.score_percentage);

    return (

        <Card className="border-gray-200 shadow-sm">
            <CardHeader className="p-4 cursor-pointer flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${scoreBadgeColor.replace('text-', 'bg-').replace('border-', 'bg-').replace('800', '100')}`}>
                        <Target className={`h-6 w-6 ${scoreBadgeColor.replace('bg-', 'text-').replace('100', '600')}`} />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold text-gray-800">{language === 'ar' ? domain.domain_name_ar : domain.domain_name_en}</CardTitle>
                        <p className={`text-sm font-semibold ${scoreBadgeColor.replace('bg-', 'text-').replace('100', '800')}`}>{scoreLevel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`text-xl font-bold ${scoreBadgeColor.replace('bg-', 'text-').replace('100', '800')}`}>{Math.round(domain.score_percentage)}%</span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </CardHeader>
            {isOpen && (
                <CardContent className="p-4 border-t border-gray-100">
                    <h4 className="font-semibold mb-3">{t.categoryBreakdown}</h4>
                    <div className="space-y-4">
                        {categories.map((cat: CategoryResult) => (
                            <div key={cat.category_id}>
                                <div className="flex justify-between items-center mb-1 text-sm">
                                    <span className="font-medium text-gray-700">{language === 'ar' ? cat.category_name_ar : cat.category_name_en}</span>
                                    <span className="font-semibold text-gray-800">{Math.round(cat.score_percentage)}%</span>
                                </div>
                                <Progress value={cat.score_percentage} className="h-2" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

// --- Helper functions outside component for reusability ---
const getScoreLevel = (score: number, t: any) => {
    if (score >= 80) return t.excellent;
    if (score >= 60) return t.good;
    if (score >= 40) return t.fair;
    return t.needsImprovement;
};

const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
};

// --- MAIN COMPONENT ---
export default function AssessmentResults({ assessment, results, isGuest = false }: AssessmentResultsProps) {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = translations[language];

    const breadcrumbs: BreadcrumbItem[] = [{ title: t.assessmentResults, href: '#' }];

    const getName = (item: { name_en: string, name_ar: string }) => isArabic ? item.name_ar : item.name_en;
    const successRate = results.applicable_criteria > 0 ? Math.round((results.yes_count / results.applicable_criteria) * 100) : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t.assessmentResults} - ${getName(assessment.tool)}`} />

            <div className="min-h-screen bg-slate-50 p-4 sm:p-6" dir={isArabic ? 'rtl' : 'ltr'}>
                <div className="max-w-7xl mx-auto">

                    {/* FIX: Page Header is now inside the main layout */}
                    <PageHeader t={t} assessment={assessment} results={results} language={language} isGuest={isGuest} getName={getName} />

                    <main className="space-y-8">
                        {/* Top Section: Score and Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-1 border-0 shadow-lg bg-white p-6 flex flex-col items-center justify-center text-center">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.overallScore}</h3>
                                <CircularProgress value={results.overall_percentage} />
                                <Badge className={`mt-4 px-4 py-1 text-base ${getScoreBadgeColor(results.overall_percentage)}`}>
                                    {getScoreLevel(results.overall_percentage, t)}
                                </Badge>
                            </Card>
                            <Card className="lg:col-span-2 border-0 shadow-lg bg-white p-6">
                                <CardTitle className="flex items-center gap-3 mb-4">
                                    <Lightbulb className="w-6 h-6 text-blue-600" />
                                    {t.insights}
                                </CardTitle>
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                    <InsightCard icon={<CheckCircle className="h-5 w-5 text-white" />} title={t.successRate} value={`${successRate}%`} description={`${results.yes_count} / ${results.applicable_criteria}`} color="bg-emerald-500" />
                                    <InsightCard icon={<BarChart3 className="h-5 w-5 text-white" />} title={t.overallScore} value={`${Math.round(results.overall_percentage)}%`} description={getScoreLevel(results.overall_percentage, t)} color="bg-blue-500" />
                                    <InsightCard icon={<Target className="h-5 w-5 text-white" />} title={t.highPerformingDomains} value={results.domain_results.filter(d => d.score_percentage >= 80).length} description={`out of ${results.domain_results.length} domains`} color="bg-purple-500" />
                                    <InsightCard icon={<AlertCircle className="h-5 w-5 text-white" />} title={t.improvementAreas} value={results.domain_results.filter(d => d.score_percentage < 60).length} description="need attention" color="bg-amber-500" />
                                </div>
                            </Card>
                        </div>

                        {/* Domain Performance Section */}
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <BarChart3 className="w-6 h-6 text-blue-600" />
                                    {t.domainPerformance}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 p-6">
                                {results.domain_results.map((domain) => (
                                    <div key={domain.domain_id}>
                                        <div className="flex justify-between items-center mb-1 text-sm">
                                            <span className="font-semibold text-gray-800">{language === 'ar' ? domain.domain_name_ar : domain.domain_name_en}</span>
                                            <span className={`font-bold ${getScoreBadgeColor(domain.score_percentage).replace('bg-', 'text-').replace('100', '800')}`}>{Math.round(domain.score_percentage)}%</span>
                                        </div>
                                        <Progress value={domain.score_percentage} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Detailed Breakdown Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.detailedResults}</h2>
                            <div className="space-y-4">
                                {results.domain_results.map((domain) => (
                                    <DomainAccordion
                                        key={domain.domain_id}
                                        domain={domain}
                                        categories={results.category_results[domain.domain_id] || []}
                                        t={t}
                                        language={language}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Recommendations Section */}
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <TrendingUp className="w-6 h-6 text-amber-600" />
                                    {t.nextSteps}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 p-6">
                                {results.domain_results.every(d => d.score_percentage >= 80) ? (
                                    <div className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50">
                                        <h4 className="font-bold text-emerald-900">{t.excellentPerformance}</h4>
                                        <p className="text-emerald-800">{t.allDomainsPerforming}</p>
                                    </div>
                                ) : (
                                    results.domain_results
                                        .filter(domain => domain.score_percentage < 80)
                                        .sort((a, b) => a.score_percentage - b.score_percentage)
                                        .map(domain => (
                                            <div key={domain.domain_id} className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50/50">
                                                <h4 className="font-bold text-amber-900">{language === 'ar' ? domain.domain_name_ar : domain.domain_name_en}</h4>
                                                <p className="text-amber-800">{t.focusOnImprovement}</p>
                                            </div>
                                        ))
                                )}
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}

