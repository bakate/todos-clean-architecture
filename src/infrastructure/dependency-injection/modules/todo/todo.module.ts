import { ContainerModule } from "inversify";

import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { MockTodoRepository } from "@/src/infrastructure/repositories/__mocks__/todo.repository";

import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { DrizzleTodoRepository } from "@/src/infrastructure/repositories/todo.repository";

// Mocks and Real use cases
import * as RealUseCases from "@/src/application/use-cases/todo";
import * as MockUseCases from "@/src/application/use-cases/todo/__mocks__";

const { useCaseKeys } = RealUseCases;

const isTestEnvironment = process.env.NODE_ENV === "test";

const TodoRepositoryImpl = isTestEnvironment
  ? MockTodoRepository
  : DrizzleTodoRepository;

const useCases = Object.fromEntries(
  useCaseKeys.map((useCase) => [
    useCase,
    isTestEnvironment ? MockUseCases[`Mock${useCase}`] : RealUseCases[useCase],
  ])
);

export const todoModule = new ContainerModule((bind) => {
  // Repository
  bind<TodoRepository>(DI_SYMBOLS.TodoRepository)
    .to(TodoRepositoryImpl)
    .inSingletonScope();

  // Use Cases
  Object.entries(useCases).forEach(([key, useCase]) => {
    bind(DI_SYMBOLS[key as keyof typeof DI_SYMBOLS])
      .to(useCase)
      .inSingletonScope();
  });
});
