import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
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
    Sparkles
} from 'lucide-react';

// Mock data since we can't access the actual props
const mockAuth = { user: null };
const mockTools = [
    {
        id: 1,
        name: "Digital Maturity Assessment",
        name_en: "Digital Maturity Assessment",
        name_ar: "تقييم النضج الرقمي",
        description: "Evaluate your organization's digital transformation readiness",
        description_en: "Evaluate your organization's digital transformation readiness",
        description_ar: "قيم استعداد مؤسستك للتحول الرقمي",
        domains: [
            {
                id: 1,
                name: "Technology Infrastructure",
                name_en: "Technology Infrastructure",
                name_ar: "البنية التحتية التقنية",
                categories: [
                    { id: 1, name: "Cloud Adoption", name_en: "Cloud Adoption", name_ar: "اعتماد السحابة" },
                    { id: 2, name: "Data Management", name_en: "Data Management", name_ar: "إدارة البيانات" }
                ]
            },
            {
                id: 2,
                name: "Digital Culture",
                name_en: "Digital Culture",
                name_ar: "الثقافة الرقمية",
                categories: [
                    { id: 3, name: "Change Management", name_en: "Change Management", name_ar: "إدارة التغيير" }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Cybersecurity Readiness",
        name_en: "Cybersecurity Readiness",
        name_ar: "جاهزية الأمن السيبراني",
        description: "Assess your organization's cybersecurity posture and resilience",
        description_en: "Assess your organization's cybersecurity posture and resilience",
        description_ar: "قيم موقف مؤسستك الأمني ومرونتها السيبرانية",
        domains: [
            {
                id: 3,
                name: "Security Framework",
                name_en: "Security Framework",
                name_ar: "إطار الأمان",
                categories: [
                    { id: 4, name: "Risk Assessment", name_en: "Risk Assessment", name_ar: "تقييم المخاطر" },
                    { id: 5, name: "Incident Response", name_en: "Incident Response", name_ar: "الاستجابة للحوادث" }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Innovation Capability",
        name_en: "Innovation Capability",
        name_ar: "قدرة الابتكار",
        description: "Measure your organization's innovation processes and culture",
        description_en: "Measure your organization's innovation processes and culture",
        description_ar: "قس عمليات الابتكار وثقافة مؤسستك",
        domains: [
            {
                id: 4,
                name: "Innovation Strategy",
                name_en: "Innovation Strategy",
                name_ar: "استراتيجية الابتكار",
                categories: [
                    { id: 6, name: "R&D Investment", name_en: "R&D Investment", name_ar: "استثمار البحث والتطوير" }
                ]
            }
        ]
    }
];

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
    tools?: Tool[];
}

export default function Welcome({ tools = mockTools }: WelcomeProps) {
    const auth = mockAuth; // Using mock data
    const [isVisible, setIsVisible] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
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

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                {/* Enhanced Header */}
                <header className="relative backdrop-blur-lg bg-white/80 shadow-lg border-b border-white/20">
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
                                <a href="#tools" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">
                                    Assessment Tools
                                </a>
                                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">
                                    Features
                                </a>
                                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">
                                    How It Works
                                </a>
                                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">
                                    Reviews
                                </a>
                            </nav>

                            {/* Enhanced Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-700">Welcome, {auth.user.name}</span>
                                        <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                                            Dashboard
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
                                            Login
                                        </Button>
                                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg">
                                            Sign Up
                                        </Button>
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
                            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 px-4 py-2 text-sm font-medium">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Trusted by 10,000+ Organizations Worldwide
                            </Badge>

                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
                                Transform Your
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                                    Organization
                                </span>
                                with AI-Powered Assessments
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
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
                                <a href="#how-it-works">
                                    <Button variant="outline" size="lg" className="px-12 py-4 text-lg border-2 hover:bg-white/80 hover:scale-105 transition-all duration-300 rounded-full backdrop-blur-sm">
                                        <FileText className="w-5 h-5 mr-2" />
                                        Learn More
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-lg border-y border-white/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:shadow-2xl transition-shadow duration-300">
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Assessment Tools Section */}
                <section id="tools" className="py-24 px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge
                                className="mb-6 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-800 border-emerald-200">
                                <Target className="w-4 h-4 mr-2" />
                                Choose Your Assessment Path
                            </Badge>
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                Discover Your
                                <span
                                    className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                    Perfect Assessment
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Select from our curated collection of industry-specific assessment tools,
                                each designed to provide deep insights and actionable recommendations.
                            </p>
                        </div>


                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tools.map((tool, index) => (
                                <Card key={tool.id}
                                      className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-lg hover:scale-105 hover:bg-white/90 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
                                            <Badge variant="outline" className="bg-white/80">
                                                {tool.domains.length} Domains
                                            </Badge>
                                        </div>

                                        <CardTitle
                                            className="text-2xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {tool.name_en || tool.name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 text-base leading-relaxed">
                                            {tool.description_en || tool.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="relative">
                                        <div className="space-y-4 mb-6">
                                            {/* Enhanced Tool Stats */}
                                            <div
                                                className="flex justify-between items-center text-sm bg-gray-50/80 rounded-lg p-3">
                                                <div className="flex items-center">
                                                    <Target className="w-4 h-4 text-blue-500 mr-1" />
                                                    <span className="text-gray-600">{tool.domains.length} Domains</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Award className="w-4 h-4 text-emerald-500 mr-1" />
                                                    <span className="text-gray-600">
                                                        {tool.domains.reduce((acc, domain) => acc + domain.categories.length, 0)} Categories
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Enhanced Domains Preview */}
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-gray-900 text-sm flex items-center">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                                                    Key Assessment Areas:
                                                </h4>
                                                <div className="space-y-2">
                                                    {tool.domains.slice(0, 3).map((domain) => (
                                                        <div key={domain.id}
                                                             className="flex items-center justify-between p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                                                            <span
                                                                className="text-sm font-medium text-gray-700">{domain.name}</span>
                                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                    ))}
                                                    {tool.domains.length > 3 && (
                                                        <div className="text-sm text-gray-500 italic text-center py-1">
                                                            +{tool.domains.length - 3} more assessment areas
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced CTA Button */}
                                        <Button
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 rounded-xl py-6">
                                            <Play className="w-5 h-5 mr-2" />
                                            <Link href={route('assessment.create', tool.id)}>

                                                    Start Assessment

                                            </Link>

                                            <ArrowRight
                                                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Features Section */}
                <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge
                                className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
                                <Star className="w-4 h-4 mr-2" />
                                Platform Capabilities
                            </Badge>
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                Why Organizations
                                <span
                                    className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Choose Our Platform
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Discover the advanced capabilities that make our assessment platform
                                the preferred choice for leading organizations worldwide.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div key={index}
                                     className="group text-center hover:scale-105 transition-all duration-500">
                                    <div
                                        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} mx-auto mb-6 flex items-center justify-center group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-3`}>
                                        <feature.icon className="w-10 h-10 text-white" />
                                        <div
                                            className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge
                            className="mb-6 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200">
                            <Star className="w-4 h-4 mr-2" />
                            Customer Success Stories
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
                            What Our Customers Say
                        </h2>

                        <div className="relative">
                            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
                                <CardContent className="p-12">
                                    <div className="flex justify-center mb-6">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                                        ))}
                                    </div>
                                    <blockquote className="text-2xl font-medium text-gray-900 mb-6">
                                        "{testimonials[currentTestimonial].text}"
                                    </blockquote>
                                    <p className="text-gray-600 font-medium">
                                        {testimonials[currentTestimonial].author}
                                    </p>
                                </CardContent>
                            </Card>

                            <div className="flex justify-center mt-8 space-x-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${
                                            index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced How It Works Section */}
                <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
                                <Target className="w-4 h-4 mr-2" />
                                Simple Process
                            </Badge>
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                                How It Works
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Get started with your transformation journey in three simple steps.
                                Our streamlined process ensures you get value from day one.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {[
                                {
                                    step: "01",
                                    title: "Choose Your Assessment",
                                    description: "Select from our comprehensive library of industry-specific assessment tools tailored to your organization's needs and objectives.",
                                    icon: Target,
                                    color: "from-blue-500 to-cyan-500"
                                },
                                {
                                    step: "02",
                                    title: "Complete Smart Evaluation",
                                    description: "Answer intelligent questions that adapt to your responses, ensuring a personalized and efficient assessment experience.",
                                    icon: CheckCircle,
                                    color: "from-emerald-500 to-green-500"
                                },
                                {
                                    step: "03",
                                    title: "Get Actionable Insights",
                                    description: "Receive detailed analytics, benchmarking data, and strategic recommendations to drive your organizational transformation.",
                                    icon: TrendingUp,
                                    color: "from-purple-500 to-violet-500"
                                }
                            ].map((step, index) => (
                                <div key={index} className="text-center group hover:scale-105 transition-all duration-500">
                                    <div className="relative mb-8">
                                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} mx-auto flex items-center justify-center group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-3`}>
                                            <step.icon className="w-12 h-12 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-lg">
                                            {step.step}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced CTA Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Ready to Transform
                            <span className="block">Your Organization?</span>
                        </h2>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                            Join thousands of leading organizations who trust our platform to drive
                            strategic transformation and unlock their full potential.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="#tools">
                                <Button size="lg" variant="secondary" className="px-12 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">
                                    <Play className="w-5 h-5 mr-2" />
                                    Start Free Assessment
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </a>
                            <Button size="lg" variant="outline" className="px-12 py-4 text-lg border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 rounded-full backdrop-blur-sm">
                                <FileText className="w-5 h-5 mr-2" />
                                Schedule Demo
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Enhanced Footer */}
                <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    AssessmentHub
                                </h3>
                            </div>
                            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                Empowering organizations worldwide with intelligent assessment tools
                                and actionable insights for strategic transformation.
                            </p>

                            <div className="flex justify-center space-x-8 mb-8">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-8 text-center">
                            <p className="text-sm text-gray-500">
                                © 2024 AssessmentHub. All rights reserved. Transforming organizations through intelligent assessment.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
