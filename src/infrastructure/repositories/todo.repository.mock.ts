import { injectable } from "inversify";

import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import {
  CreateTodoDTO,
  TodoEntity,
  type UpdateTodoDTO,
} from "@/src/entities/models/todo.entity";

@injectable()
export class MockTodoRepository implements TodoRepository {
  private todos: TodoEntity[] = [];

  async create(todoData: CreateTodoDTO): Promise<TodoEntity> {
    const todo = {
      title: todoData.title,
      description: todoData.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID(),
    };
    this.todos.push(todo);
    return todo;
  }

  async findById(id: TodoEntity["id"]): Promise<TodoEntity | null> {
    return this.todos.find((todo) => todo.id === id) || null;
  }

  async findAll(): Promise<TodoEntity[]> {
    return [...this.todos].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async update(
    todoId: TodoEntity["id"],
    todo: UpdateTodoDTO
  ): Promise<TodoEntity> {
    const index = this.todos.findIndex(
      (t) => t.id.toString() === todoId.toString()
    );
    if (index === -1) throw new Error("Todo not found");

    this.todos[index] = {
      ...this.todos[index],
      ...todo,
      updatedAt: new Date(),
    };
    return this.todos[index];
  }

  async delete(id: TodoEntity["id"]): Promise<void> {
    const index = this.todos.findIndex(
      (todo) => todo.id.toString() === id.toString()
    );
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  async toggleComplete(todo: TodoEntity): Promise<TodoEntity> {
    const index = this.todos.findIndex(
      (t) => t.id.toString() === todo.id.toString()
    );
    if (index === -1) throw new Error("Todo not found");

    todo.completed = !todo.completed;
    this.todos[index] = todo;
    return todo;
  }
}
