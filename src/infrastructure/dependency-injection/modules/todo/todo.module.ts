import { ContainerModule } from "inversify";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";
import { DrizzleTodoRepository } from "@/src/infrastructure/repositories/todo.repository";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import {
  CreateTodoUseCase,
  GetTodoUseCase,
  ListTodosUseCase,
  UpdateTodoUseCase,
  DeleteTodoUseCase,
} from "@/src/domain/usecases/todo";

export const todoModule = new ContainerModule((bind) => {
  // Repositories
  bind<TodoRepository>(DI_SYMBOLS.TodoRepository)
    .to(DrizzleTodoRepository)
    .inSingletonScope();

  // Use Cases
  bind(DI_SYMBOLS.CreateTodoUseCase).to(CreateTodoUseCase).inSingletonScope();

  bind(DI_SYMBOLS.GetTodoUseCase).to(GetTodoUseCase).inSingletonScope();

  bind(DI_SYMBOLS.ListTodosUseCase).to(ListTodosUseCase).inSingletonScope();

  bind(DI_SYMBOLS.UpdateTodoUseCase).to(UpdateTodoUseCase).inSingletonScope();

  bind(DI_SYMBOLS.DeleteTodoUseCase).to(DeleteTodoUseCase).inSingletonScope();
});
