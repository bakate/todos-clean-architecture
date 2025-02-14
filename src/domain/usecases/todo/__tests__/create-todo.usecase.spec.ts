import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateTodoUseCase } from "@/src/domain/usecases/todo/create-todo.usecase";
import { TodoEntity } from "@/src/domain/entities/todo.entity";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("CreateTodoUseCase", () => {
  let useCase: CreateTodoUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new CreateTodoUseCase(mockRepository);
  });

  it("should create a todo successfully", async () => {
    // Arrange
    const todoData = {
      title: "Test Todo",
      description: "Test Description",
    };

    const createdTodo = TodoEntity.create(todoData);
    vi.spyOn(mockRepository, "create").mockResolvedValue(createdTodo);

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

    vi.spyOn(mockRepository, "create").mockRejectedValue(new Error("DB Error"));

    // Act & Assert
    await expect(useCase.execute(todoData)).rejects.toThrow("DB Error");
  });
});
