import "reflect-metadata";
import { Container } from "inversify";
import { db } from "@/src/infrastructure/db/connection";
import { DI_SYMBOLS } from "./symbols";
import { todoModule } from "./modules/todo/todo.module";
import { todoTestModule } from "./modules/todo/todo.module.mock";
import { isTestEnvironment } from "../config/environment";

// Création du container principal
export const applicationContainer = new Container({
  defaultScope: "Singleton",
  autoBindInjectable: true,
});

const initializeContainer = () => {
  // Binding de la base de données (seulement en production)
  if (!isTestEnvironment()) {
    applicationContainer.bind(DI_SYMBOLS.Database).toConstantValue(db);
  }

  // Chargement des modules en fonction de l'environnement
  applicationContainer.load(isTestEnvironment() ? todoTestModule : todoModule);
};

initializeContainer();

// Helper pour récupérer les services typés
export const getService = <K extends keyof typeof DI_SYMBOLS>(symbol: K) => {
  return applicationContainer.get(DI_SYMBOLS[symbol]);
};
