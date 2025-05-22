import { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Edit, Eye, Plus, Search, Trash2, Pencil } from 'lucide-react';
import { Individual } from '@/types';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Props {
  individuals: {
    data: Individual[];
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

export default function IndividualsIndex({ individuals, filters }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [individualToDelete, setIndividualToDelete] = useState<Individual | null>(null);
  const [search, setSearch] = useState(filters.search || '');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Inicio',
      href: route('search.index'),
    },
    {
      title: 'Personas Naturales',
      href: route('individuals.index'),
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('individuals.index'), { search }, { preserveState: true });
  };

  const confirmDelete = (individual: Individual) => {
    setIndividualToDelete(individual);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (individualToDelete) {
      router.delete(route('individuals.destroy', individualToDelete.id), {
        onSuccess: () => {
          toast.success('Persona eliminada exitosamente');
        },
        onError: () => {
          toast.error('Error al eliminar la persona');
        },
      });
    }
    setIsDeleteDialogOpen(false);
  };

  const getFullName = (individual: Individual): string => {
    return `${individual.first_name} ${individual.middle_name || ''} ${individual.last_name} ${individual.second_last_name || ''}`.trim();
  };

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(individuals.data.length / ITEMS_PER_PAGE);
  const paginatedIndividuals = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return individuals.data.slice(start, start + ITEMS_PER_PAGE);
  }, [individuals.data, currentPage]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Personas Naturales" />

      <div className="p-4 sm:p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Gestión de Personas Naturales</h1>
          <div className="flex flex-1 gap-2 items-center justify-end">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-xs">
              <Input
                placeholder="Buscar por nombre o cédula..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
              <Button type="submit" variant="outline" className="shrink-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Link href={route('individuals.create')}>
              <Button className="hidden sm:inline-flex">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Persona
              </Button>
              <Button className="sm:hidden" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Vista tipo card para móvil */}
        <div className="block sm:hidden space-y-2 mb-16">
          {paginatedIndividuals.length > 0 ? (
            paginatedIndividuals.map((individual) => (
              <div key={individual.id} className="bg-white dark:bg-zinc-900 rounded shadow p-3 flex flex-col gap-2">
                <div className="font-bold text-base">{getFullName(individual)}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Cédula: {individual.national_id}</div>
                <div className="text-xs text-gray-400">Correo: {individual.email_1 || '-'}</div>
                <div className="text-xs text-gray-400">Teléfono: {individual.phone_number_1 || '-'}</div>
                <div className="flex gap-2 mt-2 justify-end">
                  <Link href={route('individuals.show', individual.id)}>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={route('individuals.edit', individual.id)}>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => confirmDelete(individual)}>
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
                  <TableHead>Cédula</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedIndividuals.length > 0 ? (
                  paginatedIndividuals.map((individual) => (
                    <TableRow key={individual.id}>
                      <TableCell className="font-medium">{individual.national_id}</TableCell>
                      <TableCell>{getFullName(individual)}</TableCell>
                      <TableCell>{individual.email_1 || '-'}</TableCell>
                      <TableCell>{individual.phone_number_1 || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={route('individuals.show', individual.id)}>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={route('individuals.edit', individual.id)}>
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="destructive" size="icon" onClick={() => confirmDelete(individual)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
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
                  {individuals.meta.current_page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href={individuals.links.prev ?? '#'} 
                        onClick={(e) => {
                          e.preventDefault();
                          router.get(individuals.links.prev ?? '');
                        }}
                      />
                    </PaginationItem>
                  )}
                  {individuals.meta.links.slice(1, -1).map((link, i) => (
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
                  ))}
                  {individuals.meta.current_page < individuals.meta.last_page && (
                    <PaginationItem>
                      <PaginationNext 
                        href={individuals.links.next ?? '#'} 
                        onClick={(e) => {
                          e.preventDefault();
                          router.get(individuals.links.next ?? '');
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
              <AlertDialogTitle>¿Está seguro de eliminar esta persona?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente la persona <b>{individualToDelete ? getFullName(individualToDelete) : ''}</b> de la base de datos.
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