import {
  CreateTodoDTO,
  TodoEntity,
  type UpdateTodoDTO,
} from "@/src/entities/models/todo.entity";

export interface TodoRepository {
  create(todo: CreateTodoDTO): Promise<TodoEntity>;
  findById(id: TodoEntity["id"]): Promise<TodoEntity | null>;
  findAll(): Promise<TodoEntity[]>;
  update(id: TodoEntity["id"], todo: UpdateTodoDTO): Promise<TodoEntity>;
  delete(id: TodoEntity["id"]): Promise<void>;
  toggleComplete(todo: TodoEntity): Promise<TodoEntity>;
}
