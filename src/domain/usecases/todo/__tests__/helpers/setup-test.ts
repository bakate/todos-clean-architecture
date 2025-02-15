import {
  applicationContainer,
  getTestRepository,
} from "@/src/infrastructure/dependency-injection/container";

export const setupTest = () => {
  // Réinitialiser le container pour chaque test
  applicationContainer.snapshot();

  return {
    repository: getTestRepository(),
  };
};

export const teardownTest = () => {
  // Restaurer l'état initial du container après chaque test
  applicationContainer.restore();
};
