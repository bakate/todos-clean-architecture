import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { ToggleTodoCompleteController } from "@/src/interface-adapters/controllers/todos";

import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

import "reflect-metadata";

import {
  setupTest,
  teardownTest,
} from "@/tests/unit/application/use-cases/helpers/setup-test";

describe("ToggleTodoCompleteController", () => {
  let useCase: ToggleTodoCompleteController;
  let repository: TodoRepository;

  beforeEach(async () => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<ToggleTodoCompleteController>(
      DI_SYMBOLS.ToggleTodoCompleteController,
    );
  });

  afterEach(teardownTest);

  it("throws an error if todoId is invalid", async () => {
    // Arrange
    const invalidTodoId = "invalid-id";

    // Act & Assert
    await expect(useCase.execute(invalidTodoId)).rejects.toThrowError(
      `Id is invalid`,
    );
  });

  it("throws an error if todo does not exist", async () => {
    // Arrange
    const invalidTodoId = crypto.randomUUID();

    // Act & Assert
    await expect(useCase.execute(invalidTodoId)).rejects.toThrowError(
      `Todo with id ${invalidTodoId} not found`,
    );
  });

  it("toggles a todo successfully", async () => {
    // Arrange
    const todoToUpdate = await repository.create({
      title: "Test Todo",
      description: null,
    });
    // Act
    const response = await useCase.execute(todoToUpdate.id);

    // Assert
    expect(response).toBeDefined();
    expect(response.data?.completed).toBe(true);
  });
});
