"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import type {
  TodoPresenterResult,
  TodoViewModel,
} from "@/src/interface-adapters/presenters/todo.presenter";

import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoComplete,
  updateTodo,
} from "../actions/todos";
import { EditTodoDialog } from "../components/EditTodoDialog";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { HomePageSkeleton } from "./home-page.skeleton";

export function HomePageScreen({
  initialTodos,
}: {
  initialTodos: TodoPresenterResult<TodoViewModel[]>;
}) {
  const [todos, setTodos] = useState<TodoViewModel[]>(
    initialTodos.success ? initialTodos.data ?? [] : [],
  );

  const [editingTodo, setEditingTodo] = useState<TodoViewModel | null>(null);
  const [isPending, startTransition] = useTransition();

  const refreshTodos = async () => {
    const result = await getTodos();
    if (result.success && result.data) {
      setTodos(result.data);
    }
  };
  const handleCreate = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createTodo(formData);
      if (result.success && result.data) {
        await refreshTodos();
        toast.success("Todo created");
      }
    });
  };

  const handleUpdate = async (formData: FormData) => {
    startTransition(async () => {
      if (!editingTodo) {
        return;
      }

      const result = await updateTodo(editingTodo.id, formData);
      if (result.success && result.data) {
        await refreshTodos();
        toast.success("Todo updated");
      }
    });
  };

  const handleDelete = async (todo: TodoViewModel) => {
    startTransition(async () => {
      const result = await deleteTodo(todo.id);
      if (result.success) {
        await refreshTodos();
      }
    });
  };

  const handleToggleComplete = async (todo: TodoViewModel) => {
    startTransition(async () => {
      const result = await toggleTodoComplete(todo.id);
      if (result.success && result.data) {
        await refreshTodos();
        toast.success(
          `Todo ${result.data.completed ? "terminée" : "réactivée"}`,
        );
      }
    });
  };
  if (isPending) {
    return <HomePageSkeleton />;
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Todo List</h1>

      <div className="grid gap-8 md:grid-cols-[350px,1fr]">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
          <TodoForm onSubmit={handleCreate} submitLabel="Create Todo" />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
          <TodoList
            todos={todos}
            onEdit={setEditingTodo}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      <EditTodoDialog
        todo={editingTodo}
        open={editingTodo !== null}
        onOpenChange={open => !open && setEditingTodo(null)}
        onSubmit={handleUpdate}
      />
    </main>
  );
}
