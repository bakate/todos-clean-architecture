"use client";

import { TodoViewModel } from "@/src/interface-adapters/presenters/todo.presenter";
import { formatDate } from "@/src/presentation/shared/utils/date";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Checkbox } from "@heroui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

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
          }`}>
          <CardHeader className="min-h-[80px]">
            <div className="flex gap-2 flex-col h-full">
              <h2
                className={
                  "text-lg font-semibold leading-tight line-clamp-1 flex items-center gap-2"
                }>
                <Checkbox
                  defaultSelected={todo.completed}
                  color={todo.completed ? "success" : "default"}
                  lineThrough={todo.completed}
                  onChange={() => onToggleComplete(todo)}>
                  {todo.title}
                </Checkbox>
              </h2>
              <p
                className={`text-sm text-gray-500 line-clamp-2 ${
                  todo.completed ? "line-through" : ""
                }`}>
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
              onPress={() => onEdit(todo)}
              endContent={<LuPencil />}>
              Edit
            </Button>
            <Button
              variant="bordered"
              color="danger"
              size="sm"
              onPress={() => onDelete(todo)}
              endContent={<LuTrash2 />}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
