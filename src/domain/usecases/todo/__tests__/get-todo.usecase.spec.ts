import "reflect-metadata";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { GetTodoUseCase } from "@/src/domain/usecases/todo/get-todo.usecase";
import { TodoId } from "@/src/domain/entities/todo.entity";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("GetTodoUseCase", () => {
  let useCase: GetTodoUseCase;
  let repository: TodoRepository;

  beforeEach(() => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<GetTodoUseCase>(
      DI_SYMBOLS.GetTodoUseCase
    );
  });

  afterEach(teardownTest);

  it("should get a todo successfully", async () => {
    // Arrange
    const todo = await repository.create({
      title: "Test Todo",
      description: "Test Description",
    });

    // Act
    const result = await useCase.execute(todo.id);

    // Assert
    expect(result).toBeDefined();
    expect(result.id).toEqual(todo.id);
    expect(result.title).toBe(todo.title);
    expect(result.description).toBe(todo.description);
  });

  it("should throw an error if todo is not found", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());

    // Act & Assert
    await expect(useCase.execute(todoId)).rejects.toThrow("Todo with id");
  });
});
