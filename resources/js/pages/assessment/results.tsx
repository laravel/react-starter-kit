import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    CheckCircle,
    Download,
    Share2,
    XCircle,
    MinusCircle,
    TrendingUp,
    Award,
    BarChart3,
    FileText,
    Target,
    Calendar,
    User,
    Building,
    Globe,
    ChevronDown,
    ArrowLeft,
    ExternalLink,
    Info,
    Lightbulb,
    AlertCircle,
    Crown
} from 'lucide-react';
import PDFGeneratorComponent from '@/components/PDFGeneratorComponent';
import { useLanguage } from '@/hooks/use-language';

// Language text content
const content = {
    en: {
        assessmentResults: 'Assessment Results',
        overallScore: 'Overall Score',
        detailedResults: 'Detailed Results',
        recommendations: 'Recommendations',
        yesResponses: 'Yes Responses',
        noResponses: 'No Responses',
        notApplicable: 'Not Applicable',
        totalCriteria: 'Total Criteria',
        applicableCriteria: 'Applicable Criteria',
        successRate: 'Success Rate',
        completed: 'Completed',
        processing: 'Processing',
        completedOn: 'Completed on',
        createdOn: 'Created on',
        domainPerformance: 'Domain Performance',
        categoryBreakdown: 'Category Breakdown',
        responseCount: 'Response Count',
        percentages: 'Percentages',
        newAssessment: 'New Assessment',
        viewAllAssessments: 'View All Assessments',
        share: 'Share',
        download: 'Download Report',
        downloadPDF: 'Download PDF Report',
        excellent: 'Excellent',
        good: 'Good',
        fair: 'Fair',
        needsImprovement: 'Needs Improvement',
        excellentPerformance: 'Excellent Performance!',
        allDomainsPerforming: 'All domains are performing well. Continue maintaining these high standards and consider sharing best practices with other teams.',
        focusOnImprovement: 'Consider focusing on improving processes in this area.',
        criteriaText: 'criteria',
        needAttention: 'criteria that need attention',
        switchToArabic: 'عربي',
        switchToEnglish: 'English',
        overallResponses: 'Overall Response Distribution',
        insights: 'Key Insights',
        nextSteps: 'Recommended Next Steps'
    },
    ar: {
        assessmentResults: 'نتائج التقييم',
        overallScore: 'النتيجة الإجمالية',
        detailedResults: 'النتائج التفصيلية',
        recommendations: 'التوصيات',
        yesResponses: 'إجابات نعم',
        noResponses: 'إجابات لا',
        notApplicable: 'غير قابل للتطبيق',
        totalCriteria: 'إجمالي المعايير',
        applicableCriteria: 'المعايير القابلة للتطبيق',
        successRate: 'نسبة النجاح',
        completed: 'مكتمل',
        processing: 'قيد المعالجة',
        completedOn: 'اكتمل في',
        createdOn: 'تم الإنشاء في',
        domainPerformance: 'أداء المجالات',
        categoryBreakdown: 'تفصيل الفئات',
        responseCount: 'عدد الإجابات',
        percentages: 'النسب المئوية',
        newAssessment: 'تقييم جديد',
        viewAllAssessments: 'عرض جميع التقييمات',
        share: 'مشاركة',
        download: 'تحميل التقرير',
        downloadPDF: 'تحميل تقرير PDF',
        excellent: 'ممتاز',
        good: 'جيد',
        fair: 'مقبول',
        needsImprovement: 'يحتاج تحسين',
        excellentPerformance: 'أداء ممتاز!',
        allDomainsPerforming: 'جميع المجالات تؤدي بشكل جيد. استمر في الحفاظ على هذه المعايير العالية وفكر في مشاركة أفضل الممارسات مع الفرق الأخرى.',
        focusOnImprovement: 'يوصى بالتركيز على تحسين العمليات في هذا المجال.',
        criteriaText: 'معايير',
        needAttention: 'معايير تحتاج إلى اهتمام',
        switchToArabic: 'عربي',
        switchToEnglish: 'English',
        overallResponses: 'توزيع الإجابات الإجمالي',
        insights: 'الرؤى الرئيسية',
        nextSteps: 'الخطوات التالية الموصى بها'
    }
};

// Dynamic import for ApexCharts to avoid SSR issues
let ApexCharts: any;

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
    domain_name: string;
    score_percentage: number;
    total_criteria: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    weighted_score?: number;
}

interface CategoryResult {
    category_id: number;
    category_name: string;
    score_percentage: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    weight_percentage?: number;
}

interface AssessmentResults {
    overall_percentage: number;
    total_criteria: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    domain_results: DomainResult[];
    category_results: Record<string, CategoryResult[]>;
}


// Enhanced Circular Progress Component
const CircularProgress: React.FC<{
    value: number;
    size?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
}> = ({ value, size = 120, strokeWidth = 8, children }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    const getColor = (score: number) => {
        if (score >= 80) return '#10B981';
        if (score >= 60) return '#F59E0B';
        if (score >= 40) return '#EF4444';
        return '#6B7280';
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg
                className="transform -rotate-90"
                width={size}
                height={size}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor(value)}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

// Improved Stacked Bar Chart
const StackedBarChart: React.FC<{
    data: Array<{
        name: string;
        yes: number;
        no: number;
        na: number;
    }>;
    height?: number;
    isArabic?: boolean;
}> = ({ data, height = 300, isArabic = false }) => {
    const maxTotal = Math.max(...data.map(d => d.yes + d.no + d.na));

    return (
        <div className="w-full bg-gray-50 rounded-xl p-6" style={{ height: `${height}px` }}>
            <div className="flex items-end justify-between h-full gap-4">
                {data.map((item, index) => {
                    const total = item.yes + item.no + item.na;
                    const barHeight = total > 0 ? (total / maxTotal) * 85 : 5;

                    return (
                        <div key={index} className="flex flex-col items-center flex-1 group">
                            {/* Total count label */}
                            <div className="text-lg font-bold text-gray-900 mb-2 px-2 py-1 bg-white rounded-lg shadow-sm">
                                {total}
                            </div>

                            {/* Stacked Bar */}
                            <div
                                className="w-full rounded-lg transition-all duration-700 ease-out relative overflow-hidden shadow-sm border border-gray-200"
                                style={{
                                    height: `${Math.max(barHeight, 10)}%`,
                                    minHeight: '30px'
                                }}
                            >
                                {/* Yes section */}
                                {item.yes > 0 && (
                                    <div
                                        className="w-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold"
                                        style={{ height: `${(item.yes / total) * 100}%` }}
                                        title={`${isArabic ? 'نعم' : 'Yes'}: ${item.yes}`}
                                    >
                                        {item.yes > 2 && item.yes}
                                    </div>
                                )}

                                {/* No section */}
                                {item.no > 0 && (
                                    <div
                                        className="w-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"
                                        style={{ height: `${(item.no / total) * 100}%` }}
                                        title={`${isArabic ? 'لا' : 'No'}: ${item.no}`}
                                    >
                                        {item.no > 2 && item.no}
                                    </div>
                                )}

                                {/* N/A section */}
                                {item.na > 0 && (
                                    <div
                                        className="w-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold"
                                        style={{ height: `${(item.na / total) * 100}%` }}
                                        title={`${isArabic ? 'غير قابل' : 'N/A'}: ${item.na}`}
                                    >
                                        {item.na > 2 && item.na}
                                    </div>
                                )}

                                {/* Hover tooltip */}
                                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 shadow-lg">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="flex gap-3 mt-1">
                                        <span className="text-emerald-300">✓ {item.yes}</span>
                                        <span className="text-red-300">✗ {item.no}</span>
                                        <span className="text-gray-300">○ {item.na}</span>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="text-sm text-gray-700 text-center mt-3 font-medium leading-tight max-w-full">
                                {item.name.length > 12 ? `${item.name.substring(0, 12)}...` : item.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">{isArabic ? 'نعم' : 'Yes'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">{isArabic ? 'لا' : 'No'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">{isArabic ? 'غير قابل' : 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

// Insight Card Component
const InsightCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string | number;
    description: string;
    color: string;
}> = ({ icon, title, value, description, color }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${color}`}>
                    {icon}
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

interface AssessmentResultsProps {
    assessment: AssessmentResult;
    results: AssessmentResults;
    locale?: string;
    isGuest?: boolean;
}

export default function AssessmentResults({
                                              assessment,
                                              results,
                                              locale = 'en',
                                              isGuest = false
                                          }: AssessmentResultsProps) {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = content[language];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assessment Tools',
            href: '/assessment-tools',
        },
        {
            title: t.assessmentResults,
            href: `/assessment/${assessment.id}/results`,
        },
    ];

    const getName = (item: { name_en: string; name_ar: string }): string => {
        return isArabic ? item.name_ar : item.name_en;
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return '#10B981';
        if (score >= 60) return '#F59E0B';
        if (score >= 40) return '#EF4444';
        return '#6B7280';
    };

    const getScoreColorClass = (score: number): string => {
        if (score >= 80) return 'text-emerald-600';
        if (score >= 60) return 'text-amber-600';
        if (score >= 40) return 'text-red-600';
        return 'text-gray-600';
    };

    const getScoreLevel = (score: number): string => {
        if (score >= 80) return t.excellent;
        if (score >= 60) return t.good;
        if (score >= 40) return t.fair;
        return t.needsImprovement;
    };

    const getScoreBadgeColor = (score: number): string => {
        if (score >= 80) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-200';
        if (score >= 40) return 'bg-red-100 text-red-800 border-red-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const domainChartData = results.domain_results.map((domain) => ({
        name: domain.domain_name.length > 15
            ? domain.domain_name.substring(0, 15) + '...'
            : domain.domain_name,
        yes: domain.yes_count,
        no: domain.no_count,
        na: domain.na_count,
    }));

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCompletionText = (): string => {
        if (assessment.completed_at) {
            return `${t.completedOn} ${formatDate(assessment.completed_at)}`;
        }
        return `${t.createdOn} ${formatDate(assessment.created_at)}`;
    };

    const successRate = Math.round((results.yes_count / results.applicable_criteria) * 100);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t.assessmentResults} - ${getName(assessment.tool)}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-4">
                                <Link href="/assessment-tools">
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">{t.assessmentResults}</h1>
                                        <p className="text-sm text-gray-600">{getName(assessment.tool)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    {t.share}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                    {/* Assessment Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <User className="h-4 w-4" />
                                    <span className="font-medium">{assessment.name}</span>
                                </div>
                                {assessment.organization && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Building className="h-4 w-4" />
                                        <span>{assessment.organization}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">{getCompletionText()}</span>
                                </div>
                            </div>
                            <Badge className={`${assessment.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'} px-3 py-1`}>
                                {assessment.status === 'completed' ? t.completed : t.processing}
                            </Badge>
                        </div>
                    </div>

                    {/* Overall Score Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg text-white p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                    <Award className="h-8 w-8" />
                                    {t.overallScore}
                                </h2>
                                <div className="flex items-center gap-6 justify-center lg:justify-start">
                                    <CircularProgress value={results.overall_percentage} size={140}>
                                        <div className="text-center">
                                            <div className="text-4xl font-bold">
                                                {Math.round(results.overall_percentage)}%
                                            </div>
                                            <div className="text-sm opacity-90 mt-1">
                                                {getScoreLevel(results.overall_percentage)}
                                            </div>
                                        </div>
                                    </CircularProgress>
                                    <div className="space-y-3">
                                        <div className="bg-white/20 rounded-lg p-3">
                                            <div className="text-2xl font-bold">{results.yes_count}</div>
                                            <div className="text-sm opacity-90">{t.yesResponses}</div>
                                        </div>
                                        <div className="bg-white/20 rounded-lg p-3">
                                            <div className="text-2xl font-bold">{successRate}%</div>
                                            <div className="text-sm opacity-90">{t.successRate}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 rounded-lg p-4 text-center">
                                    <CheckCircle className="h-6 w-6 mx-auto mb-2 text-emerald-300" />
                                    <div className="text-2xl font-bold">{results.yes_count}</div>
                                    <div className="text-sm opacity-90">{t.yesResponses}</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 text-center">
                                    <XCircle className="h-6 w-6 mx-auto mb-2 text-red-300" />
                                    <div className="text-2xl font-bold">{results.no_count}</div>
                                    <div className="text-sm opacity-90">{t.noResponses}</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 text-center">
                                    <MinusCircle className="h-6 w-6 mx-auto mb-2 text-gray-300" />
                                    <div className="text-2xl font-bold">{results.na_count}</div>
                                    <div className="text-sm opacity-90">{t.notApplicable}</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4 text-center">
                                    <Target className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                                    <div className="text-2xl font-bold">{results.applicable_criteria}</div>
                                    <div className="text-sm opacity-90">{t.applicableCriteria}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Insights */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Lightbulb className="h-6 w-6 text-amber-500" />
                            {t.insights}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <InsightCard
                                icon={<CheckCircle className="h-5 w-5 text-white" />}
                                title={t.successRate}
                                value={`${successRate}%`}
                                description={`${results.yes_count} out of ${results.applicable_criteria} criteria met`}
                                color="bg-emerald-500"
                            />
                            <InsightCard
                                icon={<BarChart3 className="h-5 w-5 text-white" />}
                                title={t.overallScore}
                                value={`${Math.round(results.overall_percentage)}%`}
                                description={getScoreLevel(results.overall_percentage)}
                                color="bg-blue-500"
                            />
                            <InsightCard
                                icon={<Target className="h-5 w-5 text-white" />}
                                title="Domains"
                                value={results.domain_results.length}
                                description={`${results.domain_results.filter(d => d.score_percentage >= 70).length} performing well`}
                                color="bg-purple-500"
                            />
                            <InsightCard
                                icon={<AlertCircle className="h-5 w-5 text-white" />}
                                title="Areas for Improvement"
                                value={results.domain_results.filter(d => d.score_percentage < 70).length}
                                description="Domains needing attention"
                                color="bg-amber-500"
                            />
                        </div>
                    </div>

                    {/* Domain Performance Chart */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gray-50 rounded-t-xl">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <BarChart3 className="h-6 w-6 text-blue-600" />
                                {t.domainPerformance} - {t.responseCount}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <StackedBarChart
                                data={domainChartData}
                                height={400}
                                isArabic={isArabic}
                            />
                        </CardContent>
                    </Card>

                    {/* Detailed Domain Results */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Target className="h-6 w-6 text-blue-600" />
                            {t.detailedResults}
                        </h2>

                        <div className="space-y-6">
                            {results.domain_results.map((domain) => (
                                <Card key={domain.domain_id} className="border-0 shadow-lg overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl font-bold text-gray-900">
                                                {domain.domain_name}
                                            </CardTitle>
                                            <div className="flex items-center gap-4">
                                                <Badge className={`${getScoreBadgeColor(domain.score_percentage)} px-4 py-2 text-lg font-bold`}>
                                                    {Math.round(domain.score_percentage)}%
                                                </Badge>
                                                <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                                                    {domain.applicable_criteria} {t.criteriaText}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Progress value={domain.score_percentage} className="h-3" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                                <div className="text-2xl font-bold text-gray-900">{domain.total_criteria}</div>
                                                <div className="text-sm text-gray-600 font-medium">{t.totalCriteria}</div>
                                            </div>
                                            <div className="text-center p-4 bg-emerald-50 rounded-xl">
                                                <div className="text-2xl font-bold text-emerald-600">{domain.yes_count}</div>
                                                <div className="text-sm text-gray-600 font-medium">{t.yesResponses}</div>
                                            </div>
                                            <div className="text-center p-4 bg-red-50 rounded-xl">
                                                <div className="text-2xl font-bold text-red-600">{domain.no_count}</div>
                                                <div className="text-sm text-gray-600 font-medium">{t.noResponses}</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                                <div className="text-2xl font-bold text-gray-600">{domain.na_count}</div>
                                                <div className="text-sm text-gray-600 font-medium">{t.notApplicable}</div>
                                            </div>
                                        </div>

                                        {/* Category Breakdown */}
                                        {results.category_results[domain.domain_id] && (
                                            <div className="space-y-6">
                                                <h4 className="text-lg font-semibold text-gray-900 border-b pb-3">
                                                    {t.categoryBreakdown}
                                                </h4>
                                                <div className="grid gap-4">
                                                    {results.category_results[domain.domain_id].map((category) => (
                                                        <div key={category.category_id} className="p-6 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h5 className="font-semibold text-gray-900 text-lg">{category.category_name}</h5>
                                                                <Badge className={`${getScoreBadgeColor(category.score_percentage)} px-3 py-1 font-bold`}>
                                                                    {Math.round(category.score_percentage)}%
                                                                </Badge>
                                                            </div>
                                                            <Progress value={category.score_percentage} className="h-2 mb-4" />
                                                            <div className="flex justify-between text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
                                                                <span className="flex items-center gap-2">
                                                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                                    <span className="font-medium">{category.yes_count} {t.yesResponses}</span>
                                                                </span>
                                                                <span className="flex items-center gap-2">
                                                                    <XCircle className="w-4 h-4 text-red-600" />
                                                                    <span className="font-medium">{category.no_count} {t.noResponses}</span>
                                                                </span>
                                                                <span className="flex items-center gap-2">
                                                                    <MinusCircle className="w-4 h-4 text-gray-600" />
                                                                    <span className="font-medium">{category.na_count} {t.notApplicable}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl text-amber-800">
                                <TrendingUp className="h-6 w-6" />
                                {t.recommendations}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {results.domain_results
                                    .filter(domain => domain.score_percentage < 70)
                                    .sort((a, b) => a.score_percentage - b.score_percentage)
                                    .map((domain) => (
                                        <div key={domain.domain_id} className="border-l-4 border-amber-500 pl-6 py-4 bg-white rounded-r-lg shadow-sm">
                                            <h4 className="font-bold text-amber-900 text-lg mb-2">{domain.domain_name}</h4>
                                            <div className="flex items-center gap-4 mb-3">
                                                <Badge className="bg-amber-100 text-amber-800 px-3 py-1">
                                                    {Math.round(domain.score_percentage)}% Score
                                                </Badge>
                                                <span className="text-sm text-amber-700 font-medium">
                                                    {domain.no_count} {t.needAttention}
                                                </span>
                                            </div>
                                            <p className="text-amber-800 leading-relaxed">
                                                {t.focusOnImprovement} Consider reviewing the {domain.no_count} criteria that received "No" responses and develop action plans to address these gaps.
                                            </p>
                                        </div>
                                    ))}

                                {results.domain_results.every(domain => domain.score_percentage >= 70) && (
                                    <div className="border-l-4 border-emerald-500 pl-6 py-4 bg-white rounded-r-lg shadow-sm">
                                        <h4 className="font-bold text-emerald-900 text-lg mb-2 flex items-center gap-2">
                                            <Crown className="h-5 w-5" />
                                            {t.excellentPerformance}
                                        </h4>
                                        <p className="text-emerald-800 leading-relaxed">
                                            {t.allDomainsPerforming}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* PDF Generator Component */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="bg-gray-50 rounded-t-xl">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Download className="h-6 w-6 text-blue-600" />
                                {t.downloadPDF}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <PDFGeneratorComponent
                                assessment={assessment}
                                locale={language}
                                isGuest={isGuest}
                                results={results}
                            />
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-6 pt-8">
                        <Link href="/assessment-tools">
                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                <FileText className="h-5 w-5 mr-3" />
                                {t.newAssessment}
                            </Button>
                        </Link>
                        <Link href={route('assessments.index')}>
                            <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700">
                                <BarChart3 className="h-5 w-5 mr-3" />
                                {t.viewAllAssessments}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
