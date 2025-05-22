import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { format, parse } from 'date-fns';
import { Plus } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    user: {
        id: number;
        name: string;
    };
}

interface Props {
    legalCase: {
        id: number;
    };
    events: Event[];
}

export const CaseEvents: React.FC<Props> = ({ legalCase, events }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const { errors, processing, reset } = useForm();
    const [collapsed, setCollapsed] = useState(true);
    const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEvent) {
            router.put(route('case-events.update', [legalCase.id, editingEvent.id]), {
                title,
                description,
                date,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setTitle('');
                    setDescription('');
                    setDate('');
                    setEditingEvent(null);
                    reset();
                },
            });
        } else {
            router.post(route('case-events.store', legalCase.id), {
                title,
                description,
                date,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setTitle('');
                    setDescription('');
                    setDate('');
                    reset();
                },
            });
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setTitle(event.title);
        setDescription(event.description);
        const dateValue = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
        setDate(dateValue);
        setIsDialogOpen(true);
    };

    const handleDelete = (eventId: number) => {
        if (confirm('¿Seguro que deseas eliminar este evento?')) {
            router.delete(route('case-events.destroy', [legalCase.id, eventId]), {
                preserveScroll: true,
            });
        }
    };

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="border dark:border-zinc-700 rounded-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-zinc-900 px-4 py-2 font-medium flex items-center justify-between cursor-pointer select-none" onClick={() => setCollapsed(v => !v)}>
                <span className="dark:text-gray-200">Cronología del expediente</span>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={e => { e.stopPropagation(); setEditingEvent(null); setIsDialogOpen(true); }}
                        size="icon"
                        variant="ghost"
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        title="Nuevo Evento"
                    >
                        <Plus className="h-7 w-7 text-gray-500 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400" strokeWidth={2.5} />
                    </Button>
                    <span className="ml-2">{collapsed ? '▼' : '▲'}</span>
                </div>
            </div>
            {!collapsed && (
                <div className="p-4 dark:bg-zinc-900">
                    {events.length > 0 ? (
                        <div className="space-y-4">
                            {events.map((event) => {
                                const isExpanded = expanded[event.id];
                                const preview = event.description.length > 300 ? event.description.slice(0, 300) + '...' : event.description;
                                return (
                                    <div key={event.id} className="bg-gray-50 dark:bg-zinc-800 rounded-md p-4 shadow-xs border border-gray-200 dark:border-zinc-700 flex flex-col gap-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <span className="block font-semibold text-base mb-1 truncate">{event.title}</span>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <span className="block text-gray-500 text-xs mb-1">{event.date
                                                    ? (() => {
                                                        const [year, month, day] = event.date.substring(0, 10).split('-');
                                                        return `${day}/${month}/${year}`;
                                                    })()
                                                    : 'Sin fecha'}</span>
                                            </div>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line mb-2">
                                            {isExpanded ? event.description : preview}
                                            {event.description.length > 300 && (
                                                <button
                                                    className="ml-2 text-blue-600 dark:text-blue-400 text-xs underline focus:outline-none"
                                                    onClick={() => toggleExpand(event.id)}
                                                >
                                                    {isExpanded ? 'Ver menos' : 'Ver más'}
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                                            <div className="text-xs text-gray-400">
                                                Registrado por: {event.user.name}
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <Button size="icon" variant="ghost" onClick={() => handleEdit(event)} title="Editar">
                                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0v3.586a2 2 0 002 2h3.586a2 2 0 002-2V13" /></svg>
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => handleDelete(event.id)} title="Eliminar">
                                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                            No hay eventos registrados
                        </p>
                    )}
                </div>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingEvent ? 'Editar Evento' : 'Registrar Nuevo Evento'}</DialogTitle>
                        <DialogDescription>
                            {editingEvent 
                                ? 'Modifique los detalles del evento seleccionado.'
                                : 'Complete los detalles del nuevo evento para el expediente.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Título</label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                maxLength={255}
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea
                                className="w-full border rounded-md px-3 py-2 text-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={6}
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha</label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}>{editingEvent ? 'Actualizar' : 'Guardar Evento'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}; 