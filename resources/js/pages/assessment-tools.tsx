// resources/js/pages/assessment-tools.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    status: string;
}

interface AssessmentToolsProps {
    tools: Tool[];
    locale: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assessment Tools',
        href: '/assessment-tools',
    },
];

export default function AssessmentTools({ tools, locale }: AssessmentToolsProps) {
    const isArabic = locale === 'ar';

    const getToolName = (tool: Tool): string => {
        return isArabic ? tool.name_ar : tool.name_en;
    };

    const getToolDescription = (tool: Tool): string => {
        const description = isArabic ? tool.description_ar : tool.description_en;
        return description || (isArabic ? 'لا يوجد وصف متاح.' : 'No description available.');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isArabic ? 'أدوات التقييم' : 'Assessment Tools'} />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">
                        {isArabic ? 'اختر أداة التقييم' : 'Select an Assessment Tool'}
                    </h1>

                    <p className="text-lg text-muted-foreground">
                        {isArabic
                            ? 'يرجى اختيار أداة تقييم لبدء التقييم الخاص بك.'
                            : 'Please select an assessment tool to begin your evaluation.'
                        }
                    </p>
                </div>

                {tools.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed">
                        <div className="text-center">
                            <p className="text-lg text-muted-foreground">
                                {isArabic
                                    ? 'لا توجد أدوات تقييم متاحة حالياً.'
                                    : 'No assessment tools are currently available.'
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tools.map((tool) => (
                            <Card key={tool.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                                {tool.image && (
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={tool.image}
                                            alt={getToolName(tool)}
                                            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                                        />
                                    </div>
                                )}

                                <CardContent className="p-6">
                                    <h2 className="mb-3 text-xl font-semibold">
                                        {getToolName(tool)}
                                    </h2>

                                    <p className="mb-6 text-sm text-muted-foreground line-clamp-3">
                                        {getToolDescription(tool)}
                                    </p>

                                    <Link
                                        href={`/assessment/start/${tool.id}`}
                                        className="w-full"
                                    >
                                        <Button className="w-full">
                                            {isArabic ? 'بدء التقييم' : 'Start Assessment'}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
