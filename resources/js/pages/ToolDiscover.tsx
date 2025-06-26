// Create this file: resources/js/Pages/ToolsDiscover.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Tool {
    id: number;
    name: string;
    description: string;
    available: boolean;
    requires?: string;
}

interface ToolsDiscoverProps {
    user?: {
        name: string;
        email: string;
        id: number;
    };
    tools?: Tool[];
    message?: string;
}

export default function ToolsDiscover({ user, tools = [], message }: ToolsDiscoverProps) {
    return (
        <>
            <Head title="Assessment Tools - AFAQ" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="/storage/logo.svg"
                                    alt="AFAQ Logo"
                                    className="h-10 w-auto"
                                />
                                <div>
                                    <h1 className="text-2xl font-bold text-blue-900">AFAQ Assessment Tools</h1>
                                    {user && (
                                        <p className="text-gray-600">Welcome, {user.name}!</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/dashboard"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                {user && (
                                    <Link
                                        href="/logout"
                                        method="post"
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Logout
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Success Message */}
                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p>{message}</p>
                            </div>
                        </div>
                    )}

                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Choose Your Assessment Tool
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Select from our comprehensive suite of organizational assessment tools
                            to evaluate and improve your business performance.
                        </p>
                    </div>

                    {/* Assessment Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Strategic Assessment Tool */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                                <div className="text-white text-4xl mb-3">🎯</div>
                                <h3 className="text-xl font-bold text-white">Strategic Assessment</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">
                                    Comprehensive organizational evaluation covering all critical business areas
                                    including leadership, operations, and performance.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        50+ Assessment Criteria
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Detailed PDF Report
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        30-45 minutes
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                    Start Assessment
                                </button>
                            </div>
                        </div>

                        {/* Quick Assessment Tool */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                                <div className="text-white text-4xl mb-3">⚡</div>
                                <h3 className="text-xl font-bold text-white">Quick Assessment</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">
                                    Fast organizational health check focusing on key performance indicators
                                    and immediate improvement opportunities.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        20+ Key Metrics
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Summary Report
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        10-15 minutes
                                    </div>
                                </div>
                                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                                    Start Quick Check
                                </button>
                            </div>
                        </div>

                        {/* Advanced Assessment Tool */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow opacity-75">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                                <div className="text-white text-4xl mb-3">🚀</div>
                                <h3 className="text-xl font-bold text-white">Advanced Assessment</h3>
                                <span className="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full mt-2">
                                    Premium Required
                                </span>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">
                                    In-depth analysis with advanced analytics, benchmarking,
                                    and detailed improvement roadmaps.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        100+ Detailed Criteria
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        Premium Analytics
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        60-90 minutes
                                    </div>
                                </div>
                                <Link
                                    href="/subscription"
                                    className="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-center"
                                >
                                    Upgrade to Premium
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-16 bg-blue-50 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            Why Choose AFAQ Assessment Tools?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-blue-600 text-3xl mb-3">📊</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Evidence-Based</h4>
                                <p className="text-gray-600 text-sm">
                                    Built on proven frameworks and industry best practices
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-blue-600 text-3xl mb-3">🎯</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Actionable Insights</h4>
                                <p className="text-gray-600 text-sm">
                                    Get specific recommendations for immediate improvements
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-blue-600 text-3xl mb-3">🔒</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Secure & Confidential</h4>
                                <p className="text-gray-600 text-sm">
                                    Your data is encrypted and completely confidential
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
