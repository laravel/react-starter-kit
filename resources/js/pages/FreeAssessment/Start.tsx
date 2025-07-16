import AssessmentHeader from '@/components/assessment-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/use-language';
import { Head, router, useForm } from '@inertiajs/react';
import {
    ArrowUp,
    Award,
    BarChart3,
    CheckCheck,
    CheckCircle,
    Clock,
    Cloud,
    File,
    FileText,
    MinusCircle,
    Paperclip,
    Upload,
    X,
    XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Criterion {
    id: number;
    text_en: string;
    text_ar: string;
    requires_file: boolean;
}

interface Category {
    id: number;
    name_en: string;
    name_ar: string;
    criteria: Criterion[];
}

interface Domain {
    id: number;
    name_en: string;
    name_ar: string;
    categories: Category[];
}

interface Tool {
    id: number;
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

interface AssessmentData {
    id: number;
    name: string;
    email: string;
    status: string;
    tool: Tool;
    responses?: Record<string, any>;
}

interface TakeProps {
    assessmentData: AssessmentData;
    locale: string;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function Start({ assessmentData, locale, auth, existingNotes }: TakeProps) {
    const [responses, setResponses] = useState<Record<number, 'yes' | 'no' | 'na'>>(
        // Initialize with existing responses if in edit mode
        () => {
            const initial: Record<number, 'yes' | 'no' | 'na'> = {};
            if (assessmentData.responses) {
                Object.entries(assessmentData.responses).forEach(([criterionId, response]) => {
                    // Handle both string responses and any other format
                    const criterionIdNum = parseInt(criterionId);
                    if (typeof response === 'string' && ['yes', 'no', 'na'].includes(response)) {
                        initial[criterionIdNum] = response as 'yes' | 'no' | 'na';
                    } else if (typeof response === 'number') {
                        // Convert score to response format as fallback
                        if (response === 100) initial[criterionIdNum] = 'yes';
                        else if (response === 0) initial[criterionIdNum] = 'no';
                        else if (response === 50) initial[criterionIdNum] = 'na';
                    }
                });
            }
            return initial;
        },
    );
    const [notes, setNotes] = useState<Record<number, string>>(existingNotes || {});
    const [files, setFiles] = useState<Record<number, File | null>>({});
    const { language } = useLanguage();
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Form for submission
    const { data, setData, processing } = useForm({
        responses: {},
        notes: {},
        files: {},
    });

    // Flatten all criteria into a single array with domain and category info
    const allCriteria = useMemo(() => {
        const criteria: (Criterion & { domainName: string; categoryName: string; domainId: number; categoryId: number })[] = [];
        assessmentData.tool.domains.forEach((domain) => {
            domain.categories.forEach((category) => {
                category.criteria.forEach((criterion) => {
                    criteria.push({
                        ...criterion,
                        domainName: language === 'ar' ? domain.name_ar : domain.name_en,
                        categoryName: language === 'ar' ? category.name_ar : category.name_en,
                        domainId: domain.id,
                        categoryId: category.id,
                    });
                });
            });
        });
        return criteria;
    }, [assessmentData.tool, language]);

    const totalCriteria = allCriteria.length;

    // Calculate completion percentage
    const completionPercentage = useMemo(() => {
        const answeredCount = Object.keys(responses).length;
        return totalCriteria > 0 ? (answeredCount / totalCriteria) * 100 : 0;
    }, [responses, totalCriteria]);

    // Check if assessment is complete
    const isComplete = useMemo(() => {
        return allCriteria.every((criterion) => {
            const hasResponse = responses[criterion.id];
            const hasRequiredFile = !criterion.requires_file || responses[criterion.id] !== 'yes' || files[criterion.id];
            return hasResponse && hasRequiredFile;
        });
    }, [responses, files, allCriteria]);

    const t = {
        en: {
            assessment: 'Assessment',
            question: 'Question',
            of: 'of',
            yes: 'Yes',
            no: 'No',
            notApplicable: 'Not Applicable',
            notes: 'Notes (Optional)',
            notesPlaceholder: 'Add any notes or comments...',
            complete: 'Complete',
            completed: 'Completed',
            remaining: 'Remaining',
            progress: 'Progress',
            submitAssessment: 'Submit Assessment',
            assessmentComplete: 'Assessment Complete!',
            submitting: 'Submitting...',
            totalQuestions: 'Total Questions',
            attachmentRequired: 'Attachment Required',
            uploadFile: 'Upload Supporting Document',
            changeFile: 'Change File',
            removeFile: 'Remove File',
            dragDropFile: 'Drag and drop a file here, or click to select',
            fileUploaded: 'File uploaded successfully',
            scrollToTop: 'Scroll to top',
            startAssessment: "Let's get started with your assessment",
            welcomeMessage: 'Please answer all questions honestly and provide any required documentation.',
        },
        ar: {
            assessment: 'التقييم',
            question: 'السؤال',
            of: 'من',
            yes: 'نعم',
            no: 'لا',
            notApplicable: 'غير قابل للتطبيق',
            notes: 'ملاحظات (اختياري)',
            notesPlaceholder: 'أضف أي ملاحظات أو تعليقات...',
            complete: 'مكتمل',
            completed: 'مكتمل',
            remaining: 'متبقي',
            progress: 'التقدم',
            submitAssessment: 'إرسال التقييم',
            assessmentComplete: 'اكتمل التقييم!',
            submitting: 'جاري الإرسال...',
            totalQuestions: 'إجمالي الأسئلة',
            attachmentRequired: 'مرفق مطلوب',
            uploadFile: 'رفع وثيقة داعمة',
            changeFile: 'تغيير الملف',
            removeFile: 'إزالة الملف',
            dragDropFile: 'اسحب وأفلت ملفًا هنا، أو انقر للاختيار',
            fileUploaded: 'تم رفع الملف بنجاح',
            scrollToTop: 'التمرير إلى الأعلى',
            startAssessment: 'لنبدأ بتقييمك',
            welcomeMessage: 'يرجى الإجابة على جميع الأسئلة بصدق وتقديم أي وثائق مطلوبة.',
        },
    }[language];

    // Handle scroll to show/hide scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleResponseChange = (criterionId: number, response: 'yes' | 'no' | 'na') => {
        setResponses((prev) => ({ ...prev, [criterionId]: response }));

        // Clear file if response is not 'yes' for criteria requiring files
        const criterion = allCriteria.find((c) => c.id === criterionId);
        if (criterion?.requires_file && response !== 'yes') {
            setFiles((prev) => ({ ...prev, [criterionId]: null }));
        }
    };

    const handleNotesChange = (criterionId: number, value: string) => {
        setNotes((prev) => ({ ...prev, [criterionId]: value }));
    };

    const handleFileUpload = (criterionId: number, file: File) => {
        setFiles((prev) => ({ ...prev, [criterionId]: file }));
    };

    const handleFileRemove = (criterionId: number) => {
        setFiles((prev) => ({ ...prev, [criterionId]: null }));
    };

    const submitAssessment = () => {
        if (!isComplete || processing) return;

        // Prepare data for submission
        setData({
            responses,
            notes,
            files,
        });

        // Wait a tick to ensure state updates (if needed)
        setTimeout(() => {
            router.post(route('free-assessment.submit', assessmentData.id), { responses, notes, files }, { forceFormData: true });
        }, 0);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head title={`${assessmentData.tool.name_en} ${t.assessment}`} />

            <div
                className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <AssessmentHeader
                    title={language === 'ar' ? assessmentData.tool.name_ar : assessmentData.tool.name_en}
                    userName={auth.user.name}
                    rightContent={
                        <div className="hidden items-center space-x-4 rounded-full bg-blue-50 px-6 py-3 md:flex">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            <div className="text-right">
                                <div className="text-lg font-bold text-blue-900">{Math.round(completionPercentage)}%</div>
                                <div className="text-xs text-blue-700">
                                    {Object.keys(responses).length}/{totalCriteria}
                                </div>
                            </div>
                            <Progress value={completionPercentage} className="h-2 w-24" />
                        </div>
                    }
                />

                {/* Welcome Section */}
                <div className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <Card className="mb-8 overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl">
                            <CardContent className="relative p-8 md:p-12">
                                <div className="text-center">
                                    <div className="mb-6 flex items-center justify-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                                            <FileText className="h-8 w-8" />
                                        </div>
                                    </div>
                                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.startAssessment}</h2>
                                    <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">{t.welcomeMessage}</p>

                                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                            <div className="text-3xl font-bold">{totalCriteria}</div>
                                            <div className="text-blue-100">{t.totalQuestions}</div>
                                        </div>
                                        <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                            <div className="text-3xl font-bold">{Object.keys(responses).length}</div>
                                            <div className="text-blue-100">{t.completed}</div>
                                        </div>
                                        <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                            <div className="text-3xl font-bold">{Math.round(completionPercentage)}%</div>
                                            <div className="text-blue-100">{t.progress}</div>
                                        </div>
                                    </div>

                                    <Progress value={completionPercentage} className="mb-4 h-3 bg-white/20" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Assessment Questions */}
                        <div className="space-y-8">
                            {allCriteria.map((criterion, index) => (
                                <Card
                                    key={criterion.id}
                                    className="transform border-0 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-gray-50 to-blue-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex flex-1 items-start space-x-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <CardTitle className="mb-3 text-lg leading-relaxed text-gray-900">
                                                        {language === 'ar' ? criterion.text_ar : criterion.text_en}
                                                    </CardTitle>
                                                    <div className="flex items-center space-x-2">
                                                        {criterion.requires_file && (
                                                            <Badge variant="secondary" className="border-amber-200 bg-amber-100 text-amber-800">
                                                                <Paperclip className="mr-1 h-3 w-3" />
                                                                {t.attachmentRequired}
                                                            </Badge>
                                                        )}
                                                        {responses[criterion.id] && (
                                                            <Badge
                                                                variant="secondary"
                                                                className={
                                                                    responses[criterion.id] === 'yes'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : responses[criterion.id] === 'no'
                                                                          ? 'bg-red-100 text-red-800'
                                                                          : 'bg-gray-100 text-gray-800'
                                                                }
                                                            >
                                                                <CheckCheck className="mr-1 h-3 w-3" />
                                                                Answered
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {responses[criterion.id] && (
                                                <div className="ml-4 flex items-center">
                                                    {responses[criterion.id] === 'yes' && <CheckCircle className="h-8 w-8 text-green-600" />}
                                                    {responses[criterion.id] === 'no' && <XCircle className="h-8 w-8 text-red-600" />}
                                                    {responses[criterion.id] === 'na' && <MinusCircle className="h-8 w-8 text-gray-600" />}
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-8">
                                        <div className="space-y-6">
                                            {/* Response Buttons */}
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                <Button
                                                    variant={responses[criterion.id] === 'yes' ? 'default' : 'outline'}
                                                    size="lg"
                                                    onClick={() => handleResponseChange(criterion.id, 'yes')}
                                                    className={`h-16 transform transition-all duration-300 hover:scale-105 ${
                                                        responses[criterion.id] === 'yes'
                                                            ? 'bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700'
                                                            : 'hover:border-green-300 hover:bg-green-50 hover:shadow-lg'
                                                    }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <CheckCircle className="h-6 w-6" />
                                                        <span className="text-lg font-medium">{t.yes}</span>
                                                    </div>
                                                </Button>
                                                <Button
                                                    variant={responses[criterion.id] === 'no' ? 'default' : 'outline'}
                                                    size="lg"
                                                    onClick={() => handleResponseChange(criterion.id, 'no')}
                                                    className={`h-16 transform transition-all duration-300 hover:scale-105 ${
                                                        responses[criterion.id] === 'no'
                                                            ? 'bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700'
                                                            : 'hover:border-red-300 hover:bg-red-50 hover:shadow-lg'
                                                    }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <XCircle className="h-6 w-6" />
                                                        <span className="text-lg font-medium">{t.no}</span>
                                                    </div>
                                                </Button>
                                                <Button
                                                    variant={responses[criterion.id] === 'na' ? 'default' : 'outline'}
                                                    size="lg"
                                                    onClick={() => handleResponseChange(criterion.id, 'na')}
                                                    className={`h-16 transform transition-all duration-300 hover:scale-105 ${
                                                        responses[criterion.id] === 'na'
                                                            ? 'bg-gray-600 text-white shadow-lg shadow-gray-200 hover:bg-gray-700'
                                                            : 'hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg'
                                                    }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <MinusCircle className="h-6 w-6" />
                                                        <span className="text-lg font-medium">{t.notApplicable}</span>
                                                    </div>
                                                </Button>
                                            </div>

                                            {/* File Upload Section - Only show when requires_file is true AND response is 'yes' */}
                                            {criterion.requires_file && responses[criterion.id] === 'yes' && (
                                                <div className="space-y-4 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                                                    <div className="mb-4 flex items-center space-x-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                                            <Upload className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-blue-900">{t.uploadFile}</h4>
                                                            <p className="text-sm text-blue-700">Please provide supporting documentation</p>
                                                        </div>
                                                    </div>

                                                    {!files[criterion.id] ? (
                                                        <div className="relative">
                                                            <input
                                                                type="file"
                                                                id={`file-${criterion.id}`}
                                                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) handleFileUpload(criterion.id, file);
                                                                }}
                                                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                            />
                                                            <div className="hover:bg-blue-25 group cursor-pointer rounded-xl border-2 border-dashed border-blue-300 p-8 text-center transition-all duration-300 hover:border-blue-400">
                                                                <Cloud className="mx-auto mb-4 h-16 w-16 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                                                                <p className="mb-2 text-lg font-medium text-blue-800">{t.dragDropFile}</p>
                                                                <p className="text-blue-600">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                                                        <File className="h-6 w-6 text-green-600" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-lg font-semibold text-gray-900">
                                                                            {files[criterion.id]?.name}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                            {((files[criterion.id]?.size || 0) / 1024 / 1024).toFixed(2)} MB
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-3">
                                                                    <Badge variant="secondary" className="bg-green-100 px-3 py-1 text-green-800">
                                                                        <CheckCircle className="mr-1 h-4 w-4" />
                                                                        {t.fileUploaded}
                                                                    </Badge>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handleFileRemove(criterion.id)}
                                                                        className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Notes Section */}
                                            {responses[criterion.id] && (
                                                <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
                                                    <div className="flex items-center space-x-2">
                                                        <FileText className="h-5 w-5 text-gray-600" />
                                                        <label className="text-base font-medium text-gray-900">{t.notes}</label>
                                                    </div>
                                                    <Textarea
                                                        value={notes[criterion.id] || ''}
                                                        onChange={(e) => handleNotesChange(criterion.id, e.target.value)}
                                                        placeholder={t.notesPlaceholder}
                                                        rows={3}
                                                        className="resize-none border-gray-300 text-base focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Submit Assessment */}
                        {isComplete && (
                            <Card className="mt-12 border-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white shadow-2xl">
                                <CardContent className="p-12 text-center">
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-center">
                                            <div className="mb-6 flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-white/20">
                                                <Award className="h-12 w-12" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="mb-4 text-4xl font-bold">{t.assessmentComplete}</h3>
                                            <p className="mx-auto mb-8 max-w-2xl text-xl text-green-100">
                                                Congratulations! You have successfully completed all {totalCriteria} questions with excellence.
                                            </p>
                                        </div>

                                        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
                                                <div className="mb-2 text-4xl font-bold">{totalCriteria}</div>
                                                <div className="text-green-100">{t.totalQuestions}</div>
                                            </div>
                                            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
                                                <div className="mb-2 text-4xl font-bold">100%</div>
                                                <div className="text-green-100">{t.complete}</div>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={submitAssessment}
                                            size="lg"
                                            disabled={processing}
                                            className="transform bg-white px-12 py-6 text-xl font-bold text-green-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="mr-4 h-6 w-6 animate-spin rounded-full border-b-2 border-green-600"></div>
                                                    {t.submitting}
                                                </>
                                            ) : (
                                                <>
                                                    <Award className="mr-3 h-6 w-6" />
                                                    {t.submitAssessment}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Floating Progress Indicator */}
                        {!isComplete && (
                            <div className="fixed right-6 bottom-6 z-50">
                                <Card className="border-0 bg-white/95 p-4 shadow-2xl backdrop-blur-sm">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {Object.keys(responses).length} / {totalCriteria}
                                            </div>
                                            <Progress value={completionPercentage} className="h-2 w-24" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Scroll to Top Button */}
                        {showScrollTop && (
                            <Button
                                onClick={scrollToTop}
                                className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full bg-blue-600 shadow-2xl hover:bg-blue-700"
                                size="sm"
                            >
                                <ArrowUp className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
