// resources/js/pages/ToolDiscovery.tsx
// New page for free users to browse tools

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Clock,
    Users,
    Crown,
    Lock,
    CheckCircle,
    Star,
    ArrowRight,
    Eye,
    ShoppingCart
} from 'lucide-react';

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    image: string;
    total_domains: number;
    total_criteria: number;
    estimated_time: number;
    assessments_count: number;
    has_access: boolean;
    subscription_type: string;
    pricing: {
        free: { price: number; assessments_limit: number };
        premium: { price: number; assessments_limit: null };
    };
}

interface User {
    current_assessments: number;
    is_premium: boolean;
    is_admin: boolean;
    subscription_status: string;
    tool_subscriptions: Record<number, string>;
}

interface Props {
    tools: Tool[];
    user: User;
    locale: string;
}

export default function ToolDiscovery({ tools, user, locale }: Props) {
    const isRTL = locale === 'ar';

    const getAccessBadge = (tool: Tool) => {
        if (tool.has_access) {
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Subscribed
                </Badge>
            );
        }
        return (
            <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                <Lock className="w-3 h-3 mr-1" />
                Not Subscribed
            </Badge>
        );
    };

    const getActionButton = (tool: Tool) => {
        if (tool.has_access) {
            return (
                <Link href={route('assessment.start', tool.id)}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Start Assessment
                    </Button>
                </Link>
            );
        }

        return (
            <div className="space-y-2">
                <Link href={route('tools.subscribe', tool.id)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Subscribe - ${tool.pricing.premium.price}
                    </Button>
                </Link>
                <Link href={route('tools.show', tool.id)}>
                    <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                    </Button>
                </Link>
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title="Discover Assessment Tools" />

            <div className={`py-12 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Assessment Tools Marketplace
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl">
                            Explore our comprehensive assessment tools. Subscribe to individual tools
                            or upgrade to premium for unlimited access to all tools.
                        </p>
                    </div>

                    {/* User Status Card */}
                    {!user.is_premium && (
                        <Card className="mb-8 border-l-4 border-l-blue-500 bg-blue-50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-900">
                                            Get Unlimited Access
                                        </h3>
                                        <p className="text-blue-700">
                                            Subscribe to individual tools for ${tools[0]?.pricing.premium.price || 49.99} each,
                                            or upgrade to premium for unlimited access to all tools.
                                        </p>
                                    </div>
                                    <Link href="/subscription">
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            <Crown className="w-4 h-4 mr-2" />
                                            Upgrade to Premium
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => (
                            <Card
                                key={tool.id}
                                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <CardTitle className="text-xl line-clamp-2">
                                            {isRTL ? tool.name_ar : tool.name_en}
                                        </CardTitle>
                                        {getAccessBadge(tool)}
                                    </div>

                                    {tool.image && (
                                        <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                            <img
                                                src={tool.image}
                                                alt={isRTL ? tool.name_ar : tool.name_en}
                                                className="w-16 h-16 object-contain"
                                            />
                                        </div>
                                    )}
                                </CardHeader>

                                <CardContent>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {isRTL ? tool.description_ar : tool.description_en}
                                    </p>

                                    {/* Tool Metrics */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {tool.estimated_time} min
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="w-4 h-4 mr-1" />
                                                {tool.assessments_count} taken
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {tool.total_domains} domains • {tool.total_criteria} criteria
                                        </div>
                                    </div>

                                    {/* Pricing Info */}
                                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Free:</span>
                                            <span className="font-medium">1 assessment</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Premium:</span>
                                            <span className="font-medium text-blue-600">
                                                ${tool.pricing.premium.price} - Unlimited
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    {getActionButton(tool)}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <Card className="mt-12 border-0 shadow-2xl bg-gradient-to-r from-purple-500 via-pink-600 to-orange-500 text-white">
                        <CardContent className="p-8 text-center">
                            <Crown className="w-16 h-16 mx-auto text-yellow-200 mb-4" />
                            <h3 className="text-3xl font-bold mb-2">Ready for Full Access?</h3>
                            <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
                                Upgrade to premium and get unlimited access to all assessment tools,
                                advanced analytics, detailed reports, and priority support.
                            </p>
                            <Link href="/subscription">
                                <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
                                    <Crown className="w-5 h-5 mr-2" />
                                    Upgrade to Premium
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
