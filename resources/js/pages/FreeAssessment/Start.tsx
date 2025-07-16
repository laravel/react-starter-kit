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
    CheckCheck,
    CheckCircle,
    ChevronDown,
    Cloud,
    File,
    FileText,
    Keyboard,
    Layers,
    MinusCircle,
    Paperclip,
    Upload,
    X,
    XCircle,
} from 'lucide-react';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import AssessmentHeader from '@/components/assessment-header';

// --- TYPE DEFINITIONS ---
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

interface AssessmentData {
    id: number;
    name: string;
    email: string;
    status: string;
    tool: Tool;
    responses?: Record<string, any>;
    notes?: Record<string, string>;
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

// --- TRANSLATIONS ---
const translations = {
    en: {
        assessment: 'Assessment',
        question: 'Question',
        of: 'of',
        yes: 'Yes',
        no: 'No',
        notApplicable: 'N/A',
        notes: 'Notes',
        notesPlaceholder: 'Add any notes or comments here...',
        complete: 'Complete',
        completed: 'Completed',
        progress: 'Progress',
        submitAssessment: 'Submit Assessment',
        assessmentComplete: 'Assessment Complete!',
        submitting: 'Submitting...',
        totalQuestions: 'Total Questions',
        attachmentRequired: 'Attachment Required',
        uploadFile: 'Upload Supporting Document',
        changeFile: 'Change File',
        removeFile: 'Remove File',
        dragDropFile: 'Drag & drop or click to upload',
        fileUploaded: 'File uploaded',
        scrollToTop: 'Scroll to top',
        startAssessment: "Let's Begin Your Assessment",
        welcomeMessage: 'Answer each question to the best of your ability. Your progress is saved automatically.',
        answered: 'Answered',
        shortcutsTitle: 'Shortcuts',
        submitShortcut: 'Submit Assessment',
        scrollTopShortcut: 'Scroll to Top',
        scrollBottomShortcut: 'Scroll to Bottom',
        blurInputShortcut: 'Deselect Input',
    },
    ar: {
        assessment: 'التقييم',
        question: 'السؤال',
        of: 'من',
        yes: 'نعم',
        no: 'لا',
        notApplicable: 'غير قابل للتطبيق',
        notes: 'ملاحظات',
        notesPlaceholder: 'أضف أي ملاحظات أو تعليقات هنا...',
        complete: 'مكتمل',
        completed: 'مكتمل',
        progress: 'التقدم',
        submitAssessment: 'إرسال التقييم',
        assessmentComplete: 'اكتمل التقييم!',
        submitting: 'جاري الإرسال...',
        totalQuestions: 'إجمالي الأسئلة',
        attachmentRequired: 'مرفق مطلوب',
        uploadFile: 'رفع وثيقة داعمة',
        changeFile: 'تغيير الملف',
        removeFile: 'إزالة الملف',
        dragDropFile: 'اسحب وأفلت أو انقر للرفع',
        fileUploaded: 'تم رفع الملف',
        scrollToTop: 'التمرير إلى الأعلى',
        startAssessment: 'لنبدأ تقييمك',
        welcomeMessage: 'أجب عن كل سؤال بأفضل ما لديك. يتم حفظ تقدمك تلقائيًا.',
        answered: 'تمت الإجابة',
        shortcutsTitle: 'الاختصارات',
        submitShortcut: 'إرسال التقييم',
        scrollTopShortcut: 'الانتقال للأعلى',
        scrollBottomShortcut: 'الانتقال للأسفل',
        blurInputShortcut: 'إلغاء تحديد الإدخال',
    },
} as const;


// --- SUB-COMPONENTS ---

const WelcomeSection = ({ t, totalCriteria, answeredCount, completionPercentage }: any) => (
    <Card className="mb-12 overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl">
        <CardContent className="relative p-8 text-center md:p-12">
            <div className="mb-6 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                    <FileText className="h-8 w-8" />
                </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.startAssessment}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100/90">{t.welcomeMessage}</p>
            <div className="mx-auto max-w-2xl">
                <Progress value={completionPercentage} className="mb-2 h-3 bg-white/20" />
                <div className="flex justify-between text-sm font-medium text-blue-100">
                    <span>{t.progress}: {Math.round(completionPercentage)}%</span>
                    <span>{answeredCount} / {totalCriteria} {t.completed}</span>
                </div>
            </div>
        </CardContent>
    </Card>
);

// --- NEW DomainSection component with accordion functionality ---
const DomainSection = ({ domain, children, responses, language, t }: any) => {
    const [isOpen, setIsOpen] = useState(true);

    const domainCriteriaIds = useMemo(() => {
        return domain.categories.flatMap((cat: Category) => cat.criteria.map((crit: Criterion) => crit.id));
    }, [domain]);

    const answeredCount = useMemo(() => {
        return domainCriteriaIds.filter((id: number) => responses[id]).length;
    }, [responses, domainCriteriaIds]);

    const totalCount = domainCriteriaIds.length;
    const completionPercentage = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

    return (
        <Card className="border-0 shadow-lg transition-all duration-300">
            <CardHeader
                className="flex cursor-pointer flex-row items-center justify-between p-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Layers className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold text-gray-800">
                            {language === 'ar' ? domain.name_ar : domain.name_en}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{answeredCount} / {totalCount} {t.completed}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Progress value={completionPercentage} className="h-2 w-32 hidden sm:block" />
                    <ChevronDown className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </CardHeader>
            {isOpen && (
                <CardContent className="border-t border-gray-100 p-4">
                    {children}
                </CardContent>
            )}
        </Card>
    );
};

const CriterionCard = ({ criterion, globalIndex, response, note, file, handlers, t, language }: any) => {
    const { handleResponseChange, handleNotesChange, handleFileUpload, handleFileRemove } = handlers;
    const isYes = response === 'yes';

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                        {globalIndex}
                    </div>
                    <div className="flex-1">
                        <p className="mb-2 font-medium leading-relaxed text-gray-800">
                            {language === 'ar' ? criterion.text_ar : criterion.text_en}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            {criterion.requires_file && (
                                <Badge variant="secondary" className="border-amber-200 bg-amber-100 text-amber-800 text-xs">
                                    <Paperclip className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" />
                                    {t.attachmentRequired}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <ResponseButton type="yes" currentResponse={response} onClick={() => handleResponseChange(criterion.id, 'yes')} t={t} />
                    <ResponseButton type="no" currentResponse={response} onClick={() => handleResponseChange(criterion.id, 'no')} t={t} />
                    <ResponseButton type="na" currentResponse={response} onClick={() => handleResponseChange(criterion.id, 'na')} t={t} />
                </div>
                <div className="flex flex-col gap-4">
                    {criterion.requires_file && isYes && (
                        <FileUploadSection criterionId={criterion.id} file={file} onUpload={handleFileUpload} onRemove={handleFileRemove} t={t} />
                    )}
                    {response && (
                        <NotesSection criterionId={criterion.id} note={note} onNotesChange={handleNotesChange} t={t} />
                    )}
                </div>
            </div>
        </div>
    );
};

const ResponseButton = ({ type, currentResponse, onClick, t }: any) => {
    const isSelected = currentResponse === type;
    const styles = {
        yes: { base: 'hover:border-green-400 hover:bg-green-50/50', selected: 'bg-green-600 text-white hover:bg-green-700', icon: <CheckCircle className="h-5 w-5" /> },
        no: { base: 'hover:border-red-400 hover:bg-red-50/50', selected: 'bg-red-600 text-white hover:bg-red-700', icon: <XCircle className="h-5 w-5" /> },
        na: { base: 'hover:border-gray-400 hover:bg-gray-100/50', selected: 'bg-gray-600 text-white hover:bg-gray-700', icon: <MinusCircle className="h-5 w-5" /> },
    };
    const style = styles[type];

    return (
        <Button
            variant={isSelected ? 'default' : 'outline'}
            onClick={onClick}
            className={`h-12 w-full justify-start text-left transition-all duration-200 ${isSelected ? style.selected : style.base}`}
        >
            <div className="flex items-center gap-3">
                {style.icon}
                <span className="font-medium">{t[type === 'na' ? 'notApplicable' : type]}</span>
            </div>
        </Button>
    );
};

const FileUploadSection = ({ criterionId, file, onUpload, onRemove, t }: any) => (
    <div className="flex-grow space-y-2 rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/50 p-3">
        {!file ? (
            <div className="relative text-center">
                <input
                    type="file"
                    id={`file-${criterionId}`}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={(e) => e.target.files?.[0] && onUpload(criterionId, e.target.files[0])}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Cloud className="mx-auto mb-1 h-6 w-6 text-blue-400" />
                <p className="text-sm font-semibold text-blue-800">{t.dragDropFile}</p>
                <p className="text-xs text-blue-600">Max 10MB</p>
            </div>
        ) : (
            <div className="flex items-center justify-between rounded-md bg-white p-2 shadow-sm">
                <div className="flex items-center gap-2">
                    <File className="h-5 w-5 text-green-600" />
                    <div>
                        <p className="text-xs font-semibold text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onRemove(criterionId)} className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-600">
                    <X className="h-4 w-4" />
                </Button>
            </div>
        )}
    </div>
);

const NotesSection = ({ criterionId, note, onNotesChange, t }: any) => (
    <div className="flex-grow">
        <Textarea
            value={note || ''}
            onChange={(e) => onNotesChange(criterionId, e.target.value)}
            placeholder={t.notesPlaceholder}
            rows={3}
            className="h-full resize-none border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
        />
    </div>
);

const CompletionCard = React.forwardRef(({ totalCriteria, submitAssessment, processing, t }: any, ref) => (
    <Card ref={ref} className="mt-12 border-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white shadow-2xl">
        <CardContent className="p-8 text-center md:p-12">
            <Award className="mx-auto mb-4 h-16 w-16 animate-pulse" />
            <h3 className="mb-2 text-4xl font-bold">{t.assessmentComplete}</h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-green-100">
                Congratulations! You have answered all {totalCriteria} questions.
            </p>
            <Button
                onClick={submitAssessment}
                size="lg"
                disabled={processing}
                className="transform bg-white px-12 py-6 text-xl font-bold text-green-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            >
                {processing ? (
                    <><div className="mr-4 h-6 w-6 animate-spin rounded-full border-b-2 border-green-600"></div>{t.submitting}</>
                ) : (
                    <><Award className="mr-3 h-6 w-6 rtl:ml-3 rtl:mr-0" />{t.submitAssessment}</>
                )}
            </Button>
        </CardContent>
    </Card>
));

const ShortcutsPanel = ({ t }: { t: typeof translations['en'] }) => (
    <div className="fixed top-1/2 left-6 -translate-y-1/2 z-50 hidden lg:block">
        <Card className="bg-white/80 backdrop-blur-md border-gray-200/80 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Keyboard className="h-5 w-5 text-blue-600" />
                    {t.shortcutsTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center gap-4">
                        <span className="text-gray-600">{t.submitShortcut}</span>
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">Ctrl + S</kbd>
                    </li>
                    <li className="flex justify-between items-center gap-4">
                        <span className="text-gray-600">{t.scrollTopShortcut}</span>
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">Ctrl + ↑</kbd>
                    </li>
                    <li className="flex justify-between items-center gap-4">
                        <span className="text-gray-600">{t.scrollBottomShortcut}</span>
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">Ctrl + X</kbd>
                    </li>
                    <li className="flex justify-between items-center gap-4">
                        <span className="text-gray-600">{t.blurInputShortcut}</span>
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">Esc</kbd>
                    </li>
                </ul>
            </CardContent>
        </Card>
    </div>
);


// --- MAIN COMPONENT ---
export default function Start({ assessmentData, locale, auth }: TakeProps) {
    const { language } = useLanguage();
    const t = translations[language];

    const { data, setData, post, processing } = useForm({
        responses: assessmentData.responses || {},
        notes: assessmentData.notes || {},
        files: {} as Record<number, File | null>,
    });

    const [showScrollTop, setShowScrollTop] = useState(false);
    const completionCardRef = useRef<HTMLDivElement>(null);

    const { allCriteria, criteriaMap } = useMemo(() => {
        const flatCriteria: (Criterion & { domainName: string; categoryName: string })[] = [];
        const map = new Map<number, number>();
        assessmentData.tool.domains.forEach(domain => {
            domain.categories.forEach(category => {
                category.criteria.forEach(criterion => {
                    map.set(criterion.id, flatCriteria.length + 1);
                    flatCriteria.push({
                        ...criterion,
                        domainName: language === 'ar' ? domain.name_ar : domain.name_en,
                        categoryName: language === 'ar' ? category.name_ar : category.name_en,
                    });
                });
            });
        });
        return { allCriteria: flatCriteria, criteriaMap: map };
    }, [assessmentData.tool, language]);

    const totalCriteria = allCriteria.length;

    const completionPercentage = useMemo(() => {
        const answeredCount = Object.keys(data.responses).length;
        return totalCriteria > 0 ? (answeredCount / totalCriteria) * 100 : 0;
    }, [data.responses, totalCriteria]);

    const isComplete = useMemo(() => {
        return allCriteria.every(criterion => {
            const hasResponse = !!data.responses[criterion.id];
            const hasRequiredFile = !criterion.requires_file || data.responses[criterion.id] !== 'yes' || !!data.files[criterion.id];
            return hasResponse && hasRequiredFile;
        });
    }, [data.responses, data.files, allCriteria]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key.toLowerCase()) {
                    case 's':
                        event.preventDefault();
                        if (isComplete) submitAssessment();
                        break;
                    case 'x':
                        event.preventDefault();
                        scrollToBottom();
                        break;
                    case 'arrowup':
                        event.preventDefault();
                        scrollToTop();
                        break;
                }
            } else if (event.key === 'Escape') {
                if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isComplete, data]);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleResponseChange = (criterionId: number, response: 'yes' | 'no' | 'na') => {
        setData(prev => ({ ...prev, responses: { ...prev.responses, [criterionId]: response } }));
        if (allCriteria.find(c => c.id === criterionId)?.requires_file && response !== 'yes') {
            handleFileRemove(criterionId);
        }
    };

    const handleNotesChange = (criterionId: number, value: string) => setData(prev => ({ ...prev, notes: { ...prev.notes, [criterionId]: value } }));
    const handleFileUpload = (criterionId: number, file: File) => setData(prev => ({ ...prev, files: { ...prev.files, [criterionId]: file } }));
    const handleFileRemove = (criterionId: number) => setData(prev => ({ ...prev, files: { ...prev.files, [criterionId]: null } }));

    const submitAssessment = () => {
        if (!isComplete || processing) return;
        post(route('free-assessment.submit', assessmentData.id), { forceFormData: true });
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => {
        if (completionCardRef.current) {
            completionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head title={`${language === 'ar' ? assessmentData.tool.name_ar : assessmentData.tool.name_en} ${t.assessment}`} />
            <div className="min-h-screen bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <AssessmentHeader
                    title={language === 'ar' ? assessmentData.tool.name_ar : assessmentData.tool.name_en}
                    userName={auth.user.name}
                    language={language}
                    rightContent={
                        <div className="hidden items-center gap-3 rounded-full bg-blue-50 px-4 py-2 md:flex">
                            <div className="text-right rtl:text-left">
                                <div className="text-sm font-bold text-blue-900">{Math.round(completionPercentage)}% {t.complete}</div>
                                <div className="text-xs text-blue-700">{Object.keys(data.responses).length}/{totalCriteria}</div>
                            </div>
                            <Progress value={completionPercentage} className="h-2 w-24" />
                        </div>
                    }
                />

                <ShortcutsPanel t={t} />

                <main className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <WelcomeSection t={t} totalCriteria={totalCriteria} answeredCount={Object.keys(data.responses).length} completionPercentage={completionPercentage} />

                        <div className="space-y-6">
                            {assessmentData.tool.domains.map((domain) => (
                                <DomainSection key={domain.id} domain={domain} responses={data.responses} language={language} t={t}>
                                    <div className="space-y-4">
                                        {domain.categories.flatMap(cat => cat.criteria).map(criterion => (
                                            <CriterionCard
                                                key={criterion.id}
                                                criterion={criterion}
                                                globalIndex={criteriaMap.get(criterion.id)}
                                                response={data.responses[criterion.id]}
                                                note={data.notes[criterion.id]}
                                                file={data.files[criterion.id]}
                                                handlers={{ handleResponseChange, handleNotesChange, handleFileUpload, handleFileRemove }}
                                                t={t}
                                                language={language}
                                            />
                                        ))}
                                    </div>
                                </DomainSection>
                            ))}
                        </div>

                        {isComplete && <CompletionCard ref={completionCardRef} totalCriteria={totalCriteria} submitAssessment={submitAssessment} processing={processing} t={t} />}

                        {showScrollTop && (
                            <Button onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-blue-600 shadow-2xl hover:bg-blue-700 rtl:right-auto rtl:left-6" size="icon" aria-label={t.scrollToTop}>
                                <ArrowUp className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
