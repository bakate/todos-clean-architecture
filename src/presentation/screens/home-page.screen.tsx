"use client";
import { useState } from "react";
import { createTodo, updateTodo, deleteTodo } from "@/src/app/actions/todos";
import { TodoForm } from "@/src/presentation/components/TodoForm";
import { TodoList } from "@/src/presentation/components/TodoList";
import { EditTodoDialog } from "@/src/presentation/components/EditTodoDialog";
import {
  TodoPresenterResult,
  TodoViewModel,
} from "../presenters/todo.presenter";
import { toast } from "sonner";

export function HomePageScreen({
  initialTodos,
}: {
  initialTodos: TodoPresenterResult<TodoViewModel[]>;
}) {
  const [todos, setTodos] = useState<TodoViewModel[]>(
    initialTodos.success ? initialTodos.data ?? [] : []
  );
  const [editingTodo, setEditingTodo] = useState<TodoViewModel | null>(null);

  const handleCreate = async (formData: FormData) => {
    const result = await createTodo(formData);
    if (result.success && result.data) {
      setTodos((prev) => [...prev, result.data as TodoViewModel]);
    }
  };

  const handleUpdate = async (formData: FormData) => {
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
  };

  const handleDelete = async (todo: TodoViewModel) => {
    const result = await deleteTodo(todo.id);
    if (result.success) {
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      toast.success("Todo deleted");
    }
  };

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
