// resources/js/pages/ToolSubscription.tsx
// Individual tool subscription page

import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Clock,
    Users,
    Crown,
    Check,
    X,
    Star,
    Shield,
    Zap,
    FileText,
    Headphones,
    ArrowLeft
} from 'lucide-react';

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    image: string;
    total_criteria: number;
    estimated_time: number;
}

interface Subscription {
    plan_type: string;
    status: string;
    expires_at: string | null;
    features: Record<string, any>;
}

interface User {
    id: number;
    name: string;
    email: string;
    is_premium: boolean;
    is_admin: boolean;
}

interface PricingPlan {
    price: number;
    currency: string;
    features: Record<string, any>;
}

interface Props {
    tool: Tool;
    currentSubscription: Subscription | null;
    user: User;
    pricing: {
        free: PricingPlan;
        premium: PricingPlan;
    };
}

export default function ToolSubscription({ tool, currentSubscription, user, pricing }: Props) {
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');

    const { data, setData, post, processing, errors } = useForm({
        plan_type: 'premium',
        payment_method: '',
    });

    const handleSubscribe = async (planType: 'free' | 'premium') => {
        if (planType === 'free') {
            // Handle free subscription via API
            const response = await fetch(`/tools/${tool.id}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ plan_type: 'free' }),
            });

            const result = await response.json();
            if (result.success) {
                window.location.href = result.redirect_url;
            }
        } else {
            // Handle premium subscription via Paddle
            const response = await fetch(`/tools/${tool.id}/paddle-checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ plan_type: 'premium' }),
            });

            const result = await response.json();
            if (result.success) {
                // Redirect to Paddle checkout
                window.location.href = result.checkout_url;
            }
        }
    };

    const hasCurrentAccess = currentSubscription?.status === 'active';
    const isPremiumSubscribed = currentSubscription?.plan_type === 'premium';

    const PlanCard = ({
                          planType,
                          plan,
                          isSelected,
                          onClick
                      }: {
        planType: 'free' | 'premium';
        plan: PricingPlan;
        isSelected: boolean;
        onClick: () => void;
    }) => (
        <Card
            className={`cursor-pointer transition-all duration-300 ${
                isSelected
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
            } ${planType === 'premium' ? 'relative overflow-hidden' : ''}`}
            onClick={onClick}
        >
            {planType === 'premium' && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-semibold">
                    RECOMMENDED
                </div>
            )}

            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="capitalize text-xl">{planType}</span>
                    {planType === 'premium' && <Crown className="w-6 h-6 text-yellow-500" />}
                </CardTitle>
                <div className="text-3xl font-bold">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-500">
                        {planType === 'premium' ? '/lifetime' : ''}
                    </span>
                </div>
            </CardHeader>

            <CardContent>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>
                            {plan.features.assessments_limit
                                ? `${plan.features.assessments_limit} assessment${plan.features.assessments_limit > 1 ? 's' : ''}`
                                : 'Unlimited assessments'
                            }
                        </span>
                    </li>
                    <li className="flex items-center">
                        <FileText className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        <span>
                            {plan.features.pdf_reports === 'detailed' ? 'Detailed' : 'Basic'} PDF reports
                        </span>
                    </li>
                    <li className="flex items-center">
                        {plan.features.advanced_analytics ? (
                            <Zap className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                        ) : (
                            <X className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        )}
                        <span className={!plan.features.advanced_analytics ? 'text-gray-400' : ''}>
                            Advanced analytics
                        </span>
                    </li>
                    <li className="flex items-center">
                        <Headphones className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        <span>
                            {plan.features.support === 'priority' ? 'Priority' : 'Community'} support
                        </span>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Subscribe to ${tool.name_en}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    {/* Back Button */}
                    <Link href={route('tools.discover')} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tools
                    </Link>

                    {/* Tool Overview */}
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-6">
                                {tool.image && (
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={tool.image}
                                            alt={tool.name_en}
                                            className="w-16 h-16 object-contain"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {tool.name_en}
                                    </h1>
                                    <p className="text-gray-600 mb-4">
                                        {tool.description_en}
                                    </p>
                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {tool.estimated_time} minutes
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {tool.total_criteria} criteria
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Current Subscription Status */}
                    {hasCurrentAccess && (
                        <Card className="mb-8 border-green-200 bg-green-50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-green-900">
                                            Current Subscription
                                        </h3>
                                        <p className="text-green-700">
                                            You have {currentSubscription?.plan_type} access to this tool
                                            {currentSubscription?.expires_at &&
                                                ` (expires ${new Date(currentSubscription.expires_at).toLocaleDateString()})`
                                            }
                                        </p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800 border-green-200">
                                        <Check className="w-3 h-3 mr-1" />
                                        Active
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Subscription Plans */}
                    {(!hasCurrentAccess || !isPremiumSubscribed) && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Choose Your Plan
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <PlanCard
                                    planType="free"
                                    plan={pricing.free}
                                    isSelected={selectedPlan === 'free'}
                                    onClick={() => {
                                        setSelectedPlan('free');
                                        setData('plan_type', 'free');
                                    }}
                                />
                                <PlanCard
                                    planType="premium"
                                    plan={pricing.premium}
                                    isSelected={selectedPlan === 'premium'}
                                    onClick={() => {
                                        setSelectedPlan('premium');
                                        setData('plan_type', 'premium');
                                    }}
                                />
                            </div>

                            {/* Subscribe Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Subscribe to {tool.name_en} - {selectedPlan === 'premium' ? 'Premium' : 'Free'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubscribe} className="space-y-4">
                                        {selectedPlan === 'premium' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Payment Method
                                                </label>
                                                <select
                                                    value={data.payment_method}
                                                    onChange={(e) => setData('payment_method', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required={selectedPlan === 'premium'}
                                                >
                                                    <option value="">Select payment method</option>
                                                    <option value="credit_card">Credit Card</option>
                                                    <option value="paypal">PayPal</option>
                                                    <option value="bank_transfer">Bank Transfer</option>
                                                </select>
                                                {errors.payment_method && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.payment_method}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4">
                                            <div className="text-sm text-gray-500">
                                                {selectedPlan === 'premium'
                                                    ? 'One-time payment for lifetime access'
                                                    : 'Free access with limited features'
                                                }
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className={`px-8 py-3 ${
                                                    selectedPlan === 'premium'
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                                                        : 'bg-gray-600 hover:bg-gray-700'
                                                }`}
                                            >
                                                {processing ? 'Processing...' : (
                                                    selectedPlan === 'premium'
                                                        ? `Subscribe for $${pricing.premium.price}`
                                                        : 'Get Free Access'
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Already subscribed message */}
                    {hasCurrentAccess && isPremiumSubscribed && (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <Crown className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    You're All Set!
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    You have premium access to {tool.name_en}. Start your assessment now!
                                </p>
                                <Link href={route('assessment.start', tool.id)}>
                                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3">
                                        Start Assessment
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
