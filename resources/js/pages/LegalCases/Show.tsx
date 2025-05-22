import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { formatDate, formatDateSafe } from '@/lib/utils';
import { FileText, Info, FileQuestion, Users, Gavel, UserCheck, ScrollText, Building, UserCog, Eye, UserPlus, Trash2, Pencil, ListTodo, StickyNote, ArrowUp, ArrowDown, Calendar, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { CaseEvents } from '@/components/LegalCases/CaseEvents';
import { TodoFloatingPanel } from '@/components/ui/TodoFloatingPanel';

interface CaseType {
    id: number;
    name: string;
    description?: string;
}

interface Individual {
    id: number;
    national_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    second_last_name?: string;
    pivot?: {
        individual_id: number;
        legal_case_id: number;
        role?: string;
    };
}

interface LegalEntity {
    id: number;
    rif: string;
    business_name: string;
    trade_name?: string;
    pivot?: {
        legal_entity_id: number;
        legal_case_id: number;
        role?: string;
    };
}

interface LegalCase {
    id: number;
    code: string;
    entry_date: string;
    sentence_date?: string;
    closing_date?: string;
    case_type: CaseType;
    individuals: Individual[];
    legal_entities: LegalEntity[];
}

interface Props {
    legalCase: LegalCase;
    events: any[];
    nextImportantDate?: {
        id: number;
        title: string;
        end_date: string;
    } | null;
}

export default function LegalCaseShow({ legalCase, events, nextImportantDate }: Props) {
    const [participantToRemove, setParticipantToRemove] = useState<{id: number, type: string, name: string} | null>(null);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [availableStatuses, setAvailableStatuses] = useState<string[]>([]);
    const [statusHistory, setStatusHistory] = useState<any[]>([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [statusReason, setStatusReason] = useState('');
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const [showStatusHistory, setShowStatusHistory] = useState(false);
    const [partiesCollapsed, setPartiesCollapsed] = useState(true);
    
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
    ];

    // Función para obtener el nombre completo de un individuo
    const getFullName = (individual: Individual): string => {
        return `${individual.first_name} ${individual.middle_name || ''} ${individual.last_name} ${individual.second_last_name || ''}`.trim();
    };

    // Función para obtener el nombre de la entidad legal
    const getEntityName = (entity: LegalEntity): string => {
        return entity.trade_name 
            ? `${entity.business_name} (${entity.trade_name})`
            : entity.business_name;
    };
    
    // Combinar todas las partes y agruparlas por rol
    const getAllParties = () => {
        const parties: {[key: string]: Array<{id: number, name: string, identifier: string, type: 'individual' | 'entity', entityObj: Individual | LegalEntity}>} = {};
        
        // Procesar individuos
        legalCase.individuals.forEach(individual => {
            const role = individual.pivot?.role || 'Sin rol asignado';
            if (!parties[role]) {
                parties[role] = [];
            }
            parties[role].push({
                id: individual.id, 
                name: getFullName(individual), 
                identifier: individual.national_id,
                type: 'individual',
                entityObj: individual
            });
        });
        
        // Procesar entidades legales
        legalCase.legal_entities.forEach(entity => {
            const role = entity.pivot?.role || 'Sin rol asignado';
            if (!parties[role]) {
                parties[role] = [];
            }
            parties[role].push({
                id: entity.id, 
                name: getEntityName(entity), 
                identifier: entity.rif,
                type: 'entity',
                entityObj: entity
            });
        });
        
        return parties;
    };
    
    // Obtener todas las partes agrupadas por rol
    const partiesByRole = getAllParties();
    
    // Orden de roles para mostrar en la interfaz
    const roleOrder = [
        'Juez', 
        'Solicitante', 
        'Abogado de Solicitante',
        'Demandado',
        'Abogado de Demandado',
        'Testigo',
        'Sin rol asignado'
    ];
    
    // Función para obtener el icono según el rol
    const getRoleIcon = (role: string) => {
        switch(role) {
            case 'Juez': 
                return <Gavel className="h-5 w-5 text-purple-500" aria-hidden="true" />;
            case 'Solicitante': 
                return <UserCheck className="h-5 w-5 text-blue-500" aria-hidden="true" />;
            case 'Abogado de Solicitante':
                return <UserCog className="h-5 w-5 text-blue-700" aria-hidden="true" />;
            case 'Demandado':
                return <Users className="h-5 w-5 text-orange-500" aria-hidden="true" />;
            case 'Abogado de Demandado':
                return <UserCog className="h-5 w-5 text-orange-700" aria-hidden="true" />;
            case 'Testigo':
                return <Eye className="h-5 w-5 text-green-500" aria-hidden="true" />;
            default:
                return <Users className="h-5 w-5 text-gray-500" aria-hidden="true" />;
        }
    };

    // Función para manejar la eliminación de un participante
    const confirmRemoveParticipant = (id: number, type: 'individual' | 'entity', name: string) => {
        setParticipantToRemove({ id, type, name });
        setIsRemoveDialogOpen(true);
    };
    
    const handleRemoveParticipant = () => {
        if (participantToRemove) {
            router.delete(route('case-participants.remove', legalCase.id), {
                data: {
                    type: participantToRemove.type,
                    id: participantToRemove.id
                }
            });
        }
        setIsRemoveDialogOpen(false);
    };

    useEffect(() => {
        fetch(route('legal-cases.statuses', legalCase.id))
            .then(res => res.json())
            .then(data => {
                setStatusHistory(data);
                setCurrentStatus(data[0]?.name || '');
            });
        fetch(route('legal-cases.available-statuses'))
            .then(res => res.json())
            .then(setAvailableStatuses);
    }, [legalCase.id]);

    const handleStatusChange = () => {
        const statusToSet = creatingStatus ? newStatus : selectedStatus;
        if (!statusToSet) {
            toast.error('Debes seleccionar o crear un estatus.');
            return;
        }
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        fetch(route('legal-cases.set-status', legalCase.id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken || ''
            },
            credentials: 'same-origin',
            body: JSON.stringify({ status: statusToSet, reason: statusReason })
        })
        .then(res => res.json())
        .then(() => {
            setStatusDialogOpen(false);
            setStatusReason('');
            setNewStatus('');
            setCreatingStatus(false);
            // Refrescar historial y estatus actual
            fetch(route('legal-cases.statuses', legalCase.id))
                .then(res => res.json())
                .then(data => {
                    setStatusHistory(data);
                    setCurrentStatus(data[0]?.name || '');
                });
            toast.success('Estatus actualizado');
        });
    };

    // Funciones para hacer scroll
    const scrollAmount = 400; // píxeles por clic
    const handleScrollUp = () => {
        window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    };
    const handleScrollDown = () => {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        const onPopState = () => {
            router.reload(); // Recarga todos los datos de la página
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detalle del Expediente: ${legalCase.code}`} />
            <div className="p-4 sm:p-6">
                <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4 sm:p-6 text-gray-900 dark:text-gray-100">
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold text-center uppercase">DETALLE DEL EXPEDIENTE</h1>
                        </div>
                        
                        {/* Tarjeta de Información General con encabezado igual a las demás tarjetas */}
                        <div className="mb-6 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                            {/* Encabezado de tarjeta estándar */}
                            <div className="bg-gray-100 dark:bg-zinc-900 px-4 py-2 font-medium flex items-center border-b border-gray-200 dark:border-zinc-800">
                                <Info className="h-5 w-5 text-gray-600 hover:text-blue-800 mr-2" aria-hidden="true" />
                                <span className="dark:text-gray-200">Información General del Expediente</span>
                            </div>
                            {/* Campos principales en columnas, estilo ficha legal */}
                            <div className="px-6 pt-6 pb-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-stretch bg-gray-100 dark:bg-zinc-800 rounded-md p-4 border border-gray-200 dark:border-zinc-700">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">CÓDIGO DE EXPEDIENTE</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100 break-all uppercase">{legalCase.code}</span>
                                    </div>
                                    <div className="flex flex-col items-stretch bg-gray-100 dark:bg-zinc-800 rounded-md p-4 border border-gray-200 dark:border-zinc-700">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">TIPO DE CASO</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100 break-all uppercase">{legalCase.case_type.name}</span>
                                    </div>
                                    <div className="flex flex-col items-stretch bg-gray-100 dark:bg-zinc-800 rounded-md p-4 border border-gray-200 dark:border-zinc-700">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">ESTADO</span>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 uppercase">
                                                {currentStatus ? currentStatus : (legalCase.closing_date ? 'CERRADO' : 'NO DEFINIDO')}
                                            </span>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-gray-600 hover:text-blue-800"
                                                onClick={() => setStatusDialogOpen(true)}
                                                title="Cambiar estatus"
                                            >
                                                <Edit className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Línea divisoria */}
                            <div className="border-t border-gray-200 dark:border-zinc-700 my-4" />
                            {/* Fechas importantes en la parte inferior, en recuadros */}
                            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="flex flex-col items-stretch bg-gray-50 dark:bg-zinc-800 rounded-md p-3 border border-gray-100 dark:border-zinc-700">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">FECHA DE ENTRADA</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase">{formatDateSafe(legalCase.entry_date)}</span>
                                </div>
                                <div className="flex flex-col items-stretch bg-gray-50 dark:bg-zinc-800 rounded-md p-3 border border-gray-100 dark:border-zinc-700">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">FECHA DE SENTENCIA</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase">{legalCase.sentence_date ? formatDateSafe(legalCase.sentence_date) : 'NO DEFINIDA'}</span>
                                </div>
                                <div className="flex flex-col items-stretch bg-gray-50 dark:bg-zinc-800 rounded-md p-3 border border-gray-100 dark:border-zinc-700">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">FECHA DE CIERRE</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase">{legalCase.closing_date ? formatDateSafe(legalCase.closing_date) : 'NO DEFINIDA'}</span>
                                </div>
                                <div className="flex flex-col items-stretch bg-gray-50 dark:bg-zinc-800 rounded-md p-3 border border-gray-100 dark:border-zinc-700">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">PRÓXIMA FECHA IMPORTANTE</span>
                                    {nextImportantDate ? (
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase">{formatDateSafe(nextImportantDate.end_date)}</span>
                                                <span className="text-base text-gray-800 dark:text-gray-200 font-semibold mt-1">{nextImportantDate.title}</span>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-gray-600 hover:text-blue-800"
                                                onClick={() => router.visit(route('legal-cases.important-dates.index', legalCase.id))}
                                                title="Editar fechas importantes"
                                            >
                                                <Calendar className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase">NO DEFINIDA</span>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-gray-600 hover:text-blue-800"
                                                onClick={() => router.visit(route('legal-cases.important-dates.index', legalCase.id))}
                                                title="Gestionar fechas importantes"
                                            >
                                                <Calendar className="h-6 w-6" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Tarjeta: Sujetos procesales */}
                        <div className="mb-6 border dark:border-zinc-700 rounded-md overflow-hidden">
                            <div className="bg-gray-100 dark:bg-zinc-900 px-4 py-2 font-medium flex items-center justify-between cursor-pointer select-none" onClick={() => setPartiesCollapsed(v => !v)}>
                                <span className="dark:text-gray-200">Sujetos procesales</span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={e => { e.stopPropagation(); router.visit(route('case-participants.add-form', legalCase.id)); }}
                                        size="icon"
                                        variant="ghost"
                                        className="text-gray-500 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                                        title="Añadir Participante"
                                    >
                                        <UserPlus className="h-6 w-6" />
                                    </Button>
                                    <span className="ml-2">{partiesCollapsed ? '▼' : '▲'}</span>
                                </div>
                            </div>
                            {!partiesCollapsed && (
                                <div className="p-4 dark:bg-zinc-900">
                                    {Object.keys(partiesByRole).length > 0 ? (
                                        <div className="space-y-4">
                                            {roleOrder.map(role => {
                                                if (!partiesByRole[role] || partiesByRole[role].length === 0) return null;
                                                return (
                                                    <div key={role} className="border dark:border-zinc-700 rounded-md overflow-hidden">
                                                        <div className="bg-gray-50 dark:bg-zinc-900 px-4 py-2 font-medium flex items-center">
                                                            {getRoleIcon(role)}
                                                            <span className="ml-2 dark:text-gray-200">{role}</span>
                                                        </div>
                                                        <div className="divide-y divide-gray-200 dark:divide-zinc-800 dark:bg-zinc-900">
                                                            {partiesByRole[role].map(party => (
                                                                <div key={`${party.type}-${party.id}`} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        {party.type === 'individual' ? 
                                                                            <UserCheck className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2" aria-hidden="true" /> : 
                                                                            <Building className="h-4 w-4 text-green-500 dark:text-green-400 mr-2" aria-hidden="true" />
                                                                        }
                                                                        <div>
                                                                            <p className="font-medium">{party.name}</p>
                                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                                {party.type === 'individual' ? 'Cédula:' : 'RIF:'} {party.identifier}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-2 sm:mt-0 flex gap-1">
                                                                        <Button 
                                                                            onClick={() => router.visit(
                                                                                party.type === 'individual' 
                                                                                    ? route('individuals.show', party.id) 
                                                                                    : route('legal-entities.show', party.id)
                                                                            )} 
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            title="Ver detalles"
                                                                        >
                                                                            <Eye className="h-4 w-4" />
                                                                        </Button>
                                                                        {!legalCase.closing_date && (
                                                                            <Button 
                                                                                onClick={() => confirmRemoveParticipant(party.id, party.type, party.name)}
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="text-red-500 hover:text-red-700"
                                                                                title="Eliminar participante"
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 dark:bg-zinc-800 rounded-md">
                                            <p>No hay partes relacionadas con este expediente.</p>
                                            {!legalCase.closing_date && (
                                                <Button
                                                    onClick={() => router.visit(route('case-participants.add-form', legalCase.id))}
                                                    className="mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                                                    size="sm"
                                                >
                                                    <UserPlus className="h-4 w-4 mr-2" />
                                                    Añadir Participante
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cronología del expediente (antes Historial de eventos) */}
                        <div className="mb-6">
                            <CaseEvents legalCase={legalCase} events={events} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Diálogo de confirmación para eliminar participante */}
            <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar Participante</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Está seguro que desea eliminar a <strong>{participantToRemove?.name}</strong> de este expediente?
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRemoveParticipant} className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Modal de cambio de estatus */}
            <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cambiar Estatus del Expediente</DialogTitle>
                        <div className="flex justify-center my-3">
                            <div className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md px-6 py-3 flex items-center justify-center">
                                <span className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase text-center">
                                    {currentStatus || (legalCase.closing_date ? 'CERRADO' : 'ACTIVO')}
                                </span>
                            </div>
                        </div>
                        <DialogDescription>
                            Selecciona un estatus existente o crea uno nuevo e indica el motivo del cambio.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        {!creatingStatus ? (
                            <>
                                <select
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    value={selectedStatus}
                                    onChange={e => setSelectedStatus(e.target.value)}
                                >
                                    <option value="">Seleccione un estatus</option>
                                    {availableStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                <Button variant="link" onClick={() => setCreatingStatus(true)} className="text-xs p-0">+ Crear nuevo estatus</Button>
                            </>
                        ) : (
                            <div>
                                <Input placeholder="Nuevo estatus" value={newStatus} onChange={e => setNewStatus(e.target.value)} />
                                <Button variant="link" onClick={() => setCreatingStatus(false)} className="text-xs p-0">Seleccionar existente</Button>
                            </div>
                        )}
                        <Input placeholder="Motivo del cambio (opcional)" value={statusReason} onChange={e => setStatusReason(e.target.value)} />
                    </div>
                    {/* Histórico de cambios de estatus dentro del modal */}
                    <div className="mt-6">
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Histórico de cambios de estatus</div>
                        <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
                            {statusHistory.length > 0 ? statusHistory.map((s, idx) => (
                                <div key={s.id || idx} className="bg-gray-50 dark:bg-zinc-800 rounded-md p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-xs border border-gray-200 dark:border-zinc-700">
                                    <div className="flex-1">
                                        <span className="block font-semibold text-base mb-1">{s.name}</span>
                                        <span className="block text-gray-500 text-xs mb-1">{new Date(s.created_at).toLocaleString('es-VE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                        {s.reason && <span className="block italic text-gray-400 text-xs">({s.reason})</span>}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-xs text-gray-500">No hay historial de estatus.</div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleStatusChange} disabled={(!selectedStatus && !newStatus)}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Botones flotantes para scroll vertical (gris 200, cuadrados) */}
            <div className="fixed bottom-3 right-3 z-50 flex flex-col gap-2">
                <button
                    onClick={handleScrollUp}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg p-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md border border-gray-300"
                    title="Desplazar hacia arriba"
                    aria-label="Desplazar hacia arriba"
                    style={{ width: 38, height: 38 }}
                >
                    <ArrowUp className="h-4 w-4" />
                </button>
                <button
                    onClick={handleScrollDown}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg p-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md border border-gray-300"
                    title="Desplazar hacia abajo"
                    aria-label="Desplazar hacia abajo"
                    style={{ width: 38, height: 38 }}
                >
                    <ArrowDown className="h-4 w-4" />
                </button>
            </div>
        </AppLayout>
    );
} 