
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    TrendingUp,
    FileText,
    Crown,
    Gift,
    Download,
    Eye,
    ShoppingCart,
    Star,
    Lock,
    Zap
} from 'lucide-react';

interface AssessmentResult {
    assessment: {
        id: number;
        name: string;
        tool_name: string;
        completed_at: string;
        assessment_type: string;
    };
    summary: {
        total_criteria: number;
        yes_responses: number;
        no_responses: number;
        na_responses: number;
        completion_percentage: number;
        compliance_percentage: number;
    };
    is_free_assessment: boolean;
}

interface Tool {
    id: number;
    name_en: string;
    premium_price: number;
    currency: string;
}

interface Props {
    results: AssessmentResult;
    tools_available: Tool[];
    locale: string;
}

export default function FreeAssessmentResults({ results, tools_available, locale }: Props) {
    const { assessment, summary } = results;

    const getComplianceLevel = (percentage: number) => {
        if (percentage >= 90) return { level: 'Excellent', color: 'green', icon: CheckCircle };
        if (percentage >= 70) return { level: 'Good', color: 'blue', icon: TrendingUp };
        if (percentage >= 50) return { level: 'Fair', color: 'yellow', icon: AlertTriangle };
        return { level: 'Needs Improvement', color: 'red', icon: XCircle };
    };

    const complianceInfo = getComplianceLevel(summary.compliance_percentage);
    const ComplianceIcon = complianceInfo.icon;

    return (
        <AppLayout>
            <Head title="Free Assessment Results" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="container mx-auto px-4 py-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Assessment Complete!
                        </h1>
                        <p className="text-xl text-gray-600">
                            Your free assessment results are ready
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">

                        {/* Results Overview */}
                        <div className="grid lg:grid-cols-3 gap-6 mb-8">

                            {/* Completion Rate Card */}
                            <Card className="border-0 shadow-xl">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-lg text-gray-700">Completion Rate</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {summary.completion_percentage}%
                                    </div>
                                    <Progress value={summary.completion_percentage} className="mb-2" />
                                    <p className="text-sm text-gray-600">
                                        {summary.yes_responses + summary.no_responses + summary.na_responses} of {summary.total_criteria} criteria
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Compliance Rate Card */}
                            <Card className="border-0 shadow-xl">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-lg text-gray-700">Compliance Score</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className={`text-4xl font-bold text-${complianceInfo.color}-600 mb-2`}>
                                        {summary.compliance_percentage}%
                                    </div>
                                    <div className="flex items-center justify-center mb-2">
                                        <ComplianceIcon className={`w-5 h-5 text-${complianceInfo.color}-600 mr-2`} />
                                        <span className={`text-${complianceInfo.color}-600 font-medium`}>
                                            {complianceInfo.level}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Based on answered criteria
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Assessment Details Card */}
                            <Card className="border-0 shadow-xl">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-lg text-gray-700">Assessment Details</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="text-2xl font-bold text-purple-600 mb-2">
                                        {assessment.tool_name}
                                    </div>
                                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-2">
                                        <Gift className="w-3 h-3 mr-1" />
                                        Free Assessment
                                    </Badge>
                                    <p className="text-sm text-gray-600">
                                        Completed: {new Date(assessment.completed_at).toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Response Breakdown */}
                        <Card className="border-0 shadow-xl mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                                    <FileText className="w-6 h-6 mr-2" />
                                    Response Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <div className="text-3xl font-bold text-green-600 mb-1">
                                            {summary.yes_responses}
                                        </div>
                                        <p className="text-gray-600">Compliant</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <XCircle className="w-8 h-8 text-red-600" />
                                        </div>
                                        <div className="text-3xl font-bold text-red-600 mb-1">
                                            {summary.no_responses}
                                        </div>
                                        <p className="text-gray-600">Non-Compliant</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <AlertTriangle className="w-8 h-8 text-gray-600" />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-600 mb-1">
                                            {summary.na_responses}
                                        </div>
                                        <p className="text-gray-600">Not Applicable</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Free Assessment Limitations */}
                        <Card className="border-0 shadow-xl mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-amber-800 flex items-center">
                                    <Gift className="w-5 h-5 mr-2" />
                                    Free Assessment Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-amber-800 font-medium">Basic compliance overview completed</p>
                                            <p className="text-amber-700 text-sm">
                                                You've successfully completed your free assessment and received a high-level compliance score.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Lock className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-amber-800 font-medium">Premium features locked</p>
                                            <p className="text-amber-700 text-sm">
                                                Detailed domain analysis, comprehensive reports, remediation guidance, and advanced analytics require a premium subscription.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Zap className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-amber-800 font-medium">Upgrade for unlimited access</p>
                                            <p className="text-amber-700 text-sm">
                                                Subscribe to individual tools for unlimited assessments and detailed reporting.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upgrade Prompts */}
                        <div className="grid lg:grid-cols-2 gap-6 mb-8">

                            {/* What You're Missing */}
                            <Card className="border-0 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                                        <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                                        Premium Features
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="text-gray-700">Progress tracking over time</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="text-gray-700">Unlimited assessments</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="text-gray-700">Priority support</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Next Steps */}
                            <Card className="border-0 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                                        Next Steps
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                <span className="text-blue-600 text-sm font-bold">1</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Review your results</p>
                                                <p className="text-gray-600 text-sm">
                                                    Use your compliance score to understand your current status
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                <span className="text-purple-600 text-sm font-bold">2</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Choose a tool to subscribe</p>
                                                <p className="text-gray-600 text-sm">
                                                    Get detailed analysis and unlimited assessments
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                <span className="text-green-600 text-sm font-bold">3</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Improve your compliance</p>
                                                <p className="text-gray-600 text-sm">
                                                    Follow detailed recommendations and track progress
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Available Tools */}
                        <Card className="border-0 shadow-xl mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                                    <ShoppingCart className="w-6 h-6 mr-2" />
                                    Available Assessment Tools
                                </CardTitle>
                                <p className="text-gray-600 mt-2">
                                    Subscribe to individual tools for unlimited assessments and detailed reporting
                                </p>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {tools_available.map((tool) => (
                                        <Card key={tool.id} className="border border-gray-200 hover:border-blue-300 transition-colors">
                                            <CardContent className="p-6">
                                                <h3 className="font-bold text-lg text-gray-900 mb-2">
                                                    {tool.name_en}
                                                </h3>
                                                <div className="text-2xl font-bold text-blue-600 mb-4">
                                                    {tool.currency} {tool.premium_price}
                                                </div>
                                                <Link href={route('tools.subscribe', tool.id)}>
                                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                                        Subscribe Now
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="text-center space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('tools.discover')}>
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                                        <Eye className="w-5 h-5 mr-2" />
                                        Browse All Tools
                                    </Button>
                                </Link>

                                <Link href={route('free-assessment.edit', assessment.id)}>
                                    <Button variant="outline" className="px-8 py-3 text-lg">
                                        <FileText className="w-5 h-5 mr-2" />
                                        Edit Assessment
                                    </Button>
                                </Link>
                            </div>

                            <p className="text-gray-500 text-sm">
                                This was your complimentary assessment. Subscribe to tools for unlimited access.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
