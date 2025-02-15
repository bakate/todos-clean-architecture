import { injectable, inject } from "inversify";
import { eq, desc } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { todos } from "@/src/infrastructure/db/schema";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";
import {
  TodoEntity,
  TodoId,
  CreateTodoDTO,
} from "@/src/domain/entities/todo.entity";
import * as schema from "@/src/infrastructure/db/schema";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

// Fonction utilitaire pour convertir null en undefined
const nullToUndefined = <T>(value: T | null): T | undefined =>
  value === null ? undefined : value;

@injectable()
export class DrizzleTodoRepository implements TodoRepository {
  constructor(
    @inject(DI_SYMBOLS.Database)
    private readonly db: PostgresJsDatabase<typeof schema>
  ) {}
  async create(todoData: CreateTodoDTO): Promise<TodoEntity> {
    const [inserted] = await this.db
      .insert(todos)
      .values({
        title: todoData.title,
        description: todoData.description,
      })
      .returning();

    return TodoEntity.reconstitute({
      id: inserted.id,
      title: inserted.title,
      description: nullToUndefined(inserted.description),
      completed: inserted.completed,
      createdAt: inserted.createdAt,
      updatedAt: inserted.updatedAt,
    });
  }

  async findById(id: TodoId): Promise<TodoEntity | null> {
    const result = await this.db
      .select()
      .from(todos)
      .where(eq(todos.id, id.toString()))
      .limit(1);

    if (!result.length) return null;

    return TodoEntity.reconstitute({
      id: result[0].id,
      title: result[0].title,
      description: nullToUndefined(result[0].description),
      completed: result[0].completed,
      createdAt: result[0].createdAt,
      updatedAt: result[0].updatedAt,
    });
  }

  async findAll(): Promise<TodoEntity[]> {
    const results = await this.db
      .select()
      .from(todos)
      .orderBy(desc(todos.updatedAt));

    return results.map((todo) =>
      TodoEntity.reconstitute({
        id: todo.id,
        title: todo.title,
        description: nullToUndefined(todo.description),
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      })
    );
  }

  async update(todo: TodoEntity): Promise<TodoEntity> {
    const [updated] = await this.db
      .update(todos)
      .set({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, todo.id.toString()))
      .returning();

    return TodoEntity.reconstitute({
      id: updated.id,
      title: updated.title,
      description: nullToUndefined(updated.description),
      completed: updated.completed,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: TodoId): Promise<void> {
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

    return TodoEntity.reconstitute({
      id: updated.id,
      title: updated.title,
      description: nullToUndefined(updated.description),
      completed: updated.completed,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }
}
