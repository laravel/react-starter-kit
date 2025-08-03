import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
    Download,
    Eye,
    Save,
    Share2,
    CheckCircle,
    Loader2,
    Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

// --- TYPE DEFINITIONS ---
interface Assessment {
    id: number;
    name: string;
    email: string;
    organization?: string;
    status: string;
    completed_at?: string;
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
    };
}

interface AssessmentResults {
    overall_percentage: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    total_criteria: number;
    applicable_criteria: number;
}

interface PDFGeneratorComponentProps {
    assessment: Assessment;
    results: AssessmentResults;
    locale?: string;
    isGuest?: boolean;
    children: React.ReactNode; // Added to wrap the trigger button
}

// --- TRANSLATIONS ---
const translations = {
    en: {
        menuTitle: 'Assessment Summary',
        score: 'Score',
        yes: 'Yes',
        no: 'No',
        applicableCriteria: 'Applicable Criteria',
        download: 'Download',
        preview: 'Preview',
        save: 'Save',
        share: 'Share',
        note: 'Note: The PDF report contains a comprehensive summary with charts and recommendations.',
        error: 'Error',
        success: 'Success',
        assessmentIncomplete: 'Assessment must be completed first.',
        downloadSuccess: 'PDF download initiated.',
        downloadError: 'Failed to download PDF.',
        previewSuccess: 'PDF preview opened.',
        previewError: 'Failed to open PDF preview.',
        saveSuccess: 'PDF saved successfully. You can now share the link.',
        saveError: 'Failed to save PDF.',
        copySuccess: 'Link copied to clipboard.',
        copyError: 'Failed to copy link.',
    },
    ar: {
        menuTitle: 'ملخص التقييم',
        score: 'النتيجة',
        yes: 'نعم',
        no: 'لا',
        applicableCriteria: 'المعايير المطبقة',
        download: 'تنزيل',
        preview: 'معاينة',
        save: 'حفظ',
        share: 'مشاركة',
        note: 'ملاحظة: يحتوي تقرير PDF على ملخص شامل لنتائج التقييم مع الرسوم البيانية والتوصيات.',
        error: 'خطأ',
        success: 'نجاح',
        assessmentIncomplete: 'يجب إكمال التقييم أولاً.',
        downloadSuccess: 'تم بدء تنزيل ملف PDF.',
        downloadError: 'فشل في تنزيل ملف PDF.',
        previewSuccess: 'تم فتح معاينة PDF.',
        previewError: 'فشل في فتح معاينة PDF.',
        saveSuccess: 'تم حفظ ملف PDF بنجاح. يمكنك الآن مشاركة الرابط.',
        saveError: 'فشل في حفظ ملف PDF.',
        copySuccess: 'تم نسخ الرابط إلى الحافظة.',
        copyError: 'فشل في نسخ الرابط.',
    }
};

// --- MAIN COMPONENT ---
const PDFGeneratorComponent: React.FC<PDFGeneratorComponentProps> = ({
                                                                         assessment,
                                                                         results,
                                                                         locale = 'en',
                                                                         isGuest = false,
                                                                         children
                                                                     }) => {
    const { toast } = useToast();
    const { language } = useLanguage();
    const t = translations[language as 'en' | 'ar'];
    const isArabic = language === 'ar';

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loadingStates, setLoadingStates] = useState({
        download: false,
        preview: false,
        save: false,
    });
    const [savedPDFUrl, setSavedPDFUrl] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const setLoading = (action: keyof typeof loadingStates, isLoading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [action]: isLoading }));
    };

    const getCSRFToken = (): string => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    };

    const handleAction = async (action: 'download' | 'preview' | 'save') => {
        if (assessment.status !== 'completed' && action !== 'preview') {
            toast({ title: t.error, description: t.assessmentIncomplete, variant: 'destructive' });
            return;
        }

        setLoading(action, true);
        try {
            // THE FIX: Append the current language as a query parameter to the URL.
            const url = `/assessment/${assessment.id}/pdf/${action}?lang=${language}`;

            if (action === 'save') {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': getCSRFToken(), 'Accept': 'application/json' },
                    body: JSON.stringify({ lang: language }) // Also send lang in body for POST
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Server error');
                setSavedPDFUrl(data.download_url);
                toast({ title: t.success, description: t.saveSuccess, variant: 'success' });
            } else {
                window.open(url, '_blank');
            }
        } catch (error: any) {
            toast({ title: t.error, description: error.message || t[`${action}Error`], variant: 'destructive' });
        } finally {
            setLoading(action, false);
            setIsMenuOpen(false);
        }
    };

    const copyLink = () => {
        if (!savedPDFUrl) return;
        navigator.clipboard.writeText(window.location.origin + savedPDFUrl)
            .then(() => toast({ title: t.success, description: t.copySuccess, variant: 'success' }))
            .catch(() => toast({ title: t.error, description: t.copyError, variant: 'destructive' }));
    };

    const toolName = isArabic ? assessment.tool.name_ar : assessment.tool.name_en;
    const summaryText = `${toolName} - ${t.score}: ${Math.round(results.overall_percentage)}% (${results.yes_count} ${t.yes}, ${results.no_count} ${t.no})`;

    return (
        <div className="relative inline-block text-left">
            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {children}
            </div>

            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="origin-top-right rtl:origin-top-left absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-80 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in-up"
                >
                    <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <h3 className="text-base font-bold text-gray-900">{t.menuTitle}</h3>
                            <p className="text-xs text-gray-500 mt-1">{summaryText}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1 p-2">
                            <ActionButton icon={<Download />} label={t.download} onClick={() => handleAction('download')} loading={loadingStates.download} />
                            <ActionButton icon={<Eye />} label={t.preview} onClick={() => handleAction('preview')} loading={loadingStates.preview} />
                            <ActionButton icon={<Save />} label={t.save} onClick={() => handleAction('save')} loading={loadingStates.save} />
                            <ActionButton icon={<Share2 />} label={t.share} onClick={copyLink} loading={false} disabled={!savedPDFUrl} />
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500">{t.note}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ActionButton = ({ icon, label, onClick, loading, disabled = false }: any) => (
    <button
        onClick={onClick}
        disabled={loading || disabled}
        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
        {loading ? <Loader2 className="h-4 w-4 me-2 animate-spin" /> : React.cloneElement(icon, { className: "h-4 w-4 me-2" })}
        {label}
    </button>
);

export default PDFGeneratorComponent;
