import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Search,
    Play,
    Lock,
    BarChart3,
    FileText,
    Clock,
    Library,
    ListFilter,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

/* ---------- types ---------- */
interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    status: string;
    total_criteria: number;
    total_domains: number;
    estimated_time: number;
    has_access: boolean;
}

interface UserLimits {
    current_assessments: number;
    assessment_limit: number | null;
    can_create_more: boolean;
    is_premium: boolean;
    subscription_status: string;
}

interface AssessmentToolsProps {
    tools: Tool[];
    userLimits: UserLimits;
}

/* ---------- translations ---------- */
const translations = {
    en: {
        title: 'Assessment Tools',
        startAssessment: 'Start Assessment',
        noTools: 'No assessment tools match your filters.',
        searchPlaceholder: 'Search assessment tools...',
        requestAccess: 'Request Access',
        accessLocked: 'Access Locked',
        available: 'Available',
        showingTools: 'tools available',
        filterBy: 'Filter by',
        all: 'All',
        access: 'Access',
        status: 'Status',
        locked: 'Locked',
    },
    ar: {
        title: 'أدوات التقييم',
        startAssessment: 'بدء التقييم',
        noTools: 'لا توجد أدوات تقييم تطابق بحثك.',
        searchPlaceholder: 'البحث في أدوات التقييم...',
        requestAccess: 'طلب الوصول',
        accessLocked: 'الوصول مقفل',
        available: 'متاح',
        showingTools: 'أدوات متاحة',
        filterBy: 'فرز حسب',
        all: 'الكل',
        access: 'الوصول',
        status: 'الحالة',
        locked: 'مقفل',
    },
} as const;

/* ---------- breadcrumbs ---------- */
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Assessment Tools', href: '/assessment-tools' },
];

/* ======================================================================= */
// --- SUB-COMPONENTS for a cleaner UI ---

const PageHeader = ({ t, count, searchTerm, onSearchChange }: any) => (
    <div className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                    <Library className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
                    <p className="text-gray-500">
                        {count} {t.showingTools}
                    </p>
                </div>
            </div>
            <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="ps-10 h-10 rounded-lg bg-white"
                />
            </div>
        </div>
    </div>
);

const FilterControls = ({ t, accessFilter, onAccessChange, statusFilter, onStatusChange, statuses }: any) => (
    <Card className="mb-8 border-0 shadow-sm bg-white">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
                <ListFilter className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-gray-700">{t.filterBy}:</span>
            </div>
            <div className="flex items-center gap-2 border-s border-gray-200 ps-4">
                <span className="text-sm font-medium text-gray-600">{t.access}:</span>
                {(['all', 'available', 'locked'] as const).map((access) => (
                    <Button
                        key={access}
                        variant={accessFilter === access ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => onAccessChange(access)}
                    >
                        {t[access] || access}
                    </Button>
                ))}
            </div>
            <div className="w-full md:w-auto md:min-w-[200px]">
                <Select value={statusFilter} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t.status} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{t.all} {t.status}</SelectItem>
                        {statuses.map((status: any) => (
                            <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
    </Card>
);

const ToolCard = ({ tool, userLimits, t, getText }: { tool: Tool, userLimits: UserLimits, t: any, getText: any }) => {
    const canStart = userLimits.can_create_more && tool.status === 'active' && tool.has_access;
    const showRequest = tool.status === 'active' && !tool.has_access;

    return (
        <Card className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-48 bg-gray-200">
                <img
                    src={`/storage/${tool.image}` || 'https://placehold.co/600x400/e2e8f0/334155?text=AFAQ'}
                    alt={getText(tool, 'name')}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <Badge className={`absolute top-3 right-3 rtl:left-3 rtl:right-auto text-xs font-bold ${tool.has_access ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {tool.has_access ? t.available : t.accessLocked}
                </Badge>
            </div>

            <CardContent className="flex flex-col flex-1 p-5 space-y-4 bg-white">
                <div>
                    <CardTitle className="text-lg font-bold text-gray-900">{getText(tool, 'name')}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1 h-10 overflow-hidden">
                        {getText(tool, 'description')}
                    </CardDescription>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center border-t border-b py-3">
                    <div className="text-xs text-gray-600"><BarChart3 className="w-4 h-4 mx-auto mb-1 text-gray-400" />{tool.total_domains} {t.domains}</div>
                    <div className="text-xs text-gray-600"><FileText className="w-4 h-4 mx-auto mb-1 text-gray-400" />{tool.total_criteria} {t.criteria}</div>
                    <div className="text-xs text-gray-600"><Clock className="w-4 h-4 mx-auto mb-1 text-gray-400" />~{tool.estimated_time} {t.minutes}</div>
                </div>

                <div className="mt-auto pt-2">
                    {canStart ? (
                        <Button asChild className="w-full">
                            <Link href={route('assessment.start', tool.id)}>
                                <Play className="w-4 h-4 me-2" />{t.startAssessment}
                            </Link>
                        </Button>
                    ) : showRequest ? (
                        <Button asChild variant="secondary" className="w-full">
                            <Link href={`/tools/request/${tool.id}`}>{t.requestAccess}</Link>
                        </Button>
                    ) : (
                        // This button now shows for any case where 'canStart' is false (e.g., limit reached)
                        <Button disabled variant="secondary" className="w-full">
                            <Lock className="w-4 h-4 me-2" />{t.accessLocked}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default function AssessmentTools({ tools, userLimits }: AssessmentToolsProps) {
    // --- STATE MANAGEMENT ---
    const [searchTerm, setSearchTerm] = useState('');
    const [accessFilter, setAccessFilter] = useState<'all' | 'available' | 'locked'>('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const { language } = useLanguage();
    const isArabic = language === 'ar';
    const t = translations[language];

    const getText = (tool: Tool, field: 'name' | 'description') =>
        language === 'ar'
            ? (field === 'name' ? tool.name_ar : tool.description_ar) || ''
            : (field === 'name' ? tool.name_en : tool.description_en) || '';

    // --- DERIVED STATE & FILTERING LOGIC ---
    const uniqueStatuses = useMemo(() => {
        return [...new Set(tools.map(tool => tool.status))];
    }, [tools]);

    const filteredTools = useMemo(() => {
        const lowerCaseSearchTerm = isArabic ? searchTerm.trim() : searchTerm.trim().toLowerCase();

        return tools
            // FIX: Simplified and corrected the access filter logic
            .filter(tool => {
                if (accessFilter === 'all') return true;
                return accessFilter === 'available' ? tool.has_access : !tool.has_access;
            })
            .filter(tool => statusFilter === 'all' || tool.status === statusFilter)
            .filter(tool => {
                const toolName = getText(tool, 'name');
                const toolDesc = getText(tool, 'description');

                if (isArabic) {
                    return toolName.includes(lowerCaseSearchTerm) || toolDesc.includes(lowerCaseSearchTerm);
                }
                return toolName.toLowerCase().includes(lowerCaseSearchTerm) || toolDesc.toLowerCase().includes(lowerCaseSearchTerm);
            });
    }, [tools, searchTerm, accessFilter, statusFilter, language]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div className={`min-h-screen bg-slate-50 p-4 sm:p-6`} dir={isArabic ? 'rtl' : 'ltr'}>
                <div className="max-w-7xl mx-auto">
                    <PageHeader t={t} count={filteredTools.length} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                    {/* REMOVED: The UserStatusCard component has been removed */}

                    <FilterControls
                        t={t}
                        accessFilter={accessFilter}
                        onAccessChange={setAccessFilter}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        statuses={uniqueStatuses}
                    />

                    {filteredTools.length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.id} tool={tool} userLimits={userLimits} t={t} getText={getText} />
                            ))}
                        </div>
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 mb-4">
                                <Search className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{t.noTools}</h3>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
