import { Link } from '@inertiajs/react';
import React from 'react';

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Free Assessment CTA */}
    <Link
        href="/free-assessment"
        className="flex flex-col items-center justify-between bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
        <div className="flex flex-col items-center text-center gap-4">
            <div className="text-5xl">🎁</div>
            <h3 className="text-2xl font-bold">Get Your Free Assessment</h3>
            <p className="text-blue-100 max-w-xs">
                Try a complimentary assessment to see how our tools can help your organisation grow.
            </p>
        </div>
        <span className="mt-6 inline-block bg-white/20 text-white px-4 py-2 rounded-lg font-semibold">
                                Start For Free
                            </span>
    </Link>

    {/* Strategic Assessment Tool (As requested) */}
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
            <Link href="/free-assessment" className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center">
                Start Assessment
            </Link>
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
            <Link href="/free-assessment" className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center">
                Start Quick Check
            </Link>
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
