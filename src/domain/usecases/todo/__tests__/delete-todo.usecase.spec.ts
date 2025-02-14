import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteTodoUseCase } from "@/src/domain/usecases/todo/delete-todo.usecase";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("DeleteTodoUseCase", () => {
  let useCase: DeleteTodoUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new DeleteTodoUseCase(mockRepository);
  });

  it("should delete a todo successfully", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    const existingTodo = TodoEntity.create({
      title: "Test Todo",
      description: "Test Description",
    });

    vi.spyOn(mockRepository, "findById").mockResolvedValue(existingTodo);
    vi.spyOn(mockRepository, "delete").mockResolvedValue();

    // Act
    await useCase.execute(todoId);

    // Assert
    expect(mockRepository.findById).toHaveBeenCalledWith(todoId);
    expect(mockRepository.delete).toHaveBeenCalledWith(todoId);
  });

  it("should throw an error if todo is not found", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    vi.spyOn(mockRepository, "findById").mockResolvedValue(null);

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
