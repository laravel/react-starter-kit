import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect, useMemo } from 'react';
import {
    CheckCircle,
    XCircle,
    MinusCircle,
    ArrowLeft,
    ArrowRight,
    Upload,
    FileText,
    Globe,
    Clock,
    Award,
    BarChart3
} from 'lucide-react';

interface Criterion {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    description?: string;
    description_en?: string;
    description_ar?: string;
    requires_attachment: number; // 0 = false, 1 = true
}

interface Category {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    criteria: Criterion[];
}

interface Domain {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    description?: string;
    description_en?: string;
    description_ar?: string;
    categories: Category[];
}

interface Tool {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    domains: Domain[];
}

interface Assessment {
    id: number;
    name: string;
    email: string;
    status: string;
    tool: Tool;
}

interface ExistingResponse {
    criterion_id: number;
    response: 'yes' | 'no' | 'na';
    notes?: string;
    attachment?: string;
}

interface TakeProps {
    assessment: Assessment;
    tool: Tool;
    existingResponses: Record<string, ExistingResponse>;
    completionPercentage: number;
}

interface Translations {
    en: {
        assessment: string;
        progress: string;
        criteria: string;
        yes: string;
        no: string;
        notApplicable: string;
        selected: string;
        additionalInfo: string;
        notes: string;
        notesPlaceholder: string;
        requiredAttachment: string;
        provideDocumentation: string;
        supportedFormats: string;
        supportingDocument: string;
        optionalDocument: string;
        assessmentComplete: string;
        submitAssessment: string;
        requiresAttachment: string;
        submitting: string;
        continue: string;
        back: string;
        next: string;
        optional: string;
    };
    ar: {
        assessment: string;
        progress: string;
        criteria: string;
        yes: string;
        no: string;
        notApplicable: string;
        selected: string;
        additionalInfo: string;
        notes: string;
        notesPlaceholder: string;
        requiredAttachment: string;
        provideDocumentation: string;
        supportedFormats: string;
        supportingDocument: string;
        optionalDocument: string;
        assessmentComplete: string;
        submitAssessment: string;
        requiresAttachment: string;
        submitting: string;
        continue: string;
        back: string;
        next: string;
        optional: string;
    };
}

const translations: Translations = {
    en: {
        assessment: "Assessment",
        progress: "Progress",
        criteria: "criteria",
        yes: "Yes",
        no: "No",
        notApplicable: "Not Applicable",
        selected: "Selected",
        additionalInfo: "Additional Information",
        notes: "Notes (Optional)",
        notesPlaceholder: "Add any notes, comments, or explanations...",
        requiredAttachment: "Required Attachment *",
        provideDocumentation: "Please provide supporting documentation for your \"Yes\" response",
        supportedFormats: "Supported: PDF, DOC, DOCX, JPG, PNG, TXT (max 10MB)",
        supportingDocument: "Supporting Document",
        optionalDocument: "Optional: Add supporting documentation",
        assessmentComplete: "Assessment Complete!",
        submitAssessment: "Submit Assessment",
        requiresAttachment: "This question requires attachment if answered \"Yes\"",
        submitting: "Submitting...",
        continue: "Continue",
        back: "Back",
        next: "Next",
        optional: "Optional"
    },
    ar: {
        assessment: "التقييم",
        progress: "التقدم",
        criteria: "معايير",
        yes: "نعم",
        no: "لا",
        notApplicable: "غير قابل للتطبيق",
        selected: "محدد",
        additionalInfo: "معلومات إضافية",
        notes: "ملاحظات (اختياري)",
        notesPlaceholder: "أضف أي ملاحظات أو تعليقات أو توضيحات...",
        requiredAttachment: "مرفق مطلوب *",
        provideDocumentation: "يرجى تقديم مستندات داعمة لإجابتك بـ \"نعم\"",
        supportedFormats: "المدعوم: PDF, DOC, DOCX, JPG, PNG, TXT (الحد الأقصى 10 ميجابايت)",
        supportingDocument: "مستند داعم",
        optionalDocument: "اختياري: إضافة مستندات داعمة",
        assessmentComplete: "اكتمل التقييم!",
        submitAssessment: "إرسال التقييم",
        requiresAttachment: "هذا السؤال يتطلب مرفق إذا تم الإجابة بـ \"نعم\"",
        submitting: "جاري الإرسال...",
        continue: "متابعة",
        back: "رجوع",
        next: "التالي",
        optional: "اختياري"
    }
};

export default function Take({ assessment, tool, existingResponses, completionPercentage: initialCompletion }: TakeProps) {
    const [responses, setResponses] = useState<Record<number, 'yes' | 'no' | 'na'>>({});
    const [notes, setNotes] = useState<Record<number, string>>({});
    const [attachments, setAttachments] = useState<Record<number, File | null>>({});
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize responses from existing data
    useEffect(() => {
        const initialResponses: Record<number, 'yes' | 'no' | 'na'> = {};
        const initialNotes: Record<number, string> = {};
        Object.values(existingResponses).forEach((response) => {
            initialResponses[response.criterion_id] = response.response;
            if (response.notes) {
                initialNotes[response.criterion_id] = response.notes;
            }
        });
        setResponses(initialResponses);
        setNotes(initialNotes);
    }, [existingResponses]);

    // Flatten all criteria into a single array
    const allCriteria = useMemo(() => {
        const criteria: Criterion[] = [];
        tool.domains.forEach(domain => {
            domain.categories.forEach(category => {
                category.criteria.forEach(criterion => {
                    criteria.push(criterion);
                });
            });
        });
        return criteria;
    }, [tool]);

    const totalCriteria = allCriteria.length;

    // Calculate real-time completion percentage
    const completionPercentage = useMemo(() => {
        const answeredCount = allCriteria.filter(criterion => responses[criterion.id]).length;
        return totalCriteria > 0 ? (answeredCount / totalCriteria) * 100 : 0;
    }, [responses, allCriteria, totalCriteria]);

    // Check if assessment is complete
    const isComplete = useMemo(() => {
        // Check if all criteria have responses
        const allAnswered = allCriteria.every(criterion => responses[criterion.id]);

        // Check if all required attachments are provided
        const requiredAttachmentsValid = allCriteria.every(criterion => {
            // Only check for attachment if requires_attachment is 1 (true) and response is 'yes'
            if (criterion.requires_attachment === 1 && responses[criterion.id] === 'yes') {
                return attachments[criterion.id] !== null && attachments[criterion.id] !== undefined;
            }
            return true;
        });

        return allAnswered && requiredAttachmentsValid;
    }, [responses, attachments, allCriteria]);

    const t = translations[language];

    const handleResponseChange = async (criterionId: number, response: 'yes' | 'no' | 'na') => {
        setResponses(prev => ({ ...prev, [criterionId]: response }));

        const formData = new FormData();
        formData.append('criterion_id', criterionId.toString());
        formData.append('response', response);

        // Add notes if exists
        if (notes[criterionId]) {
            formData.append('notes', notes[criterionId]);
        }

        // Add attachment if exists
        if (attachments[criterionId]) {
            formData.append('attachment', attachments[criterionId]!);
        }

        try {
            const result = await fetch(route('assessment.save-response', assessment.id), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            const data = await result.json();
            if (!data.success) {
                console.error('Error saving response:', data.message);
            }
        } catch (error) {
            console.error('Error saving response:', error);
        }
    };

    const handleNotesChange = (criterionId: number, value: string) => {
        setNotes(prev => ({ ...prev, [criterionId]: value }));
    };

    const handleAttachmentChange = (criterionId: number, file: File | null) => {
        setAttachments(prev => ({ ...prev, [criterionId]: file }));
    };

    const submitAssessment = async () => {
        if (!isComplete || isSubmitting) return;

        setIsSubmitting(true);

        const submissionData = {
            responses: {}
        };

        Object.entries(responses).forEach(([criterionId, response]) => {
            submissionData.responses[criterionId] = {
                criterion_id: parseInt(criterionId),
                response: response,
            };

            if (notes[criterionId]) {
                submissionData.responses[criterionId].notes = notes[criterionId];
            }

            if (attachments[criterionId]) {
                submissionData.responses[criterionId].attachment = attachments[criterionId];
            }
        });

        router.post(route('assessment.submit', assessment.id), submissionData, {
            onSuccess: () => {
                router.visit(route('assessment.results', assessment.id));
            },
            onError: (errors) => {
                console.error('Error submitting assessment:', errors);
                setIsSubmitting(false);
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const getLocalizedText = (item: any, field: string) => {
        return language === 'ar' ? item[`${field}_ar`] : item[`${field}_en`];
    };

    const completedCriteria = Object.keys(responses).filter(id => responses[parseInt(id)]?.response).length;

    return (
        <>
            <Head title={`${getLocalizedText(tool, 'name')} ${t.assessment}`} />

            <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-xl font-semibold text-gray-900">{getLocalizedText(tool, 'name')}</h1>
                                <span className="text-sm text-gray-500">{t.assessment}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleLanguage}
                                    className="flex items-center space-x-2"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span>{language === 'en' ? 'عربي' : 'English'}</span>
                                </Button>
                                <div className="text-sm text-gray-600">
                                    {t.progress}: {Math.round(completionPercentage)}%
                                </div>
                                <Progress value={completionPercentage} className="w-32" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {tool.domains.map((domain) => (
                                <div key={domain.id} className="space-y-6">
                                    {domain.categories.map((category) => (
                                        <div key={category.id} className="space-y-4">
                                            {category.criteria.map((criterion) => (
                                                <Card key={criterion.id}>
                                                    <CardContent className="space-y-4 p-4 border rounded-lg bg-gray-50">
                                                        <div className="space-y-2">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium text-base leading-tight">
                                                                        {getLocalizedText(criterion, 'name')}
                                                                    </h4>
                                                                    {getLocalizedText(criterion, 'description') && (
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                            {getLocalizedText(criterion, 'description')}
                                                                        </p>
                                                                    )}
                                                                    {criterion.requires_attachment === 1 && (
                                                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2">
                                                                            <div className="flex items-center">
                                                                                <Upload className="w-4 h-4 text-yellow-600 mr-2" />
                                                                                <span className="text-xs text-yellow-800 font-medium">
                                                                                        {t.requiresAttachment}
                                                                                    </span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {responses[criterion.id] && (
                                                                    <div className="flex items-center ml-4">
                                                                        {responses[criterion.id] === 'yes' && (
                                                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                                                        )}
                                                                        {responses[criterion.id] === 'no' && (
                                                                            <XCircle className="w-5 h-5 text-red-600" />
                                                                        )}
                                                                        {responses[criterion.id] === 'na' && (
                                                                            <MinusCircle className="w-5 h-5 text-gray-600" />
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Response Buttons */}
                                                        <div className="flex justify-center space-x-3">
                                                            <Button
                                                                variant={responses[criterion.id] === 'yes' ? 'default' : 'outline'}
                                                                size="sm"
                                                                onClick={() => handleResponseChange(criterion.id, 'yes')}
                                                                className={responses[criterion.id] === 'yes' ? 'bg-green-600 hover:bg-green-700 text-white' : 'hover:bg-green-50 hover:border-green-300'}
                                                            >
                                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                                {t.yes}
                                                            </Button>
                                                            <Button
                                                                variant={responses[criterion.id] === 'no' ? 'default' : 'outline'}
                                                                size="sm"
                                                                onClick={() => handleResponseChange(criterion.id, 'no')}
                                                                className={responses[criterion.id] === 'no' ? 'bg-red-600 hover:bg-red-700 text-white' : 'hover:bg-red-50 hover:border-red-300'}
                                                            >
                                                                <XCircle className="w-4 h-4 mr-1" />
                                                                {t.no}
                                                            </Button>
                                                            <Button
                                                                variant={responses[criterion.id] === 'na' ? 'default' : 'outline'}
                                                                size="sm"
                                                                onClick={() => handleResponseChange(criterion.id, 'na')}
                                                                className={responses[criterion.id] === 'na' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'hover:bg-gray-50 hover:border-gray-300'}
                                                            >
                                                                <MinusCircle className="w-4 h-4 mr-1" />
                                                                {t.notApplicable}
                                                            </Button>
                                                        </div>

                                                        {/* Selected Response Indicator */}
                                                        {responses[criterion.id] && (
                                                            <div className="text-center">
                                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                                        {t.selected}: {responses[criterion.id].toUpperCase()}
                                                                    </span>
                                                            </div>
                                                        )}

                                                        {/* Notes and Attachment Section - Only show if there's a response */}
                                                        {responses[criterion.id] && (
                                                            <div className="space-y-4 pt-4 border-t">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor={`notes_${criterion.id}`} className="flex items-center">
                                                                        <FileText className="w-4 h-4 mr-2" />
                                                                        {t.notes}
                                                                    </Label>
                                                                    <Textarea
                                                                        id={`notes_${criterion.id}`}
                                                                        value={notes[criterion.id] || ''}
                                                                        onChange={(e) => handleNotesChange(criterion.id, e.target.value)}
                                                                        placeholder={t.notesPlaceholder}
                                                                        rows={2}
                                                                    />
                                                                </div>

                                                                {/* Required attachment for "yes" responses ONLY when requires_attachment is 1/true */}
                                                                {criterion.requires_attachment === 1 && responses[criterion.id] === 'yes' && (
                                                                    <div className="border-2 border-dashed border-yellow-300 rounded-lg p-4 bg-yellow-50">
                                                                        <Label htmlFor={`attachment_${criterion.id}`} className="text-yellow-800 font-medium">
                                                                            {t.requiredAttachment}
                                                                        </Label>
                                                                        <p className="text-sm text-yellow-700 mb-2">
                                                                            {t.provideDocumentation}
                                                                        </p>
                                                                        <Input
                                                                            id={`attachment_${criterion.id}`}
                                                                            type="file"
                                                                            onChange={(e) => handleAttachmentChange(criterion.id, e.target.files?.[0] || null)}
                                                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                                                                            className="bg-white"
                                                                        />
                                                                        <p className="text-xs text-yellow-600 mt-1">
                                                                            {t.supportedFormats}
                                                                        </p>
                                                                    </div>
                                                                )}

                                                                {/* Optional attachment for other responses - Only show when requires_attachment is 0/false */}
                                                                {criterion.requires_attachment !== 1 && (
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor={`attachment_${criterion.id}`} className="flex items-center">
                                                                            <Upload className="w-4 h-4 mr-2" />
                                                                            {t.supportingDocument} ({t.optional})
                                                                        </Label>
                                                                        <Input
                                                                            id={`attachment_${criterion.id}`}
                                                                            type="file"
                                                                            onChange={(e) => handleAttachmentChange(criterion.id, e.target.files?.[0] || null)}
                                                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                                                                        />
                                                                        <p className="text-sm text-gray-500">
                                                                            {t.optionalDocument}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Submit Assessment */}
                        <Card className="mt-6">
                            <CardContent className="pt-6">
                                <div className="text-center space-y-4">
                                    <div className="space-y-2">
                                        <div className="text-lg font-medium">
                                            {completedCriteria} / {totalCriteria} {t.criteria} completed
                                        </div>
                                        <Progress value={completionPercentage} className="max-w-md mx-auto" />
                                    </div>

                                    {isComplete ? (
                                        <div className="space-y-2">
                                            <div className="text-green-600 font-medium flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                {t.assessmentComplete}
                                            </div>
                                            <Button
                                                onClick={submitAssessment}
                                                size="lg"
                                                disabled={isSubmitting}
                                                className="bg-green-600 hover:bg-green-700 px-8"
                                            >
                                                <Award className="w-5 h-5 mr-2" />
                                                {isSubmitting ? t.submitting : t.submitAssessment}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-gray-600">
                                            Complete all criteria to submit your assessment
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
