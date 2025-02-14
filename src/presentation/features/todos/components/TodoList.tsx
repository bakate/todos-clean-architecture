"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { TodoViewModel } from "../presenters/todo.presenter";

interface TodoListProps {
  todos: TodoViewModel[];
  onEdit: (todo: TodoViewModel) => void;
  onDelete: (todo: TodoViewModel) => void;
}

export function TodoList({ todos, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Card className="max-w-[400px] h-32">
        <CardBody className="h-full flex items-center justify-center">
          No todos yet. Create one to get started!
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo.id} className="max-w-[400px]">
          <CardHeader>
            <div className="flex gap-2 flex-col">
              <h2 className="text-lg font-semibold leading-tight line-clamp-1">
                {todo.title}
              </h2>
              <p className="text-sm text-gray-500">{todo?.description}</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-sm text-gray-500">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </div>
            {todo.updatedAt && (
              <div className="text-sm text-gray-500">
                Updated: {new Date(todo.updatedAt).toLocaleString()}
              </div>
            )}
          </CardBody>
          <CardFooter className="gap-2">
            <Button variant="bordered" size="sm" onPress={() => onEdit(todo)}>
              Edit
            </Button>
            <Button
              variant="solid"
              color="danger"
              size="sm"
              onPress={() => onDelete(todo)}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
