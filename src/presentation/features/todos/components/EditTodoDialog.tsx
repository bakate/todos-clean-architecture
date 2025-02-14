"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useTransition } from "react";
import { TodoViewModel } from "../presenters/todo.presenter";
import { TodoForm } from "./TodoForm";

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
  if (!todo) return null;

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
