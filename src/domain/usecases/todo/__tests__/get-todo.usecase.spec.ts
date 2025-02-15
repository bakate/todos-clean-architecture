import "reflect-metadata";
import { describe, it, expect, Mock, beforeEach, afterEach } from "vitest";
import { GetTodoUseCase } from "@/src/domain/usecases/todo/get-todo.usecase";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { testContainer } from "@/src/infrastructure/dependency-injection/container.test";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("GetTodoUseCase", () => {
  let useCase: GetTodoUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    const { repository } = setupTest();
    mockRepository = repository;
    useCase = testContainer.get<GetTodoUseCase>(
      DI_SYMBOLS.GetTodoUseCase
    );
  });

  afterEach(teardownTest);

  it("should get a todo successfully", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    const todo = TodoEntity.create({
      title: "Test Todo",
      description: "Test Description",
    });
    (mockRepository.findById as Mock).mockResolvedValue(todo);

    // Act
    const result = await useCase.execute(todoId);

    // Assert
    expect(mockRepository.findById).toHaveBeenCalledWith(todoId);
    expect(result).toBeDefined();
    expect(result.title).toBe("Test Todo");
  });

  it("should throw an error if todo is not found", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    (mockRepository.findById as Mock).mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(todoId)).rejects.toThrow("Todo with id");
  });
});
