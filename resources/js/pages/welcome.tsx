import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckCircle, BarChart3, FileText, Users } from 'lucide-react';

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
}

export default function Welcome({ tools }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Assessment Center - Home" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link href={route('home')}>
                                        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">AssessmentHub</h1>
                                    </Link>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="hidden md:flex space-x-8">
                                <a href="#tools" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Assessment Tools
                                </a>
                                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Features
                                </a>
                                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    How It Works
                                </a>
                            </nav>

                            {/* Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-700">Welcome, {auth.user.name}</span>
                                        <Link href={route('dashboard')}>
                                            <Button variant="outline" size="sm">Dashboard</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Link href={route('login')}>
                                            <Button variant="ghost" size="sm">Login</Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button size="sm">Sign Up</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Professional
                            <span className="text-blue-600"> Assessment </span>
                            Tools
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                            Evaluate your organization's capabilities with our comprehensive assessment framework.
                            Get detailed insights, identify improvement areas, and track your progress over time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#tools">
                                <Button size="lg" className="px-8 py-3 text-lg">
                                    Start Assessment
                                </Button>
                            </a>
                            <a href="#how-it-works">
                                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                    Learn More
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Assessment Tools Section */}
                <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Choose Your Assessment Tool
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Select from our comprehensive collection of assessment tools designed for different industries and use cases.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tools.map((tool) => (
                                <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-gray-900">
                                            {tool.name_en || tool.name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">
                                            {tool.description_en || tool.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Tool Stats */}
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>{tool.domains.length} Domains</span>
                                                <span>
                                                    {tool.domains.reduce((acc, domain) => acc + domain.categories.length, 0)} Categories
                                                </span>
                                            </div>

                                            {/* Domains Preview */}
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-gray-900 text-sm">Assessment Areas:</h4>
                                                <div className="space-y-1">
                                                    {tool.domains.slice(0, 3).map((domain) => (
                                                        <div key={domain.id} className="flex items-center text-sm text-gray-600">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                            {domain.name}
                                                        </div>
                                                    ))}
                                                    {tool.domains.length > 3 && (
                                                        <div className="text-sm text-gray-500">
                                                            +{tool.domains.length - 3} more domains
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <Link href={route('assessment.create', tool.id)}>
                                                <Button className="w-full mt-4">
                                                    Start Assessment
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Why Choose Our Platform?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Our assessment platform provides comprehensive evaluation tools with detailed analytics and actionable insights.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BarChart3 className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
                                <p className="text-gray-600">
                                    Get comprehensive insights with percentage scores, domain breakdowns, and category analysis.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
                                <p className="text-gray-600">
                                    Simple Yes/No/Not Applicable format makes assessments quick and straightforward to complete.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Reports</h3>
                                <p className="text-gray-600">
                                    Receive detailed reports with recommendations and improvement suggestions.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                                <p className="text-gray-600">
                                    Share assessments with team members and collaborate on improvement initiatives.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                How It Works
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Get started with your assessment in just a few simple steps.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Assessment</h3>
                                <p className="text-gray-600">
                                    Select the assessment tool that best fits your needs and provide your contact information.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Questions</h3>
                                <p className="text-gray-600">
                                    Answer assessment criteria with Yes, No, or Not Applicable responses across all domains.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Results</h3>
                                <p className="text-gray-600">
                                    Receive detailed results with scores, percentages, and recommendations for improvement.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Start Your Assessment?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of organizations who trust our assessment platform to evaluate and improve their capabilities.
                        </p>
                        <a href="#tools">
                            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                                Get Started Now
                            </Button>
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">AssessmentHub</h3>
                        <p className="text-gray-400 mb-6">
                            Professional assessment tools for organizational excellence.
                        </p>
                        <div className="border-t border-gray-700 pt-6">
                            <p className="text-sm text-gray-500">
                                © 2024 AssessmentHub. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
