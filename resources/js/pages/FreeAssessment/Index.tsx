import AssessmentHeader from '@/components/assessment-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Head, router } from '@inertiajs/react';
import { Award, CheckCircle, Crown, FileText, Lock, Target } from 'lucide-react';
import React from 'react';

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
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const translations = {
        en: {
            start: 'Start Free Assessment',
            starting: 'Starting...',
            fullAccess: 'Get Full Access',
            pageTitle: 'Free Assessment',
        },
        ar: {
            start: 'ابدأ التقييم المجاني',
            starting: 'جاري البدء...',
            fullAccess: 'الحصول على وصول كامل',
            pageTitle: 'التقييم المجاني',
        },
    } as const;
    const t = translations[language];

    const startAssessment = (toolId: number) => {
        setIsSubmitting(toolId);
        router.post(
            route('free-assessment.start'),
            { tool_id: toolId },
            {
                onFinish: () => setIsSubmitting(null),
            },
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
            <Head title={t.pageTitle} />

            <div
                className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isArabic ? 'rtl' : 'ltr'}`}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <AssessmentHeader
                    title={t.pageTitle}
                    userName={user.name}
                    rightContent={
                        <Badge className="bg-blue-100 px-4 py-2 text-blue-800">
                            <Crown className="mr-2 h-4 w-4" />
                            Free Plan
                        </Badge>
                    }
                />

                {/* Main Content */}
                <div className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        {/* Welcome Card */}
                        <Card className="mb-8 overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl">
                            <CardContent className="relative p-8 md:p-12">
                                <div className="text-center">
                                    <div className="mb-6 flex items-center justify-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                                            <FileText className="h-8 w-8" />
                                        </div>
                                    </div>
                                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Welcome to Your Free Assessment</h2>
                                    <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
                                        Get started with a comprehensive evaluation of your organization's capabilities. This assessment will help you
                                        identify strengths and areas for improvement.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {tools.map((tool) => (
                                <Card key={tool.id} className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <Target className="h-6 w-6 text-blue-600" />
                                            {getName(tool)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {getDescription(tool) && <p className="mb-4 text-gray-600">{getDescription(tool)}</p>}
                                        <Button
                                            onClick={() => startAssessment(tool.id)}
                                            disabled={isSubmitting === tool.id}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        >
                                            {isSubmitting === tool.id ? t.starting : t.start}
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
                                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-sm font-bold text-blue-600">1</span>
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-gray-900">Assessment Questions</h4>
                                            <p className="text-gray-600">
                                                Answer questions about your organization's current practices and capabilities across multiple domains.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-sm font-bold text-blue-600">2</span>
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-gray-900">Provide Documentation</h4>
                                            <p className="text-gray-600">
                                                Upload supporting documents when required to validate your responses and ensure accuracy.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-sm font-bold text-blue-600">3</span>
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-gray-900">Get Your Results</h4>
                                            <p className="text-gray-600">
                                                Receive a comprehensive report with your assessment scores, domain breakdown, and basic
                                                recommendations.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                                            <Lock className="h-4 w-4 text-amber-600" />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-gray-900">Premium Features Available</h4>
                                            <p className="text-gray-600">
                                                Upgrade to access detailed analytics, benchmarking, advanced recommendations, and comprehensive
                                                reports.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Free vs Premium Features */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-6 w-6 text-blue-600" />
                                    Free vs Premium Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <h4 className="flex items-center font-semibold text-green-600">
                                            <CheckCircle className="mr-2 h-5 w-5" />
                                            Included in Free Plan
                                        </h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                Complete assessment access
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                Basic scoring and results
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                Domain-level breakdown
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                Assessment editing capability
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="flex items-center font-semibold text-purple-600">
                                            <Crown className="mr-2 h-5 w-5" />
                                            Premium Features
                                        </h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="mr-2 h-4 w-4 text-purple-500" />
                                                Advanced analytics & insights
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="mr-2 h-4 w-4 text-purple-500" />
                                                Industry benchmarking
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="mr-2 h-4 w-4 text-purple-500" />
                                                Detailed improvement roadmap
                                            </li>
                                            <li className="flex items-center text-gray-600">
                                                <Crown className="mr-2 h-4 w-4 text-purple-500" />
                                                Comprehensive PDF reports
                                            </li>
                                        </ul>
                                        <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                                            <Crown className="mr-2 h-4 w-4" />
                                            {t.fullAccess}
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
