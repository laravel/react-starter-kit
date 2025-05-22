import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Eye,
    Plus,
    Search,
    Filter,
    Calendar,
    User,
    Building,
    BarChart3,
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    Globe
} from 'lucide-react';

interface Assessment {
    id: number;
    title_en: string;
    title_ar: string;
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
        description_en?: string;
        description_ar?: string;
    };
    guest_name: string;
    guest_email: string;
    organization?: string;
    status: string;
    created_at: string;
    updated_at: string;
    overall_score?: number;
    completion_percentage?: number;
}

interface AssessmentsIndexProps {
    assessments: Assessment[];
    locale: string;
}

interface Translations {
    en: {
        pageTitle: string;
        myAssessments: string;
        newAssessment: string;
        noAssessments: string;
        startFirst: string;
        searchPlaceholder: string;
        filterAll: string;
        filterCompleted: string;
        filterInProgress: string;
        filterDraft: string;
        viewResults: string;
        continueAssessment: string;
        overallScore: string;
        progress: string;
        createdOn: string;
        lastUpdated: string;
        assessor: string;
        organization: string;
        status: string;
        actions: string;
        completed: string;
        inProgress: string;
        draft: string;
        pending: string;
        showingResults: string;
        of: string;
        assessments: string;
    };
    ar: {
        pageTitle: string;
        myAssessments: string;
        newAssessment: string;
        noAssessments: string;
        startFirst: string;
        searchPlaceholder: string;
        filterAll: string;
        filterCompleted: string;
        filterInProgress: string;
        filterDraft: string;
        viewResults: string;
        continueAssessment: string;
        overallScore: string;
        progress: string;
        createdOn: string;
        lastUpdated: string;
        assessor: string;
        organization: string;
        status: string;
        actions: string;
        completed: string;
        inProgress: string;
        draft: string;
        pending: string;
        showingResults: string;
        of: string;
        assessments: string;
    };
}

const translations: Translations = {
    en: {
        pageTitle: "My Assessments",
        myAssessments: "My Assessments",
        newAssessment: "New Assessment",
        noAssessments: "You haven't completed any assessments yet.",
        startFirst: "Start Your First Assessment",
        searchPlaceholder: "Search assessments...",
        filterAll: "All",
        filterCompleted: "Completed",
        filterInProgress: "In Progress",
        filterDraft: "Draft",
        viewResults: "View Results",
        continueAssessment: "Continue",
        overallScore: "Overall Score",
        progress: "Progress",
        createdOn: "Created on",
        lastUpdated: "Last updated",
        assessor: "Assessor",
        organization: "Organization",
        status: "Status",
        actions: "Actions",
        completed: "Completed",
        inProgress: "In Progress",
        draft: "Draft",
        pending: "Pending",
        showingResults: "Showing",
        of: "of",
        assessments: "assessments"
    },
    ar: {
        pageTitle: "تقييماتي",
        myAssessments: "تقييماتي",
        newAssessment: "تقييم جديد",
        noAssessments: "لم تقم بإجراء أي تقييمات بعد.",
        startFirst: "ابدأ أول تقييم",
        searchPlaceholder: "البحث في التقييمات...",
        filterAll: "الكل",
        filterCompleted: "مكتمل",
        filterInProgress: "قيد التنفيذ",
        filterDraft: "مسودة",
        viewResults: "عرض النتائج",
        continueAssessment: "متابعة",
        overallScore: "النتيجة الإجمالية",
        progress: "التقدم",
        createdOn: "تم الإنشاء في",
        lastUpdated: "آخر تحديث",
        assessor: "المقيم",
        organization: "المؤسسة",
        status: "الحالة",
        actions: "الإجراءات",
        completed: "مكتمل",
        inProgress: "قيد التنفيذ",
        draft: "مسودة",
        pending: "معلق",
        showingResults: "عرض",
        of: "من",
        assessments: "تقييمات"
    }
};

export default function AssessmentsIndex({ assessments, locale }: AssessmentsIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');

    const t = translations[language];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t.myAssessments,
            href: '/assessments',
        },
    ];

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const getLocalizedText = (item: any, field: string): string => {
        return language === 'ar' ? item[`${field}_ar`] : item[`${field}_en`];
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'completed': return t.completed;
            case 'in_progress': return t.inProgress;
            case 'draft': return t.draft;
            case 'pending': return t.pending;
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'in_progress': return <Clock className="w-4 h-4" />;
            case 'draft': return <FileText className="w-4 h-4" />;
            case 'pending': return <XCircle className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    // Filter assessments based on search and status
    const filteredAssessments = assessments.filter(assessment => {
        const matchesSearch =
            getLocalizedText(assessment.tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
            assessment.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (assessment.organization && assessment.organization.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.pageTitle} />

            <div className={`flex h-full flex-1 flex-col gap-6 rounded-xl p-6 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {t.myAssessments}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {t.showingResults} {filteredAssessments.length} {t.of} {assessments.length} {t.assessments}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleLanguage}
                            className="flex items-center gap-2"
                        >
                            <Globe className="w-4 h-4" />
                            <span>{language === 'en' ? 'عربي' : 'English'}</span>
                        </Button>

                        <Link href="/assessment-tools">
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                {t.newAssessment}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder={t.searchPlaceholder}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="flex gap-2">
                                <Button
                                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter('all')}
                                >
                                    {t.filterAll}
                                </Button>
                                <Button
                                    variant={statusFilter === 'completed' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter('completed')}
                                >
                                    {t.filterCompleted}
                                </Button>
                                <Button
                                    variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter('in_progress')}
                                >
                                    {t.filterInProgress}
                                </Button>
                                <Button
                                    variant={statusFilter === 'draft' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter('draft')}
                                >
                                    {t.filterDraft}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content */}
                {filteredAssessments.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="text-center">
                                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {searchTerm || statusFilter !== 'all' ? 'No matching assessments found' : t.noAssessments}
                                </h3>
                                <p className="text-gray-600 mb-6 max-w-md">
                                    {searchTerm || statusFilter !== 'all'
                                        ? 'Try adjusting your search criteria or filters'
                                        : 'Get started by creating your first assessment to track and measure your progress.'
                                    }
                                </p>
                                <Link href="/assessment-tools">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t.startFirst}
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {filteredAssessments.map((assessment) => (
                            <Card key={assessment.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-blue-500">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-3">
                                            {/* Header */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                        {getLocalizedText(assessment.tool, 'name')}
                                                    </h3>
                                                    {getLocalizedText(assessment.tool, 'description') && (
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            {getLocalizedText(assessment.tool, 'description')}
                                                        </p>
                                                    )}
                                                </div>
                                                <Badge className={`${getStatusColor(assessment.status)} flex items-center gap-1`}>
                                                    {getStatusIcon(assessment.status)}
                                                    {getStatusText(assessment.status)}
                                                </Badge>
                                            </div>

                                            {/* Assessment Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <span className="text-gray-500">{t.assessor}:</span>
                                                        <p className="font-medium">{assessment.guest_name}</p>
                                                    </div>
                                                </div>

                                                {assessment.organization && (
                                                    <div className="flex items-center gap-2">
                                                        <Building className="w-4 h-4 text-gray-400" />
                                                        <div>
                                                            <span className="text-gray-500">{t.organization}:</span>
                                                            <p className="font-medium">{assessment.organization}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <span className="text-gray-500">{t.createdOn}:</span>
                                                        <p className="font-medium">{formatDate(assessment.created_at)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <span className="text-gray-500">{t.lastUpdated}:</span>
                                                        <p className="font-medium">{formatDate(assessment.updated_at)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress and Score */}
                                            {(assessment.overall_score !== null || assessment.completion_percentage !== null) && (
                                                <div className="flex items-center gap-6 pt-2">
                                                    {assessment.completion_percentage !== null && (
                                                        <div className="flex items-center gap-2">
                                                            <BarChart3 className="w-4 h-4 text-blue-600" />
                                                            <span className="text-sm text-gray-600">{t.progress}:</span>
                                                            <span className="font-semibold text-blue-600">
                                                                {assessment.completion_percentage}%
                                                            </span>
                                                        </div>
                                                    )}

                                                    {assessment.overall_score !== null && (
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm text-gray-600">{t.overallScore}:</span>
                                                            <span className="font-semibold text-green-600">
                                                                {assessment.overall_score}%
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 ml-4">
                                            {assessment.status === 'completed' ? (
                                                <Link href={`/assessment/results/${assessment.id}`}>
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        {t.viewResults}
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Link href={`/assessment//${assessment.id}/take`}>
                                                    <Button size="sm" className="w-full">
                                                        <FileText className="h-4 w-4 mr-2" />
                                                        {t.continueAssessment +'Id'+ assessment.id}
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
