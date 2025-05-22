import { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, LegalEntity } from '@/types';
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
import { Building, Edit, Eye, Plus, Search, Trash2, Pencil } from 'lucide-react';
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
  legalEntities: {
    data: LegalEntity[];
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

export default function LegalEntitiesIndex({ legalEntities, filters }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<LegalEntity | null>(null);
  const [search, setSearch] = useState(filters.search || '');

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Inicio',
      href: route('search.index'),
    },
    {
      title: 'Entidades Legales',
      href: route('legal-entities.index'),
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('legal-entities.index'), { search }, { preserveState: true });
  };

  const confirmDelete = (entity: LegalEntity) => {
    setEntityToDelete(entity);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (entityToDelete) {
      router.delete(route('legal-entities.destroy', entityToDelete.id), {
        onSuccess: () => {
          toast.success('Entidad eliminada exitosamente');
        },
        onError: () => {
          toast.error('Error al eliminar la entidad');
        },
      });
    }
    setIsDeleteDialogOpen(false);
  };

  const getEntityName = (entity: LegalEntity): string => {
    return entity.trade_name 
        ? `${entity.business_name} (${entity.trade_name})`
        : entity.business_name;
  };

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(legalEntities.data.length / ITEMS_PER_PAGE);
  const paginatedEntities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return legalEntities.data.slice(start, start + ITEMS_PER_PAGE);
  }, [legalEntities.data, currentPage]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Entidades Legales" />

      <div className="p-4 sm:p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Gestión de Entidades Legales</h1>
          <div className="flex flex-1 gap-2 items-center justify-end">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-xs">
              <Input
                placeholder="Buscar por nombre o RIF..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
              <Button type="submit" variant="outline" className="shrink-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Link href={route('legal-entities.create')}>
              <Button className="hidden sm:inline-flex">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Entidad
              </Button>
              <Button className="sm:hidden" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Vista tipo card para móvil */}
        <div className="block sm:hidden space-y-2 mb-16">
          {paginatedEntities.length > 0 ? (
            paginatedEntities.map((entity) => (
              <div key={entity.id} className="bg-white dark:bg-zinc-900 rounded shadow p-3 flex flex-col gap-2">
                <div className="font-bold text-base flex items-center"><span className="mr-2"><Building className="h-4 w-4 text-gray-500" /></span>{getEntityName(entity)}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">RIF: {entity.rif}</div>
                <div className="text-xs text-gray-400">Correo: {entity.email_1 || '-'}</div>
                <div className="text-xs text-gray-400">Teléfono: {entity.phone_number_1 || '-'}</div>
                <div className="flex gap-2 mt-2 justify-end">
                  <Link href={route('legal-entities.show', entity.id)}>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={route('legal-entities.edit', entity.id)}>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => confirmDelete(entity)}>
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
                  <TableHead>RIF</TableHead>
                  <TableHead>Nombre Comercial</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEntities.length > 0 ? (
                  paginatedEntities.map((entity) => (
                    <TableRow key={entity.id}>
                      <TableCell className="font-medium">{entity.rif}</TableCell>
                      <TableCell className="flex items-center"><Building className="h-4 w-4 mr-2 text-gray-500" />{getEntityName(entity)}</TableCell>
                      <TableCell>{entity.email_1 || '-'}</TableCell>
                      <TableCell>{entity.phone_number_1 || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={route('legal-entities.show', entity.id)}>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={route('legal-entities.edit', entity.id)}>
                            <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="destructive" size="icon" onClick={() => confirmDelete(entity)}>
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
                  {legalEntities.meta.current_page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href={legalEntities.links.prev ?? '#'} 
                        onClick={(e) => {
                          e.preventDefault();
                          router.get(legalEntities.links.prev ?? '');
                        }}
                      />
                    </PaginationItem>
                  )}
                  {legalEntities.meta.links.slice(1, -1).map((link, i) => (
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
                  {legalEntities.meta.current_page < legalEntities.meta.last_page && (
                    <PaginationItem>
                      <PaginationNext 
                        href={legalEntities.links.next ?? '#'} 
                        onClick={(e) => {
                          e.preventDefault();
                          router.get(legalEntities.links.next ?? '');
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
              <AlertDialogTitle>¿Está seguro de eliminar esta entidad?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente la entidad <b>{entityToDelete ? getEntityName(entityToDelete) : ''}</b> de la base de datos.
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