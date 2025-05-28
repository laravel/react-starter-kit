import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Download,
    FileText,
    Settings,
    Eye,
    Globe,
    Loader2,
    CheckCircle,
    AlertCircle,
    BarChart3,
    Users,
    Target,
    Award,
    Calendar,
    Building
} from 'lucide-react';

interface PDFGeneratorProps {
    assessment: {
        id: number;
        name: string;
        email: string;
        organization?: string;
        status: string;
        created_at: string;
        completed_at?: string;
        tool: {
            id: number;
            name_en: string;
            name_ar: string;
        };
    };
    results?: {
        overall_percentage: number;
        yes_count: number;
        no_count: number;
        na_count: number;
        domain_results: any[];
    };
    locale?: string;
    isGuest?: boolean;
}

interface ReportTemplate {
    id: string;
    name: string;
    name_ar: string;
    description: string;
    description_ar: string;
    pages: string;
    includes: string[];
}

interface ReportSettings {
    language: 'arabic' | 'english' | 'bilingual';
    template: string;
    include_charts: boolean;
    include_recommendations: boolean;
    watermark: boolean;
}

const PDFGeneratorComponent: React.FC<PDFGeneratorProps> = ({
                                                                assessment,
                                                                results,
                                                                locale = 'en',
                                                                isGuest = false
                                                            }) => {
    const [templates, setTemplates] = useState<ReportTemplate[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [settings, setSettings] = useState<ReportSettings>({
        language: locale === 'ar' ? 'arabic' : 'english',
        template: 'comprehensive',
        include_charts: true,
        include_recommendations: true,
        watermark: false
    });

    const isArabic = locale === 'ar';

    // Default templates if API fails
    const defaultTemplates: ReportTemplate[] = [
        {
            id: 'comprehensive',
            name: 'Comprehensive Report',
            name_ar: 'تقرير شامل',
            description: 'Complete assessment report with all details',
            description_ar: 'تقرير تقييم كامل مع جميع التفاصيل',
            pages: '8-12',
            includes: ['client_info', 'results', 'charts', 'recommendations', 'action_plan']
        },
        {
            id: 'summary',
            name: 'Executive Summary',
            name_ar: 'ملخص تنفيذي',
            description: 'Brief overview with key findings',
            description_ar: 'نظرة عامة موجزة مع النتائج الرئيسية',
            pages: '3-5',
            includes: ['client_info', 'overall_score', 'key_recommendations']
        },
        {
            id: 'detailed',
            name: 'Detailed Analysis',
            name_ar: 'تحليل مفصل',
            description: 'In-depth analysis with category breakdowns',
            description_ar: 'تحليل متعمق مع تفصيل الفئات',
            pages: '10-15',
            includes: ['client_info', 'results', 'category_breakdown', 'charts', 'detailed_recommendations']
        }
    ];

    // Set default templates on mount
    useEffect(() => {
        setTemplates(defaultTemplates);
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            const response = await fetch('/api/reports/templates', {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data) {
                    setTemplates(data.data);
                }
            }
        } catch (error) {
            console.log('Using default templates - API not available');
            // Keep default templates
        }
    };

    const generatePDF = async () => {
        setIsGenerating(true);
        setError(null);
        setSuccess(null);

        try {
            // Prepare request parameters
            const params = new URLSearchParams({
                language: settings.language,
                template: settings.template,
                include_charts: settings.include_charts ? '1' : '0',
                include_recommendations: settings.include_recommendations ? '1' : '0',
                watermark: settings.watermark ? '1' : '0'
            });

            // Get CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            // Create URL for PDF generation
            const url = isGuest
                ? `/guest/assessments/${assessment.id}/report?${params}`
                : `/assessments/${assessment.id}/report?${params}`;

            console.log('PDF Generation URL:', url);

            // Use fetch to handle the request properly
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken })
                }
            });

            if (!response.ok) {
                // Try to get error message from response
                const errorText = await response.text();
                console.error('PDF generation failed:', response.status, errorText);
                throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to generate PDF'}`);
            }

            // Get the PDF blob
            const blob = await response.blob();

            // Verify it's actually a PDF
            if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
                console.error('Response is not a PDF:', blob.type);
                throw new Error('Server did not return a PDF file');
            }

            // Create download link
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `assessment-report-${assessment.id}-${Date.now()}.pdf`;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            window.URL.revokeObjectURL(downloadUrl);

            setSuccess(isArabic ? 'تم إنتاج التقرير وتحميله بنجاح!' : 'Report generated and downloaded successfully!');

        } catch (error: any) {
            console.error('PDF generation error:', error);

            let errorMessage = isArabic ? 'حدث خطأ في إنتاج التقرير' : 'Failed to generate report';

            if (error.message.includes('HTTP 500')) {
                errorMessage = isArabic
                    ? 'خطأ في الخادم - يرجى المحاولة مرة أخرى'
                    : 'Server error - please try again';
            } else if (error.message.includes('HTTP 403')) {
                errorMessage = isArabic
                    ? 'ليس لديك صلاحية للوصول لهذا التقرير'
                    : 'You do not have permission to access this report';
            } else if (error.message.includes('HTTP 404')) {
                errorMessage = isArabic
                    ? 'التقييم غير موجود'
                    : 'Assessment not found';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    };

    const getAssessorName = () => {
        return assessment.name || 'Unknown';
    };

    const getStatusBadge = () => {
        const status = assessment.status;
        const colors = {
            'completed': 'bg-green-100 text-green-800 border-green-200',
            'in_progress': 'bg-blue-100 text-blue-800 border-blue-200',
            'draft': 'bg-gray-100 text-gray-800 border-gray-200'
        };

        const labels = {
            'completed': isArabic ? 'مكتمل' : 'Completed',
            'in_progress': isArabic ? 'قيد التنفيذ' : 'In Progress',
            'draft': isArabic ? 'مسودة' : 'Draft'
        };

        return (
            <Badge className={colors[status as keyof typeof colors] || colors.draft}>
                {labels[status as keyof typeof labels] || status}
            </Badge>
        );
    };

    const getCertificationLevel = (score: number) => {
        if (score >= 90) {
            return {
                level: isArabic ? 'اعتماد كامل' : 'Full Certification',
                color: 'text-green-600',
                bgColor: 'bg-green-100'
            };
        } else if (score >= 80) {
            return {
                level: isArabic ? 'اعتماد مشروط' : 'Conditional Certification',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-100'
            };
        } else {
            return {
                level: isArabic ? 'اعتماد مرفوض' : 'Certification Denied',
                color: 'text-red-600',
                bgColor: 'bg-red-100'
            };
        }
    };

    // Check if assessment can generate report
    const canGenerateReport = () => {
        // Allow generation for completed assessments or if results are provided
        return assessment.status === 'completed' || (results && results.overall_percentage !== undefined);
    };

    return (
        <div className={`space-y-6 ${isArabic ? 'rtl' : 'ltr'}`}>
            {/* Header */}
            <Card className="border-t-4 border-t-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        {isArabic ? 'تحميل التقرير' : 'Download Report'}
                    </CardTitle>
                    <CardDescription>
                        {isArabic
                            ? 'قم بتحميل تقرير مفصل عن نتائج التقييم'
                            : 'Download a detailed report of your assessment results'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Assessment Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                {isArabic ? 'المقيم' : 'Assessor'}
                            </div>
                            <div className="font-semibold">{getAssessorName()}</div>
                            <div className="text-sm text-gray-500">{assessment.email}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Building className="w-4 h-4" />
                                {isArabic ? 'المؤسسة' : 'Organization'}
                            </div>
                            <div className="font-semibold">{assessment.organization || (isArabic ? 'غير محدد' : 'Not specified')}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                {isArabic ? 'تاريخ الإنشاء' : 'Created Date'}
                            </div>
                            <div className="font-semibold">
                                {new Date(assessment.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Award className="w-4 h-4" />
                                {isArabic ? 'الحالة' : 'Status'}
                            </div>
                            <div>{getStatusBadge()}</div>
                        </div>
                    </div>

                    {/* Tool Information */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                            {isArabic ? assessment.tool.name_ar : assessment.tool.name_en}
                        </h4>
                        <p className="text-blue-700 text-sm">
                            {isArabic ? 'أداة التقييم المستخدمة' : 'Assessment tool used'}
                        </p>
                    </div>

                    {/* Score Display */}
                    {results && results.overall_percentage !== undefined && (
                        <div className="mb-6 text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                {Math.round(results.overall_percentage)}%
                            </div>
                            <div className={`inline-block px-4 py-2 rounded-full ${getCertificationLevel(results.overall_percentage).bgColor} ${getCertificationLevel(results.overall_percentage).color}`}>
                                {getCertificationLevel(results.overall_percentage).level}
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{results.yes_count}</div>
                                    <div className="text-sm text-gray-600">{isArabic ? 'نعم' : 'Yes'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{results.no_count}</div>
                                    <div className="text-sm text-gray-600">{isArabic ? 'لا' : 'No'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-600">{results.na_count}</div>
                                    <div className="text-sm text-gray-600">{isArabic ? 'غير قابل' : 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Report Settings */}
                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {isArabic ? 'إعدادات التقرير' : 'Report Settings'}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Language Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    {isArabic ? 'اللغة' : 'Language'}
                                </label>
                                <select
                                    value={settings.language}
                                    onChange={(e) => setSettings(prev => ({...prev, language: e.target.value as any}))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="arabic">{isArabic ? 'العربية' : 'Arabic'}</option>
                                    <option value="english">{isArabic ? 'الإنجليزية' : 'English'}</option>
                                    <option value="bilingual">{isArabic ? 'ثنائي اللغة' : 'Bilingual'}</option>
                                </select>
                            </div>

                            {/* Template Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    {isArabic ? 'نوع التقرير' : 'Report Template'}
                                </label>
                                <select
                                    value={settings.template}
                                    onChange={(e) => setSettings(prev => ({...prev, template: e.target.value}))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    {templates.map(template => (
                                        <option key={template.id} value={template.id}>
                                            {isArabic ? template.name_ar : template.name} ({template.pages} {isArabic ? 'صفحات' : 'pages'})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Options */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    {isArabic ? 'خيارات إضافية' : 'Options'}
                                </label>
                                <div className="space-y-1">
                                    <label className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={settings.include_charts}
                                            onChange={(e) => setSettings(prev => ({...prev, include_charts: e.target.checked}))}
                                            className="mr-2"
                                        />
                                        {isArabic ? 'الرسوم البيانية' : 'Charts'}
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={settings.include_recommendations}
                                            onChange={(e) => setSettings(prev => ({...prev, include_recommendations: e.target.checked}))}
                                            className="mr-2"
                                        />
                                        {isArabic ? 'التوصيات' : 'Recommendations'}
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={settings.watermark}
                                            onChange={(e) => setSettings(prev => ({...prev, watermark: e.target.checked}))}
                                            className="mr-2"
                                        />
                                        {isArabic ? 'علامة مائية' : 'Watermark'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 mb-4">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <div className="flex-1">
                                <div className="font-medium">
                                    {isArabic ? 'خطأ في إنتاج التقرير' : 'PDF Generation Error'}
                                </div>
                                <div className="text-sm mt-1">{error}</div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 mb-4">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <div className="flex-1">
                                <div className="font-medium">{success}</div>
                                <div className="text-sm mt-1">
                                    {isArabic ? 'تحقق من مجلد التحميلات الخاص بك' : 'Check your downloads folder'}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Generate Button */}
                    <div className="text-center">
                        <Button
                            onClick={generatePDF}
                            disabled={isGenerating || !canGenerateReport()}
                            className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    {isArabic ? 'جاري الإنتاج...' : 'Generating...'}
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5 mr-2" />
                                    {isArabic ? 'إنتاج تقرير PDF' : 'Generate PDF Report'}
                                </>
                            )}
                        </Button>

                        {!canGenerateReport() && (
                            <p className="text-sm text-gray-500 mt-2">
                                {isArabic
                                    ? `حالة التقييم: ${assessment.status} - يحتاج إكمال التقييم أولاً`
                                    : `Assessment status: ${assessment.status} - Please complete the assessment first`
                                }
                            </p>
                        )}
                    </div>

                    {/* Debug Information (remove in production) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                            <strong>Debug Info:</strong><br/>
                            Assessment ID: {assessment.id}<br/>
                            Is Guest: {isGuest.toString()}<br/>
                            Status: {assessment.status}<br/>
                            Has Results: {(results && results.overall_percentage !== undefined).toString()}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PDFGeneratorComponent;
