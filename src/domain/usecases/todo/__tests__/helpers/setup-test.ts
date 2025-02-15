import { vi } from "vitest";
import { testContainer, mockRepository } from "@/src/infrastructure/dependency-injection/container.test";

export const setupTest = () => {
  // Réinitialiser le container pour chaque test
  testContainer.snapshot();

  // Réinitialiser tous les mocks en une seule fois
  vi.clearAllMocks();

  return {
    repository: mockRepository,
  };
};

export const teardownTest = () => {
  // Restaurer l'état initial du container après chaque test
  testContainer.restore();
};
