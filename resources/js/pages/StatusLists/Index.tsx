import { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Status {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    statuses: Status[];
    filters: {
        search: string;
    };
}

const ITEMS_PER_PAGE = 10;

const Page = ({ statuses, filters }: Props) => {
    const [search, setSearch] = useState(filters.search || '');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [statusToDelete, setStatusToDelete] = useState<Status | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrado y paginación local
    const filteredStatuses = useMemo(() => {
        if (!search) return statuses;
        const s = search.toLowerCase();
        return statuses.filter(
            st => st.name.toLowerCase().includes(s) || (st.description?.toLowerCase().includes(s))
        );
    }, [statuses, search]);

    const totalPages = Math.ceil(filteredStatuses.length / ITEMS_PER_PAGE);
    const paginatedStatuses = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredStatuses.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredStatuses, currentPage]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const confirmDelete = (status: Status) => {
        setStatusToDelete(status);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (statusToDelete) {
            router.delete(route('status-lists.destroy', statusToDelete.id), {
                onSuccess: () => {
                    toast.success('Estatus eliminado exitosamente');
                },
                onError: () => {
                    toast.error('Error al eliminar el estatus');
                },
            });
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            <Head title="Estatus" />
            <div className="p-4 sm:p-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <h1 className="text-2xl font-bold">Gestión de Estatus</h1>
                    <div className="flex flex-1 gap-2 items-center justify-end">
                        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-xs">
                            <Input
                                type="text"
                                placeholder="Buscar por nombre o descripción..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full"
                            />
                            <Button type="submit" variant="outline" className="shrink-0">
                                <Search className="h-4 w-4" />
                            </Button>
                        </form>
                        <Link href={route('status-lists.create')}>
                            <Button className="hidden sm:inline-flex">
                                <Plus className="h-4 w-4 mr-2" />
                                Nuevo Estatus
                            </Button>
                            <Button className="sm:hidden" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="block sm:hidden space-y-2 mb-16">
                    {paginatedStatuses.length > 0 ? (
                        paginatedStatuses.map((status) => (
                            <div key={status.id} className="bg-white dark:bg-zinc-900 rounded shadow p-3 flex flex-col gap-2">
                                <div className="font-bold text-base">{status.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{status.description || '-'}</div>
                                <div className="flex gap-2 mt-2 justify-end">
                                    <Link href={route('status-lists.edit', status.id)}>
                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => confirmDelete(status)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No se encontraron estatus.
                        </div>
                    )}
                </div>

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
                                {paginatedStatuses.length > 0 ? (
                                    paginatedStatuses.map((status) => (
                                        <TableRow key={status.id}>
                                            <TableCell className="font-medium">{status.name}</TableCell>
                                            <TableCell>{status.description || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={route('status-lists.edit', status.id)}>
                                                        <Button variant="outline" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="destructive" size="icon" onClick={() => confirmDelete(status)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No se encontraron estatus.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

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
                            <AlertDialogTitle>¿Está seguro de eliminar este estatus?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el estatus <b>{statusToDelete?.name}</b> de la base de datos.
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
        </>
    );
};

Page.layout = (page: React.ReactNode) => <AppSidebarLayout>{page}</AppSidebarLayout>;

export default Page; 