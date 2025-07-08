import React from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Target,
    FileText,
    Crown,
    CheckCircle,
    Users,
    Award,
    Lock
} from 'lucide-react';

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    existing_assessment: ExistingAssessment | null;
}

interface User {
    id: number;
    name: string;
    email: string;
    access_level: string;
}

interface ExistingAssessment {
    id: number;
    status: string;
    completed_at: string | null;
    can_access_results: boolean;
}

interface IndexProps {
    tools: Tool[];
    user: User;
    locale: string;
}

export default function Index({ tools, user, locale }: IndexProps) {
    const [isSubmitting, setIsSubmitting] = React.useState<number | null>(null);
    const isArabic = locale === 'ar';

    const startAssessment = (toolId: number) => {
        setIsSubmitting(toolId);
        router.post(
            route('free-assessment.start'),
            { tool_id: toolId },
            {
                onFinish: () => setIsSubmitting(null),
            }
        );
    };

    const getName = (item: { name_en: string; name_ar: string }): string => {
        return isArabic ? item.name_ar : item.name_en;
    };

    const getDescription = (item: { description_en?: string; description_ar?: string }): string => {
        const desc = isArabic ? item.description_ar : item.description_en;
        return desc || '';
    };

    return (
        <>
            <Head title="Free Assessment" />

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
                                    <h1 className="text-2xl font-bold text-gray-900">Free Assessment</h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{user.name}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                                <Crown className="w-4 h-4 mr-2" />
                                Free Plan
                            </Badge>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Welcome Card */}
                        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
                            <CardContent className="relative p-8 md:p-12">
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Your Free Assessment</h2>
                                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                        Get started with a comprehensive evaluation of your organization's capabilities.
                                        This assessment will help you identify strengths and areas for improvement.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {tools.map((tool) => (
                                <Card key={tool.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <Target className="w-6 h-6 text-blue-600" />
                                            {getName(tool)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {getDescription(tool) && <p className="text-gray-600 mb-4">{getDescription(tool)}</p>}
                                        <Button
                                            onClick={() => startAssessment(tool.id)}
                                            disabled={isSubmitting === tool.id}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        >
                                            {isSubmitting === tool.id ? 'Starting...' : 'Start'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* What to Expect */}
                        <Card className="mb-8 border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>What to Expect</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 text-sm font-bold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Assessment Questions</h4>
                                            <p className="text-gray-600">Answer questions about your organization's current practices and capabilities across multiple domains.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 text-sm font-bold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Provide Documentation</h4>
                                            <p className="text-gray-600">Upload supporting documents when required to validate your responses and ensure accuracy.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 text-sm font-bold">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Get Your Results</h4>
                                            <p className="text-gray-600">Receive a comprehensive report with your assessment scores, domain breakdown, and basic recommendations.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Lock className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Premium Features Available</h4>
                                            <p className="text-gray-600">Upgrade to access detailed analytics, benchmarking, advanced recommendations, and comprehensive reports.</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Free vs Premium Features */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-6 h-6 text-blue-600" />
                                    Free vs Premium Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-green-600 flex items-center">
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Included in Free Plan
                                        </h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                Complete assessment access
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                Basic scoring and results
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                Domain-level breakdown
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                Assessment editing capability
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-purple-600 flex items-center">
                                            <Crown className="w-5 h-5 mr-2" />
                                            Premium Features
                                        </h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="w-4 h-4 text-purple-500 mr-2" />
                                                Advanced analytics & insights
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="w-4 h-4 text-purple-500 mr-2" />
                                                Industry benchmarking
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="w-4 h-4 text-purple-500 mr-2" />
                                                Detailed improvement roadmap
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="w-4 h-4 text-purple-500 mr-2" />
                                                Comprehensive PDF reports
                                            </li>
                                        </ul>
                                        <Button
                                            variant="outline"
                                            className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                                        >
                                            <Crown className="w-4 h-4 mr-2" />
                                            Learn About Premium
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
