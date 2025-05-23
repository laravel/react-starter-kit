import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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
    Globe,
    TrendingUp,
    Award,
    PlayCircle,
    MoreVertical,
    Download,
    Share2,
    Trash2,
    Edit,
    Target,
    Zap,
    Star,
    Activity
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
        image?: string;
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
        dashboard: string;
        myProgress: string;
        totalAssessments: string;
        averageScore: string;
        completionRate: string;
        recentActivity: string;
        downloadReport: string;
        shareResults: string;
        deleteAssessment: string;
        editAssessment: string;
        quickActions: string;
        viewAll: string;
        filterBy: string;
        sortBy: string;
        newest: string;
        oldest: string;
        highestScore: string;
        lowestScore: string;
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
        dashboard: string;
        myProgress: string;
        totalAssessments: string;
        averageScore: string;
        completionRate: string;
        recentActivity: string;
        downloadReport: string;
        shareResults: string;
        deleteAssessment: string;
        editAssessment: string;
        quickActions: string;
        viewAll: string;
        filterBy: string;
        sortBy: string;
        newest: string;
        oldest: string;
        highestScore: string;
        lowestScore: string;
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
        assessments: "assessments",
        dashboard: "Dashboard",
        myProgress: "My Progress",
        totalAssessments: "Total Assessments",
        averageScore: "Average Score",
        completionRate: "Completion Rate",
        recentActivity: "Recent Activity",
        downloadReport: "Download Report",
        shareResults: "Share Results",
        deleteAssessment: "Delete Assessment",
        editAssessment: "Edit Assessment",
        quickActions: "Quick Actions",
        viewAll: "View All",
        filterBy: "Filter by",
        sortBy: "Sort by",
        newest: "Newest First",
        oldest: "Oldest First",
        highestScore: "Highest Score",
        lowestScore: "Lowest Score"
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
        assessments: "تقييمات",
        dashboard: "لوحة القيادة",
        myProgress: "تقدمي",
        totalAssessments: "إجمالي التقييمات",
        averageScore: "متوسط النتيجة",
        completionRate: "معدل الإكمال",
        recentActivity: "النشاط الأخير",
        downloadReport: "تحميل التقرير",
        shareResults: "مشاركة النتائج",
        deleteAssessment: "حذف التقييم",
        editAssessment: "تعديل التقييم",
        quickActions: "الإجراءات السريعة",
        viewAll: "عرض الكل",
        filterBy: "تصفية حسب",
        sortBy: "ترتيب حسب",
        newest: "الأحدث أولاً",
        oldest: "الأقدم أولاً",
        highestScore: "أعلى نتيجة",
        lowestScore: "أقل نتيجة"
    }
};

export default function AssessmentsIndex({ assessments, locale }: AssessmentsIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
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
            case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'draft': return 'bg-slate-50 text-slate-700 border-slate-200';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
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
            case 'in_progress': return <Activity className="w-4 h-4" />;
            case 'draft': return <FileText className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    // Calculate dashboard stats
    const totalAssessments = assessments.length;
    const completedAssessments = assessments.filter(a => a.status === 'completed').length;
    const averageScore = assessments.filter(a => a.overall_score !== null)
            .reduce((sum, a) => sum + (a.overall_score || 0), 0) /
        Math.max(assessments.filter(a => a.overall_score !== null).length, 1);
    const completionRate = totalAssessments > 0 ? (completedAssessments / totalAssessments) * 100 : 0;

    // Filter and sort assessments
    const filteredAndSortedAssessments = assessments
        .filter(assessment => {
            const matchesSearch =
                getLocalizedText(assessment.tool, 'name').toLowerCase().includes(searchTerm.toLowerCase()) ||
                assessment.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (assessment.organization && assessment.organization.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'highestScore':
                    return (b.overall_score || 0) - (a.overall_score || 0);
                case 'lowestScore':
                    return (a.overall_score || 0) - (b.overall_score || 0);
                default:
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
        });

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-emerald-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 40) return 'text-amber-600';
        return 'text-red-600';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.pageTitle} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex h-full flex-1 flex-col gap-8 p-6 lg:p-8">
                    {/* Enhanced Header */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                        {t.myAssessments}
                                    </h1>
                                    <p className="text-lg text-gray-600 mt-1">
                                        {t.showingResults} {filteredAndSortedAssessments.length} {t.of} {assessments.length} {t.assessments}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{language === 'en' ? 'عربي' : 'English'}</span>
                            </Button>

                            <Link href="/assessment-tools">
                                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                                    <Plus className="h-4 w-4" />
                                    {t.newAssessment}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Stats */}
                    {totalAssessments > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{t.totalAssessments}</p>
                                            <p className="text-3xl font-bold text-blue-900">{totalAssessments}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                            <BarChart3 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{t.averageScore}</p>
                                            <p className="text-3xl font-bold text-emerald-900">{Math.round(averageScore)}%</p>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{t.completionRate}</p>
                                            <p className="text-3xl font-bold text-purple-900">{Math.round(completionRate)}%</p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-amber-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{t.inProgress}</p>
                                            <p className="text-3xl font-bold text-amber-900">
                                                {assessments.filter(a => a.status === 'in_progress').length}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                                            <Activity className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Enhanced Filters and Search */}
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            placeholder={t.searchPlaceholder}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-sm font-medium text-gray-600 flex items-center mr-2">{t.filterBy}:</span>
                                    {['all', 'completed', 'in_progress', 'draft'].map((status) => (
                                        <Button
                                            key={status}
                                            variant={statusFilter === status ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setStatusFilter(status)}
                                            className={`rounded-full ${
                                                statusFilter === status
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'hover:bg-blue-50 hover:border-blue-300'
                                            }`}
                                        >
                                            {status === 'all' ? t.filterAll :
                                                status === 'completed' ? t.filterCompleted :
                                                    status === 'in_progress' ? t.filterInProgress : t.filterDraft}
                                        </Button>
                                    ))}
                                </div>

                                {/* Sort */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">{t.sortBy}:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="newest">{t.newest}</option>
                                        <option value="oldest">{t.oldest}</option>
                                        <option value="highestScore">{t.highestScore}</option>
                                        <option value="lowestScore">{t.lowestScore}</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content */}
                    {filteredAndSortedAssessments.length === 0 ? (
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                            <CardContent className="flex flex-col items-center justify-center py-20">
                                <div className="text-center space-y-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                                        <BarChart3 className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            {searchTerm || statusFilter !== 'all' ? 'No matching assessments found' : t.noAssessments}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                            {searchTerm || statusFilter !== 'all'
                                                ? 'Try adjusting your search criteria or filters'
                                                : 'Get started by creating your first assessment to track and measure your progress.'
                                            }
                                        </p>
                                    </div>
                                    <Link href="/assessment-tools">
                                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 px-8 text-lg">
                                            <Plus className="w-5 h-5 mr-3" />
                                            {t.startFirst}
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6">
                            {filteredAndSortedAssessments.map((assessment) => (
                                <Card key={assessment.id} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between gap-6">
                                            <div className="flex-1 space-y-6">
                                                {/* Header */}
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0">
                                                        {assessment.tool.image ? (
                                                            <img
                                                                src={assessment.tool.image}
                                                                alt={getLocalizedText(assessment.tool, 'name')}
                                                                className="w-16 h-16 object-cover rounded-xl shadow-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                                                <Target className="w-8 h-8 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                                    {getLocalizedText(assessment.tool, 'name')}
                                                                </h3>
                                                                {getLocalizedText(assessment.tool, 'description') && (
                                                                    <p className="text-gray-600 text-base leading-relaxed mb-3">
                                                                        {getLocalizedText(assessment.tool, 'description')}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <Badge className={`${getStatusColor(assessment.status)} flex items-center gap-2 px-3 py-1.5 text-sm font-semibold`}>
                                                                {getStatusIcon(assessment.status)}
                                                                {getStatusText(assessment.status)}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Assessment Info Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                        <User className="w-5 h-5 text-blue-600" />
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t.assessor}</p>
                                                            <p className="font-semibold text-gray-900">{assessment.guest_name}</p>
                                                        </div>
                                                    </div>

                                                    {assessment.organization && (
                                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <Building className="w-5 h-5 text-green-600" />
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t.organization}</p>
                                                                <p className="font-semibold text-gray-900">{assessment.organization}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                        <Calendar className="w-5 h-5 text-purple-600" />
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t.createdOn}</p>
                                                            <p className="font-semibold text-gray-900">{formatDate(assessment.created_at)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                        <Clock className="w-5 h-5 text-orange-600" />
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t.lastUpdated}</p>
                                                            <p className="font-semibold text-gray-900">{formatDate(assessment.updated_at)}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Progress and Score */}
                                                {(assessment.overall_score !== null || assessment.completion_percentage !== null) && (
                                                    <div className="space-y-4">
                                                        {assessment.completion_percentage !== null && (
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <BarChart3 className="w-4 h-4 text-blue-600" />
                                                                        <span className="text-sm font-medium text-gray-600">{t.progress}</span>
                                                                    </div>
                                                                    <span className="text-sm font-bold text-blue-600">
                                                                        {assessment.completion_percentage}%
                                                                    </span>
                                                                </div>
                                                                <Progress
                                                                    value={assessment.completion_percentage}
                                                                    className="h-2 bg-blue-100"
                                                                />
                                                            </div>
                                                        )}

                                                        {assessment.overall_score !== null && (
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <Award className="w-4 h-4 text-emerald-600" />
                                                                        <span className="text-sm font-medium text-gray-600">{t.overallScore}</span>
                                                                    </div>
                                                                    <span className={`text-sm font-bold ${getScoreColor(assessment.overall_score)}`}>
                                                                        {assessment.overall_score}%
                                                                    </span>
                                                                </div>
                                                                <Progress
                                                                    value={assessment.overall_score}
                                                                    className={`h-2 ${assessment.overall_score >= 80 ? 'bg-emerald-100' :
                                                                        assessment.overall_score >= 60 ? 'bg-blue-100' :
                                                                            assessment.overall_score >= 40 ? 'bg-amber-100' : 'bg-red-100'}`}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Enhanced Actions */}
                                            <div className="flex flex-col gap-3 min-w-0">
                                                {assessment.status === 'completed' ? (
                                                    <>
                                                        <Link href={`/assessment/${assessment.id}/results`}>
                                                            <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg">
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                {t.viewResults}
                                                            </Button>
                                                        </Link>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-50">
                                                                <Download className="h-4 w-4 mr-1" />
                                                                Report
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="flex-1 hover:bg-green-50">
                                                                <Share2 className="h-4 w-4 mr-1" />
                                                                Share
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link href={`/assessment/${assessment.id}/take`}>
                                                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                                                                <PlayCircle className="h-4 w-4 mr-2" />
                                                                {t.continueAssessment}
                                                            </Button>
                                                        </Link>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" className="flex-1 hover:bg-gray-50">
                                                                <Edit className="h-4 w-4 mr-1" />
                                                                Edit
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="flex-1 hover:bg-red-50 text-red-600 hover:text-red-700">
                                                                <Trash2 className="h-4 w-4 mr-1" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Achievement Badges for High Scores */}
                                        {assessment.overall_score && assessment.overall_score >= 90 && (
                                            <div className="mt-4 flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                                                <Star className="w-5 h-5 text-yellow-600" />
                                                <span className="text-sm font-semibold text-yellow-800">Excellent Performance!</span>
                                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                                    Top Scorer
                                                </Badge>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Quick Action Floating Button */}
                    {assessments.length > 0 && (
                        <div className="fixed bottom-6 right-6 z-50">
                            <Link href="/assessment-tools">
                                <Button
                                    size="lg"
                                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110"
                                >
                                    <Plus className="w-6 h-6" />
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Enhanced Footer Stats */}
                    {totalAssessments > 0 && (
                        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
                            <CardContent className="p-6">
                                <div className="text-center space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{t.myProgress}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600 mb-1">{completedAssessments}</div>
                                            <div className="text-sm text-gray-600">{t.completed} {t.assessments}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-emerald-600 mb-1">{Math.round(averageScore)}%</div>
                                            <div className="text-sm text-gray-600">{t.averageScore}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-600 mb-1">{Math.round(completionRate)}%</div>
                                            <div className="text-sm text-gray-600">{t.completionRate}</div>
                                        </div>
                                    </div>

                                    {/* Motivational Message */}
                                    <div className="mt-6 p-4 bg-white/50 rounded-lg border border-white/60">
                                        <div className="flex items-center justify-center gap-2">
                                            <Zap className="w-5 h-5 text-yellow-500" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {completionRate === 100 ?
                                                    "🎉 Congratulations! You've completed all your assessments!" :
                                                    completionRate >= 75 ?
                                                        "🚀 Great progress! Keep up the excellent work!" :
                                                        completionRate >= 50 ?
                                                            "📈 You're making good progress. Continue your assessment journey!" :
                                                            "🎯 Start completing more assessments to track your progress!"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
