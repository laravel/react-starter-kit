import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    Globe,
    Calendar,
    Sparkles,
    LogOut,
    User,
    Building,
    Mail,
    Phone,
    Settings,
    Bell,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    status: string;
    total_criteria: number;
    total_domains: number;
    estimated_time: number;
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

interface FreeUserAssessmentPageProps {
    tools: Tool[];
    userLimits: UserLimits;
    user: User;
    locale: string;
}

export default function FreeUserAssessmentPage({ tools, userLimits, user, locale }: FreeUserAssessmentPageProps) {
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const isArabic = locale === 'ar';

    const getName = (tool: Tool): string => {
        return isArabic ? tool.name_ar : tool.name_en;
    };

    const getDescription = (tool: Tool): string => {
        const desc = isArabic ? tool.description_ar : tool.description_en;
        return desc || '';
    };

    const canStartAssessment = (tool: Tool): boolean => {
        return userLimits.can_create_more && tool.status === 'active';
    };

    return (
        <>
            <Head title="Free Assessment Tools" />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center space-x-4">
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
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/assessments" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    <FileText className="w-5 h-5 inline mr-2" />
                                    My Assessments
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
                                        <span className="font-medium">{user.name}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                                    <Link href="/assessments" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <FileText className="w-5 h-5 mr-2" />
                                        My Assessments
                                    </Link>
                                    <Link href="/subscription" className="flex items-center text-purple-600 hover:text-purple-700 font-medium">
                                        <Crown className="w-5 h-5 mr-2" />
                                        Upgrade to Premium
                                    </Link>
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 mb-2">{user.email}</p>
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
                        {/* Welcome Section */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome to Assessment Hub
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Professional assessment tools to evaluate and improve your organization's capabilities.
                                You're currently on the <strong>Free Plan</strong> with access to basic assessment features.
                            </p>
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
                                        <div className="text-lg font-bold text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-600">{user.email}</div>
                                        {user.details?.company_name && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                <Building className="w-3 h-3 inline mr-1" />
                                                {user.details.company_name}
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
                                            {userLimits.current_assessments}/{userLimits.assessment_limit}
                                        </div>
                                        <div className="text-sm text-gray-600">Assessments Used</div>
                                        {userLimits.assessment_limit && (
                                            <Progress
                                                value={(userLimits.current_assessments / userLimits.assessment_limit) * 100}
                                                className="w-full mt-2"
                                            />
                                        )}
                                    </div>

                                    {/* Available Tools */}
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-orange-500 rounded-full flex items-center justify-center">
                                            <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">{tools.length}</div>
                                        <div className="text-sm text-gray-600">Available Tools</div>
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

                                {/* Upgrade Promotion */}
                                {userLimits.can_create_more && (
                                    <div className="mt-6 pt-6 border-t border-blue-200">
                                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                            <div className="flex items-center space-x-3">
                                                <Star className="w-6 h-6 text-purple-600" />
                                                <div>
                                                    <h4 className="font-semibold text-purple-900">Unlock Premium Features</h4>
                                                    <p className="text-sm text-purple-700">
                                                        Get unlimited assessments, detailed analytics, and comprehensive reports
                                                    </p>
                                                </div>
                                            </div>
                                            <Link href="/subscription">
                                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                                    <Crown className="w-4 h-4 mr-2" />
                                                    Upgrade Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Tools Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {tools.map((tool) => (
                                <Card
                                    key={tool.id}
                                    className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                                        canStartAssessment(tool) ? 'hover:scale-105 cursor-pointer' : 'opacity-75'
                                    } ${selectedTool?.id === tool.id ? 'ring-2 ring-blue-500' : ''}`}
                                    onClick={() => setSelectedTool(tool)}
                                >
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            {tool.image ? (
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={tool.image}
                                                        alt={getName(tool)}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                    <Target className="w-8 h-8 text-white" />
                                                </div>
                                            )}
                                            <Badge className={tool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                                {tool.status === 'active' ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl mt-4">{getName(tool)}</CardTitle>
                                        <CardDescription className="text-gray-600 line-clamp-2">
                                            {getDescription(tool) || 'Professional assessment tool for organizational evaluation'}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        {/* Tool Stats */}
                                        <div className="grid grid-cols-3 gap-3 text-center">
                                            <div className="p-3 bg-blue-50 rounded-lg">
                                                <div className="text-lg font-bold text-blue-600">{tool.total_domains}</div>
                                                <div className="text-xs text-blue-700">Domains</div>
                                            </div>
                                            <div className="p-3 bg-green-50 rounded-lg">
                                                <div className="text-lg font-bold text-green-600">{tool.total_criteria}</div>
                                                <div className="text-xs text-green-700">Questions</div>
                                            </div>
                                            <div className="p-3 bg-orange-50 rounded-lg">
                                                <div className="text-lg font-bold text-orange-600">{tool.estimated_time}</div>
                                                <div className="text-xs text-orange-700">Minutes</div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-2">
                                            {canStartAssessment(tool) ? (
                                                <Link href={route('assessment.start', tool.id)}>
                                                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                                        <Play className="w-4 h-4 mr-2" />
                                                        Start Assessment
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                </Link>
                                            ) : !userLimits.can_create_more ? (
                                                <div className="space-y-2">
                                                    <Button disabled className="w-full h-12 bg-gray-300 text-gray-500 cursor-not-allowed">
                                                        <Lock className="w-4 h-4 mr-2" />
                                                        Assessment Limit Reached
                                                    </Button>
                                                    <Link href="/subscription">
                                                        <Button variant="outline" className="w-full text-purple-600 border-purple-600 hover:bg-purple-50">
                                                            <Crown className="w-4 h-4 mr-2" />
                                                            Upgrade to Access
                                                        </Button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <Button disabled className="w-full h-12 bg-gray-300 text-gray-500 cursor-not-allowed">
                                                    <Lock className="w-4 h-4 mr-2" />
                                                    Tool Unavailable
                                                </Button>
                                            )}
                                        </div>

                                        {/* Free vs Premium Features */}
                                        <div className="pt-2 border-t border-gray-200">
                                            <div className="text-sm text-gray-600 mb-2">Free Plan Includes:</div>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-green-700">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Basic assessment
                                                </div>
                                                <div className="flex items-center text-xs text-green-700">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Overall score
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Lock className="w-3 h-3 mr-1" />
                                                    Detailed analytics (Premium)
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Lock className="w-3 h-3 mr-1" />
                                                    Full PDF reports (Premium)
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Selected Tool Details */}
                        {selectedTool && (
                            <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 mb-8">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl flex items-center gap-3">
                                            <Target className="w-6 h-6 text-blue-600" />
                                            {getName(selectedTool)} - Assessment Details
                                        </CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedTool(null)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {getDescription(selectedTool) || 'This comprehensive assessment tool helps evaluate and improve your organizational capabilities across multiple domains.'}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Assessment Details</h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Total Domains:</span>
                                                        <span className="font-medium">{selectedTool.total_domains}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Total Questions:</span>
                                                        <span className="font-medium">{selectedTool.total_criteria}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Estimated Time:</span>
                                                        <span className="font-medium">{selectedTool.estimated_time} minutes</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Status:</span>
                                                        <Badge className={selectedTool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                                            {selectedTool.status === 'active' ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">What You'll Get (Free Plan)</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-green-700">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Overall assessment score</span>
                                                    </div>
                                                    <div className="flex items-center text-green-700">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Response breakdown</span>
                                                    </div>
                                                    <div className="flex items-center text-green-700">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Basic recommendations</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-500">
                                                        <Lock className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Detailed domain analysis (Premium)</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-500">
                                                        <Lock className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Comprehensive PDF report (Premium)</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-500">
                                                        <Lock className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Advanced analytics (Premium)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {canStartAssessment(selectedTool) ? (
                                                    <>
                                                        <Link href={route('assessment.start', selectedTool.id)}>
                                                            <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                                                <Play className="w-4 h-4 mr-2" />
                                                                Start {getName(selectedTool)} Assessment
                                                                <ArrowRight className="w-4 h-4 ml-2" />
                                                            </Button>
                                                        </Link>
                                                        <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                                                            <p className="text-sm text-amber-800 mb-2">
                                                                <Zap className="w-4 h-4 inline mr-1" />
                                                                Upgrade to unlock full features
                                                            </p>
                                                            <Link href="/subscription">
                                                                <Button variant="outline" className="text-amber-700 border-amber-700 hover:bg-amber-100">
                                                                    <Star className="w-4 h-4 mr-2" />
                                                                    View Premium Features
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button disabled className="w-full h-12 bg-gray-300 text-gray-500 cursor-not-allowed">
                                                            <Lock className="w-4 h-4 mr-2" />
                                                            Assessment Limit Reached
                                                        </Button>
                                                        <Link href="/subscription">
                                                            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                                                <Crown className="w-4 h-4 mr-2" />
                                                                Upgrade for Unlimited Access
                                                            </Button>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quick Actions */}
                        <div className="flex justify-center gap-4 pt-6">
                            <Link href="/assessments">
                                <Button variant="outline" size="lg" className="px-8">
                                    <FileText className="h-4 w-4 mr-2" />
                                    View My Assessments
                                </Button>
                            </Link>
                            <Link href="/subscription">
                                <Button size="lg" className="px-8 bg-gradient-to-r from-purple-600 to-pink-600">
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
