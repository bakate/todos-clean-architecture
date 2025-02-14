import { ContainerModule } from "inversify";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { TodoEntity } from "@/src/domain/entities/todo.entity";
import { vi } from "vitest";
import {
  CreateTodoUseCase,
  DeleteTodoUseCase,
  GetTodoUseCase,
  ListTodosUseCase,
  ToggleTodoCompleteUseCase,
  UpdateTodoUseCase,
} from "@/src/domain/usecases/todo";

const mockTodoRepository: TodoRepository = {
  findById: vi.fn().mockResolvedValue(null),
  findAll: vi.fn().mockResolvedValue([]),
  create: vi
    .fn()
    .mockImplementation((data) => Promise.resolve(TodoEntity.create(data))),
  update: vi.fn().mockImplementation((todo) => Promise.resolve(todo)),
  delete: vi.fn().mockResolvedValue(undefined),
  toggleComplete: vi.fn().mockImplementation(() => {
    const todo = TodoEntity.create({ title: "Mock Todo" });
    return Promise.resolve(todo.toggle());
  }),
};

export const todoTestModule = new ContainerModule((bind) => {
  // Bind mock repository
  bind<TodoRepository>(DI_SYMBOLS.TodoRepository).toConstantValue(
    mockTodoRepository
  );

  // Bind use cases
  bind(DI_SYMBOLS.CreateTodoUseCase).to(CreateTodoUseCase).inSingletonScope();
  bind(DI_SYMBOLS.GetTodoUseCase).to(GetTodoUseCase).inSingletonScope();
  bind(DI_SYMBOLS.ListTodosUseCase).to(ListTodosUseCase).inSingletonScope();
  bind(DI_SYMBOLS.UpdateTodoUseCase).to(UpdateTodoUseCase).inSingletonScope();
  bind(DI_SYMBOLS.DeleteTodoUseCase).to(DeleteTodoUseCase).inSingletonScope();
  bind(DI_SYMBOLS.ToggleTodoCompleteUseCase)
    .to(ToggleTodoCompleteUseCase)
    .inSingletonScope();
});
