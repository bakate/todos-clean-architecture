import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type {
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
import type { ToggleTodoCompleteController } from "@/src/interface-adapters/controllers/todos/toggle-todo-complete.controller";
import type { UpdateTodoController } from "@/src/interface-adapters/controllers/todos/update-todo.controller";

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
  UpdateTodoController: Symbol.for("UpdateTodoController"),
  ToggleTodoCompleteController: Symbol.for("ToggleTodoCompleteController"),
} as const;

export type DI_TYPES = {
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
  UpdateTodoController: UpdateTodoController;
  ToggleTodoCompleteController: ToggleTodoCompleteController;
};
