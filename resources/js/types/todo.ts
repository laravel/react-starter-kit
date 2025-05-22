export interface TodoList {
    id: number;
    name: string;
    todos_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Todo {
    id: number;
    todo_list_id: number;
    title: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
} 