"use client";

import { TodoForm } from "./TodoForm";
import { Modal, ModalContent, ModalHeader } from "@heroui/react";
import { TodoViewModel } from "../presenters/todo.presenter";
import { useTransition } from "react";

interface EditTodoDialogProps {
  todo: TodoViewModel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function EditTodoDialog({
  todo,
  open,
  onOpenChange,
  onSubmit,
}: EditTodoDialogProps) {
  const [, startTransition] = useTransition();
  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        {todo && (
          <TodoForm
            todo={todo}
            onSubmit={async (formData) => {
              startTransition(async () => {
                await onSubmit(formData);
                onOpenChange(false);
              });
            }}
            submitLabel="Update Todo"
          />
        )}
      </ModalContent>
    </Modal>
  );
}
