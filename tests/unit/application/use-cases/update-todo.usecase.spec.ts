import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { UpdateTodoUseCase } from "@/src/application/use-cases/todo/update-todo.usecase";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setupTest, teardownTest } from "./helpers/setup-test";

describe("UpdateTodoUseCase", () => {
  let useCase: UpdateTodoUseCase;
  let repository: TodoRepository;

  beforeEach(() => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<UpdateTodoUseCase>(
      DI_SYMBOLS.UpdateTodoUseCase
    );
  });

  afterEach(teardownTest);

  it("should update a todo successfully", async () => {
    // Arrange
    const todo = await repository.create({
      title: "Original Title",
      description: "Original Description",
    });
    const updateData = {
      title: "Updated Title",
      description: "Updated Description",
    };

    // Act
    const result = await useCase.execute(todo.id, updateData);

    // Assert
    expect(result.title).toBe(updateData.title);
    expect(result.description).toBe(updateData.description);
  });
});
