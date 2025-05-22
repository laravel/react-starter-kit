import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

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

    const { data, setData, post, processing, errors } = useForm({
        tool_id: tool.id.toString(),
        name: prefillData?.name || '',
        email: prefillData?.email || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('assessment.start'));
    };

    const totalCategories = tool.domains.reduce((acc, domain) => acc + domain.categories.length, 0);

    return (
        <>
            <Head title={`Start ${tool.name} Assessment`} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <a href={route('home')} className="flex items-center text-gray-600 hover:text-gray-900">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Back to Assessment Tools
                                </a>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user && (
                                    <span className="text-sm text-gray-700">Welcome, {auth.user.name}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Assessment Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Start Your Assessment</CardTitle>
                                    <CardDescription>
                                        Please provide your details to begin the {tool.name} assessment.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter your full name"
                                                disabled={!!auth?.user}
                                                className={auth?.user ? 'bg-gray-50' : ''}
                                            />
                                            <InputError message={errors.name} />
                                            {auth?.user && (
                                                <p className="text-sm text-gray-500">
                                                    ✓ Name is pre-filled from your account
                                                </p>
                                            )}
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Enter your email address"
                                                disabled={!!auth?.user}
                                                className={auth?.user ? 'bg-gray-50' : ''}
                                            />
                                            <InputError message={errors.email} />
                                            {auth?.user && (
                                                <p className="text-sm text-gray-500">
                                                    ✓ Email is pre-filled from your account
                                                </p>
                                            )}
                                        </div>

                                        {/* Terms and Info */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-medium text-blue-900 mb-2">Before You Start:</h4>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• Assessment responses are: Yes, No, or Not Applicable</li>
                                                <li>• You can save progress and continue later</li>
                                                <li>• Results will be available immediately upon completion</li>
                                                <li>• Your data is securely stored and confidential</li>
                                            </ul>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            size="lg"
                                            disabled={processing || !data.name || !data.email}
                                        >
                                            {processing ? 'Starting Assessment...' : 'Start Assessment'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Tool Information */}
                            <div className="space-y-6">
                                {/* Tool Overview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                            <span>{tool.name}</span>
                                        </CardTitle>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{tool.domains.length}</div>
                                                <div className="text-sm text-gray-600">Domains</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">{totalCategories}</div>
                                                <div className="text-sm text-gray-600">Categories</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Assessment Domains */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Assessment Domains</CardTitle>
                                        <CardDescription>
                                            This assessment covers the following key areas:
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {tool.domains.map((domain, index) => (
                                                <div key={domain.id} className="border-l-4 border-blue-500 pl-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900">
                                                                {index + 1}. {domain.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {domain.categories.length} categories to evaluate
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Categories preview */}
                                                    <div className="mt-2 ml-4">
                                                        <div className="text-xs text-gray-500">
                                                            Categories: {domain.categories.map(cat => cat.name).join(', ')}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Estimated Time */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Assessment Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Estimated Time:</span>
                                                <span className="font-medium">15-30 minutes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Question Format:</span>
                                                <span className="font-medium">Yes/No/Not Applicable</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Can Save Progress:</span>
                                                <span className="font-medium text-green-600">Yes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Results Available:</span>
                                                <span className="font-medium text-green-600">Immediately</span>
                                            </div>
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
