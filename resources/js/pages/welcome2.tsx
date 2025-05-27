import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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
    UserPlus
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
        logout: "Logout",
        mainTitle: "Strategic Assessment Framework",
        subtitle: "Comprehensive Organizational Evaluation Tool",
        description1: "Ready to unlock your organization's full potential? Our evidence-based assessment identifies strengths and improvement opportunities.",
        description2: "Drive organizational excellence with our systematic evaluation framework covering all critical business capabilities and performance drivers.",
        strategicFramework: "Strategic Framework",
        expertGuide: "Expert Guide",
        provenResults: "Proven Results",
        assessmentTools: "Assessment Tools",
        trustedBy: "Trusted by 50,000+ HR Professionals Worldwide",
        assessmentTitle: "Get Your Company Assessment",
        assessmentSubtitle: "Unlock strategic insights today",
        downloadNow: "START ASSESSMENT",
        newUser: "New User",
        existingUser: "Existing User",
        name: "Name",
        company: "Company",
        companyType: "Company Type",
        selectCompanyType: "Select company type",
        commercial: "Commercial",
        government: "Government",
        service: "Service",
        phone: "Phone",
        email: "Email",
        companyName: "Company Name",
        password: "Password",
        registerDownload: "Register & Start",
        loginDownload: "Login & Start",
        processing: "Processing..."
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
        logout: "تسجيل الخروج",
        mainTitle: "تقييم شامل لجاهزية التسويق",
        subtitle: "قيّم القدرات الاستراتيجية لإدارة التسويق لديك",
        description1: "إذا كانت جهودك التسويقية لا تحقق العائد المتوقع على الاستثمار، فقد حان الوقت لتقييم جاهزية وقدرات وظيفة التسويق لديك.",
        description2: "حوّل أداءك التسويقي من خلال إطار التقييم المبني على الأدلة والذي يغطي الاستراتيجية والعمليات والتكنولوجيا وفعالية الفريق.",
        strategicFramework: "إطار استراتيجي",
        expertGuide: "دليل الخبراء",
        provenResults: "نتائج مثبتة",
        assessmentTools: "أدوات التقييم",
        trustedBy: "موثوق من قبل أكثر من 50,000 متخصص في الموارد البشرية في جميع أنحاء العالم",
        assessmentTitle: "احصل على تقييم شركتك",
        assessmentSubtitle: "اكتشف الرؤى الاستراتيجية اليوم",
        downloadNow: "ابدأ التقييم",
        newUser: "مستخدم جديد",
        existingUser: "مستخدم موجود",
        name: "الاسم",
        company: "الشركة",
        companyType: "نوع الشركة",
        selectCompanyType: "اختر نوع الشركة",
        commercial: "تجارية",
        government: "حكومية",
        service: "خدمية",
        phone: "الهاتف",
        email: "البريد الإلكتروني",
        companyName: "اسم الشركة",
        password: "كلمة المرور",
        registerDownload: "سجل وابدأ",
        loginDownload: "سجل الدخول وابدأ",
        processing: "جاري المعالجة..."
    }
};

interface Welcome2Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    locale?: string;
}

export default function Welcome2({ auth, locale = 'en' }: Welcome2Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isBusinessOpen, setIsBusinessOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const [showExistingUserForm, setShowExistingUserForm] = useState(false);
    const [currentLang, setCurrentLang] = useState<'en' | 'ar'>(locale as 'en' | 'ar');

    const t = translations[currentLang];
    const isRTL = currentLang === 'ar';

    const { data: newUserData, setData: setNewUserData, post: postNewUser, processing: processingNewUser } = useForm({
        name: '',
        company: '',
        company_type: '',
        phone: '',
        email: '',
        company_name: '',
    });

    const { data: existingUserData, setData: setExistingUserData, post: postExistingUser, processing: processingExisting } = useForm({
        email: '',
        password: '',
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
        // Handle new user registration and download
        console.log('New user data:', newUserData);
    };

    const handleExistingUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle existing user login and download
        console.log('Existing user data:', existingUserData);
    };

    return (
        <>
            <Head title="9-Step HRBP Capability Framework" />

            <div className={`min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="relative z-50">
                    <nav className="bg-transparent">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <img src="{'/storage/logo.png'}" alt="" />
                                <div className="flex items-center">
                                    <Link href="/" className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-lg">LOGO</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Desktop Navigation */}
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-8">
                                        {/* Courses Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                                                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium flex items-center transition-colors"
                                            >
                                                {t.courses}
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Business Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                                                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium flex items-center transition-colors"
                                            >
                                                {t.business}
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>

                                        <Link
                                            href="/individuals"
                                            className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            {t.individuals}
                                        </Link>

                                        <Link
                                            href="/pricing"
                                            className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            {t.pricing}
                                        </Link>

                                        {/* Resources Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                                                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium flex items-center transition-colors"
                                            >
                                                {t.resources}
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side */}
                                <div className="hidden md:flex items-center space-x-4">
                                    {auth?.user ? (
                                        <div className="flex items-center space-x-4">
                                            <Bell className="h-5 w-5 text-white" />
                                            <div className="flex items-center space-x-2 text-white">
                                                <User className="h-5 w-5" />
                                                <span>{auth.user.name}</span>
                                                <ChevronDown className="h-4 w-4" />
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
                                            <Button
                                                variant="outline"
                                                className="text-white border-white hover:bg-white hover:text-blue-900"
                                            >
                                                {t.getDemo}
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </Button>
                                            <Button className="bg-white text-blue-900 hover:bg-gray-100">
                                                {t.enrollNow}
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
                                    <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                        Courses
                                    </a>
                                    <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                        Business
                                    </a>
                                    <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                        Individuals
                                    </a>
                                    <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                        Pricing
                                    </a>
                                    <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                        Resources
                                    </a>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 h-[calc(100vh-4rem)]">
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
                                        <span className="text-sm font-medium">{t.assessmentTools}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Download Section */}
                            <div className="flex justify-center items-center">
                                <div className="w-full max-w-md space-y-6">
                                    {/* PDF Preview - Made smaller */}
                                    <div className="relative flex justify-center">
                                        <div className="relative">
                                            {/* Document mockups - Smaller size */}
                                            <div className="relative transform rotate-2 hover:rotate-1 transition-transform duration-300">
                                                <div className="bg-white rounded-lg shadow-2xl p-3 w-40 h-52">
                                                    <div className="space-y-2">
                                                        <div className="h-3 bg-blue-500 rounded w-3/4"></div>
                                                        <div className="space-y-1">
                                                            <div className="h-2 bg-gray-300 rounded w-full"></div>
                                                            <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                                                            <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                                                        </div>
                                                        <div className="mt-3 space-y-1">
                                                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                                                            <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                                                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                                                            <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                                                        </div>
                                                        <div className="mt-2 p-2 bg-cyan-50 rounded">
                                                            <div className="h-2 bg-cyan-400 rounded w-2/3"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Second document */}
                                            <div className="absolute -top-2 -right-2 transform -rotate-2">
                                                <div className="bg-white rounded-lg shadow-xl p-2 w-32 h-42">
                                                    <div className="space-y-1">
                                                        <div className="h-2 bg-green-400 rounded w-4/5"></div>
                                                        <div className="h-4 bg-gradient-to-r from-blue-200 to-green-200 rounded"></div>
                                                        <div className="grid grid-cols-2 gap-1 mt-2">
                                                            <div className="h-4 bg-orange-200 rounded"></div>
                                                            <div className="h-4 bg-purple-200 rounded"></div>
                                                        </div>
                                                        <div className="space-y-1 mt-2">
                                                            <div className="h-1 bg-gray-100 rounded w-full"></div>
                                                            <div className="h-1 bg-gray-100 rounded w-5/6"></div>
                                                            <div className="h-1 bg-gray-100 rounded w-4/5"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* FREE badge */}
                                            <div className="absolute -top-1 -right-1 bg-cyan-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                                                FREE
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assessment Section */}
                                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl text-center">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {t.assessmentTitle}
                                        </h3>
                                        <p className="text-cyan-300 text-sm mb-6">
                                            {t.assessmentSubtitle}
                                        </p>

                                        {!showUserOptions && (
                                            <Button
                                                onClick={handleDownloadClick}
                                                className="w-full h-12 text-lg font-semibold bg-orange-500 hover:bg-white hover:text-blue-900 text-white shadow-lg transition-all duration-300"
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
                                                    className="w-full bg-white/10 border border-white/30 text-white hover:bg-white hover:text-blue-900"
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

                                        {/* New User Form */}
                                        {showNewUserForm && (
                                            <form onSubmit={handleNewUserSubmit} className="space-y-4 pt-4 border-t border-white/20 text-left">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <Label htmlFor="name" className="text-white text-sm">{t.name}</Label>
                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            value={newUserData.name}
                                                            onChange={(e) => setNewUserData('name', e.target.value)}
                                                            className="bg-white/90 border-white/30"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="company" className="text-white text-sm">{t.company}</Label>
                                                        <Input
                                                            id="company"
                                                            type="text"
                                                            value={newUserData.company}
                                                            onChange={(e) => setNewUserData('company', e.target.value)}
                                                            className="bg-white/90 border-white/30"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="company_type" className="text-white text-sm">{t.companyType}</Label>
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
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <Label htmlFor="phone" className="text-white text-sm">{t.phone}</Label>
                                                        <Input
                                                            id="phone"
                                                            type="tel"
                                                            value={newUserData.phone}
                                                            onChange={(e) => setNewUserData('phone', e.target.value)}
                                                            className="bg-white/90 border-white/30"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="email" className="text-white text-sm">{t.email}</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={newUserData.email}
                                                            onChange={(e) => setNewUserData('email', e.target.value)}
                                                            className="bg-white/90 border-white/30"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="company_name" className="text-white text-sm">{t.companyName}</Label>
                                                    <Input
                                                        id="company_name"
                                                        type="text"
                                                        value={newUserData.company_name}
                                                        onChange={(e) => setNewUserData('company_name', e.target.value)}
                                                        className="bg-white/90 border-white/30"
                                                        required
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processingNewUser}
                                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                                >
                                                    {processingNewUser ? t.processing : t.registerDownload}
                                                </Button>
                                            </form>
                                        )}

                                        {/* Existing User Form */}
                                        {showExistingUserForm && (
                                            <form onSubmit={handleExistingUserSubmit} className="space-y-4 pt-4 border-t border-white/20 text-left">
                                                <div>
                                                    <Label htmlFor="existing_email" className="text-white text-sm">{t.email}</Label>
                                                    <Input
                                                        id="existing_email"
                                                        type="email"
                                                        value={existingUserData.email}
                                                        onChange={(e) => setExistingUserData('email', e.target.value)}
                                                        className="bg-white/90 border-white/30"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="password" className="text-white text-sm">{t.password}</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        value={existingUserData.password}
                                                        onChange={(e) => setExistingUserData('password', e.target.value)}
                                                        className="bg-white/90 border-white/30"
                                                        required
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processingExisting}
                                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                                >
                                                    {processingExisting ? t.processing : t.loginDownload}
                                                </Button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
