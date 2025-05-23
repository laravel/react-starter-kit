import React from 'react';
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
    Building
} from 'lucide-react';

interface AssessmentResult {
    id: number;
    title_en: string;
    title_ar: string;
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
    };
    guest_name: string;
    organization?: string;
    created_at: string;
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

interface AssessmentResultsProps {
    assessment: AssessmentResult;
    results: AssessmentResults;
    locale?: string;
}

// Bar Chart Component
interface BarChartProps {
    data: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    height?: number;
    showValues?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ data, height = 300, showValues = true }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <div className="flex items-end justify-between h-full gap-2 p-4">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        {/* Value label */}
                        {showValues && (
                            <div className="text-sm font-medium text-gray-900 mb-2">
                                {item.value}%
                            </div>
                        )}

                        {/* Bar */}
                        <div
                            className="w-full rounded-t-md transition-all duration-500 ease-out relative group"
                            style={{
                                height: `${(item.value / maxValue) * 80}%`,
                                backgroundColor: item.color,
                                minHeight: '20px'
                            }}
                        >
                            {/* Hover tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                {item.name}: {item.value}%
                            </div>
                        </div>

                        {/* Label */}
                        <div className="text-xs text-gray-600 text-center mt-2 leading-tight">
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Horizontal Bar Component for Categories
interface HorizontalBarProps {
    label: string;
    value: number;
    maxValue: number;
    color: string;
    details?: {
        yes: number;
        no: number;
        na: number;
    };
}

const HorizontalBar: React.FC<HorizontalBarProps> = ({ label, value, maxValue, color, details }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className="h-3 rounded-full transition-all duration-500 ease-out"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                    }}
                />
            </div>
            {details && (
                <div className="flex justify-between text-xs text-gray-500">
                    <span>✓ {details.yes} Yes</span>
                    <span>✗ {details.no} No</span>
                    <span>○ {details.na} N/A</span>
                </div>
            )}
        </div>
    );
};

export default function AssessmentResults({ assessment, results, locale = 'en' }: AssessmentResultsProps) {
    const isArabic = locale === 'ar';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assessment Tools',
            href: '/assessment-tools',
        },
        {
            title: isArabic ? 'النتائج' : 'Results',
            href: `/assessment/results/${assessment.id}`,
        },
    ];

    const getName = (item: { name_en: string; name_ar: string }): string => {
        return isArabic ? item.name_ar : item.name_en;
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return '#10B981'; // Green
        if (score >= 60) return '#F59E0B'; // Amber
        if (score >= 40) return '#EF4444'; // Red
        return '#6B7280'; // Gray
    };

    const getScoreColorClass = (score: number): string => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-amber-600';
        if (score >= 40) return 'text-red-600';
        return 'text-gray-600';
    };

    const getScoreLevel = (score: number): string => {
        if (isArabic) {
            if (score >= 80) return 'ممتاز';
            if (score >= 60) return 'جيد';
            if (score >= 40) return 'مقبول';
            return 'يحتاج تحسين';
        } else {
            if (score >= 80) return 'Excellent';
            if (score >= 60) return 'Good';
            if (score >= 40) return 'Fair';
            return 'Needs Improvement';
        }
    };

    const getScoreBadgeColor = (score: number): string => {
        if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-200';
        if (score >= 40) return 'bg-red-100 text-red-800 border-red-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Prepare domain chart data
    const domainChartData = results.domain_results.map((domain) => ({
        name: domain.domain_name.length > 15 ?
            domain.domain_name.substring(0, 15) + '...' :
            domain.domain_name,
        value: Math.round(domain.score_percentage),
        color: getScoreColor(domain.score_percentage)
    }));

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isArabic ? 'نتائج التقييم' : 'Assessment Results'} - ${getName(assessment.tool)}`} />

            <div className={`flex h-full flex-1 flex-col gap-6 rounded-xl p-6 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isArabic ? 'نتائج التقييم' : 'Assessment Results'}
                        </h1>
                        <p className="text-lg text-gray-600">
                            {getName(assessment.tool)}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {assessment.guest_name}
                            </div>
                            {assessment.organization && (
                                <div className="flex items-center gap-1">
                                    <Building className="h-4 w-4" />
                                    {assessment.organization}
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(assessment.created_at)}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            {isArabic ? 'مشاركة' : 'Share'}
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            {isArabic ? 'تحميل PDF' : 'Download PDF'}
                        </Button>
                    </div>
                </div>

                {/* Success Message */}
                <Card className="border-green-200 bg-green-50">
                    <CardContent className="flex items-center gap-3 p-4">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-800 font-medium">
                            {isArabic
                                ? 'تم إرسال التقييم بنجاح! يمكنك مراجعة النتائج أدناه.'
                                : 'Assessment submitted successfully! You can review your results below.'
                            }
                        </p>
                    </CardContent>
                </Card>

                {/* Overall Score Card */}
                <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Award className="h-6 w-6 text-blue-600" />
                            {isArabic ? 'النتيجة الإجمالية' : 'Overall Score'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Score Display */}
                            <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-3">
                                <div className="text-6xl font-bold">
                                    <span className={getScoreColorClass(results.overall_percentage)}>
                                        {Math.round(results.overall_percentage)}%
                                    </span>
                                </div>
                                <Badge className={`${getScoreBadgeColor(results.overall_percentage)} px-4 py-1 text-sm font-medium`}>
                                    {getScoreLevel(results.overall_percentage)}
                                </Badge>
                                <Progress value={results.overall_percentage} className="w-full h-3" />
                            </div>

                            {/* Statistics */}
                            <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                    <div className="flex items-center justify-center mb-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
                                        <span className="text-2xl font-bold text-green-600">{results.yes_count}</span>
                                    </div>
                                    <div className="text-sm text-gray-700 font-medium">
                                        {isArabic ? 'إجابات نعم' : 'Yes Responses'}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                                    <div className="flex items-center justify-center mb-2">
                                        <XCircle className="h-5 w-5 text-red-600 mr-1" />
                                        <span className="text-2xl font-bold text-red-600">{results.no_count}</span>
                                    </div>
                                    <div className="text-sm text-gray-700 font-medium">
                                        {isArabic ? 'إجابات لا' : 'No Responses'}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-center mb-2">
                                        <MinusCircle className="h-5 w-5 text-gray-600 mr-1" />
                                        <span className="text-2xl font-bold text-gray-600">{results.na_count}</span>
                                    </div>
                                    <div className="text-sm text-gray-700 font-medium">
                                        {isArabic ? 'غير قابل للتطبيق' : 'Not Applicable'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>
                                    {isArabic ? 'إجمالي المعايير:' : 'Total Criteria:'} {results.total_criteria}
                                </span>
                                <span>
                                    {isArabic ? 'المعايير القابلة للتطبيق:' : 'Applicable Criteria:'} {results.applicable_criteria}
                                </span>
                                <span>
                                    {isArabic ? 'نسبة النجاح:' : 'Success Rate:'} {Math.round((results.yes_count / results.applicable_criteria) * 100)}%
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Domain Results Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            {isArabic ? 'أداء المجالات' : 'Domain Performance'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChart data={domainChartData} height={350} />
                    </CardContent>
                </Card>

                {/* Detailed Domain Results */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Target className="h-6 w-6 text-blue-600" />
                        {isArabic ? 'النتائج التفصيلية' : 'Detailed Results'}
                    </h2>

                    {results.domain_results.map((domain) => (
                        <Card key={domain.domain_id} className="overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">{domain.domain_name}</CardTitle>
                                    <div className="flex items-center gap-3">
                                        <Badge className={`${getScoreBadgeColor(domain.score_percentage)} px-3 py-1`}>
                                            {Math.round(domain.score_percentage)}%
                                        </Badge>
                                        <span className="text-sm text-gray-600">
                                            {domain.applicable_criteria} {isArabic ? 'معايير' : 'criteria'}
                                        </span>
                                    </div>
                                </div>
                                <Progress value={domain.score_percentage} className="h-2 mt-2" />
                            </CardHeader>
                            <CardContent className="pt-6">
                                {/* Domain Statistics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="text-lg font-bold text-gray-900">{domain.total_criteria}</div>
                                        <div className="text-xs text-gray-600">{isArabic ? 'إجمالي المعايير' : 'Total Criteria'}</div>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <div className="text-lg font-bold text-green-600">{domain.yes_count}</div>
                                        <div className="text-xs text-gray-600">{isArabic ? 'نعم' : 'Yes'}</div>
                                    </div>
                                    <div className="text-center p-3 bg-red-50 rounded-lg">
                                        <div className="text-lg font-bold text-red-600">{domain.no_count}</div>
                                        <div className="text-xs text-gray-600">{isArabic ? 'لا' : 'No'}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="text-lg font-bold text-gray-600">{domain.na_count}</div>
                                        <div className="text-xs text-gray-600">{isArabic ? 'غير قابل' : 'N/A'}</div>
                                    </div>
                                </div>

                                {/* Category Breakdown */}
                                {results.category_results[domain.domain_id] && (
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900 border-b pb-2">
                                            {isArabic ? 'تفصيل الفئات' : 'Category Breakdown'}
                                        </h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {results.category_results[domain.domain_id].map((category) => (
                                                <div key={category.category_id} className="p-4 border border-gray-200 rounded-lg bg-white">
                                                    <HorizontalBar
                                                        label={category.category_name}
                                                        value={Math.round(category.score_percentage)}
                                                        maxValue={100}
                                                        color={getScoreColor(category.score_percentage)}
                                                        details={{
                                                            yes: category.yes_count,
                                                            no: category.no_count,
                                                            na: category.na_count
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recommendations */}
                <Card className="border-amber-200 bg-amber-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-800">
                            <TrendingUp className="h-5 w-5" />
                            {isArabic ? 'التوصيات' : 'Recommendations'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {results.domain_results
                                .filter(domain => domain.score_percentage < 70)
                                .sort((a, b) => a.score_percentage - b.score_percentage)
                                .map((domain) => (
                                    <div key={domain.domain_id} className="border-l-4 border-amber-500 pl-4 py-2">
                                        <h4 className="font-medium text-amber-900">{domain.domain_name}</h4>
                                        <p className="text-sm text-amber-800 mt-1">
                                            {isArabic
                                                ? `النتيجة: ${Math.round(domain.score_percentage)}% - يوصى بالتركيز على تحسين العمليات في هذا المجال. لديك ${domain.no_count} معايير تحتاج إلى اهتمام.`
                                                : `Score: ${Math.round(domain.score_percentage)}% - Consider focusing on improving processes in this area. You have ${domain.no_count} criteria that need attention.`
                                            }
                                        </p>
                                    </div>
                                ))}

                            {results.domain_results.every(domain => domain.score_percentage >= 70) && (
                                <div className="border-l-4 border-green-500 pl-4 py-2">
                                    <h4 className="font-medium text-green-900">
                                        {isArabic ? 'أداء ممتاز!' : 'Excellent Performance!'}
                                    </h4>
                                    <p className="text-sm text-green-800 mt-1">
                                        {isArabic
                                            ? 'جميع المجالات تؤدي بشكل جيد. استمر في الحفاظ على هذه المعايير العالية وفكر في مشاركة أفضل الممارسات مع الفرق الأخرى.'
                                            : 'All domains are performing well. Continue maintaining these high standards and consider sharing best practices with other teams.'
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-6">
                    <Link href="/assessment-tools">
                        <Button variant="outline" size="lg" className="px-8">
                            <FileText className="h-4 w-4 mr-2" />
                            {isArabic ? 'تقييم جديد' : 'New Assessment'}
                        </Button>
                    </Link>
                    <Link href={route('assessments.index')}>
                        <Button size="lg" className="px-8">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            {isArabic ? 'عرض جميع التقييمات' : 'View All Assessments'}
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
