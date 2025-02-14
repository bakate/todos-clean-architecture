"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createTodo, deleteTodo, updateTodo } from "../actions/todos";
import { EditTodoDialog } from "../components/EditTodoDialog";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import {
  TodoPresenterResult,
  TodoViewModel,
} from "../presenters/todo.presenter";
import { HomePageSkeleton } from "./home-page.skeleton";

export function HomePageScreen({
  initialTodos,
}: {
  initialTodos: TodoPresenterResult<TodoViewModel[]>;
}) {
  const [todos, setTodos] = useState<TodoViewModel[]>(
    initialTodos.success ? initialTodos.data ?? [] : []
  );
  const [editingTodo, setEditingTodo] = useState<TodoViewModel | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCreate = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createTodo(formData);
      if (result.success && result.data) {
        setTodos((prev) => [...prev, result.data as TodoViewModel]);
      }
    });
  };

  const handleUpdate = async (formData: FormData) => {
    startTransition(async () => {
      if (!editingTodo) return;

      const result = await updateTodo(editingTodo.id, formData);
      if (result.success && result.data) {
        setTodos((prev) =>
          prev.map((todo: TodoViewModel) =>
            todo.id === editingTodo.id ? (result.data as TodoViewModel) : todo
          )
        );
        toast.success("Todo updated");
      }
    });
  };

  const handleDelete = async (todo: TodoViewModel) => {
    startTransition(async () => {
      const result = await deleteTodo(todo.id);
      if (result.success) {
        setTodos((prev) => prev.filter((t) => t.id !== todo.id));
        toast.success("Todo deleted");
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
          />
        </div>
      </div>

      <EditTodoDialog
        todo={editingTodo}
        open={editingTodo !== null}
        onOpenChange={(open) => !open && setEditingTodo(null)}
        onSubmit={handleUpdate}
      />
    </main>
  );
}
