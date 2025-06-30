import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Award,
    Download,
    Edit,
    Users,
    CheckCircle,
    TrendingUp,
    BarChart3,
    Crown,
    FileText,
    Star,
    Target,
    Calendar,
    Share2
} from 'lucide-react';

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
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');
    const isArabic = locale === 'ar';

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
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title={`Assessment Results - ${assessment.name}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isArabic ? 'rtl' : 'ltr'} print:bg-white`} dir={isArabic ? 'rtl' : 'ltr'}>

                {/* OPTIMIZED: Compact Header */}
                <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200/50 print:shadow-none">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16"> {/* Reduced height from h-20 to h-16 */}
                            <div className="flex items-center space-x-4"> {/* Reduced spacing */}
                                <div className="flex items-center space-x-3">
                                    <Award className="w-6 h-6 text-blue-600" /> {/* Reduced icon size */}
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-900">Assessment Results</h1> {/* Reduced text size */}
                                        <div className="flex items-center space-x-2 text-xs text-gray-600"> {/* Reduced text size */}
                                            <Users className="w-3 h-3" />
                                            <span>{user.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 print:hidden"> {/* Reduced spacing */}
                                <Badge className="bg-blue-100 text-blue-800 px-3 py-1 text-xs"> {/* Reduced padding and text size */}
                                    <Award className="w-3 h-3 mr-1" />
                                    Free Plan
                                </Badge>
                            </div>
                        </div>
                    </div>
                </header>

                {/* OPTIMIZED: Single Container with Grid Layout */}
                <div className="py-6 px-4 sm:px-6 lg:px-8"> {/* Reduced padding */}
                    <div className="max-w-7xl mx-auto">

                        {/* OPTIMIZED: Compact Congratulations Banner */}
                        <Card className="mb-6 border-0 shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white print:shadow-none"> {/* Reduced margin */}
                            <CardContent className="p-6"> {/* Reduced padding */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"> {/* Reduced size */}
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1">🎉 Congratulations!</h2> {/* Reduced text size */}
                                            <p className="text-green-100 text-sm">Assessment completed successfully</p> {/* Reduced text size */}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">{Math.round(assessment.overall_score)}%</div> {/* Reduced text size */}
                                        <div className="text-green-100 text-sm">Overall Score</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* OPTIMIZED: Two-Column Layout */}
                        <div className="grid lg:grid-cols-3 gap-6"> {/* Reduced gap */}

                            {/* OPTIMIZED: Main Results Section - Compact */}
                            <div className="lg:col-span-2 space-y-6"> {/* Reduced spacing */}

                                {/* Score Overview */}
                                <Card className="border-0 shadow-xl print:shadow-none">
                                    <CardHeader className="pb-3"> {/* Reduced padding */}
                                        <CardTitle className="flex items-center gap-2 text-lg"> {/* Reduced text size */}
                                            <BarChart3 className="w-5 h-5 text-blue-600" />
                                            Assessment Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4"> {/* Reduced gap */}

                                            {/* Score Circle - Compact */}
                                            <div className="text-center">
                                                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getScoreColorClass(assessment.overall_score)} flex items-center justify-center text-white mx-auto mb-3`}> {/* Reduced size */}
                                                    <div>
                                                        <div className="text-xl font-bold">{Math.round(assessment.overall_score)}%</div> {/* Reduced text size */}
                                                        <div className="text-xs opacity-90">Score</div>
                                                    </div>
                                                </div>
                                                <Badge className={`${overallGrade.bg} ${overallGrade.color} font-bold px-3 py-1`}>
                                                    Grade {overallGrade.grade}
                                                </Badge>
                                            </div>

                                            {/* Statistics - Compact */}
                                            <div className="space-y-2"> {/* Reduced spacing */}
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
                                            <div className="space-y-2"> {/* Reduced spacing */}
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
                                    <CardHeader className="pb-3"> {/* Reduced padding */}
                                        <CardTitle className="flex items-center gap-2 text-lg"> {/* Reduced text size */}
                                            <Target className="w-5 h-5 text-blue-600" />
                                            Domain Performance
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3"> {/* Reduced spacing */}
                                            {domainScores.map((domain, index) => (
                                                <div key={index} className="flex items-center justify-between py-2"> {/* Reduced padding */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm font-medium text-gray-900">{domain.domain_name}</span> {/* Reduced text size */}
                                                            <span className={`text-sm font-bold ${getScoreGrade(domain.score).color}`}>
                                                                {Math.round(domain.score)}%
                                                            </span>
                                                        </div>
                                                        <Progress
                                                            value={domain.score}
                                                            className="h-2" /* Reduced height */
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* OPTIMIZED: Compact Actions Sidebar */}
                            <div className="space-y-6"> {/* Reduced spacing */}

                                {/* Actions Card */}
                                <Card className="border-0 shadow-xl print:hidden">
                                    <CardHeader className="pb-3"> {/* Reduced padding */}
                                        <CardTitle className="text-lg">Actions</CardTitle> {/* Reduced text size */}
                                    </CardHeader>
                                    <CardContent className="space-y-3"> {/* Reduced spacing */}

                                        {canEdit && (
                                            <Link href={route('free-assessment.edit', assessment.id)}>
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm py-2"> {/* Reduced padding and text size */}
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit Assessment
                                                </Button>
                                            </Link>
                                        )}

                                        <Button
                                            onClick={() => window.print()}
                                            variant="outline"
                                            className="w-full text-sm py-2" /* Reduced padding and text size */
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Report
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-full text-sm py-2" /* Reduced padding and text size */
                                        >
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Share Results
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Upgrade Prompt */}
                                {!user.is_premium && (
                                    <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white print:hidden">
                                        <CardContent className="p-4"> {/* Reduced padding */}
                                            <div className="text-center">
                                                <Crown className="w-8 h-8 mx-auto mb-3" /> {/* Reduced size */}
                                                <h3 className="text-lg font-bold mb-2">Upgrade to Premium</h3> {/* Reduced text size */}
                                                <p className="text-purple-100 text-sm mb-4"> {/* Reduced text size */}
                                                    Get detailed analytics, custom reports, and unlimited assessments.
                                                </p>
                                                <Button
                                                    className="w-full bg-white text-purple-600 hover:bg-gray-50 text-sm py-2" /* Reduced padding and text size */
                                                >
                                                    <Star className="w-4 h-4 mr-2" />
                                                    Upgrade Now
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Quick Stats */}
                                <Card className="border-0 shadow-xl print:shadow-none">
                                    <CardHeader className="pb-3"> {/* Reduced padding */}
                                        <CardTitle className="text-lg">Quick Stats</CardTitle> {/* Reduced text size */}
                                    </CardHeader>
                                    <CardContent className="space-y-3"> {/* Reduced spacing */}
                                        <div className="flex items-center justify-between py-1"> {/* Reduced padding */}
                                            <span className="text-sm text-gray-600">Completion Rate</span>
                                            <Badge className="bg-green-100 text-green-800 text-xs">100%</Badge> {/* Reduced text size */}
                                        </div>
                                        <div className="flex items-center justify-between py-1"> {/* Reduced padding */}
                                            <span className="text-sm text-gray-600">Performance Level</span>
                                            <Badge className={`${overallGrade.bg} ${overallGrade.color} text-xs`}>
                                                {assessment.overall_score >= 80 ? 'Excellent' :
                                                    assessment.overall_score >= 60 ? 'Good' : 'Needs Improvement'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between py-1"> {/* Reduced padding */}
                                            <span className="text-sm text-gray-600">Assessment Type</span>
                                            <Badge variant="outline" className="text-xs">Free Plan</Badge> {/* Reduced text size */}
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

                    body {
                        -webkit-print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                }
            `}</style>
        </>
    );
}
