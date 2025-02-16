import { injectable } from "inversify";

import { TodoEntity, TodoId, CreateTodoDTO } from "@/src/entities/todo.entity";
import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";

@injectable()
export class MockTodoRepository implements TodoRepository {
  private todos: TodoEntity[] = [];

  async create(todoData: CreateTodoDTO): Promise<TodoEntity> {
    const todo = TodoEntity.create({
      title: todoData.title,
      description: todoData.description,
    });
    this.todos.push(todo);
    return todo;
  }

  async findById(id: TodoId): Promise<TodoEntity | null> {
    return (
      this.todos.find((todo) => todo.id.toString() === id.toString()) || null
    );
  }

  async findAll(): Promise<TodoEntity[]> {
    return [...this.todos].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async update(todo: TodoEntity): Promise<TodoEntity> {
    const index = this.todos.findIndex(
      (t) => t.id.toString() === todo.id.toString()
    );
    if (index === -1) throw new Error("Todo not found");

    this.todos[index] = todo;
    return todo;
  }

  async delete(id: TodoId): Promise<void> {
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

    todo.toggle();
    this.todos[index] = todo;
    return todo;
  }
}
