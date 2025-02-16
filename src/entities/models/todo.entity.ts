import { z } from "zod";

// Base schema for Todo properties
export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().max(500).nullable(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for creating a new Todo
export const CreateTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completed: true,
});

// Schema for updating a Todo
export const UpdateTodoSchema = TodoSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types inferred from the schemas
export type TodoEntity = z.infer<typeof TodoSchema>;
export type CreateTodoDTO = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoDTO = z.infer<typeof UpdateTodoSchema>;
