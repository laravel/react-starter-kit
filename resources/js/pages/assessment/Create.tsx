import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import InputError from '@/components/input-error';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Users,
    Target,
    BarChart3,
    Shield,
    Play,
    Star,
    Zap,
    Award,
    TrendingUp,
    Calendar,
    FileText,
    Globe
} from 'lucide-react';
import { useState } from 'react';

interface Tool {
    id: number;
    name: string;
    description: string;
    domains: Array<{
        id: number;
        name: string;
        categories: Array<{
            id: number;
            name: string;
        }>;
    }>;
}

interface CreateProps {
    tool: Tool;
    prefillData?: {
        name: string;
        email: string;
    } | null;
}

export default function Create({ tool, prefillData }: CreateProps) {
    const { auth } = usePage<SharedData>().props;
    const [isHovered, setIsHovered] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id.toString(),
        name: prefillData?.name || '',
        email: prefillData?.email || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Use Inertia's post method
        post(route('guest.assessment.start'), {
            onSuccess: () => {
                // Will be redirected automatically
            },
            onError: (errors) => {
                console.error('Error starting assessment:', errors);
            },
        });
    };

    const totalCategories = tool.domains.reduce((acc, domain) => acc + domain.categories.length, 0);
    const totalCriteria = tool.domains.reduce((acc, domain) =>
        acc + domain.categories.reduce((catAcc, category) => catAcc + category.criteria?.length || 0, 0), 0);
    const estimatedTime = Math.ceil(totalCriteria * 1.5); // 1.5 minutes per criterion

    const features = [
        { icon: Shield, text: "Secure & Confidential", color: "text-green-600" },
        { icon: Clock, text: "Save Progress Anytime", color: "text-blue-600" },
        { icon: TrendingUp, text: "Instant Results", color: "text-purple-600" },
        { icon: Award, text: "Professional Reports", color: "text-orange-600" }
    ];

    return (
        <>
            <Head title={`Start ${tool.name} Assessment`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Header */}
                <header className="relative bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <a
                                    href={route('home')}
                                    className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Back to Assessment Tools
                                </a>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user && (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-700">Welcome, {auth.user.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="relative py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                                <Star className="w-4 h-4 mr-2" />
                                Professional Assessment Tool
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Ready to Start Your
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Assessment</span>?
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Take the first step towards understanding your organization's capabilities with our comprehensive {tool.name} assessment.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Assessment Form - Takes up 2 columns */}
                            <div className="lg:col-span-2">
                                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                                    <CardHeader className="text-center pb-6">
                                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                                            <Play className="w-8 h-8 text-white" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold">Start Your Assessment</CardTitle>
                                        <CardDescription className="text-lg">
                                            Please provide your details to begin the <span className="font-semibold text-blue-600">{tool.name}</span> assessment.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-8">
                                        <div className="space-y-6">
                                            {/* Name Field */}
                                            <div className="space-y-3">
                                                <Label htmlFor="name" className="text-base font-medium flex items-center">
                                                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                                                    Full Name *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Enter your full name"
                                                    disabled={!!auth?.user}
                                                    className={`h-12 text-lg border-2 transition-all duration-200 ${
                                                        auth?.user
                                                            ? 'bg-green-50 border-green-200'
                                                            : 'hover:border-blue-300 focus:border-blue-500'
                                                    }`}
                                                />
                                                <InputError message={errors.name} />
                                                {auth?.user && (
                                                    <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Name is pre-filled from your account
                                                    </div>
                                                )}
                                            </div>

                                            {/* Email Field */}
                                            <div className="space-y-3">
                                                <Label htmlFor="email" className="text-base font-medium flex items-center">
                                                    <Globe className="w-4 h-4 mr-2 text-blue-600" />
                                                    Email Address *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="Enter your email address"
                                                    disabled={!!auth?.user}
                                                    className={`h-12 text-lg border-2 transition-all duration-200 ${
                                                        auth?.user
                                                            ? 'bg-green-50 border-green-200'
                                                            : 'hover:border-blue-300 focus:border-blue-500'
                                                    }`}
                                                />
                                                <InputError message={errors.email} />
                                                {auth?.user && (
                                                    <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Email is pre-filled from your account
                                                    </div>
                                                )}
                                            </div>

                                            {/* Features Grid */}
                                            <div className="grid grid-cols-2 gap-4 py-4">
                                                {features.map((feature, index) => (
                                                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                                                        <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                onClick={handleSubmit}
                                                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
                                                size="lg"
                                                disabled={processing || !data.name || !data.email}
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                        Starting Assessment...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap className={`w-5 h-5 mr-2 transition-transform duration-200 ${isHovered ? 'rotate-12' : ''}`} />
                                                        Start Assessment
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Tool Information Sidebar */}
                            <div className="space-y-6">
                                {/* Quick Stats */}
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold">Assessment Overview</h3>
                                            <BarChart3 className="w-6 h-6 opacity-80" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">{tool.domains.length}</div>
                                                <div className="text-sm opacity-80">Domains</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">{totalCategories}</div>
                                                <div className="text-sm opacity-80">Categories</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Tool Details */}
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Target className="w-6 h-6 text-blue-600" />
                                            <span>{tool.name}</span>
                                        </CardTitle>
                                        <CardDescription className="text-base">{tool.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                                                    <span className="font-medium">Estimated Time</span>
                                                </div>
                                                <Badge variant="secondary" className="text-blue-600">
                                                    {estimatedTime} min
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <FileText className="w-5 h-5 text-green-600 mr-3" />
                                                    <span className="font-medium">Question Format</span>
                                                </div>
                                                <Badge variant="secondary" className="text-green-600">
                                                    Yes/No/NA
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <Award className="w-5 h-5 text-purple-600 mr-3" />
                                                    <span className="font-medium">Results</span>
                                                </div>
                                                <Badge variant="secondary" className="text-purple-600">
                                                    Immediate
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Assessment Domains */}
                                <Card className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle>Assessment Areas</CardTitle>
                                        <CardDescription>
                                            Key domains covered in this assessment
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {tool.domains.map((domain, index) => (
                                                <div key={domain.id} className="group p-4 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 transition-all duration-200 rounded-r-lg">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                                                {index + 1}. {domain.name}
                                                            </h4>
                                                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                                                <Calendar className="w-3 h-3 mr-1" />
                                                                {domain.categories.length} categories
                                                            </div>
                                                        </div>
                                                        <div className="text-2xl font-bold text-blue-600 opacity-30 group-hover:opacity-60 transition-opacity">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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
