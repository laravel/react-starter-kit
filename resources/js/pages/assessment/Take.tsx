import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect, useMemo } from 'react';
import {
    CheckCircle,
    XCircle,
    MinusCircle,
    Upload,
    FileText,
    Globe,
    Award,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    Save,
    AlertCircle,
    Zap
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

const translations = {
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
        optional: "Optional",
        saveProgress: "Progress Saved",
        question: "Question",
        of: "of",
        questionsCompleted: "Questions Completed"
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
        optional: "اختياري",
        saveProgress: "تم حفظ التقدم",
        question: "السؤال",
        of: "من",
        questionsCompleted: "الأسئلة المكتملة"
    }
};

export default function Take({ assessment, tool, existingResponses, completionPercentage: initialCompletion }: TakeProps) {
    const [responses, setResponses] = useState<Record<number, 'yes' | 'no' | 'na'>>({});
    const [notes, setNotes] = useState<Record<number, string>>({});
    const [attachments, setAttachments] = useState<Record<number, File | null>>({});
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

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

    // Flatten all criteria into a single array (hide domain/category structure)
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
    const currentCriterion = allCriteria[currentQuestionIndex];

    // Calculate real-time completion percentage
    const completionPercentage = useMemo(() => {
        const answeredCount = allCriteria.filter(criterion => responses[criterion.id]).length;
        return totalCriteria > 0 ? (answeredCount / totalCriteria) * 100 : 0;
    }, [responses, allCriteria, totalCriteria]);

    // Check if assessment is complete
    const isComplete = useMemo(() => {
        const allAnswered = allCriteria.every(criterion => responses[criterion.id]);

        const requiredAttachmentsValid = allCriteria.every(criterion => {
            // Only check for attachment if requires_attachment is 1 and response is 'yes'
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

        if (notes[criterionId]) {
            formData.append('notes', notes[criterionId]);
        }

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
            if (data.success) {
                setLastSaved(new Date());
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

        const submissionData = { responses: {} };

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

    const navigateToNext = () => {
        if (currentQuestionIndex < totalCriteria - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const navigateToPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const navigateToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    if (!currentCriterion) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head title={`${getLocalizedText(tool, 'name')} ${t.assessment}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Floating Progress Indicator */}
                <div className="fixed top-4 right-4 z-50">
                    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">
                                        {Math.round(completionPercentage)}% {t.progress}
                                    </div>
                                    <Progress value={completionPercentage} className="w-24 h-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900">{getLocalizedText(tool, 'name')}</h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>{t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {lastSaved && (
                                    <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        <Save className="w-3 h-3 mr-1" />
                                        {t.saveProgress}
                                    </div>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleLanguage}
                                    className="flex items-center space-x-2"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span>{language === 'en' ? 'عربي' : 'English'}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Question Progress Overview */}
                        <Card className="mb-6 border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <FileText className="w-5 h-5" />
                                            <span className="text-sm opacity-90">{t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold mb-2">{t.questionsCompleted}</h2>
                                        <p className="text-blue-100">{completedCriteria} out of {totalCriteria} questions answered</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">
                                            {Math.round(completionPercentage)}%
                                        </div>
                                        <div className="text-sm opacity-90">Complete</div>
                                    </div>
                                </div>
                                <Progress
                                    value={completionPercentage}
                                    className="mt-4 bg-white/20"
                                />
                            </CardContent>
                        </Card>

                        {/* Current Question */}
                        <Card className="border-0 shadow-2xl">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                            {currentQuestionIndex + 1}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{getLocalizedText(currentCriterion, 'name')}</CardTitle>
                                            {getLocalizedText(currentCriterion, 'description') && (
                                                <CardDescription className="mt-1 text-base">
                                                    {getLocalizedText(currentCriterion, 'description')}
                                                </CardDescription>
                                            )}
                                        </div>
                                    </div>
                                    {responses[currentCriterion.id] && (
                                        <div className="flex items-center">
                                            {responses[currentCriterion.id] === 'yes' && (
                                                <CheckCircle className="w-8 h-8 text-green-600" />
                                            )}
                                            {responses[currentCriterion.id] === 'no' && (
                                                <XCircle className="w-8 h-8 text-red-600" />
                                            )}
                                            {responses[currentCriterion.id] === 'na' && (
                                                <MinusCircle className="w-8 h-8 text-gray-600" />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Attachment Requirement Warning */}
                                {currentCriterion.requires_attachment === 1 && (
                                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                                        <div className="flex items-center">
                                            <AlertCircle className="w-4 h-4 text-amber-600 mr-2" />
                                            <span className="text-sm text-amber-800 font-medium">
                                                {t.requiresAttachment}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CardHeader>

                            <CardContent className="p-8">
                                {/* Response Buttons */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Button
                                            variant={responses[currentCriterion.id] === 'yes' ? 'default' : 'outline'}
                                            size="lg"
                                            onClick={() => handleResponseChange(currentCriterion.id, 'yes')}
                                            className={`h-16 transition-all duration-200 ${
                                                responses[currentCriterion.id] === 'yes'
                                                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg scale-105'
                                                    : 'hover:bg-green-50 hover:border-green-300 hover:scale-105'
                                            }`}
                                        >
                                            <CheckCircle className="w-6 h-6 mr-3" />
                                            <span className="text-lg">{t.yes}</span>
                                        </Button>
                                        <Button
                                            variant={responses[currentCriterion.id] === 'no' ? 'default' : 'outline'}
                                            size="lg"
                                            onClick={() => handleResponseChange(currentCriterion.id, 'no')}
                                            className={`h-16 transition-all duration-200 ${
                                                responses[currentCriterion.id] === 'no'
                                                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg scale-105'
                                                    : 'hover:bg-red-50 hover:border-red-300 hover:scale-105'
                                            }`}
                                        >
                                            <XCircle className="w-6 h-6 mr-3" />
                                            <span className="text-lg">{t.no}</span>
                                        </Button>
                                        <Button
                                            variant={responses[currentCriterion.id] === 'na' ? 'default' : 'outline'}
                                            size="lg"
                                            onClick={() => handleResponseChange(currentCriterion.id, 'na')}
                                            className={`h-16 transition-all duration-200 ${
                                                responses[currentCriterion.id] === 'na'
                                                    ? 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg scale-105'
                                                    : 'hover:bg-gray-50 hover:border-gray-300 hover:scale-105'
                                            }`}
                                        >
                                            <MinusCircle className="w-6 h-6 mr-3" />
                                            <span className="text-lg">{t.notApplicable}</span>
                                        </Button>
                                    </div>

                                    {/* Selected Response Indicator */}
                                    {responses[currentCriterion.id] && (
                                        <div className="text-center">
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-lg py-2 px-4">
                                                {t.selected}: {responses[currentCriterion.id].toUpperCase()}
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Notes and Attachment Section - Only show if there's a response */}
                                    {responses[currentCriterion.id] && (
                                        <div className="space-y-6 p-6 bg-gray-50 rounded-lg border">
                                            <div className="space-y-3">
                                                <Label htmlFor={`notes_${currentCriterion.id}`} className="flex items-center text-base font-medium">
                                                    <FileText className="w-5 h-5 mr-2" />
                                                    {t.notes}
                                                </Label>
                                                <Textarea
                                                    id={`notes_${currentCriterion.id}`}
                                                    value={notes[currentCriterion.id] || ''}
                                                    onChange={(e) => handleNotesChange(currentCriterion.id, e.target.value)}
                                                    placeholder={t.notesPlaceholder}
                                                    rows={4}
                                                    className="resize-none text-base"
                                                />
                                            </div>

                                            {/* Required attachment - Only show if requires_attachment === 1 AND response is 'yes' */}
                                            {currentCriterion.requires_attachment === 1 && responses[currentCriterion.id] === 'yes' && (
                                                <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 bg-amber-50">
                                                    <Label htmlFor={`attachment_${currentCriterion.id}`} className="text-amber-800 font-medium flex items-center text-base">
                                                        <Upload className="w-5 h-5 mr-2" />
                                                        {t.requiredAttachment}
                                                    </Label>
                                                    <p className="text-sm text-amber-700 mb-3 mt-1">
                                                        {t.provideDocumentation}
                                                    </p>
                                                    <Input
                                                        id={`attachment_${currentCriterion.id}`}
                                                        type="file"
                                                        onChange={(e) => handleAttachmentChange(currentCriterion.id, e.target.files?.[0] || null)}
                                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                                                        className="bg-white border-amber-300 text-base h-12"
                                                    />
                                                    <p className="text-xs text-amber-600 mt-2">
                                                        {t.supportedFormats}
                                                    </p>
                                                </div>
                                            )}

                                            { console.log(currentCriterion.requires_attachment, currentCriterion)}
                                            {currentCriterion.requires_attachment !== 0 && (

                                                <div className="space-y-3">
                                                    <Label htmlFor={`attachment_${currentCriterion.id}`} className="flex items-center text-base">
                                                        <Upload className="w-5 h-5 mr-2" />
                                                        {t.supportingDocument} ({t.optional})
                                                    </Label>
                                                    <Input
                                                        id={`attachment_${currentCriterion.id}`}
                                                        type="file"
                                                        onChange={(e) => handleAttachmentChange(currentCriterion.id, e.target.files?.[0] || null)}
                                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                                                        className="bg-white text-base h-12"
                                                    />
                                                    <p className="text-sm text-gray-500">
                                                        {t.optionalDocument}
                                                    </p>
                                                </div>

                                            )}

                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation */}
                        <Card className="mt-8 border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={navigateToPrev}
                                        disabled={currentQuestionIndex === 0}
                                        className="flex items-center space-x-2"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        <span>{t.back}</span>
                                    </Button>

                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">
                                            {t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}
                                        </div>
                                        <Progress
                                            value={((currentQuestionIndex + 1) / totalCriteria) * 100}
                                            className="w-32"
                                        />
                                    </div>

                                    {currentQuestionIndex < totalCriteria - 1 ? (
                                        <Button
                                            variant="default"
                                            size="lg"
                                            onClick={navigateToNext}
                                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                                        >
                                            <span>{t.next}</span>
                                            <ChevronRight className="w-5 h-5" />
                                        </Button>
                                    ) : (
                                        <div className="w-20"></div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Question Grid Navigation */}
                        <Card className="mt-6 border-0 shadow-lg">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
                                <div className="grid grid-cols-10 gap-2 max-h-40 overflow-y-auto">
                                    {allCriteria.map((criterion, index) => (
                                        <Button
                                            key={criterion.id}
                                            variant={index === currentQuestionIndex ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => navigateToQuestion(index)}
                                            className={`h-10 w-10 p-0 ${
                                                responses[criterion.id] ? 'bg-green-100 border-green-300' : ''
                                            } ${index === currentQuestionIndex ? 'ring-2 ring-blue-500' : ''}`}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Assessment - Only show when complete */}
                        {isComplete && (
                            <Card className="mt-8 border-0 shadow-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                                <CardContent className="p-8 text-center">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                                <Award className="w-8 h-8" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{t.assessmentComplete}</h3>
                                            <p className="text-green-100 mb-6">
                                                You have successfully completed all {totalCriteria} questions.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">{totalCriteria}</div>
                                                <div className="text-sm text-green-100">Total Questions</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">100%</div>
                                                <div className="text-sm text-green-100">Complete</div>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={submitAssessment}
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-3"></div>
                                                    {t.submitting}
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="w-5 h-5 mr-2" />
                                                    {t.submitAssessment}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Progress Summary - Always visible */}
                        {!isComplete && (
                            <Card className="mt-8 border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <div className="flex items-center justify-center space-x-2 mb-4">
                                            <BarChart3 className="w-6 h-6 text-blue-600" />
                                            <h3 className="text-xl font-semibold">{t.progress} Overview</h3>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{completedCriteria}</div>
                                                <div className="text-sm text-blue-800">Completed</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-600">{totalCriteria - completedCriteria}</div>
                                                <div className="text-sm text-gray-800">Remaining</div>
                                            </div>
                                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">{Math.round(completionPercentage)}%</div>
                                                <div className="text-sm text-green-800">Progress</div>
                                            </div>
                                        </div>

                                        <Progress value={completionPercentage} className="h-3" />

                                        <p className="text-gray-600 mt-4">
                                            Complete all questions to submit your assessment and receive detailed results.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
