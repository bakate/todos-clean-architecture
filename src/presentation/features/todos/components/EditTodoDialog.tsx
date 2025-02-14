"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
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
  if (!todo) return null;

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalBody>
          <TodoForm onSubmit={onSubmit} submitLabel="Update Todo" />
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
