import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, FileText, User, Building2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Búsqueda',
        href: '/search',
    },
];

export default function SearchIndex() {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim().length === 0) return;
        
        router.get(
            route('search.results'),
            { query },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Búsqueda de Expedientes" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Sistema de Búsqueda</h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                    Encuentre expedientes judiciales, personas y entidades en el sistema
                </p>
                
                <div className="bg-white dark:bg-zinc-900 shadow-lg sm:rounded-xl overflow-hidden border dark:border-zinc-700">
                    <div className="grid md:grid-cols-5 gap-0">
                        {/* Panel lateral con información */}
                        <div className="md:col-span-2 bg-gray-50 dark:bg-zinc-800 p-6 border-r dark:border-zinc-700">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">¿Qué desea buscar?</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FileText className="h-5 w-5 mt-1 text-amber-500 dark:text-amber-400" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Expedientes</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Búsqueda por código de expediente</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <User className="h-5 w-5 mt-1 text-blue-500 dark:text-blue-400" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Personas Naturales</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Búsqueda por cédula o nombre</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <Building2 className="h-5 w-5 mt-1 text-green-500 dark:text-green-400" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Personas Jurídicas</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Búsqueda por RIF o razón social</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Formulario de búsqueda */}
                        <div className="md:col-span-3 p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Formulario de Búsqueda</h2>
                            
                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="relative">
                                    <div className="rounded-lg overflow-hidden border dark:border-zinc-700 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400">
                                        <Input
                                            id="query"
                                            name="query"
                                            type="text"
                                            required
                                            tabIndex={1}
                                            autoComplete="off"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Escriba un patrón de búsqueda..."
                                            className="pl-12 py-6 text-lg border-0 dark:border-0 rounded-none dark:text-white dark:bg-zinc-800 dark:placeholder-gray-400 focus-visible:ring-0 focus-visible:border-0"
                                        />
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col space-y-4">
                                    <Button 
                                        type="submit" 
                                        className="w-full px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium text-lg"
                                        tabIndex={2}
                                        disabled={query.trim().length === 0}
                                    >
                                        <Search className="mr-2 h-5 w-5" />
                                        Buscar
                                    </Button>
                                    
                                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                                        Ingrese términos específicos para obtener resultados más precisos
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
