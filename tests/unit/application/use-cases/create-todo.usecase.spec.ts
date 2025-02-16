import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { CreateTodoUseCase } from "@/src/application/use-cases/todo/create-todo.usecase";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setupTest, teardownTest } from "./helpers/setup-test";

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
});
