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
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
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
    AlertCircle
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
    prefillData?: {           // Add this
        name: string;
        email: string;
    } | null;
    auth?: {
        user: User;
    };
}

interface Translations {
    en: {
        startAssessment: string;
        evaluatorInfo: string;
        fullName: string;
        emailAddress: string;
        organization: string;
        optional: string;
        required: string;
        enterFullName: string;
        enterEmail: string;
        enterOrganization: string;
        assessment: string;
        progress: string;
        criteria: string;
        yes: string;
        no: string;
        notApplicable: string;
        notes: string;
        addNotes: string;
        submitAssessment: string;
        submitting: string;
        assessmentOverview: string;
        domains: string;
        categories: string;
        totalCriteria: string;
        estimatedTime: string;
        minutes: string;
        getStarted: string;
        continue: string;
        back: string;
        next: string;
        preview: string;
        selected: string;
        additionalInfo: string;
        supportingDocument: string;
        requiredAttachment: string;
        supportedFormats: string;
        requiresAttachment: string;
        notesPlaceholder: string;
        readyToBegin: string;
        letsGo: string;
        assessmentFeatures: string;
        comprehensiveEvaluation: string;
        instantResults: string;
        secureData: string;
        professionalGrade: string;
        step: string;
        of: string;
        question: string;
        previous: string;
        skipQuestion: string;
        uploadFile: string;
        removeFile: string;
        completeAssessment: string;
        almostDone: string;
    };
    ar: {
        startAssessment: string;
        evaluatorInfo: string;
        fullName: string;
        emailAddress: string;
        organization: string;
        optional: string;
        required: string;
        enterFullName: string;
        enterEmail: string;
        enterOrganization: string;
        assessment: string;
        progress: string;
        criteria: string;
        yes: string;
        no: string;
        notApplicable: string;
        notes: string;
        addNotes: string;
        submitAssessment: string;
        submitting: string;
        assessmentOverview: string;
        domains: string;
        categories: string;
        totalCriteria: string;
        estimatedTime: string;
        minutes: string;
        getStarted: string;
        continue: string;
        back: string;
        next: string;
        preview: string;
        selected: string;
        additionalInfo: string;
        supportingDocument: string;
        requiredAttachment: string;
        supportedFormats: string;
        requiresAttachment: string;
        notesPlaceholder: string;
        readyToBegin: string;
        letsGo: string;
        assessmentFeatures: string;
        comprehensiveEvaluation: string;
        instantResults: string;
        secureData: string;
        professionalGrade: string;
        step: string;
        of: string;
        question: string;
        previous: string;
        skipQuestion: string;
        uploadFile: string;
        removeFile: string;
        completeAssessment: string;
        almostDone: string;
    };
}

const translations: Translations = {
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
        almostDone: "Almost Done!"
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
        almostDone: "أوشكت على الانتهاء!"
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

    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id,
        name: prefillData?.name || '',           // Use prefillData from props
        email: prefillData?.email || '',         // Use prefillData from props
        organization: user?.organization || '',
        responses: {} as Record<number, { criterion_id: number; response: 'yes' | 'no' | 'na'; notes?: string; attachment?: File }>,
    });

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

    const startAssessment = () => {
        if (!data.name || !data.email) {          // Changed from guest_name and guest_email
            return;
        }
        setCurrentStep('preview');
    };

    const proceedToAssessment = () => {
        setCurrentStep('assessment');
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < allCriteria.length - 1) {
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

        const formData = {
            tool_id: tool.id,
            name: data.name,
            email: data.email,
            organization: data.organization || null,
            responses: allCriteria.reduce((acc, criterion) => {
                const response = data.responses[criterion.id];
                if (response) {
                    acc[criterion.id] = {
                        criterion_id: criterion.id,
                        response: response.response,
                        notes: response.notes || null,
                        attachment: response.attachment || null
                    };
                }
                return acc;
            }, {})
        };

        // Use the POST route for assessment.start (handled by GuestAssessmentController)
        post(route('assessment.start'), formData);
    };

    // ... rest of your component


    // Info Step - User Information Collection
    if (currentStep === 'info') {
        return (
            <>
                <Head title={`${t.startAssessment} - ${getLocalizedText(tool, 'name')}`} />

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
                                                    <Label htmlFor="name"
                                                           className="flex items-center text-base font-semibold text-gray-700">
                                                        <User className="w-4 h-4 mr-2 text-blue-600" />
                                                        {t.fullName} <span className="text-red-500 ml-1">*</span>
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        value={data.name}                           // Changed from guest_name
                                                        onChange={(e) => setData('name', e.target.value)}    // Changed field name
                                                        placeholder={t.enterFullName}
                                                        className="h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                                        required
                                                        disabled={!!user}
                                                    />
                                                    <InputError message={errors.name} /> {/* Changed error field */}
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="email"
                                                           className="flex items-center text-base font-semibold text-gray-700">
                                                        <Mail className="w-4 h-4 mr-2 text-blue-600" />
                                                        {t.emailAddress} <span className="text-red-500 ml-1">*</span>
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}                          // Changed from guest_email
                                                        onChange={(e) => setData('email', e.target.value)}   // Changed field name
                                                        placeholder={t.enterEmail}
                                                        className="h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                                        required
                                                        disabled={!!user}
                                                    />
                                                    <InputError message={errors.email} /> {/* Changed error field */}
                                                </div>

                                                <div className="space-y-3">
                                                    <Label htmlFor="organization"
                                                           className="flex items-center text-base font-semibold text-gray-700">
                                                        <Building className="w-4 h-4 mr-2 text-blue-600" />
                                                        {t.organization} <span
                                                        className="text-sm text-gray-500 ml-1">({t.optional})</span>
                                                    </Label>
                                                    <Input
                                                        id="organization"
                                                        value={data.organization}
                                                        onChange={(e) => setData('organization', e.target.value)}
                                                        placeholder={t.enterOrganization}
                                                        className="h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                                    />
                                                    <InputError message={errors.organization} />
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
            </>
        );
    }

    // Preview Step - Assessment Overview
    if (currentStep === 'preview') {
        return (
            <>
                <Head title={`${t.preview} - ${getLocalizedText(tool, 'name')}`} />

                <div
                    className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {/* Header */}
                    <header className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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

                    <div className="py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Preview Header */}
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                    {t.assessmentOverview}
                                </h2>
                                <p className="text-xl text-gray-600">
                                    You will be asked {totalCriteria} questions to complete this assessment
                                </p>
                            </div>

                            {/* User Info Summary */}
                            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl">
                                        <User className="w-6 h-6 mr-3 text-blue-600" />
                                        {t.evaluatorInfo}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium text-gray-500">{t.fullName}</div>
                                            <div className="text-base font-semibold text-gray-900">{data.name}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium text-gray-500">{t.emailAddress}</div>
                                            <div className="text-base font-semibold text-gray-900">{data.email}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium text-gray-500">{t.organization}</div>
                                            <div className="text-base font-semibold text-gray-900">{data.organization || 'N/A'}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Assessment Stats */}
                            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl">
                                        <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                                        Assessment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center space-y-3 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                            <div className="w-12 h-12 mx-auto bg-blue-500 rounded-xl flex items-center justify-center">
                                                <HelpCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-blue-900">{totalCriteria}</div>
                                                <div className="text-sm font-medium text-blue-700">Total Questions</div>
                                            </div>
                                        </div>
                                        <div className="text-center space-y-3 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                            <div className="w-12 h-12 mx-auto bg-green-500 rounded-xl flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-green-900">{estimatedMinutes}</div>
                                                <div className="text-sm font-medium text-green-700">Estimated Minutes</div>
                                            </div>
                                        </div>
                                        <div className="text-center space-y-3 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                            <div className="w-12 h-12 mx-auto bg-purple-500 rounded-xl flex items-center justify-center">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-purple-900">{allCriteria.filter(c => c.requires_attachment).length}</div>
                                                <div className="text-sm font-medium text-purple-700">May Need Files</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Instructions */}
                            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-yellow-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl">
                                        <AlertCircle className="w-6 h-6 mr-3 text-yellow-600" />
                                        Instructions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                                            <p className="text-gray-700">Answer each question with <strong>Yes</strong>, <strong>No</strong>, or <strong>Not Applicable</strong></p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                                            <p className="text-gray-700">Some questions may require file uploads if you answer <strong>Yes</strong></p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                                            <p className="text-gray-700">You can add optional notes to any question for additional context</p>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                                            <p className="text-gray-700">Navigate between questions using the Previous/Next buttons</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between items-center pt-8">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setCurrentStep('info')}
                                    className="h-14 px-8 text-lg"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    {t.back}
                                </Button>
                                <Button
                                    size="lg"
                                    onClick={proceedToAssessment}
                                    className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    Start Assessment
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Assessment Step - Question by Question Interface
    const currentCriterion = allCriteria[currentQuestionIndex];
    const currentResponse = data.responses[currentCriterion?.id];
    const isLastQuestion = currentQuestionIndex === allCriteria.length - 1;
    const questionProgressPercentage = totalCriteria > 0 ? ((currentQuestionIndex + 1) / totalCriteria) * 100 : 0;

    return (
        <>
            <Head title={`${t.question} ${currentQuestionIndex + 1} - ${getLocalizedText(tool, 'name')}`} />

            <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Header with Progress */}
                <header className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg sticky top-0 z-50">
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
                                            <span>{t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}</span>
                                            <span>•</span>
                                            <span>{Math.round(questionProgressPercentage)}% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                                            style={{ width: `${questionProgressPercentage}%` }}
                                        />
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
                    </div>
                </header>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Question Card */}
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                            <CardHeader className="space-y-6 pb-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                            {currentQuestionIndex + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-blue-600 mb-1">
                                                {t.question} {currentQuestionIndex + 1} {t.of} {totalCriteria}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {completedCriteria} completed • {totalCriteria - completedCriteria} remaining
                                            </div>
                                        </div>
                                    </div>
                                    {isLastQuestion && (
                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                            {t.almostDone}
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-8 pb-8">
                                {/* Question Content */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 leading-relaxed mb-4">
                                            {getLocalizedText(currentCriterion, 'name')}
                                        </h2>
                                        {getLocalizedText(currentCriterion, 'description') && (
                                            <div className="prose prose-gray max-w-none">
                                                <p className="text-lg text-gray-600 leading-relaxed">
                                                    {getLocalizedText(currentCriterion, 'description')}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Attachment Requirement Notice */}
                                    {currentCriterion.requires_attachment && (
                                        <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                            <Upload className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-sm font-medium text-amber-800">File Upload Required</div>
                                                <div className="text-sm text-amber-700">
                                                    If you answer "Yes" to this question, you'll need to upload a supporting document.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Response Options */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <Button
                                            variant={currentResponse?.response === 'yes' ? 'default' : 'outline'}
                                            onClick={() => handleResponseChange(currentCriterion.id, 'yes')}
                                            className={`h-16 text-lg font-semibold transition-all duration-200 ${
                                                currentResponse?.response === 'yes'
                                                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                                                    : 'border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300'
                                            }`}
                                        >
                                            <CheckCircle className="w-5 h-5 mr-3" />
                                            {t.yes}
                                        </Button>
                                        <Button
                                            variant={currentResponse?.response === 'no' ? 'default' : 'outline'}
                                            onClick={() => handleResponseChange(currentCriterion.id, 'no')}
                                            className={`h-16 text-lg font-semibold transition-all duration-200 ${
                                                currentResponse?.response === 'no'
                                                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                                                    : 'border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300'
                                            }`}
                                        >
                                            <XCircle className="w-5 h-5 mr-3" />
                                            {t.no}
                                        </Button>
                                        <Button
                                            variant={currentResponse?.response === 'na' ? 'default' : 'outline'}
                                            onClick={() => handleResponseChange(currentCriterion.id, 'na')}
                                            className={`h-16 text-lg font-semibold transition-all duration-200 ${
                                                currentResponse?.response === 'na'
                                                    ? 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg'
                                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                        >
                                            <MinusCircle className="w-5 h-5 mr-3" />
                                            {t.notApplicable}
                                        </Button>
                                    </div>

                                    { console.log(currentCriterion.requires_attachment , currentResponse?.response , currentCriterion)}
                                    {currentCriterion.requires_attachment && currentResponse?.response === 'yes' && (

                                        <Card className="border-amber-200 bg-amber-50">
                                            <CardContent className="p-6 space-y-4">
                                                <div className="flex items-center space-x-3">
                                                    <Upload className="w-5 h-5 text-amber-600" />
                                                    <Label className="text-base font-semibold text-amber-800">
                                                        {t.requiredAttachment}
                                                    </Label>
                                                </div>
                                                <div className="space-y-3">
                                                    <Input
                                                        type="file"
                                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                                                        onChange={(e) => handleAttachmentChange(currentCriterion.id, e.target.files?.[0] || null)}
                                                        className="file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 file:cursor-pointer cursor-pointer"
                                                    />
                                                    <p className="text-sm text-amber-700">{t.supportedFormats}</p>
                                                    {currentResponse?.attachment && (
                                                        <div className="flex items-center justify-between p-3 bg-amber-100 rounded-lg">
                                                            <div className="flex items-center space-x-2">
                                                                <FileText className="w-4 h-4 text-amber-700" />
                                                                <span className="text-sm font-medium text-amber-800">
                                                                    {currentResponse.attachment.name}
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleAttachmentChange(currentCriterion.id, null)}
                                                                className="text-amber-700 hover:text-amber-800 hover:bg-amber-200"
                                                            >
                                                                {t.removeFile}
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Notes Section */}
                                    <div className="space-y-3">
                                        <Label className="flex items-center text-base font-medium text-gray-700">
                                            <FileText className="w-4 h-4 mr-2" />
                                            {t.notes}
                                        </Label>
                                        <Textarea
                                            placeholder={t.notesPlaceholder}
                                            value={currentResponse?.notes || ''}
                                            onChange={(e) => handleNotesChange(currentCriterion.id, e.target.value)}
                                            className="min-h-24 resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-base"
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation */}
                        <div className="mt-8 flex justify-between items-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={currentQuestionIndex === 0 ? () => setCurrentStep('preview') : goToPreviousQuestion}
                                className="h-14 px-8 text-lg"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                {currentQuestionIndex === 0 ? t.back : t.previous}
                            </Button>

                            <div className="flex space-x-4">
                                {!isLastQuestion ? (
                                    <Button
                                        size="lg"
                                        onClick={goToNextQuestion}
                                        className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        {t.next}
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={submitAssessment}
                                        disabled={!isComplete || processing}
                                        size="lg"
                                        className="h-14 px-8 text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                {t.submitting}
                                            </>
                                        ) : (
                                            <>
                                                <Award className="w-5 h-5 mr-3" />
                                                {t.completeAssessment}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Completion Status */}
                        {isLastQuestion && !isComplete && (
                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <AlertCircle className="w-5 h-5 text-amber-600" />
                                    <div>
                                        <div className="text-sm font-medium text-amber-800">Almost there!</div>
                                        <div className="text-sm text-amber-700">
                                            Please complete all required questions and upload necessary files before submitting.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
