import AssessmentHeader from '@/components/assessment-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/use-language';
import { Head, Link } from '@inertiajs/react';
import { Award, BarChart3, Crown, Download, Edit, Share2, Star, Target } from 'lucide-react';

interface Assessment {
    id: number;
    name: string;
    organization: string;
    completed_at: string;
    overall_score: number;
    tool: {
        name_en: string;
        name_ar: string;
    };
}

interface Statistics {
    total_questions: number;
    yes_answers: number;
    no_answers: number;
    na_answers: number;
    completion_rate: number;
}

interface DomainScore {
    domain_name: string;
    score: number;
    max_score: number;
    percentage: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    is_premium: boolean;
}

interface ResultsProps {
    assessment: Assessment;
    statistics: Statistics;
    domainScores: DomainScore[];
    user: User;
    canEdit: boolean;
    locale: string;
}

export default function Results({ assessment, statistics, domainScores, user, canEdit, locale }: ResultsProps) {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const translations = {
        en: {
            results: 'Assessment Results',
            completed: 'Assessment Completed Successfully',
            download: 'Download',
        },
        ar: {
            results: 'نتائج التقييم',
            completed: 'تم إكمال التقييم بنجاح',
            download: 'تحميل',
        },
    } as const;
    const t = translations[language];

    const getScoreGrade = (score: number) => {
        if (score >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
        if (score >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
        if (score >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
        if (score >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        if (score >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
        return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
    };

    const getScoreColorClass = (score: number) => {
        if (score >= 80) return 'from-green-500 to-emerald-600';
        if (score >= 60) return 'from-yellow-500 to-orange-600';
        return 'from-red-500 to-red-600';
    };

    const overallGrade = getScoreGrade(assessment.overall_score);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title={`Assessment Results - ${assessment.name}`} />

            <div
                className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isArabic ? 'rtl' : 'ltr'} print:bg-white`}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <AssessmentHeader
                    title={t.results}
                    userName={user.name}
                    rightContent={
                        <Badge className="bg-blue-100 px-3 py-1 text-xs text-blue-800 print:hidden">
                            <Award className="mr-1 h-3 w-3" />
                            Free Plan
                        </Badge>
                    }
                />

                {/* OPTIMIZED: Single Container with Grid Layout */}
                <div className="px-4 py-6 sm:px-6 lg:px-8">
                    {' '}
                    {/* Reduced padding */}
                    <div className="mx-auto max-w-7xl">
                        {/* OPTIMIZED: Compact Congratulations Banner */}
                        <Card className="mb-6 border-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl print:shadow-none">
                            {' '}
                            {/* Reduced margin */}
                            <CardContent className="p-6">
                                {' '}
                                {/* Reduced padding */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                                            {' '}
                                            {/* Reduced size */}
                                            <Award className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="mb-1 text-2xl font-bold">{t.completed}</h2>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">{Math.round(assessment.overall_score)}%</div> {/* Reduced text size */}
                                        <div className="text-sm text-green-100">Overall Score</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* OPTIMIZED: Two-Column Layout */}
                        <div className="grid gap-6 lg:grid-cols-3 print:grid-cols-1">
                            {' '}
                            {/* Reduced gap */}
                            {/* OPTIMIZED: Main Results Section - Compact */}
                            <div className="space-y-6 lg:col-span-2">
                                {' '}
                                {/* Reduced spacing */}
                                {/* Score Overview */}
                                <Card className="border-0 shadow-xl print:shadow-none">
                                    <CardHeader className="pb-3">
                                        {' '}
                                        {/* Reduced padding */}
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            {' '}
                                            {/* Reduced text size */}
                                            <BarChart3 className="h-5 w-5 text-blue-600" />
                                            Assessment Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            {' '}
                                            {/* Reduced gap */}
                                            {/* Score Circle - Compact */}
                                            <div className="text-center">
                                                <div
                                                    className={`h-20 w-20 rounded-full bg-gradient-to-r ${getScoreColorClass(assessment.overall_score)} mx-auto mb-3 flex items-center justify-center text-white`}
                                                >
                                                    {' '}
                                                    {/* Reduced size */}
                                                    <div>
                                                        <div className="text-xl font-bold">{Math.round(assessment.overall_score)}%</div>{' '}
                                                        {/* Reduced text size */}
                                                        <div className="text-xs opacity-90">Score</div>
                                                    </div>
                                                </div>
                                                <Badge className={`${overallGrade.bg} ${overallGrade.color} px-3 py-1 font-bold`}>
                                                    Grade {overallGrade.grade}
                                                </Badge>
                                            </div>
                                            {/* Statistics - Compact */}
                                            <div className="space-y-2">
                                                {' '}
                                                {/* Reduced spacing */}
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Total Questions:</span>
                                                    <span className="font-semibold">{statistics.total_questions}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Answered Yes:</span>
                                                    <span className="font-semibold text-green-600">{statistics.yes_answers}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Answered No:</span>
                                                    <span className="font-semibold text-red-600">{statistics.no_answers}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Not Applicable:</span>
                                                    <span className="font-semibold text-gray-600">{statistics.na_answers}</span>
                                                </div>
                                            </div>
                                            {/* Assessment Info - Compact */}
                                            <div className="space-y-2">
                                                {' '}
                                                {/* Reduced spacing */}
                                                <div className="text-sm">
                                                    <span className="text-gray-600">Tool:</span>
                                                    <div className="font-semibold text-blue-600">{assessment.tool.name_en}</div>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="text-gray-600">Completed:</span>
                                                    <div className="font-semibold">{formatDate(assessment.completed_at)}</div>
                                                </div>
                                                {assessment.organization && (
                                                    <div className="text-sm">
                                                        <span className="text-gray-600">Organization:</span>
                                                        <div className="font-semibold">{assessment.organization}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                {/* OPTIMIZED: Compact Domain Scores */}
                                <Card className="border-0 shadow-xl print:shadow-none">
                                    <CardHeader className="pb-3">
                                        {' '}
                                        {/* Reduced padding */}
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            {' '}
                                            {/* Reduced text size */}
                                            <Target className="h-5 w-5 text-blue-600" />
                                            Domain Performance
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {' '}
                                            {/* Reduced spacing */}
                                            {domainScores.map((domain, index) => (
                                                <div key={index} className="flex items-center justify-between py-2">
                                                    {' '}
                                                    {/* Reduced padding */}
                                                    <div className="flex-1">
                                                        <div className="mb-1 flex items-center justify-between">
                                                            <span className="text-sm font-medium text-gray-900">{domain.domain_name}</span>{' '}
                                                            {/* Reduced text size */}
                                                            <span className={`text-sm font-bold ${getScoreGrade(domain.score).color}`}>
                                                                {Math.round(domain.score)}%
                                                            </span>
                                                        </div>
                                                        <Progress value={domain.score} className="h-2" /* Reduced height */ />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            {/* OPTIMIZED: Compact Actions Sidebar */}
                            <div className="space-y-6">
                                {' '}
                                {/* Reduced spacing */}
                                {/* Actions Card */}
                                <Card className="border-0 shadow-xl print:hidden">
                                    <CardHeader className="pb-3">
                                        {' '}
                                        {/* Reduced padding */}
                                        <CardTitle className="text-lg">Actions</CardTitle> {/* Reduced text size */}
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {' '}
                                        {/* Reduced spacing */}
                                        {canEdit && (
                                            <Link href={route('free-assessment.edit', assessment.id)}>
                                                <Button className="w-full bg-blue-600 py-2 text-sm hover:bg-blue-700">
                                                    {' '}
                                                    {/* Reduced padding and text size */}
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Assessment
                                                </Button>
                                            </Link>
                                        )}
                                        <Button onClick={() => window.print()} variant="outline" className="w-full py-2 text-sm print:hidden">
                                            <Download className="mr-2 h-4 w-4" />
                                            {t.download}
                                        </Button>
                                        <Button variant="outline" className="w-full py-2 text-sm" /* Reduced padding and text size */>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share Results
                                        </Button>
                                    </CardContent>
                                </Card>
                                {/* Upgrade Prompt */}
                                {!user.is_premium && (
                                    <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl print:hidden">
                                        <CardContent className="p-4">
                                            {' '}
                                            {/* Reduced padding */}
                                            <div className="text-center">
                                                <Crown className="mx-auto mb-3 h-8 w-8" /> {/* Reduced size */}
                                                <h3 className="mb-2 text-lg font-bold">Upgrade to Premium</h3> {/* Reduced text size */}
                                                <p className="mb-4 text-sm text-purple-100">
                                                    {' '}
                                                    {/* Reduced text size */}
                                                    Get detailed analytics, custom reports, and unlimited assessments.
                                                </p>
                                                <Button
                                                    className="w-full bg-white py-2 text-sm text-purple-600 hover:bg-gray-50" /* Reduced padding and text size */
                                                >
                                                    <Star className="mr-2 h-4 w-4" />
                                                    Upgrade Now
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                                {/* Quick Stats */}
                                <Card className="border-0 shadow-xl print:shadow-none">
                                    <CardHeader className="pb-3">
                                        {' '}
                                        {/* Reduced padding */}
                                        <CardTitle className="text-lg">Quick Stats</CardTitle> {/* Reduced text size */}
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {' '}
                                        {/* Reduced spacing */}
                                        <div className="flex items-center justify-between py-1">
                                            {' '}
                                            {/* Reduced padding */}
                                            <span className="text-sm text-gray-600">Completion Rate</span>
                                            <Badge className="bg-green-100 text-xs text-green-800">100%</Badge> {/* Reduced text size */}
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            {' '}
                                            {/* Reduced padding */}
                                            <span className="text-sm text-gray-600">Performance Level</span>
                                            <Badge className={`${overallGrade.bg} ${overallGrade.color} text-xs`}>
                                                {assessment.overall_score >= 80
                                                    ? 'Excellent'
                                                    : assessment.overall_score >= 60
                                                      ? 'Good'
                                                      : 'Needs Improvement'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            {' '}
                                            {/* Reduced padding */}
                                            <span className="text-sm text-gray-600">Assessment Type</span>
                                            <Badge variant="outline" className="text-xs">
                                                Free Plan
                                            </Badge>{' '}
                                            {/* Reduced text size */}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx>{`
                @media print {
                    @page {
                        margin: 0.5in;
                        size: A4;
                    }

                    .print\\:hidden {
                        display: none !important;
                    }

                    .print\\:bg-white {
                        background: white !important;
                    }

                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }

                    .print\\:p-0 {
                        padding: 0 !important;
                    }

                    body {
                        -webkit-print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                }
            `}</style>
        </>
    );
}
