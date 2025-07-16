import { LanguageSwitch } from '@/components/language-switch';
import { Crown, LayoutDashboard, LogOut, Users } from 'lucide-react';
import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

// --- Translations Object for this component ---
const translations = {
    en: {
        welcome: 'Welcome',
        login: 'Login',
        dashboard: 'Dashboard',
        logout: 'Logout',
        freePlan: 'Free Plan',
    },
    ar: {
        welcome: 'أهلاً بك',
        login: 'تسجيل الدخول',
        dashboard: 'لوحة التحكم',
        logout: 'تسجيل الخروج',
        freePlan: 'الخطة المجانية',
    },
} as const;


// --- Type Definitions ---
interface AssessmentHeaderProps {
    title: string;
    userName?: string;
    rightContent?: React.ReactNode;
    language?: 'en' | 'ar'; // Made language optional to prevent crashes
}

export default function AssessmentHeader({ title, userName, rightContent, language = 'en' }: AssessmentHeaderProps) {
    // THE FIX: By setting `language = 'en'`, if the language prop is not provided,
    // it will default to 'en' and `t` will always be a valid object.
    const t = translations[language];

    return (
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/80 sticky top-0 z-50 print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Left Side: Logo & Title */}
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <img src="/storage/logo.svg" alt="AFAQ Logo" className="h-10 w-auto" />
                        </Link>
                        <div className="hidden h-8 w-px bg-gray-200 sm:block" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                            {userName && (
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Users className="h-3 w-3" />
                                    <span>{userName}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Actions & User Info */}
                    <div className="flex items-center gap-4">
                        {rightContent || (
                            <Badge className="bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                                <Crown className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                {t.freePlan}
                            </Badge>
                        )}
                        <LanguageSwitch />
                        {userName ? (
                            <>
                                <span className="text-sm text-gray-600 hidden lg:inline">
                                    {t.welcome}, <span className="font-semibold">{userName}</span>
                                </span>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-600 hover:text-blue-600 p-2 rounded-full transition-colors"
                                    title={t.dashboard}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-gray-600 hover:text-red-600 p-2 rounded-full transition-colors"
                                    title={t.logout}
                                >
                                    <LogOut className="w-5 h-5" />
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                {t.login}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
