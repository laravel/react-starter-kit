import { useState, useMemo } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type LegalCase, type BreadcrumbItem } from '@/types';
import { formatDateSafe } from '@/lib/utils';
import { PageProps } from '@inertiajs/core';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Briefcase, Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props extends PageProps {
    legalCases: {
        data: LegalCase[];
        links: {
            first: string;
            last: string;
            prev: string | null;
            next: string | null;
        };
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: {
                url: string | null;
                label: string;
                active: boolean;
            }[];
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
    filters: {
        search: string;
    };
}

export default function Index() {
    const { legalCases, filters } = usePage<Props>().props;
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState<LegalCase | null>(null);
    const [search, setSearch] = useState(filters?.search || '');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inicio',
            href: route('search.index'),
        },
        {
            title: 'Expedientes Legales',
            href: route('legal-cases.index'),
        },
    ];

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('legal-cases.index'), { search }, { preserveState: true });
    };

    const confirmDelete = (legalCase: LegalCase) => {
        setCaseToDelete(legalCase);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (caseToDelete) {
            router.delete(route('legal-cases.destroy', caseToDelete.id), {
                onSuccess: () => {
                    toast.success('Expediente eliminado exitosamente');
                },
                onError: () => {
                    toast.error('Error al eliminar el expediente');
                },
            });
        }
        setIsDeleteDialogOpen(false);
    };

    // Si no hay paginación del backend, usamos paginación del cliente
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    
    const data = legalCases?.data || legalCases || [];
    const totalPages = Array.isArray(data) ? Math.ceil(data.length / ITEMS_PER_PAGE) : 1;
    
    const paginatedCases = useMemo(() => {
        if (!Array.isArray(data)) return [];
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return data.slice(start, start + ITEMS_PER_PAGE);
    }, [data, currentPage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expedientes Legales" />

            <div className="p-4 sm:p-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <h1 className="text-2xl font-bold">Gestión de Expedientes Legales</h1>
                    <div className="flex flex-1 gap-2 items-center justify-end">
                        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-xs">
                            <Input
                                placeholder="Buscar por código..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full"
                            />
                            <Button type="submit" variant="outline" className="shrink-0">
                                <Search className="h-4 w-4" />
                            </Button>
                        </form>
                        <Link href={route('legal-cases.create')}>
                            <Button className="hidden sm:inline-flex">
                                <Plus className="h-4 w-4 mr-2" />
                                Nuevo Expediente
                            </Button>
                            <Button className="sm:hidden" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Vista tipo card para móvil */}
                <div className="block sm:hidden space-y-2 mb-16">
                    {paginatedCases.length > 0 ? (
                        paginatedCases.map((legalCase) => (
                            <div key={legalCase.id} className="bg-white dark:bg-zinc-900 rounded shadow p-3 flex flex-col gap-2">
                                <div className="font-bold text-base flex items-center">
                                    <span className="mr-2"><Briefcase className="h-4 w-4 text-gray-500" /></span>
                                    {legalCase.code}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {legalCase.case_type?.name || 'Sin tipo definido'}
                                </div>
                                <div className="text-xs text-gray-400">
                                    Fecha: {formatDateSafe(legalCase.entry_date)}
                                </div>
                                <div className="flex gap-2 mt-2 justify-end">
                                    <Link href={route('legal-cases.show', legalCase.id)}>
                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={route('legal-cases.edit', legalCase.id)}>
                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => confirmDelete(legalCase)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No se encontraron registros.
                        </div>
                    )}
                </div>

                {/* Tabla solo visible en escritorio/tablet */}
                <div className="hidden sm:block bg-white dark:bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Tipo de Caso</TableHead>
                                    <TableHead>Fecha de Entrada</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedCases.length > 0 ? (
                                    paginatedCases.map((legalCase) => (
                                        <TableRow key={legalCase.id}>
                                            <TableCell className="font-medium flex items-center">
                                                <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                                                {legalCase.code}
                                            </TableCell>
                                            <TableCell>{legalCase.case_type?.name || 'Sin tipo definido'}</TableCell>
                                            <TableCell>{formatDateSafe(legalCase.entry_date)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={route('legal-cases.show', legalCase.id)}>
                                                        <Button variant="outline" size="icon">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('legal-cases.edit', legalCase.id)}>
                                                        <Button variant="outline" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="destructive" size="icon" onClick={() => confirmDelete(legalCase)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No se encontraron registros.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Paginación sticky en móvil, normal en escritorio */}
                {totalPages > 1 && (
                    <>
                        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 border-t z-50 sm:hidden">
                            <div className="px-4 py-2 flex justify-center">
                                <Pagination>
                                    <PaginationContent>
                                        {currentPage > 1 && (
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setCurrentPage(currentPage - 1);
                                                    }}
                                                />
                                            </PaginationItem>
                                        )}
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPage === i + 1}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setCurrentPage(i + 1);
                                                    }}
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        {currentPage < totalPages && (
                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setCurrentPage(currentPage + 1);
                                                    }}
                                                />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                        <div className="hidden sm:block px-4 py-2">
                            <Pagination>
                                <PaginationContent>
                                    {legalCases?.meta?.current_page > 1 ? (
                                        <PaginationItem>
                                            <PaginationPrevious 
                                                href={legalCases?.links?.prev ?? '#'} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.get(legalCases?.links?.prev ?? '');
                                                }}
                                            />
                                        </PaginationItem>
                                    ) : (
                                        currentPage > 1 && (
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setCurrentPage(currentPage - 1);
                                                    }}
                                                />
                                            </PaginationItem>
                                        )
                                    )}
                                    
                                    {legalCases?.meta?.links ? (
                                        legalCases.meta.links.slice(1, -1).map((link, i) => (
                                            <PaginationItem key={i}>
                                                {link.url ? (
                                                    <PaginationLink 
                                                        href={link.url}
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.get(link.url as string);
                                                        }}
                                                    >
                                                        {link.label}
                                                    </PaginationLink>
                                                ) : (
                                                    <PaginationEllipsis />
                                                )}
                                            </PaginationItem>
                                        ))
                                    ) : (
                                        Array.from({ length: totalPages }, (_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPage === i + 1}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setCurrentPage(i + 1);
                                                    }}
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))
                                    )}
                                    
                                    {legalCases?.meta?.current_page < legalCases?.meta?.last_page ? (
                                        <PaginationItem>
                                            <PaginationNext 
                                                href={legalCases?.links?.next ?? '#'} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.get(legalCases?.links?.next ?? '');
                                                }}
                                            />
                                        </PaginationItem>
                                    ) : (
                                        currentPage < totalPages && (
                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setCurrentPage(currentPage + 1);
                                                    }}
                                                />
                                            </PaginationItem>
                                        )
                                    )}
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}

                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro de eliminar este expediente?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el expediente <b>{caseToDelete?.code}</b> de la base de datos.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
} 