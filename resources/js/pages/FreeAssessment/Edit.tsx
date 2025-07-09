import React, { useState, useEffect, useMemo } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    CheckCircle,
    XCircle,
    MinusCircle,
    FileText,
    Award,
    BarChart3,
    Upload,
    File,
    X,
    Paperclip,
    Cloud,
    ArrowUp,
    CheckCheck,
    Clock,
    Users
} from 'lucide-react';

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
        }
    );
    const [notes, setNotes] = useState<Record<number, string>>(existingNotes || {});
    const [files, setFiles] = useState<Record<number, File | null>>({});
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Form for submission
    const { data, setData, post, processing } = useForm({
        responses: {},
        notes: {},
        files: {}
    });

    // Flatten all criteria into a single array with domain and category info
    const allCriteria = useMemo(() => {
        const criteria: (Criterion & { domainName: string; categoryName: string; domainId: number; categoryId: number })[] = [];
        assessmentData.tool.domains.forEach(domain => {
            domain.categories.forEach(category => {
                category.criteria.forEach(criterion => {
                    criteria.push({
                        ...criterion,
                        domainName: language === 'ar' ? domain.name_ar : domain.name_en,
                        categoryName: language === 'ar' ? category.name_ar : category.name_en,
                        domainId: domain.id,
                        categoryId: category.id
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
        return allCriteria.every(criterion => {
            const hasResponse = responses[criterion.id];
            const hasRequiredFile = !criterion.requires_file ||
                responses[criterion.id] !== 'yes' ||
                files[criterion.id];
            return hasResponse && hasRequiredFile;
        });
    }, [responses, files, allCriteria]);

    // Group criteria by domain and category for better organization
    const groupedCriteria = useMemo(() => {
        const grouped: Record<number, Record<number, typeof allCriteria>> = {};
        allCriteria.forEach(criterion => {
            if (!grouped[criterion.domainId]) {
                grouped[criterion.domainId] = {};
            }
            if (!grouped[criterion.domainId][criterion.categoryId]) {
                grouped[criterion.domainId][criterion.categoryId] = [];
            }
            grouped[criterion.domainId][criterion.categoryId].push(criterion);
        });
        return grouped;
    }, [allCriteria]);

    const t = {
        en: {
            assessment: "Assessment",
            question: "Question",
            of: "of",
            yes: "Yes",
            no: "No",
            notApplicable: "Not Applicable",
            notes: "Notes (Optional)",
            notesPlaceholder: "Add any notes or comments...",
            complete: "Complete",
            completed: "Completed",
            remaining: "Remaining",
            progress: "Progress",
            submitAssessment: "Submit Assessment",
            assessmentComplete: "Assessment Complete!",
            submitting: "Submitting...",
            totalQuestions: "Total Questions",
            attachmentRequired: "Attachment Required",
            uploadFile: "Upload Supporting Document",
            changeFile: "Change File",
            removeFile: "Remove File",
            dragDropFile: "Drag and drop a file here, or click to select",
            fileUploaded: "File uploaded successfully",
            scrollToTop: "Scroll to top",
            startAssessment: "Let's get started with your assessment",
            welcomeMessage: "Please answer all questions honestly and provide any required documentation."
        },
        ar: {
            assessment: "التقييم",
            question: "السؤال",
            of: "من",
            yes: "نعم",
            no: "لا",
            notApplicable: "غير قابل للتطبيق",
            notes: "ملاحظات (اختياري)",
            notesPlaceholder: "أضف أي ملاحظات أو تعليقات...",
            complete: "مكتمل",
            completed: "مكتمل",
            remaining: "متبقي",
            progress: "التقدم",
            submitAssessment: "إرسال التقييم",
            assessmentComplete: "اكتمل التقييم!",
            submitting: "جاري الإرسال...",
            totalQuestions: "إجمالي الأسئلة",
            attachmentRequired: "مرفق مطلوب",
            uploadFile: "رفع وثيقة داعمة",
            changeFile: "تغيير الملف",
            removeFile: "إزالة الملف",
            dragDropFile: "اسحب وأفلت ملفًا هنا، أو انقر للاختيار",
            fileUploaded: "تم رفع الملف بنجاح",
            scrollToTop: "التمرير إلى الأعلى",
            startAssessment: "لنبدأ بتقييمك",
            welcomeMessage: "يرجى الإجابة على جميع الأسئلة بصدق وتقديم أي وثائق مطلوبة."
        }
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
        setResponses(prev => ({ ...prev, [criterionId]: response }));

        // Clear file if response is not 'yes' for criteria requiring files
        const criterion = allCriteria.find(c => c.id === criterionId);
        if (criterion?.requires_file && response !== 'yes') {
            setFiles(prev => ({ ...prev, [criterionId]: null }));
        }
    };

    const handleNotesChange = (criterionId: number, value: string) => {
        setNotes(prev => ({ ...prev, [criterionId]: value }));
    };

    const handleFileUpload = (criterionId: number, file: File) => {
        setFiles(prev => ({ ...prev, [criterionId]: file }));
    };

    const handleFileRemove = (criterionId: number) => {
        setFiles(prev => ({ ...prev, [criterionId]: null }));
    };

    const submitAssessment = () => {
        if (!isComplete || processing) return;

        setData({
            responses: responses,
            notes: notes,
            files: files
        });


        // Use the correct route with assessment ID from your existing routes
        router.visit(`${route('free-assessment.edit', assessmentData.id)}`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    return (
        <>
            <Head title={`${assessmentData.tool.name_en} ${t.assessment}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>

                {/* Fixed Header */}
                <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200/50 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center space-x-6">
                                <img
                                    src="/storage/logo.svg"
                                    alt="FAQ Logo"
                                    className="bg-transparent h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                                />
                                <div className="h-8 w-px bg-gray-300"></div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {language === 'ar' ? assessmentData.tool.name_ar : assessmentData.tool.name_en}
                                    </h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{auth.user.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="hidden md:flex items-center space-x-4 bg-blue-50 rounded-full px-6 py-3">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-blue-900">{Math.round(completionPercentage)}%</div>
                                        <div className="text-xs text-blue-700">{Object.keys(responses).length}/{totalCriteria}</div>
                                    </div>
                                    <Progress value={completionPercentage} className="w-24 h-2" />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleLanguage}
                                    className="border-blue-200 hover:bg-blue-50"
                                >
                                    {language === 'en' ? 'عربي' : 'English'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Welcome Section */}
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">

                            <CardContent className="relative p-8 md:p-12">
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.startAssessment}</h2>
                                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t.welcomeMessage}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <div className="text-3xl font-bold">{totalCriteria}</div>
                                            <div className="text-blue-100">{t.totalQuestions}</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <div className="text-3xl font-bold">{Object.keys(responses).length}</div>
                                            <div className="text-blue-100">{t.completed}</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <div className="text-3xl font-bold">{Math.round(completionPercentage)}%</div>
                                            <div className="text-blue-100">{t.progress}</div>
                                        </div>
                                    </div>

                                    <Progress value={completionPercentage} className="bg-white/20 h-3 mb-4" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Questions by Domain and Category */}
                        <div className="space-y-8">
                            {assessmentData.tool.domains.map((domain) => (
                                <div key={domain.id} className="space-y-6">
                                    {/* Domain Header */}
                                    <div className="text-center py-6">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                            {language === 'ar' ? domain.name_ar : domain.name_en}
                                        </h2>
                                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                                    </div>

                                    {domain.categories.map((category) => (
                                        <div key={category.id} className="space-y-4">
                                            {/* Category Header */}
                                            <div className="sticky top-24 z-40 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-blue-200/50 mb-6">
                                                <h3 className="text-xl font-semibold text-gray-800 text-center">
                                                    {language === 'ar' ? category.name_ar : category.name_en}
                                                </h3>
                                            </div>

                                            {/* Questions in this category */}
                                            {category.criteria.map((criterion, index) => (
                                                <Card key={criterion.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-blue-100">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex items-start space-x-4 flex-1">
                                                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                                    {allCriteria.findIndex(c => c.id === criterion.id) + 1}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <CardTitle className="text-lg leading-relaxed text-gray-900 mb-3">
                                                                        {language === 'ar' ? criterion.text_ar : criterion.text_en}
                                                                    </CardTitle>
                                                                    <div className="flex items-center space-x-2">
                                                                        {criterion.requires_file && (
                                                                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                                                                                <Paperclip className="w-3 h-3 mr-1" />
                                                                                {t.attachmentRequired}
                                                                            </Badge>
                                                                        )}
                                                                        {responses[criterion.id] && (
                                                                            <Badge variant="secondary" className={
                                                                                responses[criterion.id] === 'yes' ? 'bg-green-100 text-green-800' :
                                                                                    responses[criterion.id] === 'no' ? 'bg-red-100 text-red-800' :
                                                                                        'bg-gray-100 text-gray-800'
                                                                            }>
                                                                                <CheckCheck className="w-3 h-3 mr-1" />
                                                                                Answered
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {responses[criterion.id] && (
                                                                <div className="flex items-center ml-4">
                                                                    {responses[criterion.id] === 'yes' && (
                                                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                                                    )}
                                                                    {responses[criterion.id] === 'no' && (
                                                                        <XCircle className="w-8 h-8 text-red-600" />
                                                                    )}
                                                                    {responses[criterion.id] === 'na' && (
                                                                        <MinusCircle className="w-8 h-8 text-gray-600" />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardHeader>

                                                    <CardContent className="p-8">
                                                        <div className="space-y-6">
                                                            {/* Response Buttons */}
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <Button
                                                                    variant={responses[criterion.id] === 'yes' ? 'default' : 'outline'}
                                                                    size="lg"
                                                                    onClick={() => handleResponseChange(criterion.id, 'yes')}
                                                                    className={`h-16 transition-all duration-300 transform hover:scale-105 ${
                                                                        responses[criterion.id] === 'yes'
                                                                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200'
                                                                            : 'hover:bg-green-50 hover:border-green-300 hover:shadow-lg'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center space-x-3">
                                                                        <CheckCircle className="w-6 h-6" />
                                                                        <span className="text-lg font-medium">{t.yes}</span>
                                                                    </div>
                                                                </Button>
                                                                <Button
                                                                    variant={responses[criterion.id] === 'no' ? 'default' : 'outline'}
                                                                    size="lg"
                                                                    onClick={() => handleResponseChange(criterion.id, 'no')}
                                                                    className={`h-16 transition-all duration-300 transform hover:scale-105 ${
                                                                        responses[criterion.id] === 'no'
                                                                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200'
                                                                            : 'hover:bg-red-50 hover:border-red-300 hover:shadow-lg'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center space-x-3">
                                                                        <XCircle className="w-6 h-6" />
                                                                        <span className="text-lg font-medium">{t.no}</span>
                                                                    </div>
                                                                </Button>
                                                                <Button
                                                                    variant={responses[criterion.id] === 'na' ? 'default' : 'outline'}
                                                                    size="lg"
                                                                    onClick={() => handleResponseChange(criterion.id, 'na')}
                                                                    className={`h-16 transition-all duration-300 transform hover:scale-105 ${
                                                                        responses[criterion.id] === 'na'
                                                                            ? 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg shadow-gray-200'
                                                                            : 'hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center space-x-3">
                                                                        <MinusCircle className="w-6 h-6" />
                                                                        <span className="text-lg font-medium">{t.notApplicable}</span>
                                                                    </div>
                                                                </Button>
                                                            </div>

                                                            {/* File Upload Section - Only show when requires_file is true AND response is 'yes' */}
                                                            {criterion.requires_file && responses[criterion.id] === 'yes' && (
                                                                <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                                                                    <div className="flex items-center space-x-3 mb-4">
                                                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                                                            <Upload className="w-5 h-5 text-white" />
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
                                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                                onChange={(e) => {
                                                                                    const file = e.target.files?.[0];
                                                                                    if (file) handleFileUpload(criterion.id, file);
                                                                                }}
                                                                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                                            />
                                                                            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-25 transition-all duration-300 cursor-pointer group">
                                                                                <Cloud className="w-16 h-16 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                                                                                <p className="text-blue-800 font-medium mb-2 text-lg">{t.dragDropFile}</p>
                                                                                <p className="text-blue-600">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center space-x-4">
                                                                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                                                        <File className="w-6 h-6 text-green-600" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="font-semibold text-gray-900 text-lg">{files[criterion.id]?.name}</p>
                                                                                        <p className="text-sm text-gray-500">
                                                                                            {((files[criterion.id]?.size || 0) / 1024 / 1024).toFixed(2)} MB
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex items-center space-x-3">
                                                                                    <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                                                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                                                        {t.fileUploaded}
                                                                                    </Badge>
                                                                                    <Button
                                                                                        variant="ghost"
                                                                                        size="sm"
                                                                                        onClick={() => handleFileRemove(criterion.id)}
                                                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                                                                                    >
                                                                                        <X className="w-4 h-4" />
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Notes Section */}
                                                            {responses[criterion.id] && (
                                                                <div className="space-y-4 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                                                                    <div className="flex items-center space-x-2">
                                                                        <FileText className="w-5 h-5 text-gray-600" />
                                                                        <label className="text-base font-medium text-gray-900">{t.notes}</label>
                                                                    </div>
                                                                    <Textarea
                                                                        value={notes[criterion.id] || ''}
                                                                        onChange={(e) => handleNotesChange(criterion.id, e.target.value)}
                                                                        placeholder={t.notesPlaceholder}
                                                                        rows={3}
                                                                        className="resize-none text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Submit Assessment */}
                        {isComplete && (
                            <Card className="mt-12 border-0 shadow-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
                                <CardContent className="p-12 text-center">
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-center">
                                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                                <Award className="w-12 h-12" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-4xl font-bold mb-4">{t.assessmentComplete}</h3>
                                            <p className="text-green-100 text-xl mb-8 max-w-2xl mx-auto">
                                                Congratulations! You have successfully completed all {totalCriteria} questions with excellence.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                                                <div className="text-4xl font-bold mb-2">{totalCriteria}</div>
                                                <div className="text-green-100">{t.totalQuestions}</div>
                                            </div>
                                            <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                                                <div className="text-4xl font-bold mb-2">100%</div>
                                                <div className="text-green-100">{t.complete}</div>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={submitAssessment}
                                            size="lg"
                                            disabled={processing}
                                            className="bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-4"></div>
                                                    {t.submitting}
                                                </>
                                            ) : (
                                                <>
                                                    <Award className="w-6 h-6 mr-3" />
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
                            <div className="fixed bottom-6 right-6 z-50">
                                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 p-4">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {Object.keys(responses).length} / {totalCriteria}
                                            </div>
                                            <Progress value={completionPercentage} className="w-24 h-2" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Scroll to Top Button */}
                        {showScrollTop && (
                            <Button
                                onClick={scrollToTop}
                                className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl"
                                size="sm"
                            >
                                <ArrowUp className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
