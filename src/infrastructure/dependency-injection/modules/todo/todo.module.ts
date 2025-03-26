import { ContainerModule } from "inversify";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";

// use cases
import * as useCases from "@/src/application/use-cases/todo";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { DrizzleTodoRepository } from "@/src/infrastructure/repositories/todo.repository";
import { MockTodoRepository } from "@/src/infrastructure/repositories/todo.repository.mock";
// controllers
import * as controllers from "@/src/interface-adapters/controllers/todos";

const { todoControllersKeys } = controllers;

const { useCaseKeys } = useCases;

const isTestEnvironment = process.env.NODE_ENV === "test";

const TodoRepositoryImpl = isTestEnvironment
  ? MockTodoRepository
  : DrizzleTodoRepository;

const allUseCases = Object.fromEntries(
  useCaseKeys.map(useCaseKey => [useCaseKey, useCases[useCaseKey]]),
);

const allControllers = Object.fromEntries(
  todoControllersKeys.map(controllerKey => [
    controllerKey,
    controllers[controllerKey],
  ]),
);

export const todoModule = new ContainerModule((bind) => {
  // Repository
  bind<TodoRepository>(DI_SYMBOLS.TodoRepository)
    .to(TodoRepositoryImpl)
    .inSingletonScope();

  // Use Cases
  Object.entries(allUseCases).forEach(([key, useCase]) => {
    bind(DI_SYMBOLS[key as keyof typeof DI_SYMBOLS])
      .to(useCase)
      .inSingletonScope();
  });

  // Controllers
  Object.entries(allControllers).forEach(([key, controller]) => {
    bind(DI_SYMBOLS[key as keyof typeof DI_SYMBOLS])
      .to(controller)
      .inSingletonScope();
  });
});
