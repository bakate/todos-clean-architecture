"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { TodoViewModel } from "../presenters/todo.presenter";
import { formatDate } from "@/src/presentation/shared/utils/date";

interface TodoListProps {
  todos: TodoViewModel[];
  onEdit: (todo: TodoViewModel) => void;
  onDelete: (todo: TodoViewModel) => void;
  onToggleComplete: (todo: TodoViewModel) => void;
}

export function TodoList({
  todos,
  onEdit,
  onDelete,
  onToggleComplete,
}: TodoListProps) {
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
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 grid-rows-[auto]">
      {todos.map((todo) => (
        <Card
          key={todo.id}
          className={`max-w-[400px] grid grid-rows-[auto_1fr_auto] ${
            todo.completed ? "border-success-200 bg-success-50" : ""
          }`}
        >
          <CardHeader className="min-h-[80px]">
            <div className="flex gap-2 flex-col h-full">
              <h2
                className={`text-lg font-semibold leading-tight line-clamp-1 flex items-center gap-2 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 border-2 rounded ${
                    todo.completed
                      ? "border-success bg-success text-white"
                      : "border-gray-300"
                  }`}
                >
                  {todo.completed && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                {todo.title}
              </h2>
              <p
                className={`text-sm text-gray-500 line-clamp-2 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo?.description}
              </p>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">Created:</span>
              <time dateTime={todo.createdAt}>
                {formatDate(todo.createdAt)}
              </time>
            </div>
            {todo.updatedAt && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium text-neutral-500">Updated:</span>
                <time dateTime={todo.updatedAt}>
                  {formatDate(todo.updatedAt)}
                </time>
              </div>
            )}
          </CardBody>
          <CardFooter className="gap-2">
            <Button
              variant="bordered"
              size="sm"
              color={todo.completed ? "warning" : "success"}
              onPress={() => onToggleComplete(todo)}
            >
              {todo.completed ? "Annuler" : "Terminer"}
            </Button>
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
