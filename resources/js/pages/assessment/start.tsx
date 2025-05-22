// resources/js/pages/assessment/start.tsx
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    Play,
    BarChart3,
    Clock,
    Award,
    Upload
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

interface AssessmentStartProps {
    assessmentData: AssessmentData;
    locale: string;
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
        notesPlaceholder: "Add any notes, comments, or explanations..."
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
        notesPlaceholder: "أضف أي ملاحظات أو تعليقات أو توضيحات..."
    }
};

export default function AssessmentStart({ assessmentData, locale }: AssessmentStartProps) {
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');
    const [currentStep, setCurrentStep] = useState<'info' | 'preview' | 'assessment'>('info');

    const { tool, domains } = assessmentData;
    const t = translations[language];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assessment Tools',
            href: '/assessment-tools',
        },
        {
            title: getLocalizedText(tool, 'name'),
            href: `/assessment/start/${tool.id}`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id,
        guest_name: '',
        guest_email: '',
        organization: '',
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

    const totalCriteria = domains.reduce((total, domain) =>
            total + domain.categories.reduce((catTotal, category) =>
                catTotal + category.criteria.length, 0
            ), 0
    );

    const totalCategories = domains.reduce((total, domain) => total + domain.categories.length, 0);
    const completedCriteria = Object.keys(data.responses).filter(id => data.responses[parseInt(id)]?.response).length;
    const progressPercentage = totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0;
    const estimatedMinutes = Math.ceil(totalCriteria * 1.5);

    // Check if assessment is complete
    const isComplete = Object.keys(data.responses).length === totalCriteria &&
        Object.values(data.responses).every(response => {
            const criterion = domains
                .flatMap(d => d.categories)
                .flatMap(c => c.criteria)
                .find(c => c.id === response.criterion_id);

            // Check if response is provided
            if (!response.response) return false;

            // Check if required attachment is provided for "yes" responses
            if (criterion?.requires_attachment && response.response === 'yes') {
                return response.attachment !== undefined && response.attachment !== null;
            }

            return true;
        });

    const startAssessment = () => {
        if (!data.guest_name || !data.guest_email) {
            return;
        }
        setCurrentStep('preview');
    };

    const proceedToAssessment = () => {
        setCurrentStep('assessment');
    };

    const submitAssessment = () => {
        if (!isComplete || processing) return;

        // Prepare FormData to match your backend expectations
        const formData = new FormData();

        // Add user info
        formData.append('tool_id', tool.id.toString());
        formData.append('guest_name', data.guest_name);
        formData.append('guest_email', data.guest_email);
        if (data.organization) {
            formData.append('organization', data.organization);
        }

        // Add responses in the format expected by your backend
        Object.values(data.responses).forEach((response, index) => {
            formData.append(`responses[${index}][criterion_id]`, response.criterion_id.toString());
            formData.append(`responses[${index}][response]`, response.response);

            if (response.notes) {
                formData.append(`responses[${index}][notes]`, response.notes);
            }

            if (response.attachment) {
                formData.append(`responses[${index}][attachment]`, response.attachment);
            }
        });

        post('/assessment/submit', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                // Handle success - will redirect automatically if your controller redirects
            },
            onError: (errors) => {
                console.error('Error submitting assessment:', errors);
            },
        });
    };

    // Info Step - User Information Collection
    if (currentStep === 'info') {
        return (
            <>
                <Head title={`${t.startAssessment} - ${getLocalizedText(tool, 'name')}`} />

                <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {/* Header */}
                    <header className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-xl font-semibold text-gray-900">{getLocalizedText(tool, 'name')}</h1>
                                    <span className="text-sm text-gray-500">{t.startAssessment}</span>
                                </div>
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
                    </header>

                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto">
                            {/* Tool Introduction */}
                            <div className="text-center mb-8">
                                {tool.image && (
                                    <div className="mx-auto h-24 w-24 overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={tool.image}
                                            alt={getLocalizedText(tool, 'name')}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {getLocalizedText(tool, 'name')}
                                </h1>
                                {getLocalizedText(tool, 'description') && (
                                    <p className="text-lg text-gray-600">
                                        {getLocalizedText(tool, 'description')}
                                    </p>
                                )}
                            </div>

                            {/* Assessment Overview Stats */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <BarChart3 className="w-5 h-5 mr-2" />
                                        {t.assessmentOverview}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">{domains.length}</div>
                                            <div className="text-sm text-gray-600">{t.domains}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">{totalCategories}</div>
                                            <div className="text-sm text-gray-600">{t.categories}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">{totalCriteria}</div>
                                            <div className="text-sm text-gray-600">{t.totalCriteria}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-orange-600">{estimatedMinutes}</div>
                                            <div className="text-sm text-gray-600">{t.minutes}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* User Information Form */}
                            <Card className="border-l-4 border-blue-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <User className="w-5 h-5 mr-2" />
                                        {t.evaluatorInfo}
                                    </CardTitle>
                                    <CardDescription>
                                        Please provide your information to begin the assessment
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="guest_name" className="flex items-center">
                                                <User className="w-4 h-4 mr-2" />
                                                {t.fullName} <span className="text-red-500 ml-1">*</span>
                                            </Label>
                                            <Input
                                                id="guest_name"
                                                value={data.guest_name}
                                                onChange={(e) => setData('guest_name', e.target.value)}
                                                placeholder={t.enterFullName}
                                                className="h-12"
                                                required
                                            />
                                            <InputError message={errors.guest_name} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="guest_email" className="flex items-center">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {t.emailAddress} <span className="text-red-500 ml-1">*</span>
                                            </Label>
                                            <Input
                                                id="guest_email"
                                                type="email"
                                                value={data.guest_email}
                                                onChange={(e) => setData('guest_email', e.target.value)}
                                                placeholder={t.enterEmail}
                                                className="h-12"
                                                required
                                            />
                                            <InputError message={errors.guest_email} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="organization" className="flex items-center">
                                                <Building className="w-4 h-4 mr-2" />
                                                {t.organization} ({t.optional})
                                            </Label>
                                            <Input
                                                id="organization"
                                                value={data.organization}
                                                onChange={(e) => setData('organization', e.target.value)}
                                                placeholder={t.enterOrganization}
                                                className="h-12"
                                            />
                                            <InputError message={errors.organization} />
                                        </div>
                                    </div>

                                    <div className="flex justify-center pt-4">
                                        <Button
                                            onClick={startAssessment}
                                            size="lg"
                                            disabled={!data.guest_name || !data.guest_email}
                                            className="px-8"
                                        >
                                            <Play className="w-5 h-5 mr-2" />
                                            {t.getStarted}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Preview Step - Show assessment structure
    if (currentStep === 'preview') {
        return (
            <>
                <Head title={`${t.preview} - ${getLocalizedText(tool, 'name')}`} />

                <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {/* Header */}
                    <header className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-xl font-semibold text-gray-900">{getLocalizedText(tool, 'name')}</h1>
                                    <span className="text-sm text-gray-500">{t.preview}</span>
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
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            {/* Assessment Structure Preview */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <FileText className="w-5 h-5 mr-2" />
                                        {t.assessmentOverview}
                                    </CardTitle>
                                    <CardDescription>
                                        Review the assessment structure before beginning
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {domains.map((domain, domainIndex) => (
                                            <div key={domain.id} className="border rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className="text-lg font-medium">{getLocalizedText(domain, 'name')}</h3>
                                                    <Badge variant="outline">
                                                        {domain.categories.reduce((acc, cat) => acc + cat.criteria.length, 0)} {t.criteria}
                                                    </Badge>
                                                </div>

                                                {getLocalizedText(domain, 'description') && (
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        {getLocalizedText(domain, 'description')}
                                                    </p>
                                                )}

                                                <div className="space-y-2">
                                                    {domain.categories.map((category) => (
                                                        <div key={category.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                                            <span className="text-sm font-medium">{getLocalizedText(category, 'name')}</span>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {category.criteria.length} {t.criteria}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Navigation */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-center">
                                        <Button
                                            variant="outline"
                                            onClick={() => setCurrentStep('info')}
                                        >
                                            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                                            {t.back}
                                        </Button>

                                        <div className="text-center">
                                            <div className="text-sm text-gray-600 mb-2">
                                                Ready to begin assessment
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                <span>{t.estimatedTime}: ~{estimatedMinutes} {t.minutes}</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={proceedToAssessment}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            {t.startAssessment}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Assessment Step - Main assessment interface
    return (
        <>
            <Head title={`${t.assessment} - ${getLocalizedText(tool, 'name')}`} />

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
                                    {t.progress}: {Math.round(progressPercentage)}%
                                </div>
                                <Progress value={progressPercentage} className="w-32" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Tabs defaultValue={domains[0]?.id.toString()} className="space-y-6">
                            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${domains.length}, 1fr)` }}>
                                {domains.map((domain) => (
                                    <TabsTrigger key={domain.id} value={domain.id.toString()} className="text-sm">
                                        {getLocalizedText(domain, 'name')}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {domains.map((domain) => (
                                <TabsContent key={domain.id} value={domain.id.toString()} className="space-y-6">
                                    <Card className="border-l-4 border-blue-500">
                                        <CardHeader>
                                            <CardTitle className="text-xl">{getLocalizedText(domain, 'name')}</CardTitle>
                                            {getLocalizedText(domain, 'description') && (
                                                <CardDescription className="text-base">
                                                    {getLocalizedText(domain, 'description')}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                    </Card>

                                    <div className="space-y-6">
                                        {domain.categories.map((category) => (
                                            <Card key={category.id}>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between">
                                                        <span>{getLocalizedText(category, 'name')}</span>
                                                        <Badge variant="outline">
                                                            {category.criteria.length} {t.criteria}
                                                        </Badge>
                                                    </CardTitle>
                                                    {getLocalizedText(category, 'description') && (
                                                        <CardDescription>
                                                            {getLocalizedText(category, 'description')}
                                                        </CardDescription>
                                                    )}
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    {category.criteria.map((criterion) => (
                                                        <div key={criterion.id} className="space-y-4 p-4 border rounded-lg bg-gray-50">
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
                                                                        {criterion.requires_attachment && (
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

                                                                    {data.responses[criterion.id]?.response && (
                                                                        <div className="flex items-center ml-4">
                                                                            {data.responses[criterion.id].response === 'yes' && (
                                                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                                            )}
                                                                            {data.responses[criterion.id].response === 'no' && (
                                                                                <XCircle className="w-5 h-5 text-red-600" />
                                                                            )}
                                                                            {data.responses[criterion.id].response === 'na' && (
                                                                                <MinusCircle className="w-5 h-5 text-gray-600" />
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Response Buttons */}
                                                            <div className="flex justify-center space-x-3">
                                                                <Button
                                                                    variant={data.responses[criterion.id]?.response === 'yes' ? 'default' : 'outline'}
                                                                    size="sm"
                                                                    onClick={() => handleResponseChange(criterion.id, 'yes')}
                                                                    className={data.responses[criterion.id]?.response === 'yes' ? 'bg-green-600 hover:bg-green-700 text-white' : 'hover:bg-green-50 hover:border-green-300'}
                                                                >
                                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                                    {t.yes}
                                                                </Button>
                                                                <Button
                                                                    variant={data.responses[criterion.id]?.response === 'no' ? 'default' : 'outline'}
                                                                    size="sm"
                                                                    onClick={() => handleResponseChange(criterion.id, 'no')}
                                                                    className={data.responses[criterion.id]?.response === 'no' ? 'bg-red-600 hover:bg-red-700 text-white' : 'hover:bg-red-50 hover:border-red-300'}
                                                                >
                                                                    <XCircle className="w-4 h-4 mr-1" />
                                                                    {t.no}
                                                                </Button>
                                                                <Button
                                                                    variant={data.responses[criterion.id]?.response === 'na' ? 'default' : 'outline'}
                                                                    size="sm"
                                                                    onClick={() => handleResponseChange(criterion.id, 'na')}
                                                                    className={data.responses[criterion.id]?.response === 'na' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'hover:bg-gray-50 hover:border-gray-300'}
                                                                >
                                                                    <MinusCircle className="w-4 h-4 mr-1" />
                                                                    {t.notApplicable}
                                                                </Button>
                                                            </div>

                                                            {/* Selected Response Indicator */}
                                                            {data.responses[criterion.id]?.response && (
                                                                <div className="text-center">
                                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                                        {t.selected}: {data.responses[criterion.id].response.toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Notes and Attachment Section */}
                                                            {data.responses[criterion.id]?.response && (
                                                                <div className="space-y-4 pt-4 border-t">
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor={`notes_${criterion.id}`} className="flex items-center">
                                                                            <FileText className="w-4 h-4 mr-2" />
                                                                            {t.notes}
                                                                        </Label>
                                                                        <Textarea
                                                                            id={`notes_${criterion.id}`}
                                                                            value={data.responses[criterion.id]?.notes || ''}
                                                                            onChange={(e) => handleNotesChange(criterion.id, e.target.value)}
                                                                            placeholder={t.notesPlaceholder}
                                                                            rows={2}
                                                                        />
                                                                    </div>

                                                                    {/* Required attachment for "yes" responses */}
                                                                    {criterion.requires_attachment && data.responses[criterion.id]?.response === 'yes' && (
                                                                        <div className="border-2 border-dashed border-yellow-300 rounded-lg p-4 bg-yellow-50">
                                                                            <Label htmlFor={`attachment_${criterion.id}`} className="text-yellow-800 font-medium">
                                                                                {t.requiredAttachment}
                                                                            </Label>
                                                                            <p className="text-sm text-yellow-700 mb-2">
                                                                                Please provide supporting documentation for your "Yes" response
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

                                                                    {/* Optional attachment for other responses */}
                                                                    {(!criterion.requires_attachment || data.responses[criterion.id]?.response !== 'yes') && (
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
                                                                                Optional: Add supporting documentation
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>

                        {/* Submit Assessment */}
                        <Card className="mt-6">
                            <CardContent className="pt-6">
                                <div className="text-center space-y-4">
                                    <div className="space-y-2">
                                        <div className="text-lg font-medium">
                                            {completedCriteria} / {totalCriteria} {t.criteria} completed
                                        </div>
                                        <Progress value={progressPercentage} className="max-w-md mx-auto" />
                                    </div>

                                    {isComplete ? (
                                        <div className="space-y-2">
                                            <div className="text-green-600 font-medium flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Assessment Complete!
                                            </div>
                                            <Button
                                                onClick={submitAssessment}
                                                size="lg"
                                                disabled={processing}
                                                className="bg-green-600 hover:bg-green-700 px-8"
                                            >
                                                <Award className="w-5 h-5 mr-2" />
                                                {processing ? t.submitting : t.submitAssessment}
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
