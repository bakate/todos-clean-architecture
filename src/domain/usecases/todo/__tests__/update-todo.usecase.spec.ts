import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateTodoUseCase } from "@/src/domain/usecases/todo/update-todo.usecase";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("UpdateTodoUseCase", () => {
  let useCase: UpdateTodoUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new UpdateTodoUseCase(mockRepository);
  });

  it("should update a todo successfully", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    const existingTodo = TodoEntity.create({
      title: "Original Title",
      description: "Original Description",
    });
    const updateData = {
      title: "Updated Title",
      description: "Updated Description",
    };

    vi.spyOn(mockRepository, "findById").mockResolvedValue(existingTodo);
    vi.spyOn(mockRepository, "update").mockImplementation(async (todo) => todo);

    // Act
    const result = await useCase.execute(todoId, updateData);

    // Assert
    expect(mockRepository.findById).toHaveBeenCalledWith(todoId);
    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.title).toBe(updateData.title);
    expect(result.description).toBe(updateData.description);
  });

  it("should throw an error if todo is not found", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    const updateData = {
      title: "Updated Title",
    };

    vi.spyOn(mockRepository, "findById").mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(todoId, updateData)).rejects.toThrow(
      "Todo with id"
    );
  });
});
