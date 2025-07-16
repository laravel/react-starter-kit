import AssessmentHeader from '@/components/assessment-header';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/use-language';
import { Head, router } from '@inertiajs/react';
import { BarChart2, BrainCircuit, FileText, CheckCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// --- Type Definitions (from your original code) ---
interface CompleteProps {
    assessment: {
        id: number;
        tool: {
            name_en: string;
            name_ar: string;
        };
    };
    locale: string;
}

// --- Translations Object (Expanded for the new UI) ---
const translations = {
    en: {
        pageTitle: 'Processing Results...',
        headerTitle: 'Assessment Complete',
        mainTitle: 'Analyzing Your Results',
        mainSubtitle: 'Please wait while we generate your detailed performance report.',
        steps: [
            'Analyzing responses...',
            'Calculating domain scores...',
            'Benchmarking performance...',
            'Generating insights...',
            'Compiling your report...',
        ],
        finalizing: 'Finalizing your report!',
    },
    ar: {
        pageTitle: 'جاري معالجة النتائج...',
        headerTitle: 'اكتمل التقييم',
        mainTitle: 'جاري تحليل نتائجك',
        mainSubtitle: 'يرجى الانتظار بينما نقوم بإنشاء تقرير الأداء التفصيلي الخاص بك.',
        steps: [
            'تحليل الإجابات...',
            'حساب نتائج المجالات...',
            'مقارنة الأداء...',
            'توليد الرؤى...',
            'تجميع تقريرك...',
        ],
        finalizing: 'اللمسات الأخيرة على تقريرك!',
    },
} as const;

// An array of icons to cycle through for visual effect
const icons = [
    <BarChart2 key="1" className="h-8 w-8 text-blue-500" />,
    <BrainCircuit key="2" className="h-8 w-8 text-purple-500" />,
    <FileText key="3" className="h-8 w-8 text-green-500" />,
];

// --- Main Component ---
export default function Complete({ assessment, locale }: CompleteProps) {
    const { language } = useLanguage();
    const t = translations[language];

    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Redirect to the results page after the animation duration
        const redirectTimer = setTimeout(() => {
            router.visit(route('free-assessment.results', assessment.id));
        }, 5000); // Total duration for the animation

        // Timer to cycle through the text steps
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1));
        }, 1000); // Change text every second

        // Timer to smoothly animate the progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 1 : 100));
        }, 45); // Smoothly fill the bar over ~4.5 seconds

        // Clean up timers when the component unmounts
        return () => {
            clearTimeout(redirectTimer);
            clearInterval(stepInterval);
            clearInterval(progressInterval);
        };
    }, [assessment.id]);

    const currentStepText = currentStep < t.steps.length ? t.steps[currentStep] : t.finalizing;
    const currentIcon = currentStep < t.steps.length ? icons[currentStep % icons.length] : <CheckCircle className="h-8 w-8 text-green-500" />;

    return (
        <>
            <Head title={t.pageTitle} />
            <div className="min-h-screen bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>

                <div className="flex min-h-[80vh] items-center justify-center p-4">
                    <div className="w-full max-w-2xl text-center">
                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                            <div className="relative h-16 w-16">
                                {/* Animated icons */}
                                {icons.map((icon, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                                            currentStep % icons.length === index ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                        }`}
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h1 className="mb-2 text-3xl font-bold text-gray-900">{t.mainTitle}</h1>
                        <p className="mb-10 text-lg text-gray-600">{t.mainSubtitle}</p>

                        <div className="mx-auto max-w-md">
                            <Progress value={progress} className="h-2" />
                            <div className="mt-3 flex h-6 items-center justify-center">
                                <p className="text-sm font-semibold text-gray-700 transition-opacity duration-300">
                                    {currentStepText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
