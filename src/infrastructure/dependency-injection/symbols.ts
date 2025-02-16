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
import type { CreateTodoController } from "@/src/interface-adapters/controllers/todos";
import type { DeleteTodoController } from "@/src/interface-adapters/controllers/todos/delete-todo.controller";

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

  // Controllers
  CreateTodoController: Symbol.for("CreateTodoController"),
  DeleteTodoController: Symbol.for("DeleteTodoController"),
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

  // Controllers
  CreateTodoController: CreateTodoController;
  DeleteTodoController: DeleteTodoController;
}
