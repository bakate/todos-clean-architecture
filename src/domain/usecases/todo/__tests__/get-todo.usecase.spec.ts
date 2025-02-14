import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetTodoUseCase } from "@/src/domain/usecases/todo/get-todo.usecase";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("GetTodoUseCase", () => {
  let useCase: GetTodoUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new GetTodoUseCase(mockRepository);
  });

  it("should get a todo successfully", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());
    const todo = TodoEntity.create({
      title: "Test Todo",
      description: "Test Description",
    });
    vi.spyOn(mockRepository, "findById").mockResolvedValue(todo);

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
    vi.spyOn(mockRepository, "findById").mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(todoId)).rejects.toThrow("Todo with id");
  });
});
