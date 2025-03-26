import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Schemas for validation with Zod
export const insertTodoSchema = createInsertSchema(todos, {
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
});

export const selectTodoSchema = createSelectSchema(todos);

// Types inferred from the schemas
export type Todo = z.infer<typeof selectTodoSchema>;
export type NewTodo = z.infer<typeof insertTodoSchema>;
