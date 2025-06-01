// resources/js/pages/assessment/start.tsx
import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Globe,
    User,
    Mail,
    Building,
    FileText,
    CheckCircle,
    XCircle,
    MinusCircle,
    ArrowRight,
    ArrowLeft,
    Play,
    BarChart3,
    Clock,
    Award,
    Upload,
    Target,
    Zap,
    Shield,
    ChevronRight,
    ChevronLeft,
    Star,
    TrendingUp,
    HelpCircle,
    AlertCircle,
    Skip
} from 'lucide-react';

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
}

interface Criterion {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    order: number;
    requires_attachment: boolean;
}

interface Category {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    order: number;
    criteria: Criterion[];
}

interface Domain {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    order: number;
    categories: Category[];
}

interface AssessmentData {
    tool: Tool;
    domains: Domain[];
}

interface User {
    id: number;
    name: string;
    email: string;
    organization?: string;
}

interface AssessmentStartProps {
    assessmentData: AssessmentData;
    locale: string;
    prefillData?: {
        name: string;
        email: string;
    } | null;
    auth?: {
        user: User;
    };
}

const translations = {
    en: {
        startAssessment: "Start Assessment",
        evaluatorInfo: "Evaluator Information",
        fullName: "Full Name",
        emailAddress: "Email Address",
        organization: "Organization",
        optional: "Optional",
        required: "Required",
        enterFullName: "Enter your full name",
        enterEmail: "Enter your email address",
        enterOrganization: "Enter your organization",
        assessment: "Assessment",
        progress: "Progress",
        criteria: "criteria",
        yes: "Yes",
        no: "No",
        notApplicable: "Not Applicable",
        notes: "Notes (Optional)",
        addNotes: "Add notes or supporting documents",
        submitAssessment: "Submit Assessment",
        submitting: "Submitting...",
        assessmentOverview: "Assessment Overview",
        domains: "Domains",
        categories: "Categories",
        totalCriteria: "Total Criteria",
        estimatedTime: "Estimated Time",
        minutes: "minutes",
        getStarted: "Get Started",
        continue: "Continue",
        back: "Back",
        next: "Next",
        preview: "Preview",
        selected: "Selected",
        additionalInfo: "Additional Information",
        supportingDocument: "Supporting Document",
        requiredAttachment: "Required Attachment *",
        supportedFormats: "Supported: PDF, DOC, DOCX, JPG, PNG, TXT (max 10MB)",
        requiresAttachment: "This question requires attachment if answered \"Yes\"",
        notesPlaceholder: "Add any notes, comments, or explanations...",
        readyToBegin: "Ready to begin your assessment journey?",
        letsGo: "Let's Go!",
        assessmentFeatures: "Assessment Features",
        comprehensiveEvaluation: "Comprehensive Evaluation",
        instantResults: "Instant Results",
        secureData: "Secure & Private",
        professionalGrade: "Professional Grade",
        step: "Step",
        of: "of",
        question: "Question",
        previous: "Previous",
        skipQuestion: "Skip Question",
        uploadFile: "Upload File",
        removeFile: "Remove File",
        completeAssessment: "Complete Assessment",
        almostDone: "Almost Done!",
        questionsPerPage: "Questions",
        page: "Page",
        fileRequiredIfYes: "File required if \"Yes\"",
        changeFile: "Change File",
        addNotesPlaceholder: "Add notes...",
        completed: "completed",
        submit: "Submit",
        completeAllRequired: "Complete all required questions to submit",
        currentDomain: "Current domain",
        currentCategory: "Current category"
    },
    ar: {
        startAssessment: "بدء التقييم",
        evaluatorInfo: "معلومات المقيم",
        fullName: "الاسم الكامل",
        emailAddress: "البريد الإلكتروني",
        organization: "المؤسسة",
        optional: "اختياري",
        required: "مطلوب",
        enterFullName: "أدخل اسمك الكامل",
        enterEmail: "أدخل بريدك الإلكتروني",
        enterOrganization: "أدخل اسم المؤسسة",
        assessment: "التقييم",
        progress: "التقدم",
        criteria: "معايير",
        yes: "نعم",
        no: "لا",
        notApplicable: "غير قابل للتطبيق",
        notes: "ملاحظات (اختياري)",
        addNotes: "إضافة ملاحظات أو مستندات داعمة",
        submitAssessment: "إرسال التقييم",
        submitting: "جاري الإرسال...",
        assessmentOverview: "نظرة عامة على التقييم",
        domains: "المجالات",
        categories: "الفئات",
        totalCriteria: "إجمالي المعايير",
        estimatedTime: "الوقت المقدر",
        minutes: "دقيقة",
        getStarted: "ابدأ الآن",
        continue: "متابعة",
        back: "رجوع",
        next: "التالي",
        preview: "معاينة",
        selected: "محدد",
        additionalInfo: "معلومات إضافية",
        supportingDocument: "مستند داعم",
        requiredAttachment: "مرفق مطلوب *",
        supportedFormats: "المدعوم: PDF, DOC, DOCX, JPG, PNG, TXT (الحد الأقصى 10 ميجابايت)",
        requiresAttachment: "هذا السؤال يتطلب مرفق إذا تم الإجابة بـ \"نعم\"",
        notesPlaceholder: "أضف أي ملاحظات أو تعليقات أو توضيحات...",
        readyToBegin: "هل أنت مستعد لبدء رحلة التقييم؟",
        letsGo: "لننطلق!",
        assessmentFeatures: "مميزات التقييم",
        comprehensiveEvaluation: "تقييم شامل",
        instantResults: "نتائج فورية",
        secureData: "آمن وخاص",
        professionalGrade: "درجة مهنية",
        step: "الخطوة",
        of: "من",
        question: "السؤال",
        previous: "السابق",
        skipQuestion: "تخطي السؤال",
        uploadFile: "رفع ملف",
        removeFile: "إزالة الملف",
        completeAssessment: "إكمال التقييم",
        almostDone: "أوشكت على الانتهاء!",
        questionsPerPage: "أسئلة",
        page: "صفحة",
        fileRequiredIfYes: "مطلوب ملف إذا كانت الإجابة \"نعم\"",
        changeFile: "تغيير الملف",
        addNotesPlaceholder: "إضافة ملاحظات...",
        completed: "مكتمل",
        submit: "إرسال",
        completeAllRequired: "أكمل جميع الأسئلة المطلوبة للإرسال",
        currentDomain: "المجال الحالي",
        currentCategory: "الفئة الحالية"
    }
};

export default function AssessmentStart({ assessmentData, locale, prefillData, auth }: AssessmentStartProps) {
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');
    const [currentStep, setCurrentStep] = useState<'info' | 'preview' | 'assessment'>('info');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const { tool, domains } = assessmentData;
    const t = translations[language];
    const user = auth?.user;

    // Flatten all criteria into a single array for simplified navigation
    const allCriteria = domains
        .flatMap(domain => domain.categories)
        .flatMap(category => category.criteria)
        .sort((a, b) => a.order - b.order);

    // Get current question
    const currentCriterion = allCriteria[currentQuestionIndex];

    // Find current domain and category for context
    const getCurrentContext = () => {
        if (!currentCriterion) return null;

        for (const domain of domains) {
            for (const category of domain.categories) {
                if (category.criteria.some(c => c.id === currentCriterion.id)) {
                    return { domain, category };
                }
            }
        }
        return null;
    };

    const currentContext = getCurrentContext();

    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id,
        name: prefillData?.name || auth?.user?.name || '',
        email: prefillData?.email || auth?.user?.email || '',
        organization: auth?.user?.organization || '',
        responses: {} as Record<number, { criterion_id: number; response: 'yes' | 'no' | 'na'; notes?: string; attachment?: File }>,
    });

    const startAssessment = () => {
        if (!data.name || !data.email) {
            return;
        }
        setCurrentStep('preview');
    };

    function getLocalizedText(item: any, field: string): string {
        return language === 'ar' ? item[`${field}_ar`] : item[`${field}_en`];
    }

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const handleResponseChange = (criterionId: number, response: 'yes' | 'no' | 'na') => {
        setData('responses', {
            ...data.responses,
            [criterionId]: {
                criterion_id: criterionId,
                response,
                notes: data.responses[criterionId]?.notes || '',
                attachment: data.responses[criterionId]?.attachment,
            }
        });
    };

    const handleNotesChange = (criterionId: number, notes: string) => {
        setData('responses', {
            ...data.responses,
            [criterionId]: {
                ...data.responses[criterionId],
                criterion_id: criterionId,
                response: data.responses[criterionId]?.response || 'na',
                notes,
            }
        });
    };

    const handleAttachmentChange = (criterionId: number, file: File | null) => {
        setData('responses', {
            ...data.responses,
            [criterionId]: {
                ...data.responses[criterionId],
                criterion_id: criterionId,
                response: data.responses[criterionId]?.response || 'na',
                attachment: file || undefined,
            }
        });
    };

    const totalCriteria = allCriteria.length;
    const totalCategories = domains.reduce((total, domain) => total + domain.categories.length, 0);
    const completedCriteria = Object.keys(data.responses).filter(id => data.responses[parseInt(id)]?.response).length;
    const progressPercentage = totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0;
    const currentProgressPercentage = totalCriteria > 0 ? ((currentQuestionIndex + 1) / totalCriteria) * 100 : 0;
    const estimatedMinutes = Math.ceil(totalCriteria * 1.5);

    // Check if assessment is complete
    const isComplete = allCriteria.every(criterion => {
        const response = data.responses[criterion.id];
        if (!response?.response) return false;

        // Check if required attachment is provided for "yes" responses
        if (criterion.requires_attachment && response.response === 'yes') {
            return response.attachment !== undefined && response.attachment !== null;
        }

        return true;
    });

    const proceedToAssessment = () => {
        setCurrentStep('assessment');
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < totalCriteria - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const submitAssessment = () => {
        if (!isComplete || processing) return;

        console.log('Starting assessment submission...');

        // Prepare submission data for authenticated users
        const submissionData = {
            tool_id: tool.id,
            name: data.name,
            email: data.email,
            organization: data.organization || null,
            responses: {},
            notes: {}
        };

        // Convert responses to the NUMERIC format expected by AssessmentController
        allCriteria.forEach(criterion => {
            const response = data.responses[criterion.id];
            if (response && response.response) {
                // Convert response to numeric value for AssessmentController
                let numericValue;
                switch (response.response) {
                    case 'yes':
                        numericValue = 100;
                        break;
                    case 'no':
                        numericValue = 0;
                        break;
                    case 'na':
                        numericValue = 50;
                        break;
                    default:
                        numericValue = 0;
                }

                // Send ONLY the numeric value, not the object
                submissionData.responses[criterion.id] = numericValue;

                if (response.notes) {
                    submissionData.notes[criterion.id] = response.notes;
                }
            }
        });

        console.log('Submission data:', submissionData);

        // Submit to authenticated user route
        post(route('assessment.submit'), submissionData, {
            onSuccess: (page) => {
                console.log('Assessment submitted successfully', page);
            },
            onError: (errors) => {
                console.error('Submission errors:', errors);
            },
            onFinish: () => {
                console.log('Submission finished');
            }
        });
    };

    // Info Step - User Information Collection (same as before)
    if (currentStep === 'info') {
        return (
            <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Enhanced Header with Glassmorphism */}
                <header className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            {getLocalizedText(tool, 'name')}
                                        </h1>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>{t.step} 1 {t.of} 3</span>
                                            <span>•</span>
                                            <span>{t.startAssessment}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleLanguage}
                                className="backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                <span>{language === 'en' ? 'عربي' : 'English'}</span>
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Left Column - Tool Introduction */}
                            <div className="space-y-8">
                                {/* Hero Section */}
                                <div className="text-center lg:text-left space-y-6">
                                    {tool.image && (
                                        <div className="relative mx-auto lg:mx-0 w-20 h-20 overflow-hidden rounded-2xl shadow-2xl">
                                            <img
                                                src={tool.image}
                                                alt={getLocalizedText(tool, 'name')}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                        </div>
                                    )}
                                    <div>
                                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                                            {getLocalizedText(tool, 'name')}
                                        </h1>
                                        {getLocalizedText(tool, 'description') && (
                                            <p className="text-xl text-gray-600 mt-4 leading-relaxed">
                                                {getLocalizedText(tool, 'description')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <p className="text-lg text-gray-700 font-medium">{t.readyToBegin}</p>
                                    </div>
                                </div>

                                {/* Assessment Features */}
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center text-xl">
                                            <Zap className="w-6 h-6 mr-3 text-yellow-500" />
                                            {t.assessmentFeatures}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                                    <BarChart3 className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-blue-900">{t.comprehensiveEvaluation}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-100">
                                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                                    <TrendingUp className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-green-900">{t.instantResults}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
                                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                                    <Shield className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-purple-900">{t.secureData}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                                                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                                    <Star className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-orange-900">{t.professionalGrade}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Assessment Overview Stats */}
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-xl">
                                            <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                                            {t.assessmentOverview}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl font-bold text-white">{domains.length}</span>
                                                </div>
                                                <div className="text-sm font-medium text-gray-700">{t.domains}</div>
                                            </div>
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl font-bold text-white">{totalCategories}</span>
                                                </div>
                                                <div className="text-sm font-medium text-gray-700">{t.categories}</div>
                                            </div>
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl font-bold text-white">{totalCriteria}</span>
                                                </div>
                                                <div className="text-sm font-medium text-gray-700">{t.totalCriteria}</div>
                                            </div>
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl font-bold text-white">{estimatedMinutes}</span>
                                                </div>
                                                <div className="text-sm font-medium text-gray-700">{t.minutes}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - User Information Form */}
                            <div className="lg:sticky lg:top-8">
                                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                                    <CardHeader className="space-y-4 pb-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl font-bold text-gray-900">{t.evaluatorInfo}</CardTitle>
                                                <CardDescription className="text-gray-600">
                                                    {user ? 'Review your information' : 'Provide your details to begin the assessment'}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="name" className="flex items-center text-base font-semibold text-gray-700">
                                                    <User className="w-4 h-4 mr-2 text-blue-600" />
                                                    {t.fullName} <span className="text-red-500 ml-1">*</span>
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder={t.enterFullName}
                                                    className="h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                                    required
                                                    disabled={!!user}
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="email" className="flex items-center text-base font-semibold text-gray-700">
                                                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                                                    {t.emailAddress} <span className="text-red-500 ml-1">*</span>
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder={t.enterEmail}
                                                    className="h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                                    required
                                                    disabled={!!user}
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="organization" className="flex items-center text-base font-semibold text-gray-700">
                                                    <Building className="w-4 h-4 mr-2 text-blue-600" />
                                                    {t.organization} <span className="text-sm text-gray-500 ml-1">({t.optional})</span>
                                                </Label>
                                                <Input
                                                    id="organization"
                                                    value={data.organization}
                                                    onChange={(e) => setData('organization', e.target.value)}
                                                    placeholder={t.enterOrganization}
                                                    className="h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <Button
                                                onClick={startAssessment}
                                                size="lg"
                                                disabled={!data.name || !data.email}
                                                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Play className="w-5 h-5 mr-3" />
                                                {t.letsGo}
                                                <ArrowRight className="w-5 h-5 ml-3" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Preview Step - Compact Assessment Overview (fits in viewport)
    if (currentStep === 'preview') {
        return (
            <div className={`h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${language === 'ar' ? 'rtl' : 'ltr'} flex flex-col`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg flex-shrink-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            {getLocalizedText(tool, 'name')}
                                        </h1>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>{t.step} 2 {t.of} 3</span>
                                            <span>•</span>
                                            <span>{t.preview}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleLanguage}
                                className="backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                <span>{language === 'en' ? 'عربي' : 'English'}</span>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content - Flex grow to fill remaining space */}
                <div className="flex-grow flex flex-col justify-between p-6">
                    <div className="max-w-5xl mx-auto w-full">
                        {/* Preview Header */}
                        <div className="text-center space-y-3 mb-8">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                {t.assessmentOverview}
                            </h2>
                            <p className="text-lg text-gray-600">
                                You will answer {totalCriteria} questions one at a time
                            </p>
                        </div>

                        {/* Compact Grid Layout */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* User Info Summary */}
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center text-lg">
                                        <User className="w-5 h-5 mr-2 text-blue-600" />
                                        {t.evaluatorInfo}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500">{t.fullName}:</span>
                                            <span className="text-sm font-semibold text-gray-900">{data.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500">{t.emailAddress}:</span>
                                            <span className="text-sm font-semibold text-gray-900">{data.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500">{t.organization}:</span>
                                            <span className="text-sm font-semibold text-gray-900">{data.organization || 'N/A'}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Assessment Stats */}
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center text-lg">
                                        <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                                        Assessment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                                            <div className="text-xl font-bold text-blue-900">{totalCriteria}</div>
                                            <div className="text-xs font-medium text-blue-700">Total Questions</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                                            <div className="text-xl font-bold text-green-900">{estimatedMinutes}</div>
                                            <div className="text-xs font-medium text-green-700">Est. Minutes</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                                            <div className="text-xl font-bold text-purple-900">{domains.length}</div>
                                            <div className="text-xs font-medium text-purple-700">Domains</div>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                                            <div className="text-xl font-bold text-orange-900">1</div>
                                            <div className="text-xs font-medium text-orange-700">Per Screen</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Instructions */}
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50 mb-8">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center text-lg">
                                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                                    Quick Instructions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                        <span className="text-sm text-gray-700">One question displayed at a time</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                        <span className="text-sm text-gray-700">Answer with <strong>Yes</strong>, <strong>No</strong>, or <strong>N/A</strong></span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                        <span className="text-sm text-gray-700">Some questions may require file uploads</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                                        <span className="text-sm text-gray-700">Navigate easily with Previous/Next buttons</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Navigation Buttons - Sticky at bottom */}
                    <div className="flex justify-between items-center pt-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setCurrentStep('info')}
                            className="h-12 px-8 text-base"
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            {t.back}
                        </Button>
                        <Button
                            size="lg"
                            onClick={proceedToAssessment}
                            className="h-12 px-8 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            Start Assessment
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Assessment Step - Single Question Interface (FIXED: Proper height management and scrolling)
    const isLastQuestion = currentQuestionIndex === totalCriteria - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const currentResponse = data.responses[currentCriterion?.id];

    return (
        <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${language === 'ar' ? 'rtl' : 'ltr'} flex flex-col`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Header with Progress - Fixed Height */}
            <header className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg flex-shrink-0 h-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        {getLocalizedText(tool, 'name')}
                                    </h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>{t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}</span>
                                        <span>•</span>
                                        <span>{Math.round(currentProgressPercentage)}% Progress</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Progress Bar */}
                            <div className="flex items-center space-x-3">
                                <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
                                        style={{ width: `${currentProgressPercentage}%` }}
                                    />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 min-w-[3rem]">
                                    {Math.round(currentProgressPercentage)}%
                                </span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleLanguage}
                                className="backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                <span>{language === 'en' ? 'عربي' : 'English'}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area - Flexible with scrolling */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <div className="max-w-5xl mx-auto">
                            {/* Context Breadcrumb */}
                            {currentContext && (
                                <div className="mb-6">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/60 rounded-full px-4 py-2 backdrop-blur-sm w-fit">
                                        <span className="font-medium">{t.currentDomain}:</span>
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                            {getLocalizedText(currentContext.domain, 'name')}
                                        </Badge>
                                        <span className="text-gray-400">•</span>
                                        <span className="font-medium">{t.currentCategory}:</span>
                                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                            {getLocalizedText(currentContext.category, 'name')}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            {/* Single Question Card */}
                            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                                <CardContent className="p-8 lg:p-12">
                                    {currentCriterion && (
                                        <div className="space-y-8">
                                            {/* Question Number Badge */}
                                            <div className="flex justify-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                                                    <span className="text-2xl font-bold text-white">{currentQuestionIndex + 1}</span>
                                                </div>
                                            </div>

                                            {/* Question Title */}
                                            <div className="text-center space-y-4">
                                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
                                                    {getLocalizedText(currentCriterion, 'name')}
                                                </h2>

                                                {getLocalizedText(currentCriterion, 'description') && (
                                                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                                        {getLocalizedText(currentCriterion, 'description')}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Attachment Warning */}
                                            {currentCriterion.requires_attachment && (
                                                <div className="flex items-center justify-center">
                                                    <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
                                                        <Upload className="w-5 h-5 text-amber-600" />
                                                        <span className="text-sm font-medium text-amber-800">{t.fileRequiredIfYes}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Response Buttons - Large and Clear */}
                                            <div className="flex justify-center">
                                                <div className="flex gap-4">
                                                    <Button
                                                        variant={currentResponse?.response === 'yes' ? 'default' : 'outline'}
                                                        onClick={() => handleResponseChange(currentCriterion.id, 'yes')}
                                                        size="lg"
                                                        className={`h-16 px-8 text-lg font-semibold min-w-[120px] transition-all duration-200 ${
                                                            currentResponse?.response === 'yes'
                                                                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg scale-105'
                                                                : 'border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300'
                                                        }`}
                                                    >
                                                        <CheckCircle className="w-5 h-5 mr-2" />
                                                        {t.yes}
                                                    </Button>

                                                    <Button
                                                        variant={currentResponse?.response === 'no' ? 'default' : 'outline'}
                                                        onClick={() => handleResponseChange(currentCriterion.id, 'no')}
                                                        size="lg"
                                                        className={`h-16 px-8 text-lg font-semibold min-w-[120px] transition-all duration-200 ${
                                                            currentResponse?.response === 'no'
                                                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg scale-105'
                                                                : 'border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300'
                                                        }`}
                                                    >
                                                        <XCircle className="w-5 h-5 mr-2" />
                                                        {t.no}
                                                    </Button>

                                                    <Button
                                                        variant={currentResponse?.response === 'na' ? 'default' : 'outline'}
                                                        onClick={() => handleResponseChange(currentCriterion.id, 'na')}
                                                        size="lg"
                                                        className={`h-16 px-8 text-lg font-semibold min-w-[140px] transition-all duration-200 ${
                                                            currentResponse?.response === 'na'
                                                                ? 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg scale-105'
                                                                : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        <MinusCircle className="w-5 h-5 mr-2" />
                                                        {t.notApplicable}
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Additional Options - Notes and File Upload */}
                                            <div className="space-y-4 max-w-2xl mx-auto">
                                                {/* Notes Section */}
                                                <div className="space-y-2">
                                                    <Label className="text-base font-medium text-gray-700">{t.notes}</Label>
                                                    <Textarea
                                                        placeholder={t.notesPlaceholder}
                                                        value={currentResponse?.notes || ''}
                                                        onChange={(e) => handleNotesChange(currentCriterion.id, e.target.value)}
                                                        className="min-h-[100px] text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl resize-none"
                                                        rows={3}
                                                    />
                                                </div>

                                                {/* File Upload - Only show if required and answered Yes */}
                                                {currentCriterion.requires_attachment && currentResponse?.response === 'yes' && (
                                                    <div className="space-y-2">
                                                        <Label className="text-base font-medium text-red-700 flex items-center">
                                                            <Upload className="w-4 h-4 mr-2" />
                                                            {t.requiredAttachment}
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                type="file"
                                                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                                                                onChange={(e) => handleAttachmentChange(currentCriterion.id, e.target.files?.[0] || null)}
                                                                className="absolute inset-0 w-full h-12 opacity-0 cursor-pointer z-10"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="w-full h-12 text-base font-medium bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 border-2 border-dashed relative z-0"
                                                            >
                                                                <Upload className="w-5 h-5 mr-2" />
                                                                {currentResponse?.attachment ? t.changeFile : t.uploadFile}
                                                            </Button>
                                                        </div>
                                                        {currentResponse?.attachment && (
                                                            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                                <div className="flex items-center text-green-700">
                                                                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                                                    <span className="font-medium text-sm">
                                                                        {currentResponse.attachment.name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <p className="text-xs text-gray-500">{t.supportedFormats}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer Navigation - Always visible and properly positioned */}
                <div className="flex-shrink-0 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 shadow-lg">
                    <div className="p-6">
                        <div className="flex justify-between items-center max-w-5xl mx-auto">
                            {/* Left - Previous Button */}
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={isFirstQuestion ? () => setCurrentStep('preview') : goToPreviousQuestion}
                                className="h-12 px-6 text-base font-medium"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                {isFirstQuestion ? t.back : t.previous}
                            </Button>

                            {/* Center - Progress Info */}
                            <div className="text-center space-y-1">
                                <div className="text-sm font-medium text-gray-900">
                                    {currentQuestionIndex + 1} / {totalCriteria}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {completedCriteria} {t.completed}
                                </div>
                            </div>

                            {/* Right - Next/Submit Button */}
                            <div className="flex space-x-3">
                                {!isLastQuestion ? (
                                    <Button
                                        size="lg"
                                        onClick={goToNextQuestion}
                                        className="h-12 px-6 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        {t.next}
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={submitAssessment}
                                        disabled={!isComplete || processing}
                                        size="lg"
                                        className="h-12 px-6 text-base font-medium bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                {t.submitting}
                                            </>
                                        ) : (
                                            <>
                                                <Award className="w-5 h-5 mr-2" />
                                                {t.submit}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Completion Warning for Final Question */}
                        {isLastQuestion && !isComplete && (
                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center max-w-2xl mx-auto">
                                <div className="text-sm text-amber-800 font-medium">
                                    {t.completeAllRequired}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
