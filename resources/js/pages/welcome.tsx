import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContactSales from '@/components/contact-sales';
import { useState, useEffect } from 'react';
import { initializeTheme } from '@/hooks/use-appearance';
import ThemeToggle from '@/components/theme-toggle';
import {
    CheckCircle,
    BarChart3,
    FileText,
    Users,
    ArrowRight,
    Star,
    Zap,
    Shield,
    Target,
    TrendingUp,
    Award,
    ChevronRight,
    Play,
    Sparkles,
    Phone,
    MessageSquare,
    Calendar,
    Mail
} from 'lucide-react';

interface Tool {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    description: string;
    description_en?: string;
    description_ar?: string;
    domains: Array<{
        id: number;
        name: string;
        name_en: string;
        name_ar: string;
        categories: Array<{
            id: number;
            name: string;
            name_en: string;
            name_ar: string;
        }>;
    }>;
}

interface WelcomeProps {
    tools: Tool[];
    auth?: {
        user?: {
            name: string;
            email: string;
        } | null;
    };
}

export default function Welcome({ tools, auth }: WelcomeProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isContactSalesOpen, setIsContactSalesOpen] = useState(false);

    // Initialize theme on component mount
    useEffect(() => {
        initializeTheme();
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Get AI-powered insights with real-time dashboards and predictive analytics to guide your strategic decisions.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: CheckCircle,
            title: "Smart Assessment Engine",
            description: "Adaptive questionnaires that adjust based on your responses, providing personalized evaluation paths.",
            color: "from-emerald-500 to-green-500"
        },
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "Bank-grade security with end-to-end encryption, compliance certifications, and data protection.",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: Users,
            title: "Collaborative Platform",
            description: "Real-time collaboration tools with role-based access, team workflows, and stakeholder engagement.",
            color: "from-orange-500 to-red-500"
        }
    ];

    const testimonials = [
        {
            text: "This platform transformed how we approach organizational assessments. The insights are invaluable.",
            author: "Sarah Chen, CTO at TechCorp",
            rating: 5
        },
        {
            text: "Implementation was seamless and the ROI was evident within the first quarter.",
            author: "Michael Rodriguez, Strategy Director",
            rating: 5
        },
        {
            text: "The most comprehensive assessment tool we've used. Highly recommend for any organization.",
            author: "Dr. Emma Thompson, Consultant",
            rating: 5
        }
    ];

    const stats = [
        { number: "10,000+", label: "Organizations Assessed", icon: Target },
        { number: "99.9%", label: "Uptime Reliability", icon: Shield },
        { number: "24/7", label: "Expert Support", icon: Users },
        { number: "150+", label: "Countries Served", icon: TrendingUp }
    ];

    return (
        <>
            <Head title="Assessment Center - Transform Your Organization" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                {/* Enhanced Header */}
                <header className="relative backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 shadow-lg border-b border-white/20 dark:border-gray-700/20 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo */}
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            AssessmentHub
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Navigation */}
                            <nav className="hidden md:flex space-x-8">
                                <a href="#tools" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium">
                                    Assessment Tools
                                </a>
                                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium">
                                    Features
                                </a>
                                <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium">
                                    How It Works
                                </a>
                                <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium">
                                    Reviews
                                </a>
                                <button
                                    onClick={() => setIsContactSalesOpen(true)}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium"
                                >
                                    Contact Sales
                                </button>
                            </nav>

                            {/* Enhanced Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                {/* Theme Toggle */}
                                <ThemeToggle />

                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {auth.user.name}</span>
                                        <Link href={route('dashboard')}>
                                            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link href={route('login')}>
                                            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Enhanced Hero Section */}
                <section className="relative py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700 px-4 py-2 text-sm font-medium">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Trusted by 10,000+ Organizations Worldwide
                            </Badge>

                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                Transform Your
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                                    Organization
                                </span>
                                with AI-Powered Assessments
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                                Unlock your organization's full potential with our comprehensive assessment platform.
                                Get actionable insights, identify growth opportunities, and drive strategic transformation.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <a href="#tools">
                                    <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 rounded-full">
                                        <Play className="w-5 h-5 mr-2" />
                                        Start Your Assessment
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </a>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setIsContactSalesOpen(true)}
                                    className="px-12 py-4 text-lg border-2 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-105 transition-all duration-300 rounded-full backdrop-blur-sm"
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Talk to Sales
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Options Bar */}
                <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border-y border-white/20 dark:border-gray-700/20 transition-colors duration-300">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <button
                                onClick={() => setIsContactSalesOpen(true)}
                                className="flex items-center justify-center space-x-3 p-4 bg-white/80 dark:bg-gray-700/80 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <Phone className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-gray-900 dark:text-white">Contact Sales</span>
                            </button>

                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-3 p-4 bg-white/80 dark:bg-gray-700/80 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <MessageSquare className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-gray-900 dark:text-white">WhatsApp</span>
                            </a>

                            <a
                                href="mailto:sales@assessmenthub.com"
                                className="flex items-center justify-center space-x-3 p-4 bg-white/80 dark:bg-gray-700/80 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <Mail className="w-5 h-5 text-purple-600" />
                                <span className="font-medium text-gray-900 dark:text-white">Email Us</span>
                            </a>

                            <button
                                onClick={() => setIsContactSalesOpen(true)}
                                className="flex items-center justify-center space-x-3 p-4 bg-white/80 dark:bg-gray-700/80 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <Calendar className="w-5 h-5 text-orange-600" />
                                <span className="font-medium text-gray-900 dark:text-white">Book Demo</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:shadow-2xl transition-shadow duration-300">
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                                    <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Rest of the sections remain the same as in the original Welcome component */}
                {/* Enhanced Assessment Tools Section */}
                <section id="tools" className="py-24 px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900 dark:to-blue-900 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700">
                                <Target className="w-4 h-4 mr-2" />
                                Choose Your Assessment Path
                            </Badge>
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                Discover Your
                                <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                    Perfect Assessment
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                                Select from our curated collection of industry-specific assessment tools,
                                each designed to provide deep insights and actionable recommendations.
                            </p>

                            {/* Enterprise CTA */}
                            <div className="max-w-2xl mx-auto mb-12">
                                <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="text-left">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                    Need Enterprise Solutions?
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                    Get custom pricing, dedicated support, and advanced features
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() => setIsContactSalesOpen(true)}
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            >
                                                <Phone className="w-4 h-4 mr-2" />
                                                Contact Sales
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tools.map((tool, index) => (
                                <Card key={tool.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg hover:scale-105 hover:bg-white/90 dark:hover:bg-gray-800/90 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <CardHeader className="relative">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                                                index % 3 === 0 ? 'from-blue-500 to-cyan-500' :
                                                    index % 3 === 1 ? 'from-emerald-500 to-green-500' :
                                                        'from-purple-500 to-violet-500'
                                            } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                {index % 3 === 0 ? <BarChart3 className="w-6 h-6 text-white" /> :
                                                    index % 3 === 1 ? <Shield className="w-6 h-6 text-white" /> :
                                                        <Zap className="w-6 h-6 text-white" />}
                                            </div>
                                            <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/80">
                                                {tool.domains.length} Domains
                                            </Badge>
                                        </div>

                                        <CardTitle className="text-2xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {tool.name_en || tool.name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                            {tool.description_en || tool.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="relative">
                                        <div className="space-y-4 mb-6">
                                            {/* Enhanced Tool Stats */}
                                            <div className="flex justify-between items-center text-sm bg-gray-50/80 dark:bg-gray-700/80 rounded-lg p-3">
                                                <div className="flex items-center">
                                                    <Target className="w-4 h-4 text-blue-500 mr-1" />
                                                    <span className="text-gray-600 dark:text-gray-300">{tool.domains.length} Domains</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Award className="w-4 h-4 text-emerald-500 mr-1" />
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {tool.domains.reduce((acc, domain) => acc + domain.categories.length, 0)} Categories
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Enhanced Domains Preview */}
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                                                    Key Assessment Areas:
                                                </h4>
                                                <div className="space-y-2">
                                                    {tool.domains.slice(0, 3).map((domain) => (
                                                        <div key={domain.id} className="flex items-center justify-between p-2 bg-white/60 dark:bg-gray-700/60 rounded-lg hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{domain.name_en || domain.name}</span>
                                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                    ))}
                                                    {tool.domains.length > 3 && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 italic text-center py-1">
                                                            +{tool.domains.length - 3} more assessment areas
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced CTA Buttons */}
                                        <div className="space-y-3">
                                            <Link href={route('assessment.create', tool.id)}>
                                                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 rounded-xl py-6">
                                                    <Play className="w-5 h-5 mr-2" />
                                                    Start Assessment
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>

                                            <Button
                                                variant="outline"
                                                onClick={() => setIsContactSalesOpen(true)}
                                                className="w-full border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                                            >
                                                <Phone className="w-4 h-4 mr-2" />
                                                Contact Sales
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Rest of your existing sections... */}
                {/* Features, Testimonials, How It Works, CTA, Footer sections remain the same */}

                {/* Contact Sales Modal */}
                <ContactSales
                    isOpen={isContactSalesOpen}
                    onOpenChange={setIsContactSalesOpen}
                />
            </div>
        </>
    );
}
