import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Menu,
    X,
    ChevronDown,
    User,
    Settings,
    LogOut,
    Bell,
    Search,
    Globe,
    BookOpen,
    Users,
    DollarSign,
    BarChart3,
    Download,
    Target,
    Award,
    TrendingUp,
    Building,
    Phone,
    Mail,
    UserPlus,
    Crown,
    Shield,
    FileText,
    Calendar,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff,
    Loader2,
    UserCheck
} from 'lucide-react';

const translations = {
    en: {
        courses: "Courses",
        business: "Business",
        individuals: "Individuals",
        pricing: "Pricing",
        resources: "Resources",
        getDemo: "Get a demo",
        enrollNow: "Enroll now",
        dashboard: "Dashboard",
        admin: "Admin",
        logout: "Logout",
        assessmentTools: "Assessment Tools",
        myAssessments: "My Assessments",
        upgradeProPlan: "Upgrade to Premium",
        mainTitle: "Strategic Assessment Framework",
        subtitle: "Comprehensive Organizational Evaluation Tool",
        description1: "Ready to unlock your organization's full potential? Our evidence-based assessment identifies strengths and improvement opportunities.",
        description2: "Drive organizational excellence with our systematic evaluation framework covering all critical business capabilities and performance drivers.",
        strategicFramework: "Strategic Framework",
        expertGuide: "Expert Guide",
        provenResults: "Proven Results",
        trustedBy: "Trusted by 50,000+ HR Professionals Worldwide",
        assessmentTitle: "Get Your Free Company Assessment",
        assessmentSubtitle: "Unlock strategic insights in minutes",
        downloadNow: "START FREE ASSESSMENT",
        newUser: "New User - Get Started Free",
        existingUser: "Existing User - Sign In",
        name: "Full Name",
        company: "Company Industry",
        companyType: "Company Type",
        selectCompanyType: "Select your company type",
        commercial: "Commercial / Private",
        government: "Government / Public",
        service: "Service / Non-Profit",
        phone: "Phone Number",
        email: "Business Email",
        companyName: "Company Name",
        password: "Password",
        confirmPassword: "Confirm Password",
        position: "Your Position",
        city: "City",
        website: "Company Website",
        industry: "Industry",
        companySize: "Company Size",
        howHeard: "How did you hear about us?",
        agreeTerms: "I agree to the Terms of Service and Privacy Policy",
        marketingEmails: "Send me updates and marketing emails",
        registerDownload: "Create Free Account & Start Assessment",
        loginDownload: "Sign In & Continue",
        processing: "Creating your account...",
        optional: "(Optional)",
        required: "Required",
        benefits: "What you'll get:",
        benefit1: "1 Free comprehensive assessment",
        benefit2: "Domain-level results summary",
        benefit3: "Basic improvement recommendations",
        benefit4: "Option to upgrade for detailed analytics"
    },
    ar: {
        courses: "الدورات",
        business: "الأعمال",
        individuals: "الأفراد",
        pricing: "التسعير",
        resources: "الموارد",
        getDemo: "احصل على عرض توضيحي",
        enrollNow: "اشترك الآن",
        dashboard: "لوحة القيادة",
        admin: "الإدارة",
        logout: "تسجيل الخروج",
        assessmentTools: "أدوات التقييم",
        myAssessments: "تقييماتي",
        upgradeProPlan: "الترقية للخطة المميزة",
        mainTitle: "إطار التقييم الاستراتيجي",
        subtitle: "أداة تقييم تنظيمية شاملة",
        description1: "هل أنت مستعد لإطلاق الإمكانات الكاملة لمؤسستك؟ تقييمنا المبني على الأدلة يحدد نقاط القوة وفرص التحسين.",
        description2: "قُد التميز التنظيمي من خلال إطار التقييم المنهجي الذي يغطي جميع القدرات التجارية الحاسمة ومحركات الأداء.",
        strategicFramework: "إطار استراتيجي",
        expertGuide: "دليل الخبراء",
        provenResults: "نتائج مثبتة",
        trustedBy: "موثوق من قبل أكثر من 50,000 متخصص في الموارد البشرية في جميع أنحاء العالم",
        assessmentTitle: "احصل على تقييم مجاني لشركتك",
        assessmentSubtitle: "اكتشف الرؤى الاستراتيجية في دقائق",
        downloadNow: "ابدأ التقييم المجاني",
        newUser: "مستخدم جديد - ابدأ مجاناً",
        existingUser: "مستخدم موجود - سجل الدخول",
        name: "الاسم الكامل",
        company: "مجال الشركة",
        companyType: "نوع الشركة",
        selectCompanyType: "اختر نوع شركتك",
        commercial: "تجارية / خاصة",
        government: "حكومية / عامة",
        service: "خدمية / غير ربحية",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني التجاري",
        companyName: "اسم الشركة",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        position: "منصبك",
        city: "المدينة",
        website: "موقع الشركة",
        industry: "الصناعة",
        companySize: "حجم الشركة",
        howHeard: "كيف سمعت عنا؟",
        agreeTerms: "أوافق على شروط الخدمة وسياسة الخصوصية",
        marketingEmails: "أرسل لي التحديثات ورسائل التسويق",
        registerDownload: "إنشاء حساب مجاني وبدء التقييم",
        loginDownload: "تسجيل الدخول والمتابعة",
        processing: "جاري إنشاء حسابك...",
        optional: "(اختياري)",
        required: "مطلوب",
        benefits: "ما ستحصل عليه:",
        benefit1: "تقييم شامل مجاني واحد",
        benefit2: "ملخص نتائج على مستوى المجال",
        benefit3: "توصيات تحسين أساسية",
        benefit4: "خيار الترقية للتحليلات المفصلة"
    }
};

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

export default function Welcome2({ auth, locale = 'en' }: Welcome2Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const [showExistingUserForm, setShowExistingUserForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentLang, setCurrentLang] = useState<'en' | 'ar'>(locale as 'en' | 'ar');

    const t = translations[currentLang];
    const isRTL = currentLang === 'ar';

    // Enhanced registration form with more validation
    const { data: newUserData, setData: setNewUserData, post: postNewUser, processing: processingNewUser, errors: newUserErrors } = useForm({
        name: '',
        company: '',
        company_type: '',
        phone: '',
        email: '',
        company_name: '',
        position: '',
        city: '',
        website: '',
        industry: '',
        company_size: '',
        how_did_you_hear: '',
        marketing_emails: true,
        newsletter_subscription: false,
        agree_terms: false,
    });

    const { data: existingUserData, setData: setExistingUserData, post: postExistingUser, processing: processingExisting, errors: existingUserErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleDownloadClick = () => {
        setShowUserOptions(true);
        setShowNewUserForm(false);
        setShowExistingUserForm(false);
    };

    const toggleLanguage = () => {
        setCurrentLang(prev => prev === 'en' ? 'ar' : 'en');
    };

    const handleNewUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (!newUserData.agree_terms) {
            return;
        }

        postNewUser(route('user.register-free'), {
            onSuccess: () => {
                // User will be redirected automatically to assessment tools
            },
            onError: (errors) => {
                console.error('Registration errors:', errors);
            }
        });
    };

    const handleExistingUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postExistingUser(route('login'), {
            onSuccess: () => {
                // User will be redirected automatically
                if (typeof window !== 'undefined') {
                    window.location.href = '/assessment-tools';
                }
            },
            onError: (errors) => {
                console.error('Login errors:', errors);
            }
        });
    };

    // Check if user is admin
    const isAdmin = () => {
        return auth?.user?.roles?.some(role => role.name === 'super_admin') || false;
    };

    const getUserPlanBadge = () => {
        if (!auth?.user) return null;

        if (isAdmin()) {
            return (
                <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Admin
                </Badge>
            );
        }

        const planType = auth.user.subscription?.plan_type || 'free';

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

    const getRedirectRoute = () => {
        if (!auth?.user) return '/assessment-tools';

        if (isAdmin()) {
            return '/dashboard';
        }

        const planType = auth.user.subscription?.plan_type || 'free';
        return planType === 'premium' ? '/dashboard' : '/assessment-tools';
    };

    return (
        <>
            <Head title="Strategic Assessment Framework" />

            <div className={`min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {/* Simplified Header */}
                <header className="relative z-50">
                    <nav className="bg-transparent">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                {/* Logo */}
                                <div className="flex items-center">
                                    <img
                                        src="/storage/logo.svg"
                                        alt="FAQ Logo"
                                        className="bg-transparent h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                                    />
                                </div>

                                {/* Right side navigation */}
                                <div className="hidden md:flex items-center space-x-4">
                                    {auth?.user ? (
                                        <div className="flex items-center space-x-4">
                                            {/* Admin-specific buttons */}
                                            {isAdmin() && (
                                                <>
                                                    <Link href="/admin">
                                                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                                                            <UserCheck className="h-4 w-4 mr-2" />
                                                            {t.admin}
                                                        </Button>
                                                    </Link>
                                                    <Link href="/dashboard">
                                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                            <BarChart3 className="h-4 w-4 mr-2" />
                                                            {t.dashboard}
                                                        </Button>
                                                    </Link>
                                                </>
                                            )}

                                            {/* Non-admin users get the regular button */}
                                            {!isAdmin() && (
                                                <Link href={getRedirectRoute()}>
                                                    <Button className="bg-white text-blue-900 hover:bg-gray-100">
                                                        <Target className="h-4 w-4 mr-2" />
                                                        {auth.user.subscription?.plan_type === 'premium' ? 'Go to Dashboard' : 'Assessment Tools'}
                                                    </Button>
                                                </Link>
                                            )}

                                            <div className="flex items-center space-x-2 text-white">
                                                <User className="h-5 w-5" />
                                                <span>{auth.user.name}</span>
                                                {getUserPlanBadge()}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                onClick={toggleLanguage}
                                                variant="ghost"
                                                size="sm"
                                                className="text-white hover:text-cyan-400"
                                            >
                                                <Globe className="h-4 w-4 mr-1" />
                                                {currentLang === 'en' ? 'العربية' : 'English'}
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile menu button */}
                                <div className="md:hidden">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        className="text-white hover:text-cyan-400 inline-flex items-center justify-center p-2 rounded-md"
                                    >
                                        {isMobileMenuOpen ? (
                                            <X className="block h-6 w-6" />
                                        ) : (
                                            <Menu className="block h-6 w-6" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden bg-blue-800 border-t border-blue-700">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    {auth?.user ? (
                                        <div className="space-y-2">
                                            <div className="px-3 py-2 text-white">
                                                Welcome, {auth.user.name}
                                                <div className="mt-1">{getUserPlanBadge()}</div>
                                            </div>

                                            {/* Admin mobile menu items */}
                                            {isAdmin() && (
                                                <>
                                                    <Link href="/admin" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                                        <UserCheck className="h-4 w-4 inline mr-2" />
                                                        {t.admin}
                                                    </Link>
                                                    <Link href="/dashboard" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                                        <BarChart3 className="h-4 w-4 inline mr-2" />
                                                        {t.dashboard}
                                                    </Link>
                                                </>
                                            )}

                                            {/* Non-admin mobile menu */}
                                            {!isAdmin() && (
                                                <Link href={getRedirectRoute()} className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                                    {auth.user.subscription?.plan_type === 'premium' ? 'Dashboard' : 'Assessment Tools'}
                                                </Link>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={toggleLanguage}
                                            className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium"
                                        >
                                            {currentLang === 'en' ? 'العربية' : 'English'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left space-y-8">
                                <div className="space-y-6">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                        {t.mainTitle}
                                    </h1>

                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-100 leading-relaxed">
                                        {t.subtitle}
                                    </h2>

                                    <p className="text-lg text-blue-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                        {t.description1}
                                    </p>

                                    <p className="text-lg text-white font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                        {t.description2}
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                                    <div className="flex items-center space-x-3 text-blue-100 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                        <Target className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                                        <span className="text-sm font-medium">{t.strategicFramework}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-blue-100 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                        <Award className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                                        <span className="text-sm font-medium">{t.expertGuide}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-blue-100 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                        <TrendingUp className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                                        <span className="text-sm font-medium">{t.provenResults}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-blue-100 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                        <BarChart3 className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                                        <span className="text-sm font-medium">Assessment Tools</span>
                                    </div>
                                </div>

                                {/* Quick Access for Authenticated Users */}
                                {auth?.user && (
                                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
                                        <h3 className="text-xl font-bold text-white mb-4 text-center">Welcome back, {auth.user.name}!</h3>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {/* Admin gets both Admin and Dashboard buttons */}
                                            {isAdmin() && (
                                                <>
                                                    <Link href="/admin" className="flex-1">
                                                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                                            <UserCheck className="h-4 w-4 mr-2" />
                                                            {t.admin}
                                                        </Button>
                                                    </Link>
                                                    <Link href="/dashboard" className="flex-1">
                                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                                            <BarChart3 className="h-4 w-4 mr-2" />
                                                            {t.dashboard}
                                                        </Button>
                                                    </Link>
                                                </>
                                            )}

                                            {/* Non-admin gets regular buttons */}
                                            {!isAdmin() && (
                                                <>
                                                    <Link href={getRedirectRoute()} className="flex-1">
                                                        <Button className="w-full bg-white text-blue-900 hover:bg-gray-100">
                                                            <Target className="h-4 w-4 mr-2" />
                                                            {auth.user.subscription?.plan_type === 'premium' ? 'Go to Dashboard' : 'Assessment Tools'}
                                                        </Button>
                                                    </Link>
                                                    <Link href="/assessments" className="flex-1">
                                                        <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-900">
                                                            <FileText className="h-4 w-4 mr-2" />
                                                            {t.myAssessments}
                                                        </Button>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Content - Registration/Login Section */}
                            {!auth?.user && (
                                <div className="flex justify-center items-center">
                                    <div className="w-full max-w-md space-y-6">
                                        {/* Assessment Section */}
                                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl text-center">
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {t.assessmentTitle}
                                            </h3>
                                            <p className="text-cyan-300 text-sm mb-6">
                                                {t.assessmentSubtitle}
                                            </p>

                                            {/* Benefits */}
                                            <div className="bg-white/5 rounded-lg p-4 mb-6">
                                                <h4 className="text-white font-semibold mb-3">{t.benefits}</h4>
                                                <div className="space-y-2 text-sm text-cyan-200">
                                                    <div className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                        <span>{t.benefit1}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                        <span>{t.benefit2}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                        <span>{t.benefit3}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                        <span>{t.benefit4}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {!showUserOptions && (
                                                <Button
                                                    onClick={handleDownloadClick}
                                                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg transition-all duration-300"
                                                >
                                                    <Download className="h-5 w-5 mr-2" />
                                                    {t.downloadNow}
                                                </Button>
                                            )}

                                            {/* User Options */}
                                            {showUserOptions && (
                                                <div className="space-y-3">
                                                    <Button
                                                        onClick={() => {
                                                            setShowNewUserForm(true);
                                                            setShowExistingUserForm(false);
                                                        }}
                                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                                                    >
                                                        <UserPlus className="h-4 w-4 mr-2" />
                                                        {t.newUser}
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setShowExistingUserForm(true);
                                                            setShowNewUserForm(false);
                                                        }}
                                                        className="w-full bg-white/10 border border-white/30 text-white hover:bg-white hover:text-blue-900"
                                                    >
                                                        <User className="h-4 w-4 mr-2" />
                                                        {t.existingUser}
                                                    </Button>
                                                </div>
                                            )}

                                            {/* New User Form - Simplified */}
                                            {showNewUserForm && (
                                                <div className="pt-4 border-t border-white/20 text-left max-h-96 overflow-y-auto">
                                                    <form onSubmit={handleNewUserSubmit} className="space-y-4">
                                                        {/* Essential fields only */}
                                                        <div>
                                                            <Label htmlFor="name" className="text-white text-sm">
                                                                {t.name} <span className="text-red-400">*</span>
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                type="text"
                                                                value={newUserData.name}
                                                                onChange={(e) => setNewUserData('name', e.target.value)}
                                                                className="bg-white/90 border-white/30"
                                                                placeholder="John Smith"
                                                                required
                                                            />
                                                            {newUserErrors.name && (
                                                                <p className="text-red-300 text-xs mt-1">{newUserErrors.name}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="email" className="text-white text-sm">
                                                                {t.email} <span className="text-red-400">*</span>
                                                            </Label>
                                                            <Input
                                                                id="email"
                                                                type="email"
                                                                value={newUserData.email}
                                                                onChange={(e) => setNewUserData('email', e.target.value)}
                                                                className="bg-white/90 border-white/30"
                                                                placeholder="john@company.com"
                                                                required
                                                            />
                                                            {newUserErrors.email && (
                                                                <p className="text-red-300 text-xs mt-1">{newUserErrors.email}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="phone" className="text-white text-sm">
                                                                {t.phone} <span className="text-red-400">*</span>
                                                            </Label>
                                                            <Input
                                                                id="phone"
                                                                type="tel"
                                                                value={newUserData.phone}
                                                                onChange={(e) => setNewUserData('phone', e.target.value)}
                                                                className="bg-white/90 border-white/30"
                                                                placeholder="+1 (555) 123-4567"
                                                                required
                                                            />
                                                            {newUserErrors.phone && (
                                                                <p className="text-red-300 text-xs mt-1">{newUserErrors.phone}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="company_name" className="text-white text-sm">
                                                                {t.companyName} <span className="text-red-400">*</span>
                                                            </Label>
                                                            <Input
                                                                id="company_name"
                                                                type="text"
                                                                value={newUserData.company_name}
                                                                onChange={(e) => setNewUserData('company_name', e.target.value)}
                                                                className="bg-white/90 border-white/30"
                                                                placeholder="ABC Corporation"
                                                                required
                                                            />
                                                            {newUserErrors.company_name && (
                                                                <p className="text-red-300 text-xs mt-1">{newUserErrors.company_name}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="company_type" className="text-white text-sm">
                                                                {t.companyType} <span className="text-red-400">*</span>
                                                            </Label>
                                                            <Select onValueChange={(value) => setNewUserData('company_type', value)}>
                                                                <SelectTrigger className="bg-white/90 border-white/30">
                                                                    <SelectValue placeholder={t.selectCompanyType} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="commercial">{t.commercial}</SelectItem>
                                                                    <SelectItem value="government">{t.government}</SelectItem>
                                                                    <SelectItem value="service">{t.service}</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {newUserErrors.company_type && (
                                                                <p className="text-red-300 text-xs mt-1">{newUserErrors.company_type}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="company" className="text-white text-sm">
                                                                {t.company} <span className="text-red-400">*</span>
                                                            </Label>
                                                            <Input
                                                                id="company"
                                                                type="text"
                                                                value={newUserData.company}
                                                                onChange={(e) => setNewUserData('company', e.target.value)}
                                                                className="bg-white/90 border-white/30"
                                                                placeholder="Technology, Healthcare, Finance..."
                                                                required
                                                            />
                                                            {newUserErrors.company && (
                                                                <p className="text-red-300 text-xs mt-1">{newUserErrors.company}</p>
                                                            )}
                                                        </div>

                                                        {/* Terms and conditions */}
                                                        <div className="space-y-3 border-t border-white/20 pt-4">
                                                            <div className="flex items-start space-x-2">
                                                                <Checkbox
                                                                    id="agree_terms"
                                                                    checked={newUserData.agree_terms}
                                                                    onCheckedChange={(checked) => setNewUserData('agree_terms', !!checked)}
                                                                    className="mt-1"
                                                                />
                                                                <Label htmlFor="agree_terms" className="text-white text-sm leading-relaxed">
                                                                    {t.agreeTerms} <span className="text-red-400">*</span>
                                                                </Label>
                                                            </div>
                                                            {newUserErrors.agree_terms && (
                                                                <p className="text-red-300 text-xs">You must agree to the terms to continue</p>
                                                            )}

                                                            <div className="flex items-start space-x-2">
                                                                <Checkbox
                                                                    id="marketing_emails"
                                                                    checked={newUserData.marketing_emails}
                                                                    onCheckedChange={(checked) => setNewUserData('marketing_emails', !!checked)}
                                                                    className="mt-1"
                                                                />
                                                                <Label htmlFor="marketing_emails" className="text-white text-sm leading-relaxed">
                                                                    {t.marketingEmails}
                                                                </Label>
                                                            </div>
                                                        </div>

                                                        {/* Form Errors */}
                                                        {Object.keys(newUserErrors).length > 0 && (
                                                            <Alert className="bg-red-500/20 border-red-400">
                                                                <AlertCircle className="h-4 w-4" />
                                                                <AlertDescription className="text-red-200 text-sm">
                                                                    Please fix the errors above before submitting.
                                                                </AlertDescription>
                                                            </Alert>
                                                        )}

                                                        <Button
                                                            type="submit"
                                                            disabled={processingNewUser || !newUserData.agree_terms}
                                                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white h-12 font-semibold"
                                                        >
                                                            {processingNewUser ? (
                                                                <>
                                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                    {t.processing}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <UserPlus className="h-4 w-4 mr-2" />
                                                                    {t.registerDownload}
                                                                </>
                                                            )}
                                                        </Button>
                                                    </form>
                                                </div>
                                            )}

                                            {/* Existing User Form - Simplified */}
                                            {showExistingUserForm && (
                                                <form onSubmit={handleExistingUserSubmit} className="space-y-4 pt-4 border-t border-white/20 text-left">
                                                    <div>
                                                        <Label htmlFor="existing_email" className="text-white text-sm">
                                                            {t.email} <span className="text-red-400">*</span>
                                                        </Label>
                                                        <Input
                                                            id="existing_email"
                                                            type="email"
                                                            value={existingUserData.email}
                                                            onChange={(e) => setExistingUserData('email', e.target.value)}
                                                            className="bg-white/90 border-white/30"
                                                            placeholder="your@email.com"
                                                            required
                                                        />
                                                        {existingUserErrors.email && (
                                                            <p className="text-red-300 text-xs mt-1">{existingUserErrors.email}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="password" className="text-white text-sm">
                                                            {t.password} <span className="text-red-400">*</span>
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="password"
                                                                type={showPassword ? "text" : "password"}
                                                                value={existingUserData.password}
                                                                onChange={(e) => setExistingUserData('password', e.target.value)}
                                                                className="bg-white/90 border-white/30 pr-10"
                                                                placeholder="Your password"
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                            >
                                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                            </button>
                                                        </div>
                                                        {existingUserErrors.password && (
                                                            <p className="text-red-300 text-xs mt-1">{existingUserErrors.password}</p>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id="remember"
                                                            checked={existingUserData.remember}
                                                            onCheckedChange={(checked) => setExistingUserData('remember', !!checked)}
                                                        />
                                                        <Label htmlFor="remember" className="text-white text-sm">
                                                            Remember me
                                                        </Label>
                                                    </div>

                                                    {/* General login errors */}
                                                    {Object.keys(existingUserErrors).length > 0 && (
                                                        <Alert className="bg-red-500/20 border-red-400">
                                                            <AlertCircle className="h-4 w-4" />
                                                            <AlertDescription className="text-red-200 text-sm">
                                                                Invalid credentials. Please check your email and password.
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}

                                                    <Button
                                                        type="submit"
                                                        disabled={processingExisting}
                                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
                                                    >
                                                        {processingExisting ? (
                                                            <>
                                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                Signing in...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <User className="h-4 w-4 mr-2" />
                                                                {t.loginDownload}
                                                            </>
                                                        )}
                                                    </Button>

                                                    {/* Forgot Password Link */}
                                                    <div className="text-center space-y-2">
                                                        <Link
                                                            href="/forgot-password"
                                                            className="text-cyan-300 hover:text-cyan-200 text-sm underline"
                                                        >
                                                            Forgot your password?
                                                        </Link>
                                                        <div className="text-white/60 text-xs">
                                                            Don't have an account?{' '}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowExistingUserForm(false);
                                                                    setShowNewUserForm(true);
                                                                }}
                                                                className="text-cyan-300 hover:text-cyan-200 underline"
                                                            >
                                                                Sign up free
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
