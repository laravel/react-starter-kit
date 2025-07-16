import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart,
    CheckCircle,
    Crown,
    Gift,
    LayoutDashboard,
    Lock,
    LogOut,
    Rocket,
    Zap
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitch } from '@/components/language-switch';
import AssessmentHeader from '@/components/assessment-header';
import { Badge } from '@/components/ui/badge';

// --- TYPE DEFINITIONS (Updated for bilingual support) ---
interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    available: boolean;
    requires?: string;
}

interface User {
    name: string;
    email: string;
    id: number;
}

interface ToolsDiscoverProps {
    user?: User;
    tools?: Tool[];
    message?: string;
}

// --- TRANSLATIONS OBJECT ---
const translations = {
    en: {
        pageTitle: 'Assessment Tools - AFAQ',
        welcome: 'Welcome',
        login: 'Login',
        heroTitle: 'Unlock Your Potential',
        heroSubtitle: 'Select from our suite of evidence-based tools to evaluate and elevate your organization\'s performance.',
        freeAssessmentTitle: 'Get Your Free Assessment',
        freeAssessmentDesc: 'Try a complimentary assessment to see how our tools can help your organization grow.',
        freeAssessmentCTA: 'Start For Free',
        startAssessment: 'Start Assessment',
        upgradeToPremium: 'Upgrade to Premium',
        requiresPremium: 'Premium Required',
        whyChooseTitle: 'Why Choose AFAQ?',
        feature1Title: 'Evidence-Based',
        feature1Desc: 'Built on proven frameworks and industry best practices.',
        feature2Title: 'Actionable Insights',
        feature2Desc: 'Get specific recommendations for immediate improvements.',
        feature3Title: 'Secure & Confidential',
        feature3Desc: 'Your data is encrypted and completely confidential.',
    },
    ar: {
        pageTitle: 'أدوات التقييم - آفاق',
        welcome: 'أهلاً بك',
        login: 'تسجيل الدخول',
        heroTitle: 'أطلق العنان لإمكانياتك',
        heroSubtitle: 'اختر من مجموعة أدواتنا القائمة على الأدلة لتقييم أداء مؤسستك والارتقاء به.',
        freeAssessmentTitle: 'احصل على تقييمك المجاني',
        freeAssessmentDesc: 'جرّب تقييمًا مجانيًا لترى كيف يمكن لأدواتنا أن تساعد مؤسستك على النمو.',
        freeAssessmentCTA: 'ابدأ مجانًا',
        startAssessment: 'ابدأ التقييم',
        upgradeToPremium: 'الترقية إلى بريميوم',
        requiresPremium: 'يتطلب بريميوم',
        whyChooseTitle: 'لماذا تختار آفاق؟',
        feature1Title: 'مبني على الأدلة',
        feature1Desc: 'مبني على أطر عمل مجربة وأفضل الممارسات في الصناعة.',
        feature2Title: 'رؤى قابلة للتنفيذ',
        feature2Desc: 'احصل على توصيات محددة لإجراء تحسينات فورية.',
        feature3Title: 'آمن وسري',
        feature3Desc: 'بياناتك مشفرة وسرية تمامًا.',
    },
} as const;


const AppHeader = ({ user, t }: { user?: User, t: typeof translations['en'] }) => (
    <AssessmentHeader
        title={t.pageTitle}
        userName={user?.name}

    />
);

const ToolCard = ({ tool, t, getName, getDescription }: { tool: Tool, t: any, getName: any, getDescription: any }) => {
    const getVisuals = (toolName: string) => {
        if (toolName.toLowerCase().includes('strategic')) return { Icon: BarChart, color: 'blue' };
        if (toolName.toLowerCase().includes('quick')) return { Icon: Zap, color: 'green' };
        if (toolName.toLowerCase().includes('advanced')) return { Icon: Rocket, color: 'purple' };
        return { Icon: BarChart, color: 'gray' };
    };

    const { Icon, color } = getVisuals(tool.name_en);

    const colorClasses = {
        blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-700', ring: 'hover:ring-blue-500/50', text: 'text-blue-600' },
        green: { bg: 'bg-green-600', hoverBg: 'hover:bg-green-700', ring: 'hover:ring-green-500/50', text: 'text-green-600' },
        purple: { bg: 'bg-purple-600', hoverBg: 'hover:bg-purple-700', ring: 'hover:ring-purple-500/50', text: 'text-purple-600' },
        gray: { bg: 'bg-gray-600', hoverBg: 'hover:bg-gray-700', ring: 'hover:ring-gray-500/50', text: 'text-gray-600' },
    };
    const colors = colorClasses[color as keyof typeof colorClasses];

    return (
        <div className={`group flex flex-col bg-white rounded-2xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-4 ${colors.ring} ${!tool.available ? 'opacity-70' : ''}`}>
            <div className={`p-6 rounded-t-2xl`}>
                <Icon className={`w-10 h-10 mb-3 ${!tool.available ? 'text-gray-400' : colors.text}`} />
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{getName(tool)}</h3>
                {tool.requires && (
                    <span className="absolute top-4 right-4 rtl:left-4 rtl:right-auto inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-semibold">
                        <Lock className="w-3 h-3"/> {t.requiresPremium}
                    </span>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 flex-grow">{getDescription(tool)}</p>
                <Link
                    href={tool.available ? '/assessment/' + tool.id : '/subscription'}
                    disabled={!tool.available}
                    className={`mt-auto block w-full py-3 px-4 rounded-lg font-semibold text-center text-white transition-all duration-300 ${!tool.available ? 'bg-gray-400 cursor-not-allowed' : `${colors.bg} ${colors.hoverBg} group-hover:shadow-lg group-hover:scale-105`}`}
                >
                    {tool.available ? t.startAssessment : t.upgradeToPremium}
                </Link>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
export default function ToolsDiscover({ user, tools = [], message }: ToolsDiscoverProps) {
    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = translations[language];

    const getName = (item: { name_en: string; name_ar: string }): string => isArabic ? item.name_ar : item.name_en;
    const getDescription = (item: { description_en: string; description_ar: string }): string => isArabic ? item.description_ar : item.description_en;

    console.log(user);
    return (
        <>
            <Head title={t.pageTitle} />
            <div className="min-h-screen bg-gray-50" dir={isArabic ? 'rtl' : 'ltr'}>
                <AssessmentHeader
                    title={t.pageTitle}
                    userName={user.name_en}
                    rightContent={
                        <Badge className="bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                            <Crown className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            Free Plan
                        </Badge>
                    }
                />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    {message && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg mb-12 rtl:border-l-0 rtl:border-r-4 rtl:rounded-r-none rtl:rounded-l-lg" role="alert">
                            <p className="font-bold">Success</p>
                            <p>{message}</p>
                        </div>
                    )}

                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tighter mb-4">
                            {t.heroTitle}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            {t.heroSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Link
                            href="/free-assessment"
                            className="group relative flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <Gift className="w-16 h-16 mb-4 opacity-80 group-hover:scale-110 transition-transform"/>
                            <h3 className="text-2xl font-bold mb-2">{t.freeAssessmentTitle}</h3>
                            <p className="text-indigo-100 max-w-xs mb-6">{t.freeAssessmentDesc}</p>
                            <span className="mt-auto inline-flex items-center bg-white/20 group-hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                {t.freeAssessmentCTA} <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} t={t} getName={getName} getDescription={getDescription} />
                        ))}
                    </div>

                    <div className="mt-24 bg-white border border-gray-200 rounded-2xl p-8 sm:p-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.whyChooseTitle}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full mb-4">📊</div>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">{t.feature1Title}</h4>
                                <p className="text-gray-600">{t.feature1Desc}</p>
                            </div>
                            <div>
                                <div className="inline-block bg-green-100 text-green-600 p-4 rounded-full mb-4">🎯</div>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">{t.feature2Title}</h4>
                                <p className="text-gray-600">{t.feature2Desc}</p>
                            </div>
                            <div>
                                <div className="inline-block bg-purple-100 text-purple-600 p-4 rounded-full mb-4">🔒</div>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">{t.feature3Title}</h4>
                                <p className="text-gray-600">{t.feature3Desc}</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
