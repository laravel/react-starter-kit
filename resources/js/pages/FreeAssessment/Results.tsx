import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    BarChart3,
    Award,
    Crown,
    CheckCircle,
    XCircle,
    MinusCircle,
    Edit,
    Download,
    Star,
    TrendingUp,
    Users,
    Calendar,
    Lock,
    Zap,
    ArrowRight,
    FileText,
    Target,
    Sparkles
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
    const isArabic = locale === 'ar';

    const editAssessment = () => {
        router.get(route('free-assessment.edit', assessment.id));
    };

    const downloadPDF = () => {
        window.open(route('free-assessment.pdf', assessment.id), '_blank');
    };

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
        if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getScoreIcon = (percentage: number) => {
        if (percentage >= 80) return <Award className="w-6 h-6 text-green-600" />;
        if (percentage >= 60) return <Star className="w-6 h-6 text-yellow-600" />;
        return <Target className="w-6 h-6 text-red-600" />;
    };

    const getOverallGrade = (score: number) => {
        if (score >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50' };
        if (score >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
        if (score >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
        if (score >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
        return { grade: 'D', color: 'text-red-600', bg: 'bg-red-50' };
    };

    const overallGrade = getOverallGrade(assessment.overall_score);

    return (
        <>
            <Head title={`Assessment Results - ${assessment.tool.name_en}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>

                {/* Header */}
                <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200/50 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center space-x-6">
                                <img
                                    src="/storage/logo.svg"
                                    alt="FAQ Logo"
                                    className="bg-transparent h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                                />
                                <div className="h-8 w-px bg-gray-300"></div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{user.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                                    <Award className="w-4 h-4 mr-2" />
                                    Free Plan
                                </Badge>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">

                        {/* Congratulations Banner */}
                        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden">
                            <CardContent className="relative p-8 md:p-12">
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                                            <Award className="w-10 h-10" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Congratulations!</h2>
                                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                                        You've successfully completed your assessment. Here are your results and insights.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <div className="text-3xl font-bold mb-1">{Math.round(assessment.overall_score)}%</div>
                                            <div className="text-green-100">Overall Score</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <div className={`text-3xl font-bold mb-1 ${overallGrade.color}`}>{overallGrade.grade}</div>
                                            <div className="text-green-100">Grade</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <div className="text-3xl font-bold mb-1">{statistics.total_questions}</div>
                                            <div className="text-green-100">Questions Answered</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <div className="flex items-center justify-center mb-3">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-green-600 mb-1">{statistics.yes_answers}</div>
                                    <div className="text-sm text-gray-600">Yes Answers</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <div className="flex items-center justify-center mb-3">
                                        <XCircle className="w-8 h-8 text-red-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-red-600 mb-1">{statistics.no_answers}</div>
                                    <div className="text-sm text-gray-600">No Answers</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <div className="flex items-center justify-center mb-3">
                                        <MinusCircle className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-600 mb-1">{statistics.na_answers}</div>
                                    <div className="text-sm text-gray-600">N/A Answers</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <div className="flex items-center justify-center mb-3">
                                        <Calendar className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600 mb-1">
                                        {new Date(assessment.completed_at).toLocaleDateString()}
                                    </div>
                                    <div className="text-sm text-gray-600">Completed</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Domain Scores */}
                        <Card className="mb-8 border-0 shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <BarChart3 className="w-6 h-6 text-blue-600" />
                                    Domain Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {domainScores.map((domain, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                {getScoreIcon(domain.percentage)}
                                                <h3 className="font-semibold text-gray-900">{domain.domain_name}</h3>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full border ${getScoreColor(domain.percentage)}`}>
                                                <span className="font-medium">{Math.round(domain.percentage)}%</span>
                                            </div>
                                        </div>
                                        <Progress value={domain.percentage} className="h-3" />
                                        <div className="text-sm text-gray-600">
                                            Score: {domain.score} / {domain.max_score}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <Edit className="w-12 h-12 text-blue-600 mx-auto" />
                                        <h3 className="text-xl font-semibold text-gray-900">Edit Assessment</h3>
                                        <p className="text-gray-600">
                                            Update your responses and see how your results change.
                                        </p>
                                        {canEdit && (
                                            <Button onClick={editAssessment} className="w-full bg-blue-600 hover:bg-blue-700">
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit Assessment
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <Download className="w-12 h-12 text-green-600 mx-auto" />
                                        <h3 className="text-xl font-semibold text-gray-900">Download Report</h3>
                                        <p className="text-gray-600">
                                            Get a PDF summary of your assessment results.
                                        </p>
                                        <Button onClick={downloadPDF} className="w-full bg-green-600 hover:bg-green-700">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download PDF
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <Crown className="w-12 h-12 text-purple-600 mx-auto" />
                                        <h3 className="text-xl font-semibold text-gray-900">Upgrade to Premium</h3>
                                        <p className="text-gray-600">
                                            Get detailed analytics, benchmarking, and comprehensive reports.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                                        >
                                            <Crown className="w-4 h-4 mr-2" />
                                            Upgrade Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Premium Features Preview */}
                        <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-blue-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-purple-600" />
                                    Premium Features Available
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                        <div className="relative">
                                            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                            <Lock className="w-4 h-4 text-gray-400 absolute -top-1 -right-1" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h4>
                                        <p className="text-sm text-gray-600">Detailed insights and trend analysis</p>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                        <div className="relative">
                                            <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                            <Lock className="w-4 h-4 text-gray-400 absolute -top-1 -right-1" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Benchmarking</h4>
                                        <p className="text-sm text-gray-600">Compare with industry standards</p>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                        <div className="relative">
                                            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                            <Lock className="w-4 h-4 text-gray-400 absolute -top-1 -right-1" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">PDF Reports</h4>
                                        <p className="text-sm text-gray-600">Comprehensive downloadable reports</p>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                                        <div className="relative">
                                            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                            <Lock className="w-4 h-4 text-gray-400 absolute -top-1 -right-1" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Action Plans</h4>
                                        <p className="text-sm text-gray-600">Detailed improvement roadmaps</p>
                                    </div>
                                </div>

                                <div className="text-center mt-8">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                                    >
                                        <Crown className="w-5 h-5 mr-3" />
                                        Unlock Premium Features
                                        <ArrowRight className="w-5 h-5 ml-3" />
                                    </Button>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Starting from $29/month • Cancel anytime
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Footer Actions */}
                        <div className="mt-12 text-center">
                            <Link href={route('free-assessment.index')}>
                                <Button variant="outline" size="lg" className="mr-4">
                                    Back to Assessment Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
