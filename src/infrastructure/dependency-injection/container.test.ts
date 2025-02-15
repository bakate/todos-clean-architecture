import "reflect-metadata";
import { Container } from "inversify";
import { DI_SYMBOLS } from "./symbols";
import { vi } from "vitest";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";
import {
  CreateTodoUseCase,
  DeleteTodoUseCase,
  GetTodoUseCase,
  ListTodosUseCase,
  ToggleTodoCompleteUseCase,
  UpdateTodoUseCase,
} from "@/src/domain/usecases/todo";
import { TodoEntity } from "@/src/domain/entities/todo.entity";

// Création du container de test
export const testContainer = new Container({
  defaultScope: "Singleton",
  autoBindInjectable: true,
});

// Mock repository for tests
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

// Initialize test container
const initializeTestContainer = () => {
  // Bind mock repository
  testContainer.bind<TodoRepository>(DI_SYMBOLS.TodoRepository).toConstantValue(mockTodoRepository);

  // Bind use cases
  testContainer.bind(DI_SYMBOLS.CreateTodoUseCase).to(CreateTodoUseCase).inSingletonScope();
  testContainer.bind(DI_SYMBOLS.GetTodoUseCase).to(GetTodoUseCase).inSingletonScope();
  testContainer.bind(DI_SYMBOLS.ListTodosUseCase).to(ListTodosUseCase).inSingletonScope();
  testContainer.bind(DI_SYMBOLS.UpdateTodoUseCase).to(UpdateTodoUseCase).inSingletonScope();
  testContainer.bind(DI_SYMBOLS.DeleteTodoUseCase).to(DeleteTodoUseCase).inSingletonScope();
  testContainer.bind(DI_SYMBOLS.ToggleTodoCompleteUseCase)
    .to(ToggleTodoCompleteUseCase)
    .inSingletonScope();
};

initializeTestContainer();

// Exporter le mock repository pour les tests
export const mockRepository = mockTodoRepository;
