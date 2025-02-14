import "reflect-metadata";
import { describe, it, expect, Mock, beforeEach, afterEach, vi } from "vitest";
import { DeleteTodoUseCase } from "@/src/domain/usecases/todo/delete-todo.usecase";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("DeleteTodoUseCase", () => {
  let useCase: DeleteTodoUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    const { repository } = setupTest();
    mockRepository = repository;
    useCase = applicationContainer.get<DeleteTodoUseCase>(
      DI_SYMBOLS.DeleteTodoUseCase
    );
  });

  afterEach(teardownTest);

  it("should delete a todo successfully", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    const existingTodo = TodoEntity.create({
      title: "Test Todo",
      description: "Test Description",
    });

    (mockRepository.findById as Mock).mockResolvedValue(existingTodo);
    (mockRepository.delete as Mock).mockResolvedValue(existingTodo.id);

    // Act
    await useCase.execute(todoId);

    // Assert
    expect(mockRepository.findById).toHaveBeenCalledWith(todoId);
    expect(mockRepository.delete).toHaveBeenCalledWith(todoId);
  });

  it("should throw an error if todo is not found", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    (mockRepository.findById as Mock).mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(todoId)).rejects.toThrow("Todo with id");
  });

  it("should throw an error if delete fails", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    const existingTodo = TodoEntity.create({
      title: "Test Todo",
      description: "Test Description",
    });

    vi.spyOn(mockRepository, "findById").mockResolvedValue(existingTodo);
    vi.spyOn(mockRepository, "delete").mockRejectedValue(
      new Error("Delete failed")
    );

    // Act & Assert
    await expect(useCase.execute(todoId)).rejects.toThrow("Delete failed");
  });
});
