import AssessmentHeader from '@/components/assessment-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Head, Link, router } from '@inertiajs/react';
import { Award, CheckCircle, Crown, FileText, Hourglass, Loader2, Lock, PlayCircle, Target } from 'lucide-react';
import React from 'react';

// --- TYPE DEFINITIONS (from your original code) ---
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

// --- TRANSLATIONS (Now includes feature lists) ---
const translations = {
    en: {
        start: 'Start Assessment',
        starting: 'Starting...',
        resume: 'Resume Assessment',
        viewResults: 'View Results',
        completed: 'Completed',
        inProgress: 'In Progress',
        fullAccess: 'Get Full Access',
        pageTitle: 'Free Assessment',
        welcomeTitle: 'Welcome to Your Free Assessment',
        welcomeDesc: "Get started with a comprehensive evaluation of your organization's capabilities. This assessment will help you identify strengths and areas for improvement.",
        whatToExpect: 'What to Expect',
        step1Title: 'Assessment Questions',
        step1Desc: "Answer questions about your organization's current practices and capabilities across multiple domains.",
        step2Title: 'Provide Documentation',
        step2Desc: 'Upload supporting documents when required to validate your responses and ensure accuracy.',
        step3Title: 'Get Your Results',
        step3Desc: 'Receive a comprehensive report with your assessment scores, domain breakdown, and basic recommendations.',
        premiumTitle: 'Premium Features Available',
        premiumDesc: 'Upgrade to access detailed analytics, benchmarking, advanced recommendations, and comprehensive reports.',
        featuresTitle: 'Free vs Premium Features',
        freeFeatures: 'Included in Free Plan',
        premiumFeatures: 'Premium Features',
        // --- Added Feature Translations ---
        freeFeature1: 'Complete assessment access',
        freeFeature2: 'Basic scoring and results',
        freeFeature3: 'Domain-level breakdown',
        freeFeature4: 'Assessment editing capability',
        premiumFeature1: 'Advanced analytics & insights',
        premiumFeature2: 'Industry benchmarking',
        premiumFeature3: 'Detailed improvement roadmap',
        premiumFeature4: 'Comprehensive PDF reports',
    },
    ar: {
        start: 'ابدأ التقييم',
        starting: 'جاري البدء...',
        resume: 'استئناف التقييم',
        viewResults: 'عرض النتائج',
        completed: 'مكتمل',
        inProgress: 'قيد التنفيذ',
        fullAccess: 'الحصول على وصول كامل',
        pageTitle: 'التقييم المجاني',
        welcomeTitle: 'أهلاً بك في تقييمك المجاني',
        welcomeDesc: 'ابدأ بتقييم شامل لقدرات مؤسستك. سيساعدك هذا التقييم في تحديد نقاط القوة ومجالات التحسين.',
        whatToExpect: 'ماذا تتوقع',
        step1Title: 'أسئلة التقييم',
        step1Desc: 'أجب عن أسئلة حول الممارسات والقدرات الحالية لمؤسستك في مجالات متعددة.',
        step2Title: 'تقديم المستندات',
        step2Desc: 'قم بتحميل المستندات الداعمة عند الحاجة للتحقق من صحة إجاباتك وضمان الدقة.',
        step3Title: 'احصل على نتائجك',
        step3Desc: 'احصل على تقرير شامل بنتائج تقييمك، وتفاصيل كل مجال، وتوصيات أساسية.',
        premiumTitle: 'الميزات المتميزة المتاحة',
        premiumDesc: 'قم بالترقية للوصول إلى التحليلات التفصيلية والمقارنات المعيارية والتوصيات المتقدمة والتقارير الشاملة.',
        featuresTitle: 'مقارنة بين الميزات المجانية والمتميزة',
        freeFeatures: 'مشمول في الخطة المجانية',
        premiumFeatures: 'ميزات الخطة المتميزة',
        // --- Added Feature Translations ---
        freeFeature1: 'وصول كامل للتقييم',
        freeFeature2: 'النتائج والتقييم الأساسي',
        freeFeature3: 'تحليل على مستوى كل مجال',
        freeFeature4: 'إمكانية تعديل التقييم',
        premiumFeature1: 'تحليلات ورؤى متقدمة',
        premiumFeature2: 'مقارنات معيارية مع القطاع',
        premiumFeature3: 'خارطة طريق مفصلة للتحسين',
        premiumFeature4: 'تقارير PDF شاملة',
    },
} as const;


// --- SUB-COMPONENTS for a cleaner structure ---

const WelcomeCard = ({ t }: { t: typeof translations['en'] }) => (
    <Card className="mb-12 overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl">
        <CardContent className="relative p-8 text-center md:p-12">
            <div className="mb-6 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                    <FileText className="h-8 w-8" />
                </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.welcomeTitle}</h2>
            <p className="mx-auto max-w-3xl text-lg text-blue-100/90">{t.welcomeDesc}</p>
        </CardContent>
    </Card>
);

const AssessmentToolCard = ({ tool, isSubmitting, startAssessment, t, getName, getDescription }: any) => {
    const existing = tool.existing_assessment;
    let buttonText = t.start;
    let buttonAction = () => startAssessment(tool.id);
    let buttonIcon = <PlayCircle className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />;
    let statusBadge = null;

    if (isSubmitting === tool.id) {
        buttonText = t.starting;
        buttonIcon = <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:ml-2 rtl:mr-0" />;
    } else if (existing) {
        if (existing.status === 'in_progress') {
            buttonText = t.resume;
            buttonAction = () => router.visit(route('assessment.show', existing.id));
            statusBadge = <Badge variant="outline" className="border-amber-500 bg-amber-50 text-amber-700">{t.inProgress}</Badge>;
        } else if (existing.status === 'completed') {
            buttonText = t.viewResults;
            buttonAction = () => router.visit(route('free-assessment.results', existing.id));
            statusBadge = <Badge variant="outline" className="border-green-500 bg-green-50 text-green-700">{t.completed}</Badge>;
        }
    }

    return (
        <Card className="flex flex-col border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-gray-800">
                        <Target className="h-6 w-6 text-blue-600" />
                        {getName(tool)}
                    </CardTitle>
                    {statusBadge}
                </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col">
                {getDescription(tool) && <p className="mb-6 flex-grow text-gray-600">{getDescription(tool)}</p>}
                <Button
                    onClick={buttonAction}
                    disabled={isSubmitting === tool.id}
                    className="mt-auto w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                    {buttonIcon}
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
};

const ExpectationStep = ({ num, title, description, icon }: any) => (
    <div className="flex items-start space-x-4 rtl:space-x-reverse">
        <div className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${icon ? 'bg-amber-100' : 'bg-blue-100'}`}>
            {icon || <span className="font-bold text-blue-600">{num}</span>}
        </div>
        <div>
            <h4 className="mb-1 font-semibold text-gray-900">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const FeaturesList = ({ title, features, icon: Icon, colorClass }: any) => (
    <div className="space-y-4 rounded-lg bg-slate-50 p-6">
        <h4 className={`flex items-center text-lg font-semibold ${colorClass}`}>
            <Icon className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
            {title}
        </h4>
        <ul className="space-y-2">
            {features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center text-gray-700">
                    <Icon className={`mr-3 h-4 w-4 flex-shrink-0 rtl:ml-3 rtl:mr-0 ${colorClass}`} />
                    {feature}
                </li>
            ))}
        </ul>
    </div>
);


// --- MAIN COMPONENT ---
export default function Index({ tools, user, locale }: IndexProps) {
    const [isSubmitting, setIsSubmitting] = React.useState<number | null>(null);
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = translations[language];

    const startAssessment = (toolId: number) => {
        setIsSubmitting(toolId);
        router.post(
            route('free-assessment.start'),
            { tool_id: toolId },
            { onFinish: () => setIsSubmitting(null) }
        );
    };

    const getName = (item: { name_en: string; name_ar: string }): string => isArabic ? item.name_ar : item.name_en;
    const getDescription = (item: { description_en?: string; description_ar?: string }): string => (isArabic ? item.description_ar : item.description_en) || '';

    return (
        <>
            <Head title={t.pageTitle} />
            <div className="min-h-screen bg-slate-50" dir={isArabic ? 'rtl' : 'ltr'}>
                <AssessmentHeader
                    title={t.pageTitle}
                    userName={user.name}
                    rightContent={
                        <Badge className="bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                            <Crown className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            Free Plan
                        </Badge>
                    }
                />

                <main className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl">
                        <WelcomeCard t={t} />

                        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {tools.map((tool) => (
                                <AssessmentToolCard
                                    key={tool.id}
                                    tool={tool}
                                    isSubmitting={isSubmitting}
                                    startAssessment={startAssessment}
                                    t={t}
                                    getName={getName}
                                    getDescription={getDescription}
                                />
                            ))}
                        </div>

                        <div className="grid gap-12 lg:grid-cols-2">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>{t.whatToExpect}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <ExpectationStep num={1} title={t.step1Title} description={t.step1Desc} />
                                    <ExpectationStep num={2} title={t.step2Title} description={t.step2Desc} />
                                    <ExpectationStep num={3} title={t.step3Title} description={t.step3Desc} />
                                    <ExpectationStep title={t.premiumTitle} description={t.premiumDesc} icon={<Lock className="h-5 w-5 text-amber-600" />} />
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="h-6 w-6 text-blue-600" />
                                        {t.featuresTitle}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* --- UPDATED TO USE TRANSLATIONS --- */}
                                    <FeaturesList
                                        title={t.freeFeatures}
                                        features={[t.freeFeature1, t.freeFeature2, t.freeFeature3, t.freeFeature4]}
                                        icon={CheckCircle}
                                        colorClass="text-green-600"
                                    />
                                    {/* --- UPDATED TO USE TRANSLATIONS --- */}
                                    <FeaturesList
                                        title={t.premiumFeatures}
                                        features={[t.premiumFeature1, t.premiumFeature2, t.premiumFeature3, t.premiumFeature4]}
                                        icon={Crown}
                                        colorClass="text-purple-600"
                                    />
                                    <Button asChild variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700">
                                        <Link href="/subscribe">
                                            <Crown className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                            {t.fullAccess}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
