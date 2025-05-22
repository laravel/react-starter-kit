import { useState, useMemo } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type CaseType, type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { PageProps } from '@inertiajs/core';

interface Props extends PageProps {
    caseTypes: CaseType[];
    filters: {
        search: string;
    };
}

const ITEMS_PER_PAGE = 10;

export default function Index() {
    const { caseTypes, filters } = usePage<Props>().props;
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [typeToDelete, setTypeToDelete] = useState<CaseType | null>(null);
    const [search, setSearch] = useState(filters?.search || '');
    const [currentPage, setCurrentPage] = useState(1);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inicio',
            href: route('search.index'),
        },
        {
            title: 'Tipos de Casos',
            href: route('case-types.index'),
        },
    ];

    // Filtrado local
    const filteredTypes = useMemo(() => {
        if (!search) return caseTypes;
        const s = search.toLowerCase();
        return caseTypes.filter(
            type => type.name.toLowerCase().includes(s) || 
                   (type.description && type.description.toLowerCase().includes(s))
        );
    }, [caseTypes, search]);

    // Paginación local
    const totalPages = Math.ceil(filteredTypes.length / ITEMS_PER_PAGE);
    const paginatedTypes = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTypes.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredTypes, currentPage]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1); // Resetear a la primera página cuando se busca
    };

    const confirmDelete = (caseType: CaseType) => {
        setTypeToDelete(caseType);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (typeToDelete) {
            router.delete(route('case-types.destroy', typeToDelete.id), {
                onSuccess: () => {
                    toast.success('Tipo de caso eliminado exitosamente');
                },
                onError: () => {
                    toast.error('Error al eliminar el tipo de caso');
                },
            });
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tipos de Casos" />

            <div className="p-4 sm:p-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <h1 className="text-2xl font-bold">Gestión de Tipos de Casos</h1>
                    <div className="flex flex-1 gap-2 items-center justify-end">
                        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-xs">
                            <Input
                                placeholder="Buscar por nombre o descripción..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full"
                            />
                            <Button type="submit" variant="outline" className="shrink-0">
                                <Search className="h-4 w-4" />
                            </Button>
                        </form>
                        <Link href={route('case-types.create')}>
                            <Button className="hidden sm:inline-flex">
                                <Plus className="h-4 w-4 mr-2" />
                                Nuevo Tipo
                            </Button>
                            <Button className="sm:hidden" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Vista tipo card para móvil */}
                <div className="block sm:hidden space-y-2 mb-16">
                    {paginatedTypes.length > 0 ? (
                        paginatedTypes.map((caseType) => (
                            <div key={caseType.id} className="bg-white dark:bg-zinc-900 rounded shadow p-3 flex flex-col gap-2">
                                <div className="font-bold text-base">{caseType.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{caseType.description || '-'}</div>
                                <div className="flex gap-2 mt-2 justify-end">
                                    <Link href={route('case-types.edit', caseType.id)}>
                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => confirmDelete(caseType)}>
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
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedTypes.length > 0 ? (
                                    paginatedTypes.map((caseType) => (
                                        <TableRow key={caseType.id}>
                                            <TableCell className="font-medium">{caseType.name}</TableCell>
                                            <TableCell>{caseType.description || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={route('case-types.edit', caseType.id)}>
                                                        <Button variant="outline" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="destructive" size="icon" onClick={() => confirmDelete(caseType)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-gray-500 dark:text-gray-400">
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
                    </>
                )}

                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro de eliminar este tipo de caso?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el tipo de caso <b>{typeToDelete?.name}</b> de la base de datos.
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