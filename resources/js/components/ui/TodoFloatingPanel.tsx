import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { TodoPanelContent } from './TodoPanelContent';

interface TodoFloatingPanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export const TodoFloatingPanel: React.FC<TodoFloatingPanelProps> = ({ open, onClose, title = 'Lista de Tareas' }) => {
  const [createListTrigger, setCreateListTrigger] = useState(0);
  if (!open) return null;
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-label="Cerrar panel de tareas"
      />
      {/* Panel flotante */}
      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-4/5 md:w-1/2 max-w-lg bg-white dark:bg-zinc-950 shadow-lg z-50 flex flex-col transition-transform duration-300 animate-in slide-in-from-right"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCreateListTrigger(t => t + 1)}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-label="Crear nueva lista"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <TodoPanelContent createListTrigger={createListTrigger} panelOpen={false} />
        </div>
      </aside>
    </>
  );
}; 