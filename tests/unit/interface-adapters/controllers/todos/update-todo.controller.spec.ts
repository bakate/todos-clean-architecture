import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { TodoEntity } from "@/src/entities/models/todo.entity";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import type { UpdateTodoController } from "@/src/interface-adapters/controllers/todos";
import {
  setupTest,
  teardownTest,
} from "@/tests/unit/application/use-cases/helpers/setup-test";
import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("UpdateTodoController", () => {
  let useCase: UpdateTodoController;
  let repository: TodoRepository;
  let todoToUpdate: TodoEntity;

  beforeEach(async () => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<UpdateTodoController>(
      DI_SYMBOLS.UpdateTodoController
    );
    todoToUpdate = await repository.create({
      title: "Test Todo",
      description: null,
    });
  });

  afterEach(teardownTest);

  it("throws an error if todoId is invalid", async () => {
    // Arrange
    const invalidTodoId = crypto.randomUUID();

    // Act & Assert
    await expect(
      useCase.execute(invalidTodoId, todoToUpdate)
    ).rejects.toThrowError(`Todo with id ${invalidTodoId} not found`);
  });

  it("throws an error if data is invalid", async () => {
    // Arrange
    const invalidTodoId = crypto.randomUUID();

    // Act & Assert
    await expect(
      useCase.execute(invalidTodoId, todoToUpdate)
    ).rejects.toThrowError(`Todo with id ${invalidTodoId} not found`);
  });

  it("updates a todo successfully", async () => {
    // Arrange
    const { id, ...data } = todoToUpdate;

    // Act
    const response = await useCase.execute(id, {
      ...data,
      title: "Updated Title",
      description: "Updated Description",
    });

    // Assert
    expect(response.data?.title).toBe("Updated Title");
    expect(response.data?.description).toBe("Updated Description");
  });
});
