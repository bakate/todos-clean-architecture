import "reflect-metadata";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { CreateTodoUseCase } from "@/src/domain/usecases/todo/create-todo.usecase";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("CreateTodoUseCase", () => {
  let useCase: CreateTodoUseCase;
  let repository: TodoRepository;

  beforeEach(() => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<CreateTodoUseCase>(
      DI_SYMBOLS.CreateTodoUseCase
    );
  });

  afterEach(teardownTest);

  it("should create a todo successfully", async () => {
    // Arrange
    const todoData = {
      title: "Test Todo",
      description: "Test Description",
    };

    // Act
    const result = await useCase.execute(todoData);

    // Assert
    expect(result).toBeDefined();
    expect(result.title).toBe(todoData.title);
    expect(result.description).toBe(todoData.description);

    // Verify it was actually created
    const allTodos = await repository.findAll();
    expect(allTodos).toHaveLength(1);
    expect(allTodos[0].title).toBe(todoData.title);
  });
  it("should throw an error if todo data is invalid", async () => {
    // Arrange
    const todoData = {
      title: "",
      description: "Test Description",
    };

    // Act & Assert
    await expect(useCase.execute(todoData)).rejects.toThrowError(
      "Title is required"
    );
  });
});
