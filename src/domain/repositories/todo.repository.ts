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
  toggleComplete(todo: TodoEntity): Promise<TodoEntity>;
}
