"use client";

import { useRef, useTransition } from "react";
import { Button, Input, Textarea } from "@heroui/react";
import { TodoViewModel } from "../presenters/todo.presenter";

interface TodoFormProps {
  todo?: TodoViewModel;
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel: string;
}

export function TodoForm({ todo, onSubmit, submitLabel }: TodoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await onSubmit(formData);
      formRef.current?.reset();
    });
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="space-y-4 rounded-lg border p-4"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={todo?.title}
          placeholder="Enter todo title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          defaultValue={todo?.description}
          placeholder="Enter todo description"
          rows={3}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : submitLabel}
      </Button>
    </form>
  );
}
