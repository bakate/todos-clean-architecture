import {
  TodoEntity,
  TodoId,
  CreateTodoDTO,
} from "@/src/domain/entities/todo.entity";

export interface TodoRepository {
  create(todo: CreateTodoDTO): Promise<TodoEntity>;
  findById(id: TodoId): Promise<TodoEntity | null>;
  findAll(): Promise<TodoEntity[]>;
  update(todo: TodoEntity): Promise<TodoEntity>;
  delete(id: TodoId): Promise<void>;
  toggleComplete(id: TodoId): Promise<TodoEntity>;
}
