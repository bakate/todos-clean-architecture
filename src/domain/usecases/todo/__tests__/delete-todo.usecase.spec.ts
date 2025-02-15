import "reflect-metadata";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { DeleteTodoUseCase } from "@/src/domain/usecases/todo/delete-todo.usecase";
import { TodoId } from "@/src/domain/entities/todo.entity";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

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

  it("should throw an error if todo is not found", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());

    // Act & Assert
    await expect(useCase.execute(todoId)).rejects.toThrow("Todo with id");
  });
});
