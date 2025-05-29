import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Target,
    Clock,
    BarChart3,
    Users,
    Crown,
    Shield,
    AlertTriangle,
    CheckCircle,
    Star,
    TrendingUp,
    FileText,
    Play,
    Lock,
    Zap,
    ArrowRight,
    Award,
    Calendar,
    LogOut,
    User,
    Building,
    Settings,
    ChevronDown,
    Menu,
    X,
    Download,
    Eye,
    ArrowLeft,
    XCircle,
    MinusCircle,
    Info
} from 'lucide-react';

interface Assessment {
    id: number;
    title_en: string;
    title_ar: string;
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
    };
    name: string;
    email: string;
    organization?: string;
    status: string;
    created_at: string;
    completed_at?: string;
}

interface Results {
    overall_percentage: number;
    total_criteria: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    domain_results: Array<{
        domain_id: number;
        domain_name: string;
        score_percentage: number;
        total_criteria: number;
        applicable_criteria: number;
        yes_count: number;
        no_count: number;
        na_count: number;
    }>;
}

interface UserAccess {
    is_premium: boolean;
    pdf_report_level: string;
    can_access_advanced_features: boolean;
    subscription_status: string;
}

interface FreeUserResultsProps {
    assessment: Assessment;
    results: Results;
    userAccess: UserAccess;
    locale: string;
}

export default function FreeUserResults({ assessment, results, userAccess, locale }: FreeUserResultsProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const isArabic = locale === 'ar';

    const getName = (item: { name_en: string; name_ar: string }): string => {
        return isArabic ? item.name_ar : item.name_en;
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-emerald-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 40) return 'text-amber-600';
        return 'text-red-600';
    };

    const getScoreColorClass = (score: number): string => {
        if (score >= 80) return 'from-emerald-500 to-emerald-600';
        if (score >= 60) return 'from-blue-500 to-blue-600';
        if (score >= 40) return 'from-amber-500 to-amber-600';
        return 'from-red-500 to-red-600';
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

    return (
        <>
            <Head title={`Results - ${getName(assessment.tool)}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo and Back */}
                            <div className="flex items-center space-x-4">
                                <Link href="/assessments">
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Assessments
                                    </Button>
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">{getName(assessment.tool)}</h1>
                                        <div className="flex items-center space-x-2">
                                            <Badge className="bg-blue-100 text-blue-800">
                                                <Shield className="w-3 h-3 mr-1" />
                                                Free Plan Results
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-4">
                                <Link href="/subscription">
                                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                        <Crown className="w-4 h-4 mr-2" />
                                        Upgrade for Full Analysis
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Success Banner */}
                        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold mb-2">🎉 Assessment Complete!</h2>
                                            <p className="text-emerald-100 text-lg">
                                                Your assessment has been completed and basic results are ready.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold">{Math.round(results.overall_percentage)}%</div>
                                        <div className="text-emerald-100">Overall Score</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Results Section */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Basic Score Overview */}
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <Award className="w-6 h-6 text-blue-600" />
                                            Your Assessment Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Score Circle */}
                                            <div className="text-center">
                                                <div className="relative w-32 h-32 mx-auto mb-4">
                                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getScoreColorClass(results.overall_percentage)} flex items-center justify-center text-white`}>
                                                        <div>
                                                            <div className="text-3xl font-bold">{Math.round(results.overall_percentage)}%</div>
                                                            <div className="text-sm opacity-90">Score</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">
                                                    {getScoreLevel(results.overall_percentage)}
                                                </Badge>
                                            </div>

                                            {/* Stats */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                                        <span className="font-medium">Yes Responses</span>
                                                    </div>
                                                    <span className="text-xl font-bold text-green-600">{results.yes_count}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <XCircle className="w-5 h-5 text-red-600 mr-3" />
                                                        <span className="font-medium">No Responses</span>
                                                    </div>
                                                    <span className="text-xl font-bold text-red-600">{results.no_count}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <MinusCircle className="w-5 h-5 text-gray-600 mr-3" />
                                                        <span className="font-medium">Not Applicable</span>
                                                    </div>
                                                    <span className="text-xl font-bold text-gray-600">{results.na_count}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">{results.total_criteria}</div>
                                                    <div className="text-sm text-gray-600">Total Questions</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-blue-600">{results.applicable_criteria}</div>
                                                    <div className="text-sm text-gray-600">Applicable</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-purple-600">{results.domain_results.length}</div>
                                                    <div className="text-sm text-gray-600">Domains</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Domain Results - Limited for Free Users */}
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center gap-3">
                                                <BarChart3 className="w-6 h-6 text-blue-600" />
                                                Domain Overview
                                            </CardTitle>
                                            <Badge className="bg-amber-100 text-amber-800">
                                                <Lock className="w-3 h-3 mr-1" />
                                                Limited View
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {results.domain_results.slice(0, 3).map((domain, index) => (
                                                <div key={domain.domain_id} className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold text-gray-900">{domain.domain_name}</h4>
                                                        <span className={`text-lg font-bold ${getScoreColor(domain.score_percentage)}`}>
                                                            {Math.round(domain.score_percentage)}%
                                                        </span>
                                                    </div>
                                                    <Progress value={domain.score_percentage} className="h-2 mb-2" />
                                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                                                        <div className="text-center">
                                                            <div className="font-bold text-green-600">{domain.yes_count}</div>
                                                            <div>Yes</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="font-bold text-red-600">{domain.no_count}</div>
                                                            <div>No</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="font-bold text-gray-600">{domain.na_count}</div>
                                                            <div>N/A</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {results.domain_results.length > 3 && (
                                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                                    <div className="text-center">
                                                        <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                                        <h4 className="font-semibold text-purple-900 mb-1">
                                                            {results.domain_results.length - 3} More Domains Available
                                                        </h4>
                                                        <p className="text-sm text-purple-700 mb-3">
                                                            Unlock detailed analysis for all domains with premium access
                                                        </p>
                                                        <Link href="/subscription">
                                                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                                                <Crown className="w-3 h-3 mr-1" />
                                                                Upgrade Now
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Basic Recommendations */}
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <TrendingUp className="w-6 h-6 text-green-600" />
                                            Basic Recommendations
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {results.overall_percentage < 60 && (
                                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                                    <div className="flex items-start space-x-3">
                                                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                                                        <div>
                                                            <h4 className="font-semibold text-red-900">Priority Areas Need Attention</h4>
                                                            <p className="text-red-700 text-sm mt-1">
                                                                Your current score indicates significant areas for improvement.
                                                                Consider developing a comprehensive improvement plan.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {results.overall_percentage >= 60 && results.overall_percentage < 80 && (
                                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                                    <div className="flex items-start space-x-3">
                                                        <Star className="w-5 h-5 text-amber-600 mt-0.5" />
                                                        <div>
                                                            <h4 className="font-semibold text-amber-900">Good Foundation, Room for Growth</h4>
                                                            <p className="text-amber-700 text-sm mt-1">
                                                                You have solid foundations but can achieve excellence with targeted improvements.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {results.overall_percentage >= 80 && (
                                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                    <div className="flex items-start space-x-3">
                                                        <Award className="w-5 h-5 text-green-600 mt-0.5" />
                                                        <div>
                                                            <h4 className="font-semibold text-green-900">Excellent Performance</h4>
                                                            <p className="text-green-700 text-sm mt-1">
                                                                Great job! Maintain current standards and look for opportunities for continuous improvement.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <div className="flex items-start space-x-3">
                                                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-blue-900">Want Detailed Recommendations?</h4>
                                                        <p className="text-blue-700 text-sm mt-1">
                                                            Upgrade to premium for AI-powered insights, detailed action plans, and personalized recommendations.
                                                        </p>
                                                        <Link href="/subscription">
                                                            <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                                                                <Crown className="w-3 h-3 mr-1" />
                                                                View Premium Features
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar - Upgrade CTA */}
                            <div className="space-y-6">
                                {/* Assessment Info */}
                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-600" />
                                            Assessment Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Assessor:</span>
                                            <span className="font-medium">{assessment.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="font-medium text-sm">{assessment.email}</span>
                                        </div>
                                        {assessment.organization && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Organization:</span>
                                                <span className="font-medium">{assessment.organization}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Completed:</span>
                                            <span className="font-medium text-sm">{formatDate(assessment.completed_at || assessment.created_at)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">ID:</span>
                                            <span className="font-mono text-sm">#{assessment.id}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* PDF Download - Basic */}
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                    <CardContent className="p-6">
                                        <div className="text-center space-y-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                                                <Download className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold">Download Basic Report</h3>
                                            <p className="text-blue-100">
                                                Get a PDF summary of your assessment results with pass/fail status.
                                            </p>
                                            <Link href={route('assessments.free-report.download', assessment.id)}>
                                                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download PDF Report
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Premium Upgrade CTA */}
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-600 to-green-600 text-white">
                                    <CardContent className="p-6">
                                        <div className="text-center space-y-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                                                <Crown className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold">Unlock Full Analysis</h3>
                                            <p className="text-emerald-100">
                                                Get detailed insights, comprehensive reports, and actionable recommendations.
                                            </p>
                                            <Link href="/subscription">
                                                <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50">
                                                    <Crown className="w-4 h-4 mr-2" />
                                                    Upgrade to Premium
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Features Preview */}
                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-center">Premium Features</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                                <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">Detailed Analytics</div>
                                                    <div className="text-xs text-gray-600">All domain breakdowns</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                                <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">AI Recommendations</div>
                                                    <div className="text-xs text-gray-600">Personalized action plans</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                                <FileText className="w-5 h-5 text-purple-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">Comprehensive Reports</div>
                                                    <div className="text-xs text-gray-600">Detailed PDF exports</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                                                <Target className="w-5 h-5 text-orange-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">Progress Tracking</div>
                                                    <div className="text-xs text-gray-600">Monitor improvements</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 pt-8">
                            <Link href="/assessments">
                                <Button variant="outline" size="lg" className="px-8">
                                    <FileText className="h-4 w-4 mr-2" />
                                    View All Assessments
                                </Button>
                            </Link>
                            <Link href="/assessment-tools">
                                <Button variant="outline" size="lg" className="px-8">
                                    <Target className="h-4 w-4 mr-2" />
                                    Take Another Assessment
                                </Button>
                            </Link>
                            <Link href="/subscription">
                                <Button size="lg" className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    <Crown className="h-4 w-4 mr-2" />
                                    Upgrade to Premium
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 mt-16">
                    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-gray-500">
                            <p>&copy; 2024 Assessment Hub. All rights reserved.</p>
                            <div className="mt-2 space-x-4">
                                <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
                                <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
                                <Link href="/support" className="hover:text-gray-700">Support</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
