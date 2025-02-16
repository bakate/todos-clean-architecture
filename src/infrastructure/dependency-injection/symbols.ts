import { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import {
  CreateTodoUseCase,
  DeleteTodoUseCase,
  GetTodoUseCase,
  ListTodosUseCase,
  ToggleTodoCompleteUseCase,
  UpdateTodoUseCase,
} from "@/src/application/use-cases/todo";
import type { DrizzleTodoRepository } from "@/src/infrastructure/repositories/todo.repository";

export const DI_SYMBOLS = {
  // Infrastructure
  Database: Symbol.for("Database"),

  // Repositories
  TodoRepository: Symbol.for("TodoRepository"),

  // Use Cases (à ajouter plus tard)
  CreateTodoUseCase: Symbol.for("CreateTodoUseCase"),
  UpdateTodoUseCase: Symbol.for("UpdateTodoUseCase"),
  DeleteTodoUseCase: Symbol.for("DeleteTodoUseCase"),
  GetTodoUseCase: Symbol.for("GetTodoUseCase"),
  ToggleTodoCompleteUseCase: Symbol.for("ToggleTodoCompleteUseCase"),
  ListTodosUseCase: Symbol.for("ListTodosUseCase"),
} as const;

export interface DI_TYPES {
  // Infrastructure
  Database: DrizzleTodoRepository;

  // Repositories
  TodoRepository: TodoRepository;

  // Use Cases (à ajouter plus tard)
  CreateTodoUseCase: CreateTodoUseCase;
  UpdateTodoUseCase: UpdateTodoUseCase;
  DeleteTodoUseCase: DeleteTodoUseCase;
  GetTodoUseCase: GetTodoUseCase;
  ListTodosUseCase: ListTodosUseCase;
  ToggleTodoCompleteUseCase: ToggleTodoCompleteUseCase;
}
