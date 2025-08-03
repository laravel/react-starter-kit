import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import ProfileWizard from '@/components/ProfileWizard';
import {
    UserPlus,
    User,
    Eye,
    EyeOff,
    Loader2,
    ArrowLeft,
    Globe,
    Sparkles
} from 'lucide-react';

interface Welcome2Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            subscription?: {
                plan_type: string;
            };
            roles?: Array<{
                name: string;
            }>;
        };
    };
    locale?: string;
}

const translations = {
    en: {
        mainTitle: "Strategic Assessment Framework",
        subtitle: "Comprehensive Organizational Evaluation Tool",
        description: "Unlock your organization's full potential with our evidence-based assessment",
        startAssessment: "Start Free Assessment",
        freeAssessmentAvailable: "Free Assessment Available",
        assessmentPlatform: "Assessment Platform",
        path: "Choose Your Path",
        signIn: "Sign In",
        employees: "Employees",
        service: "Service",
        manufacturing: "Manufacturing",
        commercial: "Commercial",
        register: "New User - Get Started Free",
        createAccount: "New User - Get Started Free",
        signInAccount: "Sign In to Your Account",
        name: "Full Name",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        companyName: "Company Name",
        fillInfo: "Fill in your details to get started",
        position: "Position",
        phone: "Phone",
        city: "City",
        industry: "Type",
        companySize: "Company Size",
        agreeTerms: "I agree to Terms & Privacy Policy",
        newsletterOptIn: "Subscribe to newsletter",
        marketingOptIn: "Receive marketing emails",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        processing: "Processing...",
        backToStart: "Back to Start",
        welcomeBack: "Welcome back!",
        dontHaveAccount: "Don't have an account?",
        createOneHere: "Create one here"
    },
    ar: {
        mainTitle: "إطار التقييم الاستراتيجي",
        subtitle: "أداة تقييم شاملة للمؤسسات",
        description: "اكتشف الإمكانات الكاملة لمؤسستك من خلال تقييمنا القائم على الأدلة",
        startAssessment: "ابدأ التقييم المجاني",
        assessmentPlatform: "منصة التقييم",
        employees: "موظفين",
        path: "اختر مسارك",
        signIn: "تسجيل الدخول",
        freeAssessmentAvailable: "متاح تقييم مجاني",
        service: "خدمي",
        manufacturing: "صناعي",
        commercial: "تجاري",
        register: "مستخدم جديد - ابدأ مجاناً",
        createAccount: "إنشاء حسابك",
        fillInfo: "املأ معلوماتك لتبدأ",
        signInAccount: "تسجيل الدخول لحسابك",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        companyName: "اسم الشركة",
        position: "المنصب",
        phone: "الهاتف",
        city: "المدينة",
        industry: "الفئة",
        companySize: "حجم الشركة",
        agreeTerms: "أوافق على الشروط وسياسة الخصوصية",
        newsletterOptIn: "الاشتراك في النشرة البريدية",
        marketingOptIn: "استقبال رسائل تسويقية",
        rememberMe: "تذكرني",
        forgotPassword: "نسيت كلمة المرور؟",
        processing: "جاري المعالجة...",
        backToStart: "العودة للبداية",
        welcomeBack: "مرحباً بعودتك!",
        dontHaveAccount: "ليس لديك حساب؟",
        createOneHere: "أنشئ واحداً هنا"
    }
};

export default function Welcome2({ auth, locale = 'en' }: Welcome2Props) {
    const [currentView, setCurrentView] = useState<'home' | 'options' | 'register' | 'signin' | 'profile'>('home');
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentLang, setCurrentLang] = useState<'en' | 'ar'>(locale as 'en' | 'ar');

    const t = translations[currentLang];
    const isRTL = currentLang === 'ar';

    const { data: newUserData, setData: setNewUserData, post: postNewUser, processing: processingNewUser, errors: newUserErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_name: '',
        marketing_emails: false,
        newsletter_subscription: false,
    });

    // Login form
    const { data: existingUserData, setData: setExistingUserData, post: postExistingUser, processing: processingExisting, errors: existingUserErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // FIXED: Enhanced form submission with comprehensive debugging
    const handleNewUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('=== REGISTRATION FORM SUBMISSION ===');
        console.log('Form data:', newUserData);
        console.log('Available routes:', window.route);

        setNewUserData('password_confirmation', newUserData.password);

        if (!newUserData.name.trim()) {
            alert('Please enter your full name');
            return;
        }

        if (!newUserData.email.trim()) {
            alert('Please enter your email address');
            return;
        }

        if (!newUserData.password) {
            alert('Please enter a password');
            return;
        }

        if (newUserData.password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        if (!newUserData.company_name.trim()) {
            alert('Please enter your company name');
            return;
        }

        console.log('Validation passed, submitting...');

        // Try different route names
        try {
            // First try the preferred route
            let routeName = 'user.register-free';
            let routeUrl;

            try {
                routeUrl = route(routeName);
                console.log('Using route:', routeName, 'URL:', routeUrl);
            } catch {
                console.log('Route user.register-free not found, trying alternatives...');

                // Try alternative routes
                const alternatives = ['register', 'user.register-alternative', 'user.store'];

                for (const altRoute of alternatives) {
                    try {
                        routeUrl = route(altRoute);
                        routeName = altRoute;
                        console.log('Using alternative route:', routeName, 'URL:', routeUrl);
                        break;
                    } catch {
                        console.log('Route', altRoute, 'not found');
                    }
                }

                if (!routeUrl) {
                    // Last resort - try direct URL
                    routeUrl = '/register-user';
                    console.log('Using direct URL:', routeUrl);
                }
            }

            postNewUser(routeUrl, {
                onSuccess: (response) => {
                    console.log('Registration successful:', response);
                    setCurrentView('options');
                    setCurrentView('profile');
                },
                onError: (errors) => {
                    console.error('Registration errors:', errors);

                    // Show specific error messages
                    if (errors.email) {
                        alert('Email error: ' + errors.email);
                    } else if (errors.password) {
                        alert('Password error: ' + errors.password);
                    } else if (errors.name) {
                        alert('Name error: ' + errors.name);
                    } else {
                        const firstError = Object.values(errors)[0];
                        if (Array.isArray(firstError)) {
                            alert('Error: ' + firstError[0]);
                        } else if (typeof firstError === 'string') {
                            alert('Error: ' + firstError);
                        } else {
                            alert('Registration failed. Please try again.');
                        }
                    }
                },
                onBefore: () => {
                    console.log('Request starting...');
                },
                onFinish: () => {
                    console.log('Request finished');
                }
            });
        } catch (error) {
            console.error('Route error:', error);
            alert('Route error: ' + error.message);
        }
    };

    // FIXED: Enhanced login submission with debugging
    const handleExistingUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('=== LOGIN FORM SUBMISSION ===');
        console.log('Login data:', { email: existingUserData.email, password: '[HIDDEN]', remember: existingUserData.remember });

        if (!existingUserData.email.trim()) {
            alert('Please enter your email address');
            return;
        }

        if (!existingUserData.password) {
            alert('Please enter your password');
            return;
        }

        console.log('Login validation passed, submitting...');

        try {
            // First try the standard login route
            let routeName = 'login';
            let routeUrl;

            try {
                routeUrl = route(routeName);
                console.log('Using login route:', routeName, 'URL:', routeUrl);
            } catch {
                console.log('Route login not found, trying alternatives...');

                // Try alternative routes
                const alternatives = ['auth.login', 'user.login', 'signin'];

                for (const altRoute of alternatives) {
                    try {
                        routeUrl = route(altRoute);
                        routeName = altRoute;
                        console.log('Using alternative login route:', routeName, 'URL:', routeUrl);
                        break;
                    } catch {
                        console.log('Login route', altRoute, 'not found');
                    }
                }

                if (!routeUrl) {
                    // Last resort - try direct URL
                    routeUrl = '/login';
                    console.log('Using direct login URL:', routeUrl);
                }
            }

            postExistingUser(routeUrl, {
                onSuccess: (response) => {
                    console.log('Login successful:', response);

                    // FORCE immediate redirect since backend isn't redirecting
                    console.log('Login was successful, forcing redirect...');

                    // Use location.replace for immediate redirect
                    window.location.replace('/dashboard');
                },
                onError: (errors) => {
                    console.error('Login errors:', errors);

                    if (errors.email) {
                        alert('Email error: ' + errors.email);
                    } else if (errors.password) {
                        alert('Password error: ' + errors.password);
                    } else {
                        const firstError = Object.values(errors)[0];
                        if (Array.isArray(firstError)) {
                            alert('Login error: ' + firstError[0]);
                        } else if (typeof firstError === 'string') {
                            alert('Login error: ' + firstError);
                        } else {
                            alert('Login failed. Please check your credentials.');
                        }
                    }
                },
                onBefore: () => {
                    console.log('Login request starting...');
                },
                onFinish: () => {
                    console.log('Login request finished');
                }
            });
        } catch (error) {
            console.error('Login route error:', error);
            alert('Login route error: ' + error.message);
        }
    };

    // If user is already authenticated, redirect them
    if (auth?.user) {
        const isAdmin = auth.user.roles?.some(role => role.name === 'super_admin') || false;
        const hasToolSubscriptions = auth.user.subscription?.plan_type === 'premium' || false;
        const redirectRoute = isAdmin ? '/dashboard' : (hasToolSubscriptions ? '/dashboard' : '/tools/discover');
        window.location.href = redirectRoute;
        return null;
    }

    return (
        <>
            <Head title="AFAQCM">
                <meta name="csrf-token" content={window.Laravel?.csrfToken || document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&family=Tajawal:wght@400;500;700;900&display=swap"
                    rel="stylesheet" />
                <style>{`
                    .font-arabic {
                        font-family: 'Cairo', 'Amiri', 'Tajawal', 'Noto Sans Arabic', Arial, sans-serif !important;
                        font-feature-settings: "liga" 1, "calt" 1, "kern" 1;
                        -webkit-font-feature-settings: "liga" 1, "calt" 1, "kern" 1;
                        text-rendering: optimizeLegibility;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }

                    [dir="rtl"] * {
                        font-family: 'Cairo', 'Amiri', 'Tajawal', 'Noto Sans Arabic', Arial, sans-serif !important;
                    }

                    /* Ensure Arabic diacritics and dots render properly */
                    [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] p, [dir="rtl"] span, [dir="rtl"] label {
                        font-synthesis: none;
                        text-rendering: optimizeLegibility;
                        -webkit-font-feature-settings: "liga" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1;
                        font-feature-settings: "liga" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1;
                        line-height: 1.6;
                    }
                `}</style>
            </Head>

            <div
                className={`h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100`}
                dir={isRTL ? 'rtl' : 'ltr'}>

                {/* Header */}
                <header className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-blue-200/50">
                    <div className="flex justify-between items-center px-8 py-4">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img
                                src="/storage/logo.svg"
                                alt="FAQ Logo"
                                className="bg-transparent h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                            />
                            <div>
                                <h1 className="text-lg font-bold text-blue-900">AFAQ</h1>
                                <p className="text-xs text-blue-600">{t.assessmentPlatform}</p>
                            </div>
                        </div>

                        {/* Language Toggle */}
                        <div className="flex items-center space-x-4">
                            <Link href={route('posts.index')} className="text-blue-700 font-medium hover:text-blue-900">
                                Blog
                            </Link>
                            <Button
                                onClick={() => setCurrentLang(prev => prev === 'en' ? 'ar' : 'en')}
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                                <Globe className="h-4 w-4 mr-1" />
                                {currentLang.toUpperCase()}
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="h-full flex items-center justify-center pt-20 pb-8 px-8">

                    {/* Home View */}
                    {currentView === 'home' && (
                        <div className="text-center max-w-4xl mx-auto">
                            {/* Decorative Elements */}
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/40 to-blue-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-6">
                                    <Sparkles className="h-8 w-8 text-blue-600 mr-3" />
                                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 text-base">
                                        {t.freeAssessmentAvailable}
                                    </Badge>
                                </div>

                                <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-6 ${isRTL ? 'font-arabic' : ''}`} style={{ fontFamily: isRTL ? "'Noto Sans Arabic', 'Cairo', 'Amiri', 'Tajawal', Arial, sans-serif" : "inherit" }}>
                                    {t.mainTitle}
                                </h1>

                                <p className={`text-2xl md:text-3xl text-blue-800 mb-4 font-semibold ${isRTL ? 'font-arabic' : ''}`} style={{ fontFamily: isRTL ? "'Noto Sans Arabic', 'Cairo', 'Amiri', 'Tajawal', Arial, sans-serif" : "inherit" }}>
                                    {t.subtitle}
                                </p>

                                <p className={`text-lg text-blue-600 mb-12 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`} style={{ fontFamily: isRTL ? "'Noto Sans Arabic', 'Cairo', 'Amiri', 'Tajawal', Arial, sans-serif" : "inherit" }}>
                                    {t.description}
                                </p>

                                <Button
                                    onClick={() => setCurrentView('options')}
                                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-xl font-bold px-12 py-6 rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-2xl"
                                >
                                    {t.startAssessment}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Options View */}
                    {currentView === 'options' && (
                        <div className="text-center max-w-md mx-auto">
                            <div className="bg-white/70 backdrop-blur-lg border border-blue-200 rounded-3xl p-8 shadow-2xl">
                                <Button
                                    onClick={() => setCurrentView('home')}
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-4 left-4 text-blue-600 hover:bg-blue-50"
                                >
                                    <ArrowLeft className="h-5 w-5 mr-1" />
                                    {t.backToStart}
                                </Button>

                                <h3 className="text-2xl font-bold text-blue-900 mb-8 mt-4">{t.path}</h3>

                                <div className="space-y-4">
                                    <Button
                                        onClick={() => setCurrentView('register')}
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white h-16 text-lg font-semibold rounded-xl"
                                    >
                                        <UserPlus className="h-6 w-6 mr-3" />
                                        {t.register}
                                    </Button>

                                    <Button
                                        onClick={() => setCurrentView('signin')}
                                        variant="outline"
                                        className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 h-16 text-lg font-semibold rounded-xl"
                                    >
                                        <User className="h-6 w-6 mr-3" />
                                        {t.signIn}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Register View */}
                    {currentView === 'register' && (
                        <div className="w-full max-w-5xl mx-auto">
                            <div className="bg-white/70 backdrop-blur-lg border border-blue-200 rounded-3xl p-8 shadow-2xl">
                                <div className="flex items-center mb-6">
                                    <Button
                                        onClick={() => setCurrentView('options')}
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-600 hover:bg-blue-50 mr-4"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                    <div className="text-center flex-1">
                                        <h3 className="text-2xl font-bold text-blue-900">{t.createAccount}</h3>
                                        <p className="text-blue-600 text-sm">{t.fillInfo}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleNewUserSubmit}>
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div>
                                            <Label htmlFor="name" className="text-blue-900 text-sm font-semibold mb-2 block">
                                                {t.name} <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={newUserData.name}
                                                onChange={(e) => setNewUserData('name', e.target.value)}
                                                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl"
                                                placeholder={t.name}
                                                required
                                            />
                                            {newUserErrors.name && (
                                                <p className="text-red-500 text-xs mt-1">{newUserErrors.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <Label htmlFor="email" className="text-blue-900 text-sm font-semibold mb-2 block">
                                                {t.email} <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={newUserData.email}
                                                onChange={(e) => setNewUserData('email', e.target.value)}
                                                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl"
                                                placeholder={t.email}
                                                required
                                            />
                                            {newUserErrors.email && (
                                                <p className="text-red-500 text-xs mt-1">{newUserErrors.email}</p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <Label htmlFor="password" className="text-blue-900 text-sm font-semibold mb-2 block">
                                                {t.password} <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={newUserData.password}
                                                    onChange={(e) => setNewUserData('password', e.target.value)}
                                                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl pr-12"
                                                    placeholder={t.password}
                                                    required
                                                    minLength={8}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {newUserErrors.password && (
                                                <p className="text-red-500 text-xs mt-1">{newUserErrors.password}</p>
                                            )}
                                        </div>

                                        {/* Company Name */}
                                        <div>
                                            <Label htmlFor="company_name" className="text-blue-900 text-sm font-semibold mb-2 block">
                                                {t.companyName}
                                            </Label>
                                            <Input
                                                id="company_name"
                                                type="text"
                                                value={newUserData.company_name}
                                                onChange={(e) => setNewUserData('company_name', e.target.value)}
                                                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl"
                                                placeholder={t.companyName}
                                            />
                                        </div>

                                        {/* Marketing Emails */}
                                        <div className="flex items-center space-x-2 mt-4">
                                            <Checkbox
                                                id="marketing_emails"
                                                checked={newUserData.marketing_emails}
                                                onCheckedChange={(checked) => setNewUserData('marketing_emails', !!checked)}
                                                className="border-blue-300 data-[state=checked]:bg-blue-600"
                                            />
                                            <label htmlFor="marketing_emails" className="text-blue-900 text-sm cursor-pointer">
                                                {t.marketingOptIn}
                                            </label>
                                        </div>

                                        {/* Newsletter Subscription */}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Checkbox
                                                id="newsletter_subscription"
                                                checked={newUserData.newsletter_subscription}
                                                onCheckedChange={(checked) => setNewUserData('newsletter_subscription', !!checked)}
                                                className="border-blue-300 data-[state=checked]:bg-blue-600"
                                            />
                                            <label htmlFor="newsletter_subscription" className="text-blue-900 text-sm cursor-pointer">
                                                {t.newsletterOptIn}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-6 text-center">
                                        <Button
                                            type="submit"
                                            disabled={processingNewUser}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-12 py-3 rounded-xl font-semibold"
                                        >
                                            {processingNewUser ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                    {t.processing}
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="h-5 w-5 mr-2" />
                                                    {t.register}
                                                </>
                                            )}
                                        </Button>

                                        {/* Enhanced Debug Info */}

                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Profile Wizard */}
                    {currentView === 'profile' && (
                        <div className="w-full max-w-md mx-auto">
                            {!isProfileComplete ? (
                                <ProfileWizard onComplete={() => setIsProfileComplete(true)} />
                            ) : (
                                <h1 className="text-2xl font-bold text-center text-blue-900 mt-8">
                                    Welcome to the app!
                                </h1>
                            )}
                        </div>
                    )}

                    {/* Sign In View */}
                    {currentView === 'signin' && (
                        <div className="w-full max-w-md mx-auto">
                            <div className="bg-white/70 backdrop-blur-lg border border-blue-200 rounded-3xl p-8 shadow-2xl">
                                <div className="flex items-center mb-6">
                                    <Button
                                        onClick={() => setCurrentView('options')}
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-600 hover:bg-blue-50 mr-4"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                    <div className="text-center flex-1">
                                        <h3 className="text-2xl font-bold text-blue-900">{t.signInAccount}</h3>
                                        <p className="text-blue-600 text-sm">{t.welcomeBack}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleExistingUserSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <Label htmlFor="existing_email" className="text-blue-900 text-sm font-semibold mb-2 block">
                                            {t.email} <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="existing_email"
                                            type="email"
                                            value={existingUserData.email}
                                            onChange={(e) => setExistingUserData('email', e.target.value)}
                                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl"
                                            placeholder={t.email}
                                            required
                                        />
                                        {existingUserErrors.email && (
                                            <p className="text-red-500 text-xs mt-1">{existingUserErrors.email}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <Label htmlFor="existing_password" className="text-blue-900 text-sm font-semibold mb-2 block">
                                            {t.password} <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="existing_password"
                                                type={showPassword ? "text" : "password"}
                                                value={existingUserData.password}
                                                onChange={(e) => setExistingUserData('password', e.target.value)}
                                                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl pr-12"
                                                placeholder={t.password}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                                            >
                                                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                            </button>
                                        </div>
                                        {existingUserErrors.password && (
                                            <p className="text-red-500 text-xs mt-1">{existingUserErrors.password}</p>
                                        )}
                                    </div>

                                    {/* Remember Me and Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                checked={existingUserData.remember}
                                                onCheckedChange={(checked) => setExistingUserData('remember', !!checked)}
                                                className="border-blue-300 data-[state=checked]:bg-blue-600"
                                            />
                                            <label htmlFor="remember" className="text-blue-900 text-sm cursor-pointer">
                                                {t.rememberMe}
                                            </label>
                                        </div>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            {t.forgotPassword}
                                        </a>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={processingExisting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white h-12 rounded-xl font-semibold"
                                    >
                                        {processingExisting ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                {t.processing}
                                            </>
                                        ) : (
                                            <>
                                                <User className="h-5 w-5 mr-2" />
                                                {t.signIn}
                                            </>
                                        )}
                                    </Button>

                                    {/* Link to Register */}
                                    <div className="text-center">
                                        <p className="text-blue-600 text-sm">
                                            {t.dontHaveAccount}{' '}
                                            <button
                                                type="button"
                                                onClick={() => setCurrentView('register')}
                                                className="text-blue-800 hover:text-blue-900 font-semibold underline"
                                            >
                                                {t.createOneHere}
                                            </button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* Background Decorative Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {/* Animated gradient orbs */}
                    <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-50/40 to-blue-100/40 rounded-full blur-3xl animate-pulse delay-500"></div>

                    {/* Geometric shapes */}
                    <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute bottom-32 left-20 w-6 h-6 bg-blue-500 rotate-45 animate-pulse delay-700"></div>
                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-600 rounded-full animate-ping delay-1000"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-blue-300 rotate-12 animate-bounce delay-500"></div>
                </div>

                {/* Footer */}
                <footer className="absolute bottom-0 left-0 right-0 bg-white/60 backdrop-blur-sm border-t border-blue-200/50 py-4">
                    <div className="flex justify-center items-center">
                        <p className="text-blue-600 text-sm">
                            © 2024 Afaqcm. All rights reserved. |
                            <span className="ml-2">🔒 Secure & Encrypted</span>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
