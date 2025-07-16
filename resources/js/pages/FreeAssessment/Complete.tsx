import AssessmentHeader from '@/components/assessment-header';
import { useLanguage } from '@/hooks/use-language';
import { Head, router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

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

export default function Complete({ assessment, locale }: CompleteProps) {
    const { language } = useLanguage();
    const t = {
        en: { calculating: 'Calculating Results...' },
        ar: { calculating: 'جاري حساب النتائج...' },
    }[language];

    useEffect(() => {
        const timer = setTimeout(() => {
            router.visit(route('free-assessment.results', assessment.id));
        }, 2500);
        return () => clearTimeout(timer);
    }, [assessment.id]);

    return (
        <>
            <Head title="Assessment Complete" />
            <AssessmentHeader title={language === 'ar' ? assessment.tool.name_ar : assessment.tool.name_en} />
            <div
                className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <div className="space-y-6 text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
                    <p className="text-xl font-semibold text-gray-700">{t.calculating}</p>
                </div>
            </div>
        </>
    );
}
