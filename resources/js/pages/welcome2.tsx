import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    TrendingUp
} from 'lucide-react';

interface Welcome2Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function Welcome2({ auth }: Welcome2Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isBusinessOpen, setIsBusinessOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
    });

    const handleDownload = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle download logic here
        console.log('Download requested:', data);
    };

    return (
        <>
            <Head title="9-Step HRBP Capability Framework" />

            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden">
                {/* Header */}
                <header className="relative z-50">
                    <nav className="bg-transparent">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                {/* Logo */}
                                <div className="flex items-center">
                                    <Link href="/" className="flex-shrink-0">
                                        <div className="bg-cyan-400 text-white px-4 py-2 rounded-lg font-bold text-lg">
                                            AIHR
                                            <span className="block text-xs font-normal">ACADEMY TO INNOVATE HR</span>
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
                                                Courses
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Business Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                                                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium flex items-center transition-colors"
                                            >
                                                Business
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>

                                        <Link
                                            href="/individuals"
                                            className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            Individuals
                                        </Link>

                                        <Link
                                            href="/pricing"
                                            className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            Pricing
                                        </Link>

                                        {/* Resources Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                                                className="text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium flex items-center transition-colors"
                                            >
                                                Resources
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side buttons */}
                                <div className="hidden md:flex items-center space-x-4">
                                    {auth?.user ? (
                                        <div className="flex items-center space-x-4">
                                            <Button variant="ghost" size="sm" className="text-white hover:text-cyan-400">
                                                <Bell className="h-4 w-4" />
                                            </Button>
                                            <div className="relative">
                                                <Button
                                                    variant="ghost"
                                                    className="text-white hover:text-cyan-400 flex items-center space-x-2"
                                                >
                                                    <User className="h-4 w-4" />
                                                    <span>{auth.user.name}</span>
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="relative">
                                                <Button
                                                    onClick={() => setIsDemoOpen(!isDemoOpen)}
                                                    variant="outline"
                                                    className="text-white border-white hover:bg-white hover:text-purple-900 flex items-center"
                                                >
                                                    Get a demo
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button className="bg-white text-purple-900 hover:bg-gray-100">
                                                Enroll now
                                            </Button>
                                        </>
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
                            <div className="md:hidden bg-purple-800 border-t border-purple-700">
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
                                <div className="pt-4 pb-3 border-t border-purple-700">
                                    <div className="px-2 space-y-1">
                                        {auth?.user ? (
                                            <>
                                                <div className="text-white px-3 py-2 text-base font-medium">
                                                    {auth.user.name}
                                                </div>
                                                <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                                    Dashboard
                                                </a>
                                                <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                                    Logout
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                                    Get a demo
                                                </a>
                                                <a href="#" className="text-white hover:text-cyan-400 block px-3 py-2 text-base font-medium">
                                                    Enroll now
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left space-y-8">
                                <div className="space-y-6">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                        9-Step HRBP Capability Framework: An HR Leader's Guide to Developing Strategic HRBPs
                                    </h1>

                                    <p className="text-xl text-purple-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                        If your HRBP model isn't delivering results, it's time to assess the capabilities of your HRBP function. Drill down and unleash the full potential of your HRBP function with this 9-step guide.
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                                    <div className="flex items-center space-x-2 text-purple-100">
                                        <Target className="h-5 w-5 text-cyan-400" />
                                        <span className="text-sm">Strategic Framework</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-purple-100">
                                        <Award className="h-5 w-5 text-cyan-400" />
                                        <span className="text-sm">Expert Guide</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-purple-100">
                                        <TrendingUp className="h-5 w-5 text-cyan-400" />
                                        <span className="text-sm">Proven Results</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-purple-100">
                                        <BarChart3 className="h-5 w-5 text-cyan-400" />
                                        <span className="text-sm">Assessment Tools</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Download Form and Preview */}
                            <div className="space-y-8">
                                {/* Preview Images */}
                                <div className="relative">
                                    <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                        {/* Mock document previews */}
                                        <div className="bg-white rounded-lg shadow-2xl p-6 aspect-[3/4]">
                                            <div className="space-y-3">
                                                <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                                <div className="space-y-2 mt-6">
                                                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                                                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                                                </div>
                                                <div className="mt-4 p-3 bg-cyan-50 rounded">
                                                    <div className="h-3 bg-cyan-200 rounded w-2/3"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-2xl p-6 aspect-[3/4] mt-8">
                                            <div className="space-y-3">
                                                <div className="h-4 bg-blue-200 rounded w-4/5"></div>
                                                <div className="h-8 bg-gradient-to-r from-purple-200 to-blue-200 rounded"></div>
                                                <div className="grid grid-cols-2 gap-2 mt-4">
                                                    <div className="h-12 bg-green-100 rounded"></div>
                                                    <div className="h-12 bg-orange-100 rounded"></div>
                                                </div>
                                                <div className="space-y-2 mt-4">
                                                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                                                    <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                                                    <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating badge */}
                                    <div className="absolute -top-4 -right-4 bg-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        FREE
                                    </div>
                                </div>

                                {/* Download Form */}
                                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Get your free download now
                                        </h3>
                                        <Badge className="bg-cyan-400 text-white px-3 py-1">
                                            No credit card required
                                        </Badge>
                                    </div>

                                    <form onSubmit={handleDownload} className="space-y-4">
                                        <div>
                                            <Input
                                                type="text"
                                                placeholder="Mohammed"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="h-12 text-lg bg-white/90 border-white/30 placeholder:text-gray-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Input
                                                type="email"
                                                placeholder="m.alarmani@testcosa.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="h-12 text-lg bg-white/90 border-white/30 placeholder:text-gray-500"
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full h-12 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-5 w-5 mr-2" />
                                                    DOWNLOAD NOW
                                                </>
                                            )}
                                        </Button>
                                    </form>

                                    <p className="text-center text-purple-200 text-sm mt-4">
                                        Join 50,000+ HR professionals who trust AIHR
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
