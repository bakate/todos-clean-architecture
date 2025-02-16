import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import type { DeleteTodoController } from "@/src/interface-adapters/controllers/todos/delete-todo.controller";
import {
  setupTest,
  teardownTest,
} from "@/tests/unit/application/use-cases/helpers/setup-test";
import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("DeleteTodoController", () => {
  let useCase: DeleteTodoController;
  let repository: TodoRepository;

  beforeEach(async () => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<DeleteTodoController>(
      DI_SYMBOLS.DeleteTodoController
    );
  });

  afterEach(teardownTest);

  it("throws an error if todoId is invalid", async () => {
    // Arrange
    await repository.create({
      title: "Test Todo",
      description: null,
    });

    const invalidTodoId = "invalid-id";

    // Act & Assert
    await expect(useCase.execute(invalidTodoId)).rejects.toThrowError(
      "Id is invalid"
    );
  });

  it("throws an error if todo is not found", async () => {
    // Arrange
    await repository.create({
      title: "Test Todo",
      description: null,
    });

    const invalidTodoId = crypto.randomUUID();

    // Act & Assert
    await expect(useCase.execute(invalidTodoId)).rejects.toThrowError(
      `Todo with id ${invalidTodoId} not found`
    );
  });

  it("deletes a todo successfully", async () => {
    // Arrange
    const todo = await repository.create({
      title: "Test Todo",
      description: null,
    });

    // Act
    await useCase.execute(todo.id);

    // Assert
    const todos = await repository.findAll();
    expect(todos).toHaveLength(0);
  });
});
