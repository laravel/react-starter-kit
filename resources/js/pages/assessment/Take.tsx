import React, { useState, useEffect, useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
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
    ChevronLeft,
    ChevronRight,
    Award,
    BarChart3
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

export default function Take({ assessmentData, locale, auth }: TakeProps) {
    const [responses, setResponses] = useState<Record<number, 'yes' | 'no' | 'na'>>({});
    const [notes, setNotes] = useState<Record<number, string>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');

    // Form for submission
    const { data, setData, post, processing } = useForm({
        responses: {},
        notes: {}
    });

    // Flatten all criteria into a single array
    const allCriteria = useMemo(() => {
        const criteria: (Criterion & { domainName: string; categoryName: string })[] = [];
        assessmentData.tool.domains.forEach(domain => {
            domain.categories.forEach(category => {
                category.criteria.forEach(criterion => {
                    criteria.push({
                        ...criterion,
                        domainName: language === 'ar' ? domain.name_ar : domain.name_en,
                        categoryName: language === 'ar' ? category.name_ar : category.name_en
                    });
                });
            });
        });
        return criteria;
    }, [assessmentData.tool, language]);

    const totalCriteria = allCriteria.length;
    const currentCriterion = allCriteria[currentQuestionIndex];

    // Calculate completion percentage
    const completionPercentage = useMemo(() => {
        const answeredCount = Object.keys(responses).length;
        return totalCriteria > 0 ? (answeredCount / totalCriteria) * 100 : 0;
    }, [responses, totalCriteria]);

    // Check if assessment is complete
    const isComplete = useMemo(() => {
        return allCriteria.every(criterion => responses[criterion.id]);
    }, [responses, allCriteria]);

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
            back: "Back",
            next: "Next",
            complete: "Complete",
            completed: "Completed",
            remaining: "Remaining",
            progress: "Progress",
            submitAssessment: "Submit Assessment",
            assessmentComplete: "Assessment Complete!",
            submitting: "Submitting...",
            totalQuestions: "Total Questions"
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
            back: "رجوع",
            next: "التالي",
            complete: "مكتمل",
            completed: "مكتمل",
            remaining: "متبقي",
            progress: "التقدم",
            submitAssessment: "إرسال التقييم",
            assessmentComplete: "اكتمل التقييم!",
            submitting: "جاري الإرسال...",
            totalQuestions: "إجمالي الأسئلة"
        }
    }[language];

    const handleResponseChange = (criterionId: number, response: 'yes' | 'no' | 'na') => {
        setResponses(prev => ({ ...prev, [criterionId]: response }));
    };

    const handleNotesChange = (criterionId: number, value: string) => {
        setNotes(prev => ({ ...prev, [criterionId]: value }));
    };

    const submitAssessment = () => {
        if (!isComplete || processing) return;

        setData({
            responses: responses,
            notes: notes
        });

        post(route('assessment.submit', assessmentData.id));
    };

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

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    if (!currentCriterion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading assessment...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`${assessmentData.tool.name_en} ${t.assessment}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>

                {/* Progress Indicator */}
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
                                    <h1 className="text-xl font-semibold text-gray-900">
                                        {language === 'ar' ? assessmentData.tool.name_ar : assessmentData.tool.name_en}
                                    </h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>{t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleLanguage}
                                    className="flex items-center space-x-2"
                                >
                                    <span>{language === 'en' ? 'عربي' : 'English'}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">

                        {/* Progress Overview */}
                        <Card className="mb-6 border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <FileText className="w-5 h-5" />
                                            <span className="text-sm opacity-90">{t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold mb-2">{currentCriterion.domainName}</h2>
                                        <p className="text-blue-100">{currentCriterion.categoryName}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">
                                            {Math.round(completionPercentage)}%
                                        </div>
                                        <div className="text-sm opacity-90">{t.complete}</div>
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
                                            <CardTitle className="text-xl">
                                                {language === 'ar' ? currentCriterion.text_ar : currentCriterion.text_en}
                                            </CardTitle>
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
                            </CardHeader>

                            <CardContent className="p-8">
                                <div className="space-y-6">
                                    {/* Response Buttons */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Button
                                            variant={responses[currentCriterion.id] === 'yes' ? 'default' : 'outline'}
                                            size="lg"
                                            onClick={() => handleResponseChange(currentCriterion.id, 'yes')}
                                            className={`h-16 transition-all duration-200 ${
                                                responses[currentCriterion.id] === 'yes'
                                                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                                                    : 'hover:bg-green-50 hover:border-green-300'
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
                                                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                                                    : 'hover:bg-red-50 hover:border-red-300'
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
                                                    ? 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg'
                                                    : 'hover:bg-gray-50 hover:border-gray-300'
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
                                                Selected: {responses[currentCriterion.id].toUpperCase()}
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Notes Section */}
                                    {responses[currentCriterion.id] && (
                                        <div className="space-y-3 p-6 bg-gray-50 rounded-lg border">
                                            <div className="space-y-3">
                                                <label className="flex items-center text-base font-medium">
                                                    <FileText className="w-5 h-5 mr-2" />
                                                    {t.notes}
                                                </label>
                                                <Textarea
                                                    value={notes[currentCriterion.id] || ''}
                                                    onChange={(e) => handleNotesChange(currentCriterion.id, e.target.value)}
                                                    placeholder={t.notesPlaceholder}
                                                    rows={4}
                                                    className="resize-none text-base"
                                                />
                                            </div>
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
                                                <div className="text-sm text-green-100">{t.totalQuestions}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">100%</div>
                                                <div className="text-sm text-green-100">{t.complete}</div>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={submitAssessment}
                                            size="lg"
                                            disabled={processing}
                                            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-3"></div>
                                                    {t.submitting}
                                                </>
                                            ) : (
                                                <>
                                                    <Award className="w-5 h-5 mr-2" />
                                                    {t.submitAssessment}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Progress Summary */}
                        {!isComplete && (
                            <Card className="mt-8 border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <div className="flex items-center justify-center space-x-2 mb-4">
                                            <BarChart3 className="w-6 h-6 text-blue-600" />
                                            <h3 className="text-xl font-semibold">Progress Overview</h3>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{Object.keys(responses).length}</div>
                                                <div className="text-sm text-blue-800">{t.completed}</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-600">{totalCriteria - Object.keys(responses).length}</div>
                                                <div className="text-sm text-gray-800">{t.remaining}</div>
                                            </div>
                                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">{Math.round(completionPercentage)}%</div>
                                                <div className="text-sm text-green-800">{t.progress}</div>
                                            </div>
                                        </div>

                                        <Progress value={completionPercentage} className="h-3" />
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
