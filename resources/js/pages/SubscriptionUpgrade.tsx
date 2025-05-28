import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Check,
    X,
    Crown,
    Zap,
    Mail,
    MessageCircle,
    Star,
    BarChart3,
    FileText,
    Users,
    Clock,
    Shield,
    Sparkles,
    Award,
    TrendingUp,
    ArrowLeft,
    Target,
    User,
    LogOut,
    ChevronDown,
    Menu,
    Globe
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    details?: {
        phone?: string;
        company_name?: string;
    };
    subscription?: {
        plan_type: string;
        status: string;
    };
}

interface SubscriptionProps {
    user: User;
    currentPlan?: string;
    locale?: string;
}

export default function SubscriptionUpgrade({ user, currentPlan = 'free', locale = 'en' }: SubscriptionProps) {
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const isArabic = locale === 'ar';

    const { data, setData, post, processing, errors } = useForm({
        plan: 'premium',
        message: ''
    });

    const handleSubscriptionRequest = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('subscription.request'), {
            onSuccess: () => {
                // Success message will be handled by backend
            }
        });
    };

    const features = {
        free: [
            { feature: 'Basic Assessment Tools', available: true },
            { feature: 'Single Assessment per Tool', available: true },
            { feature: 'Basic PDF Report', available: true },
            { feature: 'Basic Results View', available: true },
            { feature: 'Assessment Editing', available: true },
            { feature: 'Email Support', available: true },
            { feature: 'Detailed Analytics', available: false },
            { feature: 'Multiple Assessments', available: false },
            { feature: 'Comprehensive PDF Reports', available: false },
            { feature: 'Advanced Charts & Graphs', available: false },
            { feature: 'Custom Recommendations', available: false },
            { feature: 'Export to Excel', available: false },
            { feature: 'Team Management', available: false },
            { feature: 'Priority Support', available: false },
            { feature: 'API Access', available: false },
        ],
        premium: [
            { feature: 'All Assessment Tools', available: true },
            { feature: 'Unlimited Assessments', available: true },
            { feature: 'Comprehensive PDF Reports', available: true },
            { feature: 'Advanced Results Dashboard', available: true },
            { feature: 'Assessment History & Tracking', available: true },
            { feature: 'Email & Phone Support', available: true },
            { feature: 'Detailed Analytics & Insights', available: true },
            { feature: 'Multiple Assessment Types', available: true },
            { feature: 'Custom Branding Options', available: true },
            { feature: 'Interactive Charts & Graphs', available: true },
            { feature: 'AI-Powered Recommendations', available: true },
            { feature: 'Export to Multiple Formats', available: true },
            { feature: 'Team Collaboration Tools', available: true },
            { feature: '24/7 Priority Support', available: true },
            { feature: 'API Access & Integrations', available: true },
        ]
    };

    // Get current plan from user data with fallback
    const getCurrentPlan = () => {
        return user?.subscription?.plan_type || currentPlan || 'free';
    };

    const getSubscriptionStatus = () => {
        return user?.subscription?.status || 'active';
    };

    const getUserPlanBadge = () => {
        const planType = getCurrentPlan();

        if (planType === 'premium') {
            return (
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                </Badge>
            );
        } else {
            return (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Free
                </Badge>
            );
        }
    };

    return (
        <>
            <Head title="Upgrade Subscription" />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo and Back */}
                            <div className="flex items-center space-x-4">
                                <Link href="/assessment-tools">
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Assessment Tools
                                    </Button>
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                        <Crown className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Upgrade to Premium</h1>
                                        <div className="flex items-center space-x-2">
                                            {getUserPlanBadge()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/assessment-tools" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    <Target className="w-5 h-5 inline mr-2" />
                                    Assessment Tools
                                </Link>
                                <Link href="/assessments" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    <FileText className="w-5 h-5 inline mr-2" />
                                    My Assessments
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
                                                <div className="mt-1">{getUserPlanBadge()}</div>
                                            </div>
                                            <Link href="/assessment-tools" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <Target className="w-4 h-4 mr-3" />
                                                Assessment Tools
                                            </Link>
                                            <Link href="/assessments" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <FileText className="w-4 h-4 mr-3" />
                                                My Assessments
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
                                    <Link href="/assessments" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <FileText className="w-5 h-5 mr-2" />
                                        My Assessments
                                    </Link>
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                                        <div className="mb-2">{getUserPlanBadge()}</div>
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
                        <div className="text-center space-y-4 mb-8">
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                                        Upgrade to Premium
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Unlock the full potential of our assessment platform
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Current User Info */}
                        <Card className="border-blue-200 bg-blue-50 mb-8">
                            <CardContent className="p-4 flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-blue-900">Hello, {user.name}!</h3>
                                    <p className="text-blue-700 text-sm">
                                        Current Plan: <Badge className="bg-blue-100 text-blue-800">{getCurrentPlan().charAt(0).toUpperCase() + getCurrentPlan().slice(1)}</Badge>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-blue-600">{user.details?.company_name || 'No company specified'}</p>
                                    <p className="text-sm text-blue-600">{user.email}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Plan Comparison */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Free Plan */}
                            <Card className="relative border-2 border-gray-200">
                                <CardHeader className="text-center pb-4">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Shield className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <CardTitle className="text-2xl">Free Plan</CardTitle>
                                    <CardDescription>Perfect for getting started</CardDescription>
                                    <div className="text-3xl font-bold mt-4">
                                        $0<span className="text-lg text-gray-500">/month</span>
                                    </div>
                                    {getCurrentPlan() === 'free' && (
                                        <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">
                                            Current Plan
                                        </Badge>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {features.free.map((item, index) => (
                                            <li key={index} className="flex items-center space-x-3">
                                                {item.available ? (
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                ) : (
                                                    <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                )}
                                                <span className={`text-sm ${!item.available ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                                    {item.feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Premium Plan */}
                            <Card className="relative border-2 border-purple-300 shadow-xl">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-semibold">
                                        <Star className="w-4 h-4 mr-1" />
                                        RECOMMENDED
                                    </Badge>
                                </div>
                                <CardHeader className="text-center pb-4 bg-gradient-to-br from-purple-50 to-pink-50">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                                        <Crown className="w-8 h-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Premium Plan
                                    </CardTitle>
                                    <CardDescription>For professionals who need everything</CardDescription>
                                    <div className="text-3xl font-bold mt-4">
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            Contact Us
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Custom pricing based on your needs</p>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {features.premium.map((item, index) => (
                                            <li key={index} className="flex items-center space-x-3">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{item.feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <form onSubmit={handleSubscriptionRequest} className="space-y-4">
                                            <div>
                                                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                                                    Tell us about your needs (optional)
                                                </Label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="Describe your organization's assessment needs, team size, or any specific requirements..."
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    rows={4}
                                                    className="mt-2"
                                                />
                                                {errors.message && (
                                                    <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all duration-300"
                                                >
                                                    {processing ? (
                                                        <>
                                                            <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                            Sending Request...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail className="w-5 h-5 mr-2" />
                                                            Request Premium Access
                                                        </>
                                                    )}
                                                </Button>

                                                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                                                    <div className="flex items-center space-x-1">
                                                        <Mail className="w-4 h-4" />
                                                        <span>Email notification</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <MessageCircle className="w-4 h-4" />
                                                        <span>WhatsApp message</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Feature Highlights */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-blue-900 mb-2">Advanced Analytics</h3>
                                    <p className="text-blue-700 text-sm">
                                        Get detailed insights with interactive charts, trend analysis, and performance metrics.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-emerald-900 mb-2">Comprehensive Reports</h3>
                                    <p className="text-emerald-700 text-sm">
                                        Generate detailed PDF reports with recommendations, action plans, and executive summaries.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-purple-900 mb-2">AI-Powered Insights</h3>
                                    <p className="text-purple-700 text-sm">
                                        Leverage artificial intelligence for personalized recommendations and strategic guidance.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* What You Get Section */}
                        <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 mb-8">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                                    <Award className="w-6 h-6 text-amber-600" />
                                    <span>What Happens Next?</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="text-center space-y-3">
                                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-bold text-blue-600">1</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Request Submitted</h4>
                                        <p className="text-gray-600 text-sm">
                                            Your premium subscription request is sent to our team via email and WhatsApp.
                                        </p>
                                    </div>
                                    <div className="text-center space-y-3">
                                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-bold text-green-600">2</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Personal Consultation</h4>
                                        <p className="text-gray-600 text-sm">
                                            We'll contact you within 24 hours to discuss your needs and provide a custom quote.
                                        </p>
                                    </div>
                                    <div className="text-center space-y-3">
                                        <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-bold text-purple-600">3</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Premium Access</h4>
                                        <p className="text-gray-600 text-sm">
                                            Once activated, enjoy unlimited access to all premium features and priority support.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="border-amber-200 bg-amber-50 mb-8">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-amber-900">Need Help Choosing?</h3>
                                        <p className="text-amber-800 text-sm">
                                            Contact us directly at <strong>subscribe@afaqcm.com</strong> or call our team for a personalized consultation.
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-amber-700 font-medium">Response Time</p>
                                        <p className="text-amber-600 text-sm">Within 24 hours</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Back to Assessments */}
                        <div className="text-center">
                            <Link href="/assessment-tools">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8"
                                >
                                    <Target className="w-5 h-5 mr-2" />
                                    Back to Assessment Tools
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
