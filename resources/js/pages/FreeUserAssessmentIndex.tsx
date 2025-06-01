import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Target,
    Clock,
    BarChart3,
    Users,
    Crown,
    Shield,
    AlertTriangle,
    CheckCircle,
    Star,
    TrendingUp,
    FileText,
    Play,
    Lock,
    Zap,
    ArrowRight,
    Award,
    Calendar,
    LogOut,
    User,
    Building,
    Settings,
    ChevronDown,
    Menu,
    X,
    Download,
    Eye,
    Plus,
    Edit,
    Pause
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
    completed_at?: string;
    overall_score?: number;
    completion_percentage: number;
    user_id?: number;
}

interface UserLimits {
    current_assessments: number;
    assessment_limit: number | null;
    can_create_more: boolean;
    is_premium: boolean;
    subscription_status: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    details?: {
        company_name?: string;
        phone?: string;
    };
}

interface FreeUserAssessmentIndexProps {
    assessments: Assessment[];
    userLimits: UserLimits;
    auth: {
        user: User;
    };
    locale: string;
}

export default function FreeUserAssessmentIndex({
                                                    assessments,
                                                    userLimits,
                                                    auth,
                                                    locale
                                                }: FreeUserAssessmentIndexProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const isArabic = locale === 'ar';

    const getName = (item: { name_en: string; name_ar: string }): string => {
        return isArabic ? item.name_ar : item.name_en;
    };

    const getDescription = (item: { description_en?: string; description_ar?: string }): string => {
        const desc = isArabic ? item.description_ar : item.description_en;
        return desc || '';
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
            case 'in_progress':
                return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
            case 'draft':
                return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
        }
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 40) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <>
            <Head title="My Assessments" />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center space-x-4">
                                <Link href="/">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900">Assessment Hub</h1>
                                            <div className="flex items-center space-x-2">
                                                <Badge className="bg-blue-100 text-blue-800">
                                                    <Shield className="w-3 h-3 mr-1" />
                                                    Free Plan
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/assessment-tools" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    <Target className="w-5 h-5 inline mr-2" />
                                    Assessment Tools
                                </Link>
                                <Link href="/subscription" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                                    <Crown className="w-5 h-5 inline mr-2" />
                                    Upgrade to Premium
                                </Link>

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-medium">{auth.user.name}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                                <p className="text-xs text-gray-500">{auth.user.email}</p>
                                            </div>
                                            <Link href="/settings/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <Settings className="w-4 h-4 mr-3" />
                                                Profile Settings
                                            </Link>
                                            <Link href="/subscription" className="flex items-center px-4 py-2 text-sm text-purple-600 hover:bg-purple-50">
                                                <Crown className="w-4 h-4 mr-3" />
                                                Upgrade Plan
                                            </Link>
                                            <div className="border-t border-gray-200 mt-2"></div>
                                            <Link href="/logout" method="post" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Sign Out
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {showMobileMenu && (
                            <div className="md:hidden border-t border-gray-200 py-4">
                                <div className="space-y-4">
                                    <Link href="/assessment-tools" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <Target className="w-5 h-5 mr-2" />
                                        Assessment Tools
                                    </Link>
                                    <Link href="/subscription" className="flex items-center text-purple-600 hover:text-purple-700 font-medium">
                                        <Crown className="w-5 h-5 mr-2" />
                                        Upgrade to Premium
                                    </Link>
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500 mb-2">{auth.user.email}</p>
                                        <Link href="/logout" method="post" className="flex items-center text-red-600">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Assessments</h1>
                                <p className="text-gray-600 mt-2">Track your assessment progress and results</p>
                            </div>
                            <Link href="/assessment-tools">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Assessment
                                </Button>
                            </Link>
                        </div>

                        {/* User Status Card */}
                        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-4 gap-6">
                                    {/* User Info */}
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">{auth.user.name}</div>
                                        <div className="text-sm text-gray-600">{auth.user.email}</div>
                                        {auth.user.details?.company_name && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                <Building className="w-3 h-3 inline mr-1" />
                                                {auth.user.details.company_name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Plan Status */}
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                                            <Shield className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">Free Plan</div>
                                        <div className="text-sm text-gray-600">Current Subscription</div>
                                        <Link href="/subscription">
                                            <Button variant="outline" size="sm" className="mt-2 text-purple-600 border-purple-600">
                                                <Crown className="w-3 h-3 mr-1" />
                                                Upgrade
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Assessment Usage */}
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                                            <BarChart3 className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">
                                            {userLimits.current_assessments}/{userLimits.assessment_limit || '∞'}
                                        </div>
                                        <div className="text-sm text-gray-600">Assessments Used</div>
                                        {userLimits.assessment_limit && (
                                            <Progress
                                                value={(userLimits.current_assessments / userLimits.assessment_limit) * 100}
                                                className="w-full mt-2"
                                            />
                                        )}
                                    </div>

                                    {/* Total Assessments */}
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-orange-500 rounded-full flex items-center justify-center">
                                            <FileText className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">{assessments.length}</div>
                                        <div className="text-sm text-gray-600">Total Assessments</div>
                                    </div>
                                </div>

                                {/* Limit Warning */}
                                {!userLimits.can_create_more && (
                                    <div className="mt-6 pt-6 border-t border-blue-200">
                                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                                            <div className="flex items-center space-x-3">
                                                <AlertTriangle className="w-6 h-6 text-red-600" />
                                                <div>
                                                    <h4 className="font-semibold text-red-900">Assessment Limit Reached</h4>
                                                    <p className="text-sm text-red-700">
                                                        You've used all {userLimits.assessment_limit} of your free assessments.
                                                        Upgrade to premium for unlimited access.
                                                    </p>
                                                </div>
                                            </div>
                                            <Link href="/subscription">
                                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                                    <Crown className="w-4 h-4 mr-2" />
                                                    Upgrade Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Assessments List */}
                        {assessments.length > 0 ? (
                            <div className="grid gap-6">
                                {assessments.map((assessment) => (
                                    <Card key={assessment.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-4 mb-4">
                                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                            {assessment.tool.image ? (
                                                                <img
                                                                    src={assessment.tool.image}
                                                                    alt={getName(assessment.tool)}
                                                                    className="w-full h-full object-cover rounded-xl"
                                                                />
                                                            ) : (
                                                                <Target className="w-8 h-8 text-white" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-bold text-gray-900">
                                                                {getName(assessment.tool)}
                                                            </h3>
                                                            <p className="text-gray-600 text-sm">
                                                                {getDescription(assessment.tool) || 'Professional assessment tool'}
                                                            </p>
                                                            <div className="flex items-center space-x-4 mt-2">
                                                                {getStatusBadge(assessment.status)}
                                                                <span className="text-sm text-gray-500">
                                                                    <Calendar className="w-4 h-4 inline mr-1" />
                                                                    {formatDate(assessment.created_at)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Assessment Details */}
                                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-2">Assessment Details</h4>
                                                            <div className="space-y-1 text-sm text-gray-600">
                                                                <div>Assessor: {assessment.guest_name}</div>
                                                                <div>Email: {assessment.guest_email}</div>
                                                                {assessment.organization && (
                                                                    <div>Organization: {assessment.organization}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-2">Progress & Results</h4>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm text-gray-600">Completion:</span>
                                                                    <span className="font-medium">{Math.round(assessment.completion_percentage)}%</span>
                                                                </div>
                                                                <Progress value={assessment.completion_percentage} className="h-2" />
                                                                {assessment.overall_score !== undefined && (
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-sm text-gray-600">Overall Score:</span>
                                                                        <span className={`font-bold ${getScoreColor(assessment.overall_score)}`}>
                                                                            {Math.round(assessment.overall_score)}%
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons - FIXED ROUTING */}
                                            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                                {assessment.status === 'completed' ? (
                                                    <>
                                                        <Link href={route('free-user.results', assessment.id)}>
                                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Results
                                                            </Button>
                                                        </Link>
                                                        <a
                                                            href={route('assessments.free-report.download', assessment.id)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            download
                                                            data-inertia="false"
                                                        >
                                                            <Button variant="outline">
                                                                <Download className="w-4 h-4 mr-2" />
                                                                Download Report
                                                            </Button>
                                                        </a>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link href={route('free-user.edit', assessment.id)}>
                                                            <Button className="bg-green-600 hover:bg-green-700">
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Continue Editing
                                                            </Button>
                                                        </Link>
                                                    </>
                                                )}

                                                <Link href="/subscription">
                                                    <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                                                        <Crown className="w-4 h-4 mr-2" />
                                                        Upgrade for Full Features
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <Card className="border-0 shadow-xl">
                                <CardContent className="p-12 text-center">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                        <FileText className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Assessments Yet</h3>
                                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                        You haven't created any assessments yet. Start your first assessment to evaluate your organization's capabilities.
                                    </p>
                                    <Link href="/assessment-tools">
                                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Your First Assessment
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quick Actions */}
                        <div className="flex justify-center gap-4 pt-8">
                            <Link href="/assessment-tools">
                                <Button variant="outline" size="lg" className="px-8">
                                    <Target className="h-4 w-4 mr-2" />
                                    Browse Assessment Tools
                                </Button>
                            </Link>
                            <Link href="/subscription">
                                <Button size="lg" className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    <Crown className="h-4 w-4 mr-2" />
                                    Upgrade to Premium
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 mt-16">
                    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-gray-500">
                            <p>&copy; 2024 Assessment Hub. All rights reserved.</p>
                            <div className="mt-2 space-x-4">
                                <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
                                <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
                                <Link href="/support" className="hover:text-gray-700">Support</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
