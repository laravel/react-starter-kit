import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
    Target,
    CheckCircle,
    X,
    Lock,
    ArrowLeft,
    Save,
    Send,
    AlertTriangle,
    Shield,
    User,
    LogOut,
    ChevronDown,
    Info
} from 'lucide-react';

interface Assessment {
    id: number;
    name: string;
    email: string;
    organization?: string;
    status: string;
}

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
}

interface Domain {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    order: number;
    categories: Category[];
}

interface Category {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    order: number;
    criteria: Criterion[];
}

interface Criterion {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    order: number;
    requires_attachment: boolean;
}

interface AssessmentData {
    tool: Tool;
    domains: Domain[];
}

interface User {
    id: number;
    name: string;
    email: string;
    details?: {
        company_name?: string;
    };
}

interface FreeUserEditProps {
    assessment: Assessment;
    assessmentData: AssessmentData;
    existingResponses: Record<number, number>;
    existingNotes: Record<number, string>;
    user: User;
    locale: string;
}

export default function FreeUserEdit({
                                         assessment,
                                         assessmentData,
                                         existingResponses,
                                         existingNotes,
                                         user,
                                         locale
                                     }: FreeUserEditProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const isArabic = locale === 'ar';

    const { data, setData, put, processing, errors } = useForm({
        name: assessment.name,
        email: assessment.email,
        organization: assessment.organization || '',
        responses: existingResponses,
        notes: existingNotes,
        action: 'save', // 'save' or 'submit'
    });

    const getName = (item: { name_en: string; name_ar: string }): string => {
        return isArabic ? item.name_ar : item.name_en;
    };

    const getDescription = (item: { description_en?: string; description_ar?: string }): string => {
        const desc = isArabic ? item.description_ar : item.description_en;
        return desc || '';
    };

    const totalCriteria = assessmentData.domains.reduce(
        (total, domain) => total + domain.categories.reduce(
            (domainTotal, category) => domainTotal + category.criteria.length, 0
        ), 0
    );

    const handleResponseChange = (criterionId: number, value: number) => {
        setData('responses', {
            ...data.responses,
            [criterionId]: value
        });
    };

    const handleNotesChange = (criterionId: number, value: string) => {
        setData('notes', {
            ...data.notes,
            [criterionId]: value
        });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Update local state for UI feedback
        setData('action', 'save');
        // Explicitly pass updated action to ensure it's sent with the request
        put(route('free-user.update', assessment.id), {
            ...data,
            action: 'save',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Update local state for UI feedback
        setData('action', 'submit');
        // Explicitly pass updated action to ensure it's sent with the request
        put(route('free-user.update', assessment.id), {
            ...data,
            action: 'submit',
        });
    };

    const getCompletionPercentage = (): number => {
        const completedResponses = Object.keys(data.responses).length;
        return totalCriteria > 0 ? (completedResponses / totalCriteria) * 100 : 0;
    };

    const isComplete = (): boolean => {
        return Object.keys(data.responses).length === totalCriteria;
    };

    return (
        <>
            <Head title={`Edit Assessment - ${getName(assessmentData.tool)}`} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo and Back */}
                            <div className="flex items-center space-x-4">
                                <Link href={route('free-user.index')}>
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Assessments
                                    </Button>
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Edit Assessment</h1>
                                        <div className="flex items-center space-x-2">
                                            <Badge className="bg-blue-100 text-blue-800">
                                                <Shield className="w-3 h-3 mr-1" />
                                                Free Plan
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress and User Menu */}
                            <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-600">
                                    {Math.round(getCompletionPercentage())}% Complete
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-medium">{user.name}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <Link href="/subscription" className="flex items-center px-4 py-2 text-sm text-purple-600 hover:bg-purple-50">
                                                <Target className="w-4 h-4 mr-3" />
                                                Upgrade Plan
                                            </Link>
                                            <Link href="/logout" method="post" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Sign Out
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Progress Bar */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">Assessment Progress</span>
                            <span className="text-sm text-gray-600">{Object.keys(data.responses).length} of {totalCriteria} questions</span>
                        </div>
                        <Progress value={getCompletionPercentage()} className="h-2" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Free Plan Notice */}
                        <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Info className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <h3 className="font-semibold text-blue-900">Editing Free Plan Assessment</h3>
                                            <p className="text-sm text-blue-700">
                                                You can edit your assessment until you submit it. Once submitted, you'll get basic results.
                                            </p>
                                        </div>
                                    </div>
                                    <Link href="/subscription">
                                        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                            <Target className="w-4 h-4 mr-2" />
                                            Upgrade
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        <form className="space-y-6">
                            {/* Assessment Info */}
                            <Card className="border-0 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        Assessment Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="organization">Organization (Optional)</Label>
                                        <Input
                                            id="organization"
                                            value={data.organization}
                                            onChange={(e) => setData('organization', e.target.value)}
                                            placeholder="Enter your organization name"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Assessment Questions */}
                            {assessmentData.domains.map((domain, domainIndex) => (
                                <Card key={domain.id} className="border-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="w-5 h-5 text-purple-600" />
                                            {getName(domain)} (Domain {domainIndex + 1})
                                        </CardTitle>
                                        {getDescription(domain) && (
                                            <CardDescription>{getDescription(domain)}</CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {domain.categories.map((category) => (
                                            <div key={category.id} className="space-y-4">
                                                <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                                    {getName(category)}
                                                </h4>
                                                {getDescription(category) && (
                                                    <p className="text-sm text-gray-600 mb-4">{getDescription(category)}</p>
                                                )}

                                                {category.criteria.map((criterion) => (
                                                    <Card key={criterion.id} className="bg-gray-50 border border-gray-200">
                                                        <CardContent className="p-4">
                                                            <div className="space-y-3">
                                                                <h5 className="font-medium text-gray-900">
                                                                    {getName(criterion)}
                                                                </h5>
                                                                {getDescription(criterion) && (
                                                                    <p className="text-sm text-gray-600">{getDescription(criterion)}</p>
                                                                )}

                                                                {/* Response Options */}
                                                                <div className="flex gap-3">
                                                                    <Button
                                                                        type="button"
                                                                        variant={data.responses[criterion.id] === 100 ? "default" : "outline"}
                                                                        size="sm"
                                                                        onClick={() => handleResponseChange(criterion.id, 100)}
                                                                        className={data.responses[criterion.id] === 100 ? "bg-green-600 hover:bg-green-700" : ""}
                                                                    >
                                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                                        Yes
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        variant={data.responses[criterion.id] === 0 ? "default" : "outline"}
                                                                        size="sm"
                                                                        onClick={() => handleResponseChange(criterion.id, 0)}
                                                                        className={data.responses[criterion.id] === 0 ? "bg-red-600 hover:bg-red-700" : ""}
                                                                    >
                                                                        <X className="w-4 h-4 mr-1" />
                                                                        No
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        variant={data.responses[criterion.id] === 50 ? "default" : "outline"}
                                                                        size="sm"
                                                                        onClick={() => handleResponseChange(criterion.id, 50)}
                                                                        className={data.responses[criterion.id] === 50 ? "bg-gray-600 hover:bg-gray-700" : ""}
                                                                    >
                                                                        <Lock className="w-4 h-4 mr-1" />
                                                                        N/A
                                                                    </Button>
                                                                </div>

                                                                {/* Notes */}
                                                                <div>
                                                                    <Label htmlFor={`notes-${criterion.id}`} className="text-sm">
                                                                        Notes (Optional)
                                                                    </Label>
                                                                    <Textarea
                                                                        id={`notes-${criterion.id}`}
                                                                        value={data.notes[criterion.id] || ''}
                                                                        onChange={(e) => handleNotesChange(criterion.id, e.target.value)}
                                                                        placeholder="Add any additional notes or comments..."
                                                                        rows={2}
                                                                        className="mt-1"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Action Buttons */}
                            <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-50 to-gray-100">
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900">Save Your Progress</h3>
                                        <p className="text-gray-600">
                                            You've completed {Object.keys(data.responses).length} of {totalCriteria} questions.
                                        </p>

                                        <div className="flex justify-center gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="lg"
                                                onClick={handleSave}
                                                disabled={processing}
                                                className="px-8"
                                            >
                                                {processing && data.action === 'save' ? (
                                                    <>
                                                        <div className="w-4 h-4 mr-2 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4 mr-2" />
                                                        Save Progress
                                                    </>
                                                )}
                                            </Button>

                                            <Button
                                                type="button"
                                                size="lg"
                                                onClick={handleSubmit}
                                                disabled={!isComplete() || processing}
                                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8"
                                            >
                                                {processing && data.action === 'submit' ? (
                                                    <>
                                                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Submit Assessment
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        {!isComplete() && (
                                            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                                <div className="flex items-center justify-center">
                                                    <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
                                                    <span className="text-sm text-amber-800">
                                                        {totalCriteria - Object.keys(data.responses).length} questions remaining to submit
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Free Plan Notice */}
                                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="text-center space-y-2">
                                                <h4 className="font-semibold text-blue-900">What happens after submission?</h4>
                                                <div className="text-sm text-blue-700 space-y-1">
                                                    <div className="flex items-center justify-center">
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        Get your overall assessment score
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        View response breakdown by domain
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        Download basic PDF report
                                                    </div>
                                                    <div className="flex items-center justify-center text-gray-500">
                                                        <Lock className="w-3 h-3 mr-1" />
                                                        Detailed analytics (Premium only)
                                                    </div>
                                                </div>
                                                <Link href="/subscription">
                                                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-100">
                                                        <Target className="w-3 h-3 mr-1" />
                                                        Upgrade for Full Analysis
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Error Display */}
                            {Object.keys(errors).length > 0 && (
                                <Card className="border-red-200 bg-red-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                            <h4 className="font-semibold text-red-900">Please fix the following errors:</h4>
                                        </div>
                                        <ul className="mt-2 space-y-1">
                                            {Object.entries(errors).map(([key, error]) => (
                                                <li key={key} className="text-sm text-red-700">• {error}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </form>
                    </div>
                </div>

                {/* Sticky Footer with Progress */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                    Progress: {Math.round(getCompletionPercentage())}%
                                </div>
                                <Progress value={getCompletionPercentage()} className="w-32 h-2" />
                            </div>
                            <div className="flex items-center space-x-3">
                                <Badge className="bg-blue-100 text-blue-800">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Free Plan
                                </Badge>
                                <span className="text-sm text-gray-600">
                                    {Object.keys(data.responses).length}/{totalCriteria} answered
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom spacing for sticky footer */}
                <div className="h-20"></div>
            </div>
        </>
    );
}
