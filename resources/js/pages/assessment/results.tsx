import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CheckCircle, Download, Share2 } from 'lucide-react';

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

interface CategoryResult {
    id: number;
    name_en: string;
    name_ar: string;
    average: number;
    total: number;
    count: number;
    responses: Array<{
        criterion_name_en: string;
        criterion_name_ar: string;
        value: number;
        notes?: string;
    }>;
}

interface DomainResult {
    id: number;
    name_en: string;
    name_ar: string;
    average: number;
    total: number;
    count: number;
    categories: CategoryResult[];
}

interface Results {
    overall: {
        average: number;
        total: number;
        count: number;
    };
    domains: DomainResult[];
}

interface AssessmentResultsProps {
    assessment: AssessmentResult;
    results: Results;
    locale: string;
}

export default function AssessmentResults({ assessment, results, locale }: AssessmentResultsProps) {
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
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreLevel = (score: number): string => {
        if (isArabic) {
            if (score >= 80) return 'ممتاز';
            if (score >= 60) return 'جيد';
            return 'يحتاج تحسين';
        } else {
            if (score >= 80) return 'Excellent';
            if (score >= 60) return 'Good';
            return 'Needs Improvement';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isArabic ? 'نتائج التقييم' : 'Assessment Results'} - ${getName(assessment.tool)}`} />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {isArabic ? 'نتائج التقييم' : 'Assessment Results'}
                        </h1>
                        <p className="text-muted-foreground">
                            {getName(assessment.tool)} • {assessment.guest_name}
                            {assessment.organization && ` • ${assessment.organization}`}
                        </p>
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
                        <p className="text-green-800">
                            {isArabic
                                ? 'تم إرسال التقييم بنجاح! يمكنك مراجعة النتائج أدناه.'
                                : 'Assessment submitted successfully! You can review your results below.'
                            }
                        </p>
                    </CardContent>
                </Card>

                {/* Overall Score */}
                <Card>
                    <CardHeader>
                        <CardTitle>{isArabic ? 'النتيجة الإجمالية' : 'Overall Score'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold">
                                <span className={getScoreColor(results.overall.average)}>
                                    {results.overall.average}%
                                </span>
                            </div>
                            <div className="flex-1">
                                <Progress value={results.overall.average} className="h-3" />
                                <p className="text-sm text-muted-foreground mt-1">
                                    {getScoreLevel(results.overall.average)}
                                </p>
                            </div>
                            <Badge variant="outline">
                                {results.overall.count} {isArabic ? 'معايير' : 'criteria'}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Domain Results */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">
                        {isArabic ? 'النتائج التفصيلية' : 'Detailed Results'}
                    </h2>

                    {results.domains.map((domain) => (
                        <Card key={domain.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>{getName(domain)}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-2xl font-bold ${getScoreColor(domain.average)}`}>
                                            {domain.average}%
                                        </span>
                                        <Badge variant="secondary">
                                            {domain.count} {isArabic ? 'معايير' : 'criteria'}
                                        </Badge>
                                    </div>
                                </div>
                                <Progress value={domain.average} className="h-2" />
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {domain.categories.map((category) => (
                                        <Card key={category.id} className="border-muted">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-medium">{getName(category)}</h4>
                                                    <span className={`font-semibold ${getScoreColor(category.average)}`}>
                                                        {category.average}%
                                                    </span>
                                                </div>
                                                <Progress value={category.average} className="h-1" />
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <div className="space-y-2">
                                                    {category.responses.map((response, index) => (
                                                        <div key={index} className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">
                                                                {isArabic ? response.criterion_name_ar : response.criterion_name_en}
                                                            </span>
                                                            <span className="font-medium">{response.value}%</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <Link href="/assessment-tools">
                        <Button variant="outline">
                            {isArabic ? 'تقييم جديد' : 'New Assessment'}
                        </Button>
                    </Link>
                    <Link href="/assessments">
                        <Button>
                            {isArabic ? 'عرض جميع التقييمات' : 'View All Assessments'}
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
