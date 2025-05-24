import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import {
    CheckCircle,
    Lock,
    Mail,
    XCircle,
    MinusCircle,
    Award,
    BarChart3,
    Target,
    Calendar,
    User,
    Building,
    Star,
    TrendingUp,
    Shield,
    FileText,
    Download,
    Eye,
    UserPlus,
    Gift,
    Zap,
    Crown,
    ArrowRight,
    MessageCircle,
    Globe,
    Smartphone,
    Monitor,
    MapPin,
    Clock
} from 'lucide-react';

interface AssessmentResult {
    id: number;
    name: string;
    email: string;
    organization?: string;
    status: string;
    completed_at?: string;
    created_at: string;
    tool: {
        id: number;
        name_en: string;
        name_ar: string;
    };
}

interface BasicResults {
    overall_percentage: number;
    total_criteria: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    domain_count: number;
}

interface SessionData {
    device_type: string;
    browser: string;
    operating_system: string;
    location: string;
    ip_address: string;
}

interface GuestLimitedResultsProps {
    assessment: AssessmentResult;
    results: BasicResults;
    sessionData?: SessionData;
    locale?: string;
}

export default function GuestLimitedResults({ assessment, results, sessionData, locale = 'en' }: GuestLimitedResultsProps) {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState<any>(null);
    const isArabic = locale === 'ar';

    const { data, setData, post, processing, errors } = useForm({
        name: assessment.name,
        email: assessment.email,
        password: '',
        password_confirmation: '',
    });

    // Collect additional device/browser information
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const info = {
                screen: {
                    width: window.screen.width,
                    height: window.screen.height,
                    colorDepth: window.screen.colorDepth,
                },
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                language: navigator.language,
                languages: navigator.languages,
                platform: navigator.platform,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                userAgent: navigator.userAgent,
            };
            setDeviceInfo(info);

            // Send device info to backend
            fetch(route('guest.session.update', assessment.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    device_info: info,
                    completed_at: new Date().toISOString(),
                }),
            }).catch(console.error);
        }
    }, []);

    const getName = (item: { name_en: string; name_ar: string }): string => {
        return isArabic ? item.name_ar : item.name_en;
    };

    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-emerald-600';
        if (score >= 60) return 'text-blue-600';
        if (score >= 40) return 'text-amber-600';
        return 'text-red-600';
    };

    const getScoreColorClass = (score: number): string => {
        if (score >= 80) return 'from-emerald-500 to-emerald-600';
        if (score >= 60) return 'from-blue-500 to-blue-600';
        if (score >= 40) return 'from-amber-500 to-amber-600';
        return 'from-red-500 to-red-600';
    };

    const getScoreLevel = (score: number): string => {
        if (isArabic) {
            if (score >= 80) return 'ممتاز';
            if (score >= 60) return 'جيد';
            if (score >= 40) return 'مقبول';
            return 'يحتاج تحسين';
        } else {
            if (score >= 80) return 'Excellent';
            if (score >= 60) return 'Good';
            if (score >= 40) return 'Fair';
            return 'Needs Improvement';
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: () => {
                // Redirect will happen automatically
            }
        });
    };

    const sendEmail = () => {
        fetch(route('guest.assessment.send-email', assessment.id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
        }).then(() => {
            setIsEmailSent(true);
        }).catch(console.error);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title={`Assessment Results - ${getName(assessment.tool)}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">{getName(assessment.tool)}</h1>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>Assessment Results</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Success Banner */}
                        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold mb-2">🎉 Assessment Complete!</h2>
                                            <p className="text-emerald-100 text-lg">
                                                Thank you for completing the {getName(assessment.tool)} assessment.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold">{Math.round(results.overall_percentage)}%</div>
                                        <div className="text-emerald-100">Overall Score</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Results Section */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Basic Score Overview */}
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <Award className="w-6 h-6 text-blue-600" />
                                            Your Assessment Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Score Circle */}
                                            <div className="text-center">
                                                <div className="relative w-32 h-32 mx-auto mb-4">
                                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getScoreColorClass(results.overall_percentage)} flex items-center justify-center text-white`}>
                                                        <div>
                                                            <div className="text-3xl font-bold">{Math.round(results.overall_percentage)}%</div>
                                                            <div className="text-sm opacity-90">Score</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">
                                                    {getScoreLevel(results.overall_percentage)}
                                                </Badge>
                                            </div>

                                            {/* Stats */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                                        <span className="font-medium">Yes Responses</span>
                                                    </div>
                                                    <span className="text-xl font-bold text-green-600">{results.yes_count}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <XCircle className="w-5 h-5 text-red-600 mr-3" />
                                                        <span className="font-medium">No Responses</span>
                                                    </div>
                                                    <span className="text-xl font-bold text-red-600">{results.no_count}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <MinusCircle className="w-5 h-5 text-gray-600 mr-3" />
                                                        <span className="font-medium">Not Applicable</span>
                                                    </div>
                                                    <span className="text-xl font-bold text-gray-600">{results.na_count}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">{results.total_criteria}</div>
                                                    <div className="text-sm text-gray-600">Total Questions</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-blue-600">{results.applicable_criteria}</div>
                                                    <div className="text-sm text-gray-600">Applicable</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-purple-600">{results.domain_count}</div>
                                                    <div className="text-sm text-gray-600">Domains</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Limited Preview Notice */}
                                <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Lock className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-amber-900 mb-2">This is a Limited Preview</h3>
                                                <p className="text-amber-800 mb-4">
                                                    You're seeing a basic summary of your results. Create a free account to unlock:
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    <div className="flex items-center text-amber-800">
                                                        <BarChart3 className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Detailed domain analysis</span>
                                                    </div>
                                                    <div className="flex items-center text-amber-800">
                                                        <TrendingUp className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Improvement recommendations</span>
                                                    </div>
                                                    <div className="flex items-center text-amber-800">
                                                        <FileText className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Downloadable PDF reports</span>
                                                    </div>
                                                    <div className="flex items-center text-amber-800">
                                                        <Target className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">Progress tracking</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Session Information */}
                                {(sessionData || deviceInfo) && (
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <Globe className="w-5 h-5 text-blue-600" />
                                                Session Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {sessionData?.device_type && (
                                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                        {sessionData.device_type === 'Mobile' ?
                                                            <Smartphone className="w-5 h-5 text-blue-600 mr-3" /> :
                                                            <Monitor className="w-5 h-5 text-blue-600 mr-3" />
                                                        }
                                                        <div>
                                                            <div className="font-medium">{sessionData.device_type}</div>
                                                            <div className="text-sm text-gray-600">{sessionData.browser} on {sessionData.operating_system}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                {sessionData?.location && (
                                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                        <MapPin className="w-5 h-5 text-green-600 mr-3" />
                                                        <div>
                                                            <div className="font-medium">Location</div>
                                                            <div className="text-sm text-gray-600">{sessionData.location}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                    <Clock className="w-5 h-5 text-purple-600 mr-3" />
                                                    <div>
                                                        <div className="font-medium">Completed</div>
                                                        <div className="text-sm text-gray-600">{formatDate(assessment.completed_at || assessment.created_at)}</div>
                                                    </div>
                                                </div>
                                                {deviceInfo?.timezone && (
                                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                        <Globe className="w-5 h-5 text-indigo-600 mr-3" />
                                                        <div>
                                                            <div className="font-medium">Timezone</div>
                                                            <div className="text-sm text-gray-600">{deviceInfo.timezone}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            {/* Sidebar - Registration CTA */}
                            <div className="space-y-6">
                                {/* Email Results */}
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                    <CardContent className="p-6">
                                        <div className="text-center space-y-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                                                <Mail className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold">Get Results via Email</h3>
                                            <p className="text-blue-100">
                                                We'll send a summary of your results to your email address.
                                            </p>
                                            <Button
                                                onClick={sendEmail}
                                                disabled={isEmailSent}
                                                className="w-full bg-white text-blue-600 hover:bg-blue-50"
                                            >
                                                {isEmailSent ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Email Sent!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Send Email
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Registration CTA */}
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-600 to-green-600 text-white">
                                    <CardContent className="p-6">
                                        <div className="text-center space-y-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                                                <Crown className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold">Unlock Full Results</h3>
                                            <p className="text-emerald-100">
                                                Create a free account to access detailed analysis, recommendations, and track your progress.
                                            </p>
                                            <div className="space-y-3">
                                                <Link href={`${route('register')}?email=${encodeURIComponent(assessment.email)}&name=${encodeURIComponent(assessment.name)}`}>
                                                    <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50">
                                                        <UserPlus className="w-4 h-4 mr-2" />
                                                        Create Free Account
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setShowSignupForm(!showSignupForm)}
                                                    className="w-full border-white text-white hover:bg-white/10"
                                                >
                                                    Quick Signup
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Signup Form */}
                                {showSignupForm && (
                                    <Card className="border-0 shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-center">Quick Account Creation</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleRegister} className="space-y-4">
                                                <div>
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        disabled
                                                        className="bg-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        disabled
                                                        className="bg-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        required
                                                    />
                                                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                                                </div>
                                                <div>
                                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        required
                                                    />
                                                    {errors.password_confirmation && <p className="text-red-600 text-sm mt-1">{errors.password_confirmation}</p>}
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                    disabled={processing}
                                                >
                                                    {processing ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                            Creating Account...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Zap className="w-4 h-4 mr-2" />
                                                            Create Account & View Full Results
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Features Preview */}
                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-center">What You'll Get</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                                <BarChart3 className="w-5 h-5 text-blue-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">Detailed Analytics</div>
                                                    <div className="text-xs text-gray-600">Domain breakdowns & insights</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                                <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">Recommendations</div>
                                                    <div className="text-xs text-gray-600">Personalized improvement tips</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                                <Download className="w-5 h-5 text-purple-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">PDF Reports</div>
                                                    <div className="text-xs text-gray-600">Professional downloadable reports</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                                                <Target className="w-5 h-5 text-orange-600 mr-3" />
                                                <div>
                                                    <div className="font-medium text-sm">Progress Tracking</div>
                                                    <div className="text-xs text-gray-600">Monitor improvements over time</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Assessment Info */}
                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-600" />
                                            Assessment Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Name:</span>
                                            <span className="font-medium">{assessment.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="font-medium text-sm">{assessment.email}</span>
                                        </div>
                                        {assessment.organization && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Organization:</span>
                                                <span className="font-medium">{assessment.organization}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">ID:</span>
                                            <span className="font-mono text-sm">#{assessment.id}</span>
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
