import "reflect-metadata";
import { describe, it, expect, beforeEach, afterEach, Mock } from "vitest";
import { CreateTodoUseCase } from "@/src/domain/usecases/todo/create-todo.usecase";
import { TodoEntity } from "@/src/domain/entities/todo.entity";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { testContainer } from "@/src/infrastructure/dependency-injection/container.test";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("CreateTodoUseCase", () => {
  let useCase: CreateTodoUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    const { repository } = setupTest();
    mockRepository = repository;
    useCase = testContainer.get<CreateTodoUseCase>(
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

    const createdTodo = TodoEntity.create(todoData);
    (mockRepository.create as Mock).mockResolvedValue(createdTodo);

    // Act
    const result = await useCase.execute(todoData);

    // Assert
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result.title).toBe(todoData.title);
    expect(result.description).toBe(todoData.description);
  });

  it("should throw an error if repository fails", async () => {
    // Arrange
    const todoData = {
      title: "Test Todo",
      description: "Test Description",
    };

    (mockRepository.create as Mock).mockRejectedValue(new Error("DB Error"));

    // Act & Assert
    await expect(useCase.execute(todoData)).rejects.toThrow("DB Error");
  });
});
