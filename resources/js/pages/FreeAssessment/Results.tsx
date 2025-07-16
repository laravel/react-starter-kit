import AssessmentHeader from '@/components/assessment-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/use-language';
import { Head, Link } from '@inertiajs/react';
import { Award, BarChart3, Crown, Download, Edit, Share2, Star, Target } from 'lucide-react';

// --- Type Definitions ---
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
    domain_name_en: string;
    domain_name_ar: string;
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

// --- Translations Object (Fully updated) ---
const translations = {
    en: {
        results: 'Assessment Results',
        completed: 'Assessment Completed Successfully',
        download: 'Download Report',
        edit: 'Edit Assessment',
        share: 'Share Results',
        upgrade_prompt: 'Get detailed analytics, custom reports, and unlimited assessments.',
        upgrade_now: 'Upgrade Now',
        actions: 'Actions',
        summary: 'Assessment Summary',
        performance: 'Domain Performance',
        overallScore: 'Overall Score',
        grade: 'Grade {grade}',
        totalQuestions: 'Total Questions',
        answeredYes: 'Answered Yes',
        answeredNo: 'Answered No',
        notApplicable: 'Not Applicable',
        tool: 'Tool',
        completedOn: 'Completed',
        organization: 'Organization',
        upgradeTitle: 'Upgrade to Premium',
        quickStats: 'Quick Stats',
        completionRate: 'Completion Rate',
        performanceLevel: 'Performance Level',
        levelExcellent: 'Excellent',
        levelGood: 'Good',
        levelNeedsImprovement: 'Needs Improvement',
        assessmentType: 'Assessment Type',
        freePlan: 'Free Plan',
    },
    ar: {
        results: 'نتائج التقييم',
        completed: 'تم إكمال التقييم بنجاح',
        download: 'تحميل التقرير',
        edit: 'تعديل التقييم',
        share: 'مشاركة النتائج',
        upgrade_prompt: 'احصل على تحليلات مفصلة وتقارير مخصصة وتقييمات غير محدودة.',
        upgrade_now: 'الترقية الآن',
        actions: 'الإجراءات',
        summary: 'ملخص التقييم',
        performance: 'أداء المجالات',
        overallScore: 'النتيجة الإجمالية',
        grade: 'التقدير {grade}',
        totalQuestions: 'مجموع الأسئلة',
        answeredYes: 'الإجابات بنعم',
        answeredNo: 'الإجابات بلا',
        notApplicable: 'غير مطبق',
        tool: 'الأداة',
        completedOn: 'تاريخ الإكمال',
        organization: 'المؤسسة',
        upgradeTitle: 'الترقية إلى بريميوم',
        quickStats: 'إحصائيات سريعة',
        completionRate: 'معدل الإكمال',
        performanceLevel: 'مستوى الأداء',
        levelExcellent: 'ممتاز',
        levelGood: 'جيد',
        levelNeedsImprovement: 'يحتاج لتحسين',
        assessmentType: 'نوع التقييم',
        freePlan: 'الخطة المجانية',
    },
} as const;


// --- Component ---
export default function Results({ assessment, statistics, domainScores, user, canEdit, locale }: ResultsProps) {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
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

    const getDomainName = (domain: DomainScore) => isArabic ? domain.domain_name_ar : domain.domain_name_en;

    return (
        <>
            <Head title={`${t.results} - ${assessment.name}`} />

            <div
                className={`min-h-screen bg-slate-50 ${isArabic ? 'rtl' : 'ltr'} print:bg-white`}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                {/* Header is hidden during printing */}
                <div className="print:hidden">
                    <AssessmentHeader
                        title={t.results}
                        userName={user.name}
                        rightContent={
                            <Badge className="bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                                <Award className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" />
                                {t.freePlan}
                            </Badge>
                        }
                    />
                </div>

                {/* Wrapper for print styles */}
                <div className="px-4 py-6 sm:px-6 lg:px-8 print:p-0">
                    <div className="mx-auto max-w-7xl">

                        {/* This card is styled for printing with a simple border */}
                        <Card className={`mb-6 border-0 shadow-xl text-white print:shadow-none print:border print:border-gray-300 print:text-black bg-gradient-to-r ${getScoreColorClass(assessment.overall_score)}`}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 print:bg-gray-100">
                                            <Award className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="mb-1 text-2xl font-bold">{t.completed}</h2>
                                        </div>
                                    </div>
                                    <div className="text-right rtl:text-left">
                                        <div className="text-3xl font-bold">{Math.round(assessment.overall_score)}%</div>
                                        <div className="text-sm opacity-90">{t.overallScore}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Main grid now becomes single-column for printing */}
                        <div className="grid gap-6 lg:grid-cols-3 print:grid-cols-1">
                            <div className="space-y-6 lg:col-span-2">
                                <Card className="border-0 shadow-xl print:shadow-none print:border print:border-gray-300">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <BarChart3 className="h-5 w-5 text-blue-600" />
                                            {t.summary}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 md:grid-cols-3 print:grid-cols-3">
                                            <div className="text-center">
                                                <div className={`h-20 w-20 rounded-full bg-gradient-to-r ${getScoreColorClass(assessment.overall_score)} mx-auto mb-3 flex items-center justify-center text-white print:bg-gray-100 print:text-black print:border print:border-gray-300`}>
                                                    <div>
                                                        <div className="text-xl font-bold">{Math.round(assessment.overall_score)}%</div>
                                                        <div className="text-xs opacity-90">{t.overallScore}</div>
                                                    </div>
                                                </div>
                                                <Badge className={`${overallGrade.bg} ${overallGrade.color} px-3 py-1 font-bold print:border print:border-gray-300`}>
                                                    {t.grade.replace('{grade}', overallGrade.grade)}
                                                </Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm"><span className="text-gray-600">{t.totalQuestions}</span><span className="font-semibold">{statistics.total_questions}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-gray-600">{t.answeredYes}</span><span className="font-semibold text-green-600">{statistics.yes_answers}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-gray-600">{t.answeredNo}</span><span className="font-semibold text-red-600">{statistics.no_answers}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-gray-600">{t.notApplicable}</span><span className="font-semibold text-gray-600">{statistics.na_answers}</span></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-sm"><span className="text-gray-600">{t.tool}</span><div className="font-semibold text-blue-600">{isArabic ? assessment.tool.name_ar : assessment.tool.name_en}</div></div>
                                                <div className="text-sm"><span className="text-gray-600">{t.completedOn}</span><div className="font-semibold">{formatDate(assessment.completed_at)}</div></div>
                                                {assessment.organization && <div className="text-sm"><span className="text-gray-600">{t.organization}</span><div className="font-semibold">{assessment.organization}</div></div>}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl print:shadow-none print:border print:border-gray-300">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Target className="h-5 w-5 text-blue-600" />
                                            {t.performance}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {domainScores.map((domain, index) => (
                                                <div key={index} className="py-2">
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <span className="text-sm font-medium text-gray-900">{getDomainName(domain)}</span>
                                                        <span className={`text-sm font-bold ${getScoreGrade(domain.score).color}`}>{Math.round(domain.score)}%</span>
                                                    </div>
                                                    <Progress value={domain.score} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* This entire column is hidden during printing */}
                            <div className="space-y-6 print:hidden">
                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">{t.actions}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {canEdit && (
                                            <Link href={route('free-assessment.edit', assessment.id)}>
                                                <Button className="w-full bg-blue-600 py-2 text-sm hover:bg-blue-700">
                                                    <Edit className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                                    {t.edit}
                                                </Button>
                                            </Link>
                                        )}
                                        <Button onClick={() => window.print()} variant="outline" className="w-full py-2 text-sm">
                                            <Download className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                            {t.download}
                                        </Button>
                                        <Button variant="outline" className="w-full py-2 text-sm">
                                            <Share2 className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                            {t.share}
                                        </Button>
                                    </CardContent>
                                </Card>

                                {!user.is_premium && (
                                    <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl">
                                        <CardContent className="p-4">
                                            <div className="text-center">
                                                <Crown className="mx-auto mb-3 h-8 w-8" />
                                                <h3 className="mb-2 text-lg font-bold">{t.upgradeTitle}</h3>
                                                <p className="mb-4 text-sm text-purple-100">{t.upgrade_prompt}</p>
                                                <Link href="/subscribe">
                                                    <Button className="w-full bg-white py-2 text-sm text-purple-600 hover:bg-gray-50">
                                                        <Star className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                                        {t.upgrade_now}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <Card className="border-0 shadow-xl">
                                    <CardHeader className="pb-3"><CardTitle className="text-lg">{t.quickStats}</CardTitle></CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between py-1"><span className="text-sm text-gray-600">{t.completionRate}</span><Badge className="bg-green-100 text-xs font-medium text-green-800">{statistics.completion_rate}%</Badge></div>
                                        <div className="flex items-center justify-between py-1"><span className="text-sm text-gray-600">{t.performanceLevel}</span><Badge className={`${overallGrade.bg} ${overallGrade.color} text-xs font-medium`}>{assessment.overall_score >= 80 ? t.levelExcellent : assessment.overall_score >= 60 ? t.levelGood : t.levelNeedsImprovement}</Badge></div>
                                        <div className="flex items-center justify-between py-1"><span className="text-sm text-gray-600">{t.assessmentType}</span><Badge variant="outline" className="text-xs font-medium">{t.freePlan}</Badge></div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
