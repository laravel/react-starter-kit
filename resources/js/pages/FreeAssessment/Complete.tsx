import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

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
    const isArabic = locale === 'ar';
    const message = isArabic
        ? `تم الانتهاء من تقييم ${assessment.tool.name_ar}`
        : `Thank you for completing the ${assessment.tool.name_en} assessment`;
    const buttonLabel = isArabic ? 'عرض النتيجة' : 'Click here to see results';

    return (
        <>
            <Head title="Assessment Complete" />
            <div
                className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isArabic ? 'rtl' : 'ltr'}`}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <div className="text-center space-y-6">
                    <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
                    <h1 className="text-2xl font-bold">{message}</h1>
                    <Button asChild className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                        <Link href={route('free-assessment.results', assessment.id)}>{buttonLabel}</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
