import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { CreateTodoController } from "@/src/interface-adapters/controllers/todos";

import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

import "reflect-metadata";

import {
  setupTest,
  teardownTest,
} from "@/tests/unit/application/use-cases/helpers/setup-test";

describe("CreateTodoController", () => {
  let useCase: CreateTodoController;
  let repository: TodoRepository;

  beforeEach(() => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<CreateTodoController>(
      DI_SYMBOLS.CreateTodoController,
    );
  });

  afterEach(teardownTest);

  it("throws an error if todo data is invalid", async () => {
    // Arrange

    const differentCases = [
      { title: "", description: "" },
      { title: "", description: "this is a description" },
    ];
    // Act & Assert
    differentCases.forEach(async (data) => {
      await expect(useCase.execute(data)).rejects.toThrowError("Invalid data");
    });

    // Verify it was not actually created
    const allTodos = await repository.findAll();

    expect(allTodos).toHaveLength(0);
  });
});
