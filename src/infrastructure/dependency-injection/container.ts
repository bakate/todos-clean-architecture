import "reflect-metadata";
import { Container } from "inversify";
import { db } from "@/src/infrastructure/db/connection";
import { DI_SYMBOLS } from "./symbols";
import { todoModule } from "./modules/todo/todo.module";

// Création du container principal
export const applicationContainer = new Container({
  defaultScope: "Singleton",
  autoBindInjectable: true,
});

const initializeContainer = () => {
  // Binding de la base de données
  applicationContainer.bind(DI_SYMBOLS.Database).toConstantValue(db);

  // Chargement des modules
  applicationContainer.load(todoModule);
};

initializeContainer();

// Helper pour récupérer les services typés
export const getService = <K extends keyof typeof DI_SYMBOLS>(symbol: K) => {
  return applicationContainer.get(DI_SYMBOLS[symbol]);
};
