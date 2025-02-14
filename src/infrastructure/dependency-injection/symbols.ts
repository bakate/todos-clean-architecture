import { TodoRepository } from "@/src/domain/repositories/todo.repository";
import {
  CreateTodoUseCase,
  DeleteTodoUseCase,
  GetTodoUseCase,
  ListTodosUseCase,
  UpdateTodoUseCase,
} from "@/src/domain/usecases/todo";

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
  ListTodosUseCase: Symbol.for("ListTodosUseCase"),
} as const;

export interface DI_TYPES {
  // Infrastructure
  Database: unknown; // On précisera le type plus tard si nécessaire

  // Repositories
  TodoRepository: TodoRepository;

  // Use Cases (à ajouter plus tard)
  CreateTodoUseCase: CreateTodoUseCase;
  UpdateTodoUseCase: UpdateTodoUseCase;
  DeleteTodoUseCase: DeleteTodoUseCase;
  GetTodoUseCase: GetTodoUseCase;
  ListTodosUseCase: ListTodosUseCase;
}
