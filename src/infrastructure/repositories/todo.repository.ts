import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { CreateTodoDTO, TodoEntity } from "@/src/entities/models/todo.entity";
import * as schema from "@/src/infrastructure/db/schema";
import { todos } from "@/src/infrastructure/db/schema";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { desc, eq } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { inject, injectable } from "inversify";

@injectable()
export class DrizzleTodoRepository implements TodoRepository {
  constructor(
    @inject(DI_SYMBOLS.Database)
    private readonly db: NeonHttpDatabase<typeof schema>
  ) {}
  async create(todoData: CreateTodoDTO): Promise<TodoEntity> {
    const [inserted] = await this.db
      .insert(todos)
      .values({
        title: todoData.title,
        description: todoData.description,
      })
      .returning();

    return inserted;
  }

  async findById(id: TodoEntity["id"]): Promise<TodoEntity | null> {
    const [result] = await this.db
      .select()
      .from(todos)
      .where(eq(todos.id, id.toString()))
      .limit(1);

    return result;
  }

  async findAll(): Promise<TodoEntity[]> {
    const results = await this.db
      .select()
      .from(todos)
      .orderBy(desc(todos.updatedAt));

    return results;
  }

  async update(
    todoId: TodoEntity["id"],
    todo: TodoEntity
  ): Promise<TodoEntity> {
    const [updated] = await this.db
      .update(todos)
      .set({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, todoId.toString()))
      .returning();

    return updated;
  }

  async delete(id: TodoEntity["id"]): Promise<void> {
    await this.db.delete(todos).where(eq(todos.id, id.toString()));
  }

  async toggleComplete(todo: TodoEntity): Promise<TodoEntity> {
    const [updated] = await this.db
      .update(todos)
      .set({
        completed: todo.completed,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, todo.id.toString()))
      .returning();

    return updated;
  }
}
