import React, { useEffect, useState } from 'react';
import { TodoList, Todo } from '@/types/todo';
import { Plus, Trash2, Edit, Check, X, ListTodo } from 'lucide-react';
import { router } from '@inertiajs/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

interface TodoPanelContentProps {
  createListTrigger?: number;
  panelOpen?: boolean;
}

export const TodoPanelContent: React.FC<TodoPanelContentProps> = ({ createListTrigger, panelOpen }) => {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newListName, setNewListName] = useState('');
  const [showCreateList, setShowCreateList] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState<null | 'edit'>(null);
  const [editListName, setEditListName] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmDeleteListId, setConfirmDeleteListId] = useState<number | null>(null);
  const [confirmDeleteTodo, setConfirmDeleteTodo] = useState<Todo | null>(null);

  // Mostrar formulario de creación de lista cuando se dispare el trigger externo
  useEffect(() => {
    if (typeof createListTrigger === 'number' && createListTrigger > 0) {
      setNewListName('');
      setEditListName('');
      setShowCreateList(true);
    }
    // eslint-disable-next-line
  }, [createListTrigger]);

  // Cargar listas desde el backend al montar
  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line
  }, []);

  const fetchLists = async () => {
    const res = await fetch('/todo-lists', { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      const newLists = (data.lists as TodoList[]) || [];
      setLists(newLists);
      if (newLists.length && !newLists.find(l => l.id === selectedListId)) {
        setSelectedListId(newLists[0].id);
      } else if (!newLists.length) {
        setSelectedListId(null);
      }
    }
  };

  // Cargar tareas de la lista seleccionada
  const fetchTodos = async (listId: number) => {
    setLoading(true);
    const res = await fetch(`/todo-lists/${listId}/todos`, { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      setTodos((data.todos as Todo[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedListId) {
      fetchTodos(selectedListId);
    } else {
      setTodos([]);
    }
    // eslint-disable-next-line
  }, [selectedListId]);

  // Crear nueva lista
  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    const res = await fetch('/todo-lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
      },
      body: JSON.stringify({ name: newListName }),
    });
    if (res.ok) {
      setNewListName('');
      setShowCreateList(false);
      fetchLists();
    }
  };

  // Eliminar lista
  const handleDeleteList = async (id: number) => {
    const res = await fetch(`/todo-lists/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
      },
    });
    if (res.ok) {
      if (selectedListId === id) {
        const newLists = lists.filter(l => l.id !== id);
        setLists(newLists);
        setSelectedListId(newLists.length ? newLists[0].id : null);
        setTodos([]);
      }
      fetchLists();
    }
    setConfirmDeleteListId(null);
  };

  // Renombrar lista
  const handleRenameList = async () => {
    if (!editListName.trim() || !selectedListId) return;
    const res = await fetch(`/todo-lists/${selectedListId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
      },
      body: JSON.stringify({ name: editListName }),
    });
    if (res.ok) {
      setEditMode(null);
      setEditListName('');
      fetchLists();
    }
  };

  // Crear nueva tarea
  const handleCreateTodo = async () => {
    if (!newTodo.trim() || !selectedListId) return;
    const res = await fetch(`/todo-lists/${selectedListId}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
      },
      body: JSON.stringify({ title: newTodo }),
    });
    if (res.ok) {
      setNewTodo('');
      fetchTodos(selectedListId);
    }
  };

  // Marcar tarea como completada
  const handleToggleTodo = async (todo: Todo) => {
    const res = await fetch(`/todo-lists/${todo.todo_list_id}/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
      },
      body: JSON.stringify({ title: todo.title, is_completed: !todo.is_completed }),
    });
    if (res.ok) {
      fetchTodos(todo.todo_list_id);
    }
  };

  // Eliminar tarea
  const handleDeleteTodo = async (todo: Todo) => {
    const res = await fetch(`/todo-lists/${todo.todo_list_id}/todos/${todo.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
      },
    });
    if (res.ok) {
      fetchTodos(todo.todo_list_id);
    }
    setConfirmDeleteTodo(null);
  };

  // Ocultar el formulario de crear lista cuando el panel se cierra
  useEffect(() => {
    if (panelOpen === false) {
      setShowCreateList(false);
    }
  }, [panelOpen]);

  // Render
  if (!lists.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <ListTodo className="h-10 w-10 text-gray-400 mb-2" />
        <div className="text-gray-500 text-sm mb-2">Crea tu primera lista de tareas</div>
        <div className="flex gap-2 w-full max-w-xs">
          <input
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
            placeholder="Nombre de la lista"
            value={newListName}
            onChange={e => setNewListName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreateList()}
          />
          <button
            className="rounded bg-gray-200 hover:bg-gray-300 p-2"
            onClick={handleCreateList}
            title="Crear lista"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Separar tareas completadas y pendientes (preparado para futura mejora)
  const todosPendientes = todos.filter(t => !t.is_completed);
  const todosCompletados = todos.filter(t => t.is_completed);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Formulario de creación de lista */}
      {showCreateList && (
        <div className="flex gap-2 items-center mt-2">
          <input
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
            value={newListName}
            onChange={e => setNewListName(e.target.value)}
            placeholder="Nombre para la nueva lista de tareas"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleCreateList()}
          />
          <button
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={handleCreateList}
            title="Crear"
          >
            <Check className="h-4 w-4 text-green-600" />
          </button>
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => {
              setShowCreateList(false);
              setNewListName('');
            }}
            title="Cancelar"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
      {/* Selector de lista */}
      <div className="flex items-center gap-2">
        <select
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm bg-gray-100"
          value={selectedListId ?? ''}
          onChange={e => setSelectedListId(Number(e.target.value))}
        >
          {lists.map(list => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
        </select>
        <button
          className="rounded p-2 hover:bg-gray-100"
          onClick={() => {
            if (selectedListId) {
              const list = lists.find(l => l.id === selectedListId);
              setEditListName(list ? list.name : '');
              setNewListName('');
              setEditMode('edit');
            }
          }}
          title="Renombrar lista"
        >
          <Edit className="h-4 w-4 text-gray-500" />
        </button>
        <button
          className="rounded p-2 hover:bg-gray-100"
          onClick={() => setConfirmDeleteListId(selectedListId!)}
          title="Eliminar lista"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
      {/* Formulario de edición de lista */}
      {editMode === 'edit' && (
        <div className="flex gap-2 items-center mt-2">
          <input
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
            value={editListName}
            onChange={e => setEditListName(e.target.value)}
            placeholder="Nuevo nombre"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleRenameList()}
          />
          <button
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={handleRenameList}
            title="Guardar"
          >
            <Check className="h-4 w-4 text-green-600" />
          </button>
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => {
              setEditMode(null);
              setEditListName('');
            }}
            title="Cancelar"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
      {/* Lista de tareas */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Cargando...</div>
        ) : (
          <>
            <ul className="flex flex-col gap-2">
              {todosPendientes.map(todo => (
                <li key={todo.id} className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1">
                  <button
                    className={`rounded p-1 ${todo.is_completed ? 'bg-green-100' : 'bg-gray-200'} hover:bg-green-200`}
                    onClick={() => handleToggleTodo(todo)}
                    title={todo.is_completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                  >
                    <Check className={`h-4 w-4 ${todo.is_completed ? 'text-green-600' : 'text-gray-400'}`} />
                  </button>
                  <span className={`flex-1 text-sm ${todo.is_completed ? 'line-through text-gray-400' : ''}`}>{todo.title}</span>
                  <button
                    className="rounded p-1 hover:bg-red-100"
                    onClick={() => setConfirmDeleteTodo(todo)}
                    title="Eliminar tarea"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </li>
              ))}
            </ul>
            {todosCompletados.length > 0 && (
              <>
                <div className="text-xs text-gray-400 mt-4 mb-1">Completadas</div>
                <ul className="flex flex-col gap-2 opacity-70">
                  {todosCompletados.map(todo => (
                    <li key={todo.id} className="flex items-center gap-2 bg-gray-50 rounded px-2 py-1">
                      <button
                        className={`rounded p-1 bg-green-100 hover:bg-green-200`}
                        onClick={() => handleToggleTodo(todo)}
                        title="Marcar como pendiente"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </button>
                      <span className="flex-1 text-sm line-through text-gray-400">{todo.title}</span>
                      <button
                        className="rounded p-1 hover:bg-red-100"
                        onClick={() => setConfirmDeleteTodo(todo)}
                        title="Eliminar tarea"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
      {/* Agregar nueva tarea */}
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 rounded border border-green-500 px-2 py-1 text-sm"
          placeholder="Nueva tarea"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreateTodo()}
        />
        <button
          className="rounded bg-gray-200 hover:bg-gray-300 p-2"
          onClick={handleCreateTodo}
          title="Agregar tarea"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {/* Diálogo de confirmación para eliminar lista */}
      <AlertDialog open={!!confirmDeleteListId} onOpenChange={open => !open && setConfirmDeleteListId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar lista de tareas?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la lista y todas sus tareas asociadas. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteList(confirmDeleteListId!)} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Diálogo de confirmación para eliminar tarea */}
      <AlertDialog open={!!confirmDeleteTodo} onOpenChange={open => !open && setConfirmDeleteTodo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar tarea?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la tarea seleccionada. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteTodo(confirmDeleteTodo!)} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}; 