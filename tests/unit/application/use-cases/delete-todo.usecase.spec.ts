import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { DeleteTodoUseCase } from "@/src/application/use-cases/todo/delete-todo.usecase";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setupTest, teardownTest } from "./helpers/setup-test";

describe("DeleteTodoUseCase", () => {
  let useCase: DeleteTodoUseCase;
  let repository: TodoRepository;

  beforeEach(() => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<DeleteTodoUseCase>(
      DI_SYMBOLS.DeleteTodoUseCase
    );
  });

  afterEach(teardownTest);

  it("should delete a todo successfully", async () => {
    // Arrange
    const todo = await repository.create({
      title: "Test Todo",
      description: "Test Description",
    });

    // Verify todo was created
    const todosBeforeDelete = await repository.findAll();
    expect(todosBeforeDelete).toHaveLength(1);

    // Act
    await useCase.execute(todo.id);

    // Assert
    const todosAfterDelete = await repository.findAll();
    expect(todosAfterDelete).toHaveLength(0);
  });
});
