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
    Building
} from 'lucide-react';
import PDFGeneratorComponent from '@/components/PDFGeneratorComponent';

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

// Enhanced ApexChart Component for Yes/No/NA Stacked Bars
interface ApexStackedBarChartProps {
    data: Array<{
        name: string;
        yes: number;
        no: number;
        na: number;
    }>;
    height?: number;
    isArabic?: boolean;
    title?: string;
}

const ApexStackedBarChart: React.FC<ApexStackedBarChartProps> = ({
                                                                     data,
                                                                     height = 400,
                                                                     isArabic = false,
                                                                     title = ''
                                                                 }) => {
    const [chartLoaded, setChartLoaded] = useState(false);
    const chartRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadApexCharts = async () => {
            if (typeof window !== 'undefined' && !ApexCharts) {
                try {
                    const apexModule = await import('apexcharts');
                    ApexCharts = apexModule.default;
                    setChartLoaded(true);
                } catch (error) {
                    console.error('Failed to load ApexCharts:', error);
                }
            } else if (ApexCharts) {
                setChartLoaded(true);
            }
        };

        loadApexCharts();
    }, []);

    useEffect(() => {
        if (chartLoaded && ApexCharts && chartRef.current) {
            const chartOptions = {
                chart: {
                    type: 'bar',
                    height: height,
                    stacked: true,
                    toolbar: {
                        show: false,
                    },
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '70%',
                        endingShape: 'rounded',
                        borderRadius: 4,
                    },
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val: number) {
                        return val > 0 ? val.toString() : '';
                    },
                    style: {
                        fontSize: '11px',
                        fontWeight: 'bold',
                        colors: ['#ffffff'],
                    },
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: data.map(item => item.name),
                    labels: {
                        style: {
                            fontSize: '12px',
                            fontWeight: '500',
                        },
                        maxHeight: 60,
                    },
                },
                yaxis: {
                    title: {
                        text: isArabic ? 'عدد المعايير' : 'Number of Criteria',
                        style: {
                            fontSize: '14px',
                            fontWeight: '600',
                        },
                    },
                    labels: {
                        formatter: function (val: number) {
                            return Math.round(val).toString();
                        },
                    },
                },
                fill: {
                    colors: ['#22c55e', '#ef4444', '#6b7280'],
                    opacity: 0.9,
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'center',
                    fontSize: '12px',
                    markers: {
                        width: 12,
                        height: 12,
                        radius: 12,
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (val: number, { seriesIndex }: any) {
                            const types = ['Yes', 'No', 'N/A'];
                            const typesAr = ['نعم', 'لا', 'غير قابل'];
                            const type = isArabic ? typesAr[seriesIndex] : types[seriesIndex];
                            return `${type}: ${val}`;
                        },
                    },
                    style: {
                        fontSize: '12px',
                    },
                },
                grid: {
                    borderColor: '#f1f5f9',
                    strokeDashArray: 4,
                },
                colors: ['#22c55e', '#ef4444', '#6b7280'],
            };

            const series = [
                {
                    name: isArabic ? 'نعم' : 'Yes',
                    data: data.map(item => item.yes),
                },
                {
                    name: isArabic ? 'لا' : 'No',
                    data: data.map(item => item.no),
                },
                {
                    name: isArabic ? 'غير قابل' : 'N/A',
                    data: data.map(item => item.na),
                },
            ];

            const chart = new ApexCharts(chartRef.current, {
                ...chartOptions,
                series: series,
            });

            chart.render();

            return () => {
                if (chart) {
                    chart.destroy();
                }
            };
        }
    }, [chartLoaded, data, height, isArabic]);

    if (!chartLoaded) {
        return (
            <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading chart...</p>
                </div>
            </div>
        );
    }

    return <div ref={chartRef} className="w-full" />;
};

// Simple Stacked Bar Chart Fallback
const SimpleStackedBarChart: React.FC<ApexStackedBarChartProps> = ({ data, height = 400, isArabic = false }) => {
    const maxTotal = Math.max(...data.map(d => d.yes + d.no + d.na));

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <div className="flex items-end justify-between h-full gap-2 p-4">
                {data.map((item, index) => {
                    const total = item.yes + item.no + item.na;
                    const yesHeight = total > 0 ? (item.yes / total) * 100 : 0;
                    const noHeight = total > 0 ? (item.no / total) * 100 : 0;
                    const naHeight = total > 0 ? (item.na / total) * 100 : 0;
                    const barHeight = (total / maxTotal) * 80;

                    return (
                        <div key={index} className="flex flex-col items-center flex-1">
                            {/* Total count label */}
                            <div className="text-sm font-medium text-gray-900 mb-2">
                                {total}
                            </div>

                            {/* Stacked Bar */}
                            <div
                                className="w-full rounded-md transition-all duration-500 ease-out relative group overflow-hidden"
                                style={{
                                    height: `${Math.max(barHeight, 20)}%`,
                                    minHeight: '20px'
                                }}
                            >
                                {/* Yes section */}
                                {item.yes > 0 && (
                                    <div
                                        className="w-full bg-green-500"
                                        style={{ height: `${yesHeight}%` }}
                                        title={`${isArabic ? 'نعم' : 'Yes'}: ${item.yes}`}
                                    />
                                )}

                                {/* No section */}
                                {item.no > 0 && (
                                    <div
                                        className="w-full bg-red-500"
                                        style={{ height: `${noHeight}%` }}
                                        title={`${isArabic ? 'لا' : 'No'}: ${item.no}`}
                                    />
                                )}

                                {/* N/A section */}
                                {item.na > 0 && (
                                    <div
                                        className="w-full bg-gray-500"
                                        style={{ height: `${naHeight}%` }}
                                        title={`${isArabic ? 'غير قابل' : 'N/A'}: ${item.na}`}
                                    />
                                )}

                                {/* Hover tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                    <div>{item.name}</div>
                                    <div className="text-green-300">✓{item.yes}</div>
                                    <div className="text-red-300">✗{item.no}</div>
                                    <div className="text-gray-300">○{item.na}</div>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="text-xs text-gray-600 text-center mt-2 leading-tight">
                                {item.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>{isArabic ? 'نعم' : 'Yes'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>{isArabic ? 'لا' : 'No'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-500 rounded"></div>
                    <span>{isArabic ? 'غير قابل' : 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

// Overall Count Chart Component
interface OverallCountChartProps {
    yesCount: number;
    noCount: number;
    naCount: number;
    isArabic?: boolean;
}

const OverallCountChart: React.FC<OverallCountChartProps> = ({
                                                                 yesCount,
                                                                 noCount,
                                                                 naCount,
                                                                 isArabic = false
                                                             }) => {
    const total = yesCount + noCount + naCount;
    const maxCount = Math.max(yesCount, noCount, naCount);

    return (
        <div className="w-full h-64">
            <div className="flex items-end justify-center h-full gap-8 p-4">
                {/* Yes Bar */}
                <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-gray-900 mb-2">
                        {yesCount}
                    </div>
                    <div
                        className="w-16 bg-green-500 rounded-t-lg transition-all duration-700 ease-out flex items-end justify-center text-white font-bold"
                        style={{
                            height: `${maxCount > 0 ? (yesCount / maxCount) * 80 : 0}%`,
                            minHeight: yesCount > 0 ? '30px' : '0px'
                        }}
                    >
                        {yesCount > 0 && (
                            <div className="pb-2 text-sm">
                                {Math.round((yesCount / total) * 100)}%
                            </div>
                        )}
                    </div>
                    <div className="text-sm font-medium text-green-700 mt-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {isArabic ? 'نعم' : 'Yes'}
                    </div>
                </div>

                {/* No Bar */}
                <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-gray-900 mb-2">
                        {noCount}
                    </div>
                    <div
                        className="w-16 bg-red-500 rounded-t-lg transition-all duration-700 ease-out flex items-end justify-center text-white font-bold"
                        style={{
                            height: `${maxCount > 0 ? (noCount / maxCount) * 80 : 0}%`,
                            minHeight: noCount > 0 ? '30px' : '0px'
                        }}
                    >
                        {noCount > 0 && (
                            <div className="pb-2 text-sm">
                                {Math.round((noCount / total) * 100)}%
                            </div>
                        )}
                    </div>
                    <div className="text-sm font-medium text-red-700 mt-2 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {isArabic ? 'لا' : 'No'}
                    </div>
                </div>

                {/* N/A Bar */}
                <div className="flex flex-col items-center">
                    <div className="text-lg font-bold text-gray-900 mb-2">
                        {naCount}
                    </div>
                    <div
                        className="w-16 bg-gray-500 rounded-t-lg transition-all duration-700 ease-out flex items-end justify-center text-white font-bold"
                        style={{
                            height: `${maxCount > 0 ? (naCount / maxCount) * 80 : 0}%`,
                            minHeight: naCount > 0 ? '30px' : '0px'
                        }}
                    >
                        {naCount > 0 && (
                            <div className="pb-2 text-sm">
                                {Math.round((naCount / total) * 100)}%
                            </div>
                        )}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mt-2 flex items-center">
                        <MinusCircle className="w-4 h-4 mr-1" />
                        {isArabic ? 'غير قابل' : 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Horizontal Bar Component for Categories (keeping existing)
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
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">{label}</span>
                <span className="text-lg font-bold" style={{ color }}>{Math.round(value)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                    className="h-4 rounded-full transition-all duration-700 ease-out shadow-sm"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                    }}
                />
            </div>
            {details && (
                <div className="flex justify-between text-sm text-gray-600 bg-gray-50 rounded px-3 py-2">
                    <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        {details.yes} Yes
                    </span>
                    <span className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-600 mr-1" />
                        {details.no} No
                    </span>
                    <span className="flex items-center">
                        <MinusCircle className="w-4 h-4 text-gray-600 mr-1" />
                        {details.na} N/A
                    </span>
                </div>
            )}
        </div>
    );
};

interface AssessmentResultsProps {
    assessment: {
        id: number;
        name: string;
        email: string;
        organization?: string;
        status: string;
        created_at: string;
        completed_at?: string;
        tool: {
            id: number;
            name_en: string;
            name_ar: string;
        };
    };
    results: {
        overall_percentage: number;
        yes_count: number;
        no_count: number;
        na_count: number;
        domain_results: any[];
        category_results?: any;
        total_criteria: number;
        applicable_criteria: number;
    };
    locale?: string;
    isGuest?: boolean;
}

export default function AssessmentResults({
                                              assessment,
                                              results,
                                              locale = 'en',
                                              isGuest = false
                                          }: AssessmentResultsProps) {
    const isArabic = locale === 'ar';
    const [useApexCharts, setUseApexCharts] = useState(true);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assessment Tools',
            href: '/assessment-tools',
        },
        {
            title: isArabic ? 'النتائج' : 'Results',
            href: `/assessment/${assessment.id}/results`,
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

    // Prepare domain chart data for Yes/No/NA counts
    const domainChartData = results.domain_results.map((domain) => ({
        name: domain.domain_name.length > 15 ?
            domain.domain_name.substring(0, 15) + '...' :
            domain.domain_name,
        yes: domain.yes_count,
        no: domain.no_count,
        na: domain.na_count,
    }));

    // Prepare category chart data
    const getCategoryChartData = (domainId: number) => {
        if (!results.category_results[domainId]) return [];

        return results.category_results[domainId].map((category) => ({
            name: category.category_name.length > 15 ?
                category.category_name.substring(0, 15) + '...' :
                category.category_name,
            yes: category.yes_count,
            no: category.no_count,
            na: category.na_count,
        }));
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCompletionText = (): string => {
        if (assessment.completed_at) {
            return isArabic ? `اكتمل في ${formatDate(assessment.completed_at)}` : `Completed on ${formatDate(assessment.completed_at)}`;
        }
        return isArabic ? `تم الإنشاء في ${formatDate(assessment.created_at)}` : `Created on ${formatDate(assessment.created_at)}`;
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
                                {assessment.name}
                            </div>
                            {assessment.organization && (
                                <div className="flex items-center gap-1">
                                    <Building className="h-4 w-4" />
                                    {assessment.organization}
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {getCompletionText()}
                            </div>
                            <Badge className={`${assessment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {assessment.status === 'completed' ? (isArabic ? 'مكتمل' : 'Completed') : (isArabic ? 'قيد المعالجة' : 'Processing')}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            {isArabic ? 'مشاركة' : 'Share'}
                        </Button>
                    </div>
                </div>

                {/* Success Message */}
                <Card className="border-green-200 bg-green-50">
                    <CardContent className="flex items-center gap-3 p-4">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                            <p className="text-green-800 font-medium">
                                {isArabic
                                    ? 'تم إرسال التقييم بنجاح! يمكنك مراجعة النتائج أدناه.'
                                    : 'Assessment submitted successfully! You can review your results below.'
                                }
                            </p>
                            {assessment.completed_at && (
                                <p className="text-green-700 text-sm mt-1">
                                    {isArabic
                                        ? `تم الانتهاء في ${formatDate(assessment.completed_at)}`
                                        : `Completed on ${formatDate(assessment.completed_at)}`
                                    }
                                </p>
                            )}
                        </div>
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

                {/* Overall Count Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            {isArabic ? 'إجمالي الإجابات' : 'Overall Response Count'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OverallCountChart
                            yesCount={results.yes_count}
                            noCount={results.no_count}
                            naCount={results.na_count}
                            isArabic={isArabic}
                        />
                    </CardContent>
                </Card>

                {/* Domain Results Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-blue-600" />
                                {isArabic ? 'أداء المجالات - عدد الإجابات' : 'Domain Performance - Response Count'}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setUseApexCharts(!useApexCharts)}
                            >
                                {useApexCharts ? 'Simple Chart' : 'Advanced Chart'}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {useApexCharts ? (
                            <ApexStackedBarChart
                                data={domainChartData}
                                height={400}
                                isArabic={isArabic}
                                title={isArabic ? 'أداء المجالات' : 'Domain Performance'}
                            />
                        ) : (
                            <SimpleStackedBarChart
                                data={domainChartData}
                                height={400}
                                isArabic={isArabic}
                            />
                        )}
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

                                {/* Category Breakdown Chart */}
                                {results.category_results[domain.domain_id] && getCategoryChartData(domain.domain_id).length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900 border-b pb-2">
                                            {isArabic ? 'تفصيل الفئات - عدد الإجابات' : 'Category Breakdown - Response Count'}
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            {useApexCharts ? (
                                                <ApexStackedBarChart
                                                    data={getCategoryChartData(domain.domain_id)}
                                                    height={300}
                                                    isArabic={isArabic}
                                                    title={`${domain.domain_name} - ${isArabic ? 'الفئات' : 'Categories'}`}
                                                />
                                            ) : (
                                                <SimpleStackedBarChart
                                                    data={getCategoryChartData(domain.domain_id)}
                                                    height={300}
                                                    isArabic={isArabic}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Category Breakdown - Horizontal Bars */}
                                {results.category_results[domain.domain_id] && (
                                    <div className="space-y-4 mt-6">
                                        <h4 className="font-medium text-gray-900 border-b pb-2">
                                            {isArabic ? 'تفصيل الفئات - النسب المئوية' : 'Category Breakdown - Percentages'}
                                        </h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {results.category_results[domain.domain_id].map((category) => (
                                                <div key={category.category_id} className="p-4 border border-gray-200 rounded-lg bg-white">
                                                    <HorizontalBar
                                                        label={category.category_name}
                                                        value={category.score_percentage}
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

                {/* PDF Generator Component */}
                <PDFGeneratorComponent
                    assessment={assessment}
                    locale={locale}
                    isGuest={false}
                    results={results}
                />

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
