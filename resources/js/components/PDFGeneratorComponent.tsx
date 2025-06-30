import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
    Download,
    Eye,
    Save,
    FileText,
    Mail,
    Share2,
    CheckCircle,
    AlertCircle,
    X
} from 'lucide-react';

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
    domain_results: any[];
    total_criteria: number;
    applicable_criteria: number;
}

interface PDFGeneratorComponentProps {
    assessment: Assessment;
    results: AssessmentResults;
    locale?: string;
    isGuest?: boolean;
}

const PDFGeneratorComponent: React.FC<PDFGeneratorComponentProps> = ({
                                                                         assessment,
                                                                         results,
                                                                         locale = 'en',
                                                                         isGuest = false
                                                                     }) => {
    const { toast } = useToast();
    const isArabic = locale === 'ar';

    // Loading states
    const [loadingStates, setLoadingStates] = useState({
        download: false,
        preview: false,
        save: false,
        email: false
    });

    // Saved PDF info
    const [savedPDF, setSavedPDF] = useState<{
        url: string;
        filename: string;
        timestamp: string;
    } | null>(null);

    // Loading helper
    const setLoading = (action: keyof typeof loadingStates, isLoading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [action]: isLoading }));
    };

    // Get CSRF token
    const getCSRFToken = (): string => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!token) throw new Error('CSRF token not found');
        return token;
    };

    // Download PDF
    const downloadPDF = async () => {
        if (assessment.status !== 'completed') {
            toast({
                title: isArabic ? 'خطأ' : 'Error',
                description: isArabic ? 'يجب إكمال التقييم أولاً' : 'Assessment must be completed first',
                variant: 'destructive',
            });
            return;
        }

        setLoading('download', true);

        try {
            const link = document.createElement('a');
            link.href = `/assessment/${assessment.id}/pdf/download`;
            link.target = '_blank';
            link.download = `${assessment.tool.name_en}_Assessment_Results.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: isArabic ? 'نجح' : 'Success',
                description: isArabic ? 'تم تنزيل ملف PDF بنجاح' : 'PDF downloaded successfully',
                variant: 'success',
            });
        } catch (error) {
            toast({
                title: isArabic ? 'خطأ' : 'Error',
                description: isArabic ? 'فشل في تنزيل ملف PDF' : 'Failed to download PDF',
                variant: 'destructive',
            });
        } finally {
            setLoading('download', false);
        }
    };

    // Preview PDF
    const previewPDF = () => {
        setLoading('preview', true);
        try {
            window.open(`/assessment/${assessment.id}/pdf/preview`, '_blank');
            toast({
                title: isArabic ? 'نجح' : 'Success',
                description: isArabic ? 'تم فتح معاينة PDF' : 'PDF preview opened',
                variant: 'success',
            });
        } catch (error) {
            toast({
                title: isArabic ? 'خطأ' : 'Error',
                description: isArabic ? 'فشل في فتح معاينة PDF' : 'Failed to open PDF preview',
                variant: 'destructive',
            });
        } finally {
            setLoading('preview', false);
        }
    };

    // Save PDF
    const savePDF = async () => {
        if (assessment.status !== 'completed') {
            toast({
                title: isArabic ? 'خطأ' : 'Error',
                description: isArabic ? 'يجب إكمال التقييم أولاً' : 'Assessment must be completed first',
                variant: 'destructive',
            });
            return;
        }

        setLoading('save', true);

        try {
            const response = await fetch(`/assessment/${assessment.id}/pdf/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCSRFToken(),
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    filename: `${assessment.tool.name_en.replace(/[^A-Za-z0-9_-]/g, '_')}_${assessment.name.replace(/[^A-Za-z0-9_-]/g, '_')}_Results.pdf`
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSavedPDF({
                    url: data.download_url,
                    filename: data.file_path.split('/').pop() || 'assessment.pdf',
                    timestamp: new Date().toLocaleString(isArabic ? 'ar-SA' : 'en-US')
                });

                toast({
                    title: isArabic ? 'نجح' : 'Success',
                    description: isArabic ? 'تم حفظ ملف PDF بنجاح' : 'PDF saved successfully',
                    variant: 'success',
                });
            } else {
                throw new Error(data.message || 'Failed to save PDF');
            }
        } catch (error) {
            toast({
                title: isArabic ? 'خطأ' : 'Error',
                description: isArabic ? 'فشل في حفظ ملف PDF' : 'Failed to save PDF',
                variant: 'destructive',
            });
        } finally {
            setLoading('save', false);
        }
    };

    // Copy link
    const copyPDFLink = async () => {
        if (!savedPDF) return;
        try {
            await navigator.clipboard.writeText(window.location.origin + savedPDF.url);
            toast({
                title: isArabic ? 'نجح' : 'Success',
                description: isArabic ? 'تم نسخ الرابط' : 'Link copied to clipboard',
                variant: 'success',
            });
        } catch (error) {
            toast({
                title: isArabic ? 'خطأ' : 'Error',
                description: isArabic ? 'فشل في نسخ الرابط' : 'Failed to copy link',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-blue-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                            {isArabic ? 'تقرير PDF' : 'PDF Report'}
                        </h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        assessment.status === 'completed'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                        {assessment.status === 'completed' ? (
                            <CheckCircle className="h-3 w-3" />
                        ) : (
                            <AlertCircle className="h-3 w-3" />
                        )}
                        {assessment.status === 'completed' ? (isArabic ? 'مكتمل' : 'Completed') : (isArabic ? 'غير مكتمل' : 'Incomplete')}
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Assessment Summary */}
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-gray-900 mb-2">
                        {isArabic ? 'ملخص التقييم' : 'Assessment Summary'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                        {isArabic
                            ? `تقييم ${assessment.tool.name_ar || assessment.tool.name_en} - النتيجة: ${Math.round(results.overall_percentage)}% (${results.yes_count} نعم، ${results.no_count} لا)`
                            : `${assessment.tool.name_en} Assessment - Score: ${Math.round(results.overall_percentage)}% (${results.yes_count} Yes, ${results.no_count} No)`
                        }
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{isArabic ? 'المعايير الإجمالية:' : 'Total Criteria:'} {results.total_criteria}</span>
                        <span>{isArabic ? 'المطبقة:' : 'Applicable:'} {results.applicable_criteria}</span>
                        <span>{isArabic ? 'المجالات:' : 'Domains:'} {results.domain_results.length}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Download */}
                    <button
                        onClick={downloadPDF}
                        disabled={loadingStates.download || assessment.status !== 'completed'}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            assessment.status === 'completed'
                                ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {loadingStates.download ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Download className="h-4 w-4" />
                        )}
                        {isArabic ? 'تنزيل' : 'Download'}
                    </button>

                    {/* Preview */}
                    <button
                        onClick={previewPDF}
                        disabled={loadingStates.preview}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50 transition-colors"
                    >
                        {loadingStates.preview ? (
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                        {isArabic ? 'معاينة' : 'Preview'}
                    </button>

                    {/* Save */}
                    <button
                        onClick={savePDF}
                        disabled={loadingStates.save || assessment.status !== 'completed'}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                            assessment.status === 'completed'
                                ? 'border-green-200 text-green-700 hover:bg-green-50 disabled:opacity-50'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {loadingStates.save ? (
                            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isArabic ? 'حفظ' : 'Save'}
                    </button>

                    {/* Share */}
                    <button
                        onClick={savePDF}
                        disabled={loadingStates.email || assessment.status !== 'completed'}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                            assessment.status === 'completed'
                                ? 'border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <Share2 className="h-4 w-4" />
                        {isArabic ? 'مشاركة' : 'Share'}
                    </button>
                </div>

                {/* Saved PDF Info */}
                {savedPDF && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="font-medium text-green-900 mb-1">
                                    {isArabic ? 'تم حفظ ملف PDF بنجاح' : 'PDF Saved Successfully'}
                                </h4>
                                <p className="text-sm text-green-800 mb-3">
                                    {isArabic ? `تم إنشاء الملف في: ${savedPDF.timestamp}` : `Generated on: ${savedPDF.timestamp}`}
                                </p>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={savedPDF.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-green-700 hover:text-green-800 underline"
                                    >
                                        {savedPDF.filename}
                                    </a>
                                    <button
                                        onClick={copyPDFLink}
                                        className="p-1 text-green-700 hover:text-green-800 hover:bg-green-100 rounded"
                                    >
                                        <Share2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Incomplete Warning */}
                {assessment.status !== 'completed' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                            <div>
                                <h4 className="font-medium text-yellow-900">
                                    {isArabic ? 'التقييم غير مكتمل' : 'Assessment Incomplete'}
                                </h4>
                                <p className="text-sm text-yellow-800 mt-1">
                                    {isArabic
                                        ? 'يجب إكمال التقييم قبل إنشاء تقرير PDF. يمكنك معاينة التقرير ولكن لا يمكن تنزيله.'
                                        : 'Assessment must be completed before generating a PDF report. You can preview the report but cannot download it.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Text */}
                <div className="text-xs text-gray-500 border-t border-blue-200 pt-4">
                    <p>
                        {isArabic
                            ? 'ملاحظة: يحتوي تقرير PDF على ملخص شامل لنتائج التقييم مع الرسوم البيانية والتوصيات.'
                            : 'Note: The PDF report contains a comprehensive summary of your assessment results with charts and recommendations.'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PDFGeneratorComponent;
