import { vi } from "vitest";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

export const setupTest = () => {
  // Réinitialiser le container pour chaque test
  applicationContainer.snapshot();
  const repository = applicationContainer.get<TodoRepository>(
    DI_SYMBOLS.TodoRepository
  );

  // Réinitialiser tous les mocks en une seule fois
  vi.clearAllMocks();

  return {
    repository,
  };
};

export const teardownTest = () => {
  // Restaurer l'état initial du container après chaque test
  applicationContainer.restore();
};
