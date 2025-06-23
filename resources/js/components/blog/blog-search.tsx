// resources/js/components/blog/blog-search.tsx

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface BlogSearchProps {
    initialQuery?: string;
    initialTags?: string[];
    availableTags: string[];
    className?: string;
}

export function BlogSearch({
                               initialQuery = '',
                               initialTags = [],
                               availableTags,
                               className
                           }: BlogSearchProps) {
    const [query, setQuery] = useState(initialQuery);
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (query) params.append('search', query);
        if (selectedTags.length > 0) {
            selectedTags.forEach(tag => params.append('tags[]', tag));
        }

        const searchParams = params.toString();
        router.get(`/blog${searchParams ? `?${searchParams}` : ''}`);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setQuery('');
        setSelectedTags([]);
        router.get('/blog');
    };

    return (
        <Card className={`bg-white dark:bg-gray-800 ${className || ''}`}>
            <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search blog posts..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                            />
                        </div>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                            Search
                        </Button>
                        {(query || selectedTags.length > 0) && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={clearFilters}
                                className="border-gray-200 dark:border-gray-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Tag Filter */}
                    {availableTags.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by tags:</p>
                            <div className="flex flex-wrap gap-2">
                                {availableTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                                        className={`cursor-pointer transition-colors ${
                                            selectedTags.includes(tag)
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                                        }`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active Filters */}
                    {(query || selectedTags.length > 0) && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            {query && (
                                <Badge variant="secondary" className="gap-1 bg-gray-100 dark:bg-gray-700">
                                    Search: {query}
                                    <X
                                        className="h-3 w-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                        onClick={() => setQuery('')}
                                    />
                                </Badge>
                            )}
                            {selectedTags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="gap-1 bg-gray-100 dark:bg-gray-700">
                                    {tag}
                                    <X
                                        className="h-3 w-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                        onClick={() => toggleTag(tag)}
                                    />
                                </Badge>
                            ))}
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
