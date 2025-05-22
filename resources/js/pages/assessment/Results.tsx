import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, CheckCircle, XCircle, MinusCircle, FileText } from 'lucide-react';

interface Assessment {
    id: number;
    name: string;
    email: string;
    status: string;
    completed_at: string | null;
    tool: {
        id: number;
        name: string;
    };
}

interface DomainResult {
    domain_id: number;
    domain_name: string;
    score: number;
    percentage: number;
    total_criteria: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    weight_percentage?: number;
}

interface CategoryResult {
    category_id: number;
    category_name: string;
    score: number;
    percentage: number;
    applicable_count: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    weight_percentage?: number;
}

interface AssessmentResults {
    overall_percentage: number;
    total_criteria: number;
    applicable_criteria: number;
    yes_count: number;
    no_count: number;
    na_count: number;
    domain_results: DomainResult[];
    category_results: Record<string, CategoryResult[]>;
}

interface ResultsProps {
    assessment: Assessment;
    results: AssessmentResults;
}

export default function Results({ assessment, results }: ResultsProps) {
    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
        if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        if (percentage >= 40) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getScoreLabel = (percentage: number) => {
        if (percentage >= 80) return 'Excellent';
        if (percentage >= 60) return 'Good';
        if (percentage >= 40) return 'Fair';
        return 'Needs Improvement';
    };

    const downloadReport = () => {
        // This would trigger a PDF download
        window.open(route('assessment.download', assessment.id), '_blank');
    };

    return (
        <>
            <Head title={`Assessment Results - ${assessment.tool.name}`} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <a href={route('assessment.index')} className="flex items-center text-gray-600 hover:text-gray-900">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Back to Assessments
                                </a>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button onClick={downloadReport} variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Report
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Assessment Overview */}
                        <Card className="mb-8">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl mb-2">
                                            {assessment.tool.name} Assessment Results
                                        </CardTitle>
                                        <CardDescription>
                                            Assessment for {assessment.name} ({assessment.email})
                                        </CardDescription>
                                        {assessment.completed_at && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Completed on {new Date(assessment.completed_at).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <Badge variant={assessment.status === 'completed' ? 'default' : 'secondary'}>
                                        {assessment.status === 'completed' ? 'Complete' : 'In Progress'}
                                    </Badge>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Overall Score */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-xl">Overall Assessment Score</CardTitle>
                                <CardDescription>
                                    Your overall performance across all domains
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-4xl font-bold text-gray-900">
                                            {Math.round(results.overall_percentage)}%
                                        </div>
                                        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getScoreColor(results.overall_percentage)}`}>
                                            {getScoreLabel(results.overall_percentage)}
                                        </div>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <div>{results.yes_count} out of {results.applicable_criteria} applicable criteria met</div>
                                        <div className="text-xs">{results.na_count} criteria marked as not applicable</div>
                                    </div>
                                </div>
                                <Progress value={results.overall_percentage} className="h-3 mb-4" />

                                {/* Score Breakdown */}
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="flex items-center justify-center mb-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
                                            <span className="text-2xl font-bold text-green-600">{results.yes_count}</span>
                                        </div>
                                        <div className="text-sm text-green-700">Yes Responses</div>
                                    </div>
                                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                                        <div className="flex items-center justify-center mb-2">
                                            <XCircle className="w-5 h-5 text-red-600 mr-1" />
                                            <span className="text-2xl font-bold text-red-600">{results.no_count}</span>
                                        </div>
                                        <div className="text-sm text-red-700">No Responses</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-center mb-2">
                                            <MinusCircle className="w-5 h-5 text-gray-600 mr-1" />
                                            <span className="text-2xl font-bold text-gray-600">{results.na_count}</span>
                                        </div>
                                        <div className="text-sm text-gray-700">Not Applicable</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Domain Results */}
                        <div className="grid lg:grid-cols-2 gap-6 mb-8">
                            {results.domain_results.map((domain) => (
                                <Card key={domain.domain_id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{domain.domain_name}</CardTitle>
                                                <CardDescription>
                                                    {domain.applicable_criteria} applicable criteria
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {Math.round(domain.percentage)}%
                                                </div>
                                                <div className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(domain.percentage)}`}>
                                                    {getScoreLabel(domain.percentage)}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Progress value={domain.percentage} className="mb-4" />
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-center">
                                                <div className="font-medium text-green-600">{domain.yes_count}</div>
                                                <div className="text-xs text-gray-500">Yes</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-red-600">{domain.no_count}</div>
                                                <div className="text-xs text-gray-500">No</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-gray-600">{domain.na_count}</div>
                                                <div className="text-xs text-gray-500">N/A</div>
                                            </div>
                                        </div>

                                        {/* Category breakdown for this domain */}
                                        {results.category_results[domain.domain_id] && (
                                            <div className="mt-4 pt-4 border-t">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Category Breakdown:</h4>
                                                <div className="space-y-2">
                                                    {results.category_results[domain.domain_id].map((category) => (
                                                        <div key={category.category_id} className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-600">{category.category_name}</span>
                                                            <div className="flex items-center space-x-2">
                                                                <span className="font-medium">{Math.round(category.percentage)}%</span>
                                                                <span className="text-xs text-gray-500">
                                                                    ({category.yes_count}/{category.applicable_count})
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Recommendations */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center">
                                    <FileText className="w-5 h-5 mr-2" />
                                    Recommendations
                                </CardTitle>
                                <CardDescription>
                                    Areas for improvement based on your assessment results
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {results.domain_results
                                        .filter(domain => domain.percentage < 80)
                                        .sort((a, b) => a.percentage - b.percentage)
                                        .map((domain) => (
                                            <div key={domain.domain_id} className="border-l-4 border-orange-500 pl-4">
                                                <h4 className="font-medium text-gray-900">{domain.domain_name}</h4>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Score: {Math.round(domain.percentage)}% - Consider focusing on improving processes in this area.
                                                    You have {domain.no_count} criteria that need attention.
                                                </p>
                                            </div>
                                        ))}

                                    {results.domain_results.every(domain => domain.percentage >= 80) && (
                                        <div className="border-l-4 border-green-500 pl-4">
                                            <h4 className="font-medium text-green-900">Excellent Performance!</h4>
                                            <p className="text-sm text-green-700 mt-1">
                                                All domains are performing well. Continue maintaining these high standards and consider sharing best practices with other teams.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Next Steps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Next Steps</CardTitle>
                                <CardDescription>
                                    Suggested actions based on your assessment
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Review Low-Scoring Areas</h4>
                                            <p className="text-sm text-gray-600">Focus on domains and categories with scores below 60%</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Create Action Plans</h4>
                                            <p className="text-sm text-gray-600">Develop specific improvement plans for identified gaps</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Schedule Follow-up Assessment</h4>
                                            <p className="text-sm text-gray-600">Plan a reassessment in 3-6 months to track progress</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
