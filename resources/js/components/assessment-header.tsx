import { LanguageSwitch } from '@/components/language-switch';
import { Users } from 'lucide-react';
import React from 'react';

interface AssessmentHeaderProps {
    title: string;
    userName?: string;
    rightContent?: React.ReactNode;
}

export default function AssessmentHeader({ title, userName, rightContent }: AssessmentHeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-blue-200/50 bg-white/95 shadow-lg backdrop-blur-md print:shadow-none">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src="/storage/logo.svg" alt="AFAQ Logo" className="h-10 w-auto" />
                        <div className="h-6 w-px bg-gray-300" />
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
                            {userName && (
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <Users className="h-3 w-3" />
                                    <span>{userName}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 print:hidden">
                        {rightContent}
                        <LanguageSwitch />
                    </div>
                </div>
            </div>
        </header>
    );
}
