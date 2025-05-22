import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { formatDate, formatDateSafe } from '@/lib/utils';
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { toast } from 'react-hot-toast';

interface ImportantDate {
    id: number;
    title: string;
    description?: string;
    start_date: string;
    end_date: string;
    is_expired: boolean;
    created_by: {
        id: number;
        name: string;
    };
}

interface LegalCase {
    id: number;
    code: string;
}

interface Props {
    legalCase: LegalCase;
    importantDates: ImportantDate[];
    nextImportantDate: ImportantDate | null;
}

export default function ImportantDates({ legalCase, importantDates, nextImportantDate }: Props) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<ImportantDate | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        is_expired: false,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Búsqueda',
            href: route('search.index'),
        },
        {
            title: 'Resultados',
            href: route('search.results'),
        },
        {
            title: `Expediente: ${legalCase.code}`,
            href: route('legal-cases.show', legalCase.id),
        },
        {
            title: 'Fechas Importantes',
            href: route('legal-cases.important-dates.index', legalCase.id),
        },
    ];

    const handleCreate = () => {
        router.post(route('legal-cases.important-dates.store', legalCase.id), formData, {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                setFormData({
                    title: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    is_expired: false,
                });
                toast.success('Fecha importante creada exitosamente');
            },
        });
    };

    const handleUpdate = () => {
        if (!selectedDate) return;

        router.put(
            route('legal-cases.important-dates.update', [legalCase.id, selectedDate.id]),
            formData,
            {
                onSuccess: () => {
                    setIsEditDialogOpen(false);
                    setSelectedDate(null);
                    toast.success('Fecha importante actualizada exitosamente');
                },
            }
        );
    };

    const handleDelete = () => {
        if (!selectedDate) return;

        router.delete(
            route('legal-cases.important-dates.destroy', [legalCase.id, selectedDate.id]),
            {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setSelectedDate(null);
                    toast.success('Fecha importante eliminada exitosamente');
                },
            }
        );
    };

    const openEditDialog = (date: ImportantDate) => {
        setSelectedDate(date);
        setFormData({
            title: date.title,
            description: date.description || '',
            start_date: date.start_date,
            end_date: date.end_date,
            is_expired: Boolean(date.is_expired),
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (date: ImportantDate) => {
        setSelectedDate(date);
        setIsDeleteDialogOpen(true);
    };

    const getStatus = (is_expired: boolean, end_date: string) => {
        if (is_expired) {
            return {
                label: 'Cerrado',
                color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30',
            };
        }
        // Parsear end_date como local (no UTC)
        let end;
        if (/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
            const [year, month, day] = end_date.split('-').map(Number);
            end = new Date(year, month - 1, day);
        } else {
            end = new Date(end_date);
        }
        const today = new Date();
        const todayYMD = [today.getFullYear(), today.getMonth(), today.getDate()];
        const endYMD = [end.getFullYear(), end.getMonth(), end.getDate()];
        const isEndBeforeToday =
            endYMD[0] < todayYMD[0] ||
            (endYMD[0] === todayYMD[0] && endYMD[1] < todayYMD[1]) ||
            (endYMD[0] === todayYMD[0] && endYMD[1] === todayYMD[1] && endYMD[2] < todayYMD[2]);
        if (isEndBeforeToday) {
            return {
                label: 'Transcurrido',
                color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
                bg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/30',
            };
        }
        return {
            label: 'En curso',
            color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            bg: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30',
        };
    };

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
            backButton={{
                show: true,
                onClick: () => router.visit(route('legal-cases.show', legalCase.id), {
                    preserveState: false,
                    replace: true,
                }),
                label: 'Volver',
            }}
        >
            <Head title={`Fechas Importantes - Expediente ${legalCase.code}`} />

            <div className="p-4 sm:p-6">
                <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4 sm:p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <h1 className="text-2xl font-bold">Fechas Importantes</h1>
                            <Button onClick={() => setIsCreateDialogOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Nueva Fecha
                            </Button>
                        </div>

                        {/* Próxima fecha importante */}
                        {nextImportantDate && (
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                                    Próxima Fecha Importante
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium">{nextImportantDate.title}</span>
                                    <span className="text-blue-600 dark:text-blue-400">
                                        ({formatDateSafe(nextImportantDate.end_date)})
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Leyenda de estados */}
                        <div className="mb-6 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
                            <h2 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Leyenda de Estados:</h2>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-orange-100 dark:bg-orange-900 border border-orange-800 dark:border-orange-300"></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Plazos activos pero con fecha ya pasada <span className="font-semibold">(Transcurrido)</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-100 dark:bg-green-900 border border-green-800 dark:border-green-300"></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Plazos activos con fecha futura <span className="font-semibold">(En curso)</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-100 dark:bg-red-900 border border-red-800 dark:border-red-300"></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Plazos que ya no están activos y se conservan solo para referencia <span className="font-semibold">(Cerrado)</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Lista de fechas importantes */}
                        <div className="space-y-4">
                            {importantDates
                                .sort((a, b) => {
                                    // Primero ordenamos por is_expired (los no vencidos primero)
                                    if (a.is_expired !== b.is_expired) {
                                        return a.is_expired ? 1 : -1;
                                    }
                                    // Si ambos están vencidos o no vencidos, ordenamos por fecha de fin
                                    return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
                                })
                                .map((date) => {
                                    const status = getStatus(date.is_expired, date.end_date);
                                    return (
                                        <div
                                            key={date.id}
                                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-lg border ${status.bg}`}
                                        >
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium">{date.title}</h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                {date.description && (
                                                    <>
                                                        <div className="flex flex-col gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                            <span>Inicio: {formatDateSafe(date.start_date)}</span>
                                                            <span>Fin: {formatDateSafe(date.end_date)}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                            {date.description}
                                                        </p>
                                                    </>
                                                )}
                                                <div className="flex flex-col gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                    <span>Creado por: {date.created_by && date.created_by.name ? date.created_by.name : 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end mt-2 sm:mt-0">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(date)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => openDeleteDialog(date)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Sugerencia sobre la próxima fecha importante */}
                        <div className="mt-8 mb-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
                            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                                <span className="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" /></svg></span>
                                ¿Cómo se determina la próxima fecha importante?
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 block">
                                El plazo activo con fecha de finalización más cercana a la fecha actual será considerado la <b>fecha importante</b> para el expediente. Esta fecha se resalta automáticamente en la parte superior de la página.
                            </p>
                        </div>

                        {/* Leyenda de discriminación de días hábiles/no hábiles */}
                        <div className="mt-8">
                            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
                                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" /></svg></span>
                                    Sugerencia para discriminar días hábiles y no hábiles
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center"></span>
                                    Para mayor claridad, aparte de un titulo descriptivo para el rango de fechas, se recomienda que en la descripción indiques explícitamente qué días son hábiles y cuáles no, por ejemplo:
                                </p>
                                <div className="bg-gray-100 dark:bg-zinc-900 rounded p-3 text-xs text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700">
                                    <p className="mb-1">Días hábiles: 12/05/2025, 13/05/2025, 14/05/2025, 19/05/2025 {'< | >'} Días no hábiles: 15/05/2025, 16/05/2025, 17/05/2025, 18/05/2025</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                                    <span className="inline-flex items-center justify-center"></span>
                                    Esto facilitará la interpretación y seguimiento de los plazos para todos los usuarios del sistema.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Diálogo de creación */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nueva Fecha Importante</DialogTitle>
                        <DialogDescription>
                            Complete los detalles de la nueva fecha importante para el expediente.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Título</label>
                            <Input
                                value={formData.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Descripción</label>
                            <Textarea
                                value={formData.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Fecha de Inicio</label>
                                <Input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({ ...formData, start_date: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Fecha de Fin</label>
                                <Input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({ ...formData, end_date: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_expired"
                                checked={formData.is_expired}
                                onChange={e => setFormData({ ...formData, is_expired: e.target.checked })}
                                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
                            />
                            <label htmlFor="is_expired" className="text-sm font-medium">Marcar como vencido</label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCreate}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Diálogo de edición */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Fecha Importante</DialogTitle>
                        <DialogDescription>
                            Modifique los detalles de la fecha importante seleccionada.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Título</label>
                            <Input
                                value={formData.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Descripción</label>
                            <Textarea
                                value={formData.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Fecha de Inicio</label>
                                <Input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({ ...formData, start_date: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Fecha de Fin</label>
                                <Input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({ ...formData, end_date: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_expired"
                                checked={formData.is_expired}
                                onChange={e => setFormData({ ...formData, is_expired: e.target.checked })}
                                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded"
                            />
                            <label htmlFor="is_expired" className="text-sm font-medium">Marcar como vencido</label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdate}>Guardar Cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Diálogo de confirmación de eliminación */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar Fecha Importante</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Está seguro que desea eliminar esta fecha importante? Esta acción no se
                            puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
} 