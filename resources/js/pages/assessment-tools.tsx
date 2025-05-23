// resources/js/pages/assessment-tools.tsx
import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Search,
    Play,
    Clock,
    Users,
    Target,
    Star,
    Zap,
    ArrowRight,
    Globe,
    Filter,
    BarChart3,
    CheckCircle,
    Sparkles,
    TrendingUp,
    Award,
    BookOpen,
    Calendar,
    Eye,
    Heart,
    Share2
} from 'lucide-react';

interface Tool {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image?: string;
    status: string;
    category?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    duration?: number; // in minutes
    popularity?: number;
    rating?: number;
    assessments_count?: number;
}

interface AssessmentToolsProps {
    tools: Tool[];
    locale: string;
}

interface Translations {
    en: {
        title: string;
        subtitle: string;
        selectTool: string;
        startAssessment: string;
        noTools: string;
        searchPlaceholder: string;
        filterAll: string;
        filterBeginner: string;
        filterIntermediate: string;
        filterAdvanced: string;
        duration: string;
        minutes: string;
        popular: string;
        rating: string;
        assessments: string;
        difficulty: string;
        beginner: string;
        intermediate: string;
        advanced: string;
        category: string;
        viewDetails: string;
        featured: string;
        new: string;
        trending: string;
        quickStart: string;
        comprehensive: string;
        expertLevel: string;
        getStarted: string;
        exploreTools: string;
        chooseAssessment: string;
        findPerfectTool: string;
        sortBy: string;
        mostPopular: string;
        newest: string;
        highestRated: string;
        shortest: string;
        longest: string;
    };
    ar: {
        title: string;
        subtitle: string;
        selectTool: string;
        startAssessment: string;
        noTools: string;
        searchPlaceholder: string;
        filterAll: string;
        filterBeginner: string;
        filterIntermediate: string;
        filterAdvanced: string;
        duration: string;
        minutes: string;
        popular: string;
        rating: string;
        assessments: string;
        difficulty: string;
        beginner: string;
        intermediate: string;
        advanced: string;
        category: string;
        viewDetails: string;
        featured: string;
        new: string;
        trending: string;
        quickStart: string;
        comprehensive: string;
        expertLevel: string;
        getStarted: string;
        exploreTools: string;
        chooseAssessment: string;
        findPerfectTool: string;
        sortBy: string;
        mostPopular: string;
        newest: string;
        highestRated: string;
        shortest: string;
        longest: string;
    };
}

const translations: Translations = {
    en: {
        title: "Assessment Tools",
        subtitle: "Choose the perfect assessment tool for your evaluation needs",
        selectTool: "Select an Assessment Tool",
        startAssessment: "Start Assessment",
        noTools: "No assessment tools are currently available.",
        searchPlaceholder: "Search assessment tools...",
        filterAll: "All Levels",
        filterBeginner: "Beginner",
        filterIntermediate: "Intermediate",
        filterAdvanced: "Advanced",
        duration: "Duration",
        minutes: "minutes",
        popular: "Popular",
        rating: "Rating",
        assessments: "assessments",
        difficulty: "Difficulty",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        category: "Category",
        viewDetails: "View Details",
        featured: "Featured",
        new: "New",
        trending: "Trending",
        quickStart: "Quick Start",
        comprehensive: "Comprehensive",
        expertLevel: "Expert Level",
        getStarted: "Get Started",
        exploreTools: "Explore Tools",
        chooseAssessment: "Choose Your Assessment",
        findPerfectTool: "Find the perfect tool for your assessment needs",
        sortBy: "Sort by",
        mostPopular: "Most Popular",
        newest: "Newest",
        highestRated: "Highest Rated",
        shortest: "Shortest",
        longest: "Longest"
    },
    ar: {
        title: "أدوات التقييم",
        subtitle: "اختر أداة التقييم المثالية لاحتياجات التقييم الخاصة بك",
        selectTool: "اختر أداة التقييم",
        startAssessment: "بدء التقييم",
        noTools: "لا توجد أدوات تقييم متاحة حالياً.",
        searchPlaceholder: "البحث في أدوات التقييم...",
        filterAll: "جميع المستويات",
        filterBeginner: "مبتدئ",
        filterIntermediate: "متوسط",
        filterAdvanced: "متقدم",
        duration: "المدة",
        minutes: "دقيقة",
        popular: "شائع",
        rating: "التقييم",
        assessments: "تقييمات",
        difficulty: "الصعوبة",
        beginner: "مبتدئ",
        intermediate: "متوسط",
        advanced: "متقدم",
        category: "الفئة",
        viewDetails: "عرض التفاصيل",
        featured: "مميز",
        new: "جديد",
        trending: "رائج",
        quickStart: "بداية سريعة",
        comprehensive: "شامل",
        expertLevel: "مستوى الخبراء",
        getStarted: "ابدأ الآن",
        exploreTools: "استكشف الأدوات",
        chooseAssessment: "اختر تقييمك",
        findPerfectTool: "ابحث عن الأداة المثالية لاحتياجات التقييم الخاصة بك",
        sortBy: "ترتيب حسب",
        mostPopular: "الأكثر شعبية",
        newest: "الأحدث",
        highestRated: "الأعلى تقييماً",
        shortest: "الأقصر",
        longest: "الأطول"
    }
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assessment Tools',
        href: '/assessment-tools',
    },
];

export default function AssessmentTools({ tools, locale }: AssessmentToolsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [language, setLanguage] = useState<'en' | 'ar'>(locale === 'ar' ? 'ar' : 'en');

    const t = translations[language];

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const getToolName = (tool: Tool): string => {
        return language === 'ar' ? tool.name_ar : tool.name_en;
    };

    const getToolDescription = (tool: Tool): string => {
        const description = language === 'ar' ? tool.description_ar : tool.description_en;
        return description || (language === 'ar' ? 'لا يوجد وصف متاح.' : 'No description available.');
    };

    const getDifficultyColor = (difficulty: string): string => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
            case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getDifficultyText = (difficulty: string): string => {
        switch (difficulty) {
            case 'beginner': return t.beginner;
            case 'intermediate': return t.intermediate;
            case 'advanced': return t.advanced;
            default: return difficulty;
        }
    };

    // Filter and sort tools
    const filteredAndSortedTools = tools
        .filter(tool => {
            const matchesSearch = getToolName(tool).toLowerCase().includes(searchTerm.toLowerCase()) ||
                getToolDescription(tool).toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = difficultyFilter === 'all' || tool.difficulty === difficultyFilter;
            return matchesSearch && matchesDifficulty;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return (b.popularity || 0) - (a.popularity || 0);
                case 'newest':
                    return b.id - a.id; // Assuming higher ID means newer
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'shortest':
                    return (a.duration || 0) - (b.duration || 0);
                case 'longest':
                    return (b.duration || 0) - (a.duration || 0);
                default:
                    return (b.popularity || 0) - (a.popularity || 0);
            }
        });

    // Get featured tools (top 3 by popularity)
    const featuredTools = tools
        .filter(tool => tool.status === 'active')
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 3);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t.title} />

            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex h-full flex-1 flex-col gap-8 p-6 lg:p-8">
                    {/* Enhanced Header */}
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                    {t.title}
                                </h1>
                                <p className="text-xl text-gray-600 mt-2">
                                    {t.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleLanguage}
                                className="backdrop-blur-sm bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                <span>{language === 'en' ? 'عربي' : 'English'}</span>
                            </Button>
                        </div>
                    </div>

                    {/* Featured Tools Section */}
                    {featuredTools.length > 0 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.featured} {t.exploreTools}</h2>
                                <p className="text-gray-600">{t.findPerfectTool}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {featuredTools.map((tool, index) => (
                                    <Card key={tool.id} className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden group hover:scale-105 transition-all duration-300">
                                        <div className={`absolute top-0 left-0 w-full h-1 ${
                                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                                index === 1 ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
                                                    'bg-gradient-to-r from-green-400 to-teal-500'
                                        }`}></div>

                                        <div className="relative">
                                            {tool.image ? (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={tool.image}
                                                        alt={getToolName(tool)}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                    <Target className="w-16 h-16 text-blue-600" />
                                                </div>
                                            )}

                                            <div className="absolute top-4 right-4">
                                                <Badge className={`${
                                                    index === 0 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                                        index === 1 ? 'bg-blue-100 text-blue-800 border-blue-300' :
                                                            'bg-green-100 text-green-800 border-green-300'
                                                } font-semibold`}>
                                                    {index === 0 ? (
                                                        <><Star className="w-3 h-3 mr-1" /> {t.featured}</>
                                                    ) : index === 1 ? (
                                                        <><TrendingUp className="w-3 h-3 mr-1" /> {t.trending}</>
                                                    ) : (
                                                        <><Sparkles className="w-3 h-3 mr-1" /> {t.new}</>
                                                    )}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-6 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {getToolName(tool)}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {getToolDescription(tool)}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                {tool.duration && (
                                                    <div className="flex items-center gap-1 text-gray-500">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{tool.duration} {t.minutes}</span>
                                                    </div>
                                                )}
                                                {tool.rating && (
                                                    <div className="flex items-center gap-1 text-yellow-600">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span>{tool.rating}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <Link href={`/assessment/start/${tool.id}`} className="w-full">
                                                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                                                    <Play className="w-4 h-4 mr-2" />
                                                    {t.startAssessment}
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search and Filters */}
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            placeholder={t.searchPlaceholder}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Difficulty Filter */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-sm font-medium text-gray-600 flex items-center mr-2">{t.difficulty}:</span>
                                    {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                                        <Button
                                            key={level}
                                            variant={difficultyFilter === level ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setDifficultyFilter(level)}
                                            className={`rounded-full ${
                                                difficultyFilter === level
                                                    ? 'bg-blue-600 hover:bg-blue-700'
                                                    : 'hover:bg-blue-50 hover:border-blue-300'
                                            }`}
                                        >
                                            {level === 'all' ? t.filterAll : getDifficultyText(level)}
                                        </Button>
                                    ))}
                                </div>

                                {/* Sort */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">{t.sortBy}:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="popular">{t.mostPopular}</option>
                                        <option value="newest">{t.newest}</option>
                                        <option value="rating">{t.highestRated}</option>
                                        <option value="shortest">{t.shortest}</option>
                                        <option value="longest">{t.longest}</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tools Grid */}
                    {filteredAndSortedTools.length === 0 ? (
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                            <CardContent className="flex flex-col items-center justify-center py-20">
                                <div className="text-center space-y-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                                        <Target className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            {searchTerm || difficultyFilter !== 'all' ? 'No matching tools found' : t.noTools}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                            {searchTerm || difficultyFilter !== 'all'
                                                ? 'Try adjusting your search criteria or filters'
                                                : 'Assessment tools will appear here once they are available.'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {t.chooseAssessment}
                                </h2>
                                <p className="text-gray-600">
                                    {filteredAndSortedTools.length} {t.exploreTools.toLowerCase()}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredAndSortedTools.map((tool) => (
                                    <Card key={tool.id} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                                        <div className="relative">
                                            {tool.image ? (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={tool.image}
                                                        alt={getToolName(tool)}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                    <Target className="w-12 h-12 text-blue-600" />
                                                </div>
                                            )}

                                            {/* Overlay with quick actions */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        {t.viewDetails}
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                {tool.difficulty && (
                                                    <Badge className={`${getDifficultyColor(tool.difficulty)} text-xs font-semibold`}>
                                                        {getDifficultyText(tool.difficulty)}
                                                    </Badge>
                                                )}
                                                {tool.popularity && tool.popularity > 80 && (
                                                    <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                                                        <Zap className="w-3 h-3 mr-1" />
                                                        {t.popular}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Rating */}
                                            {tool.rating && (
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                    <span className="text-xs font-semibold text-gray-700">{tool.rating}</span>
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="p-6 space-y-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                    {getToolName(tool)}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-3">
                                                    {getToolDescription(tool)}
                                                </p>
                                            </div>

                                            {/* Tool Stats */}
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <div className="flex items-center gap-4">
                                                    {tool.duration && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{tool.duration}m</span>
                                                        </div>
                                                    )}
                                                    {tool.assessments_count && (
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-3 h-3" />
                                                            <span>{tool.assessments_count}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Heart className="w-3 h-3" />
                                                    <Share2 className="w-3 h-3" />
                                                </div>
                                            </div>

                                            <Link href={`/assessment/start/${tool.id}`} className="w-full">
                                                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                                    <Play className="w-4 h-4 mr-2" />
                                                    {t.startAssessment}
                                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    {tools.length > 0 && (
                        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white overflow-hidden">
                            <CardContent className="p-8 text-center relative">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="relative z-10 space-y-4">
                                    <h3 className="text-2xl font-bold">{t.getStarted}</h3>
                                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                                        {language === 'ar'
                                            ? 'ابدأ رحلتك في التقييم اليوم واكتشف رؤى قيمة حول أدائك وتقدمك.'
                                            : 'Start your assessment journey today and discover valuable insights about your performance and progress.'
                                        }
                                    </p>
                                    <div className="flex justify-center">
                                        <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            {t.exploreTools}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
