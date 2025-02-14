import { describe, it, expect, vi, beforeEach } from "vitest";
import { ListTodosUseCase } from "@/src/domain/usecases/todo/list-todos.usecase";
import { TodoEntity } from "@/src/domain/entities/todo.entity";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("ListTodosUseCase", () => {
  let useCase: ListTodosUseCase;
  let mockRepository: TodoRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new ListTodosUseCase(mockRepository);
  });

  it("should list all todos successfully", async () => {
    // Arrange
    const todos = [
      TodoEntity.create({ title: "Todo 1", description: "Description 1" }),
      TodoEntity.create({ title: "Todo 2", description: "Description 2" }),
    ];

    vi.spyOn(mockRepository, "findAll").mockResolvedValue(todos);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Todo 1");
    expect(result[1].title).toBe("Todo 2");
  });

  it("should return empty array when no todos exist", async () => {
    // Arrange
    vi.spyOn(mockRepository, "findAll").mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(0);
  });

  it("should throw an error if repository fails", async () => {
    // Arrange
    vi.spyOn(mockRepository, "findAll").mockRejectedValue(
      new Error("DB Error")
    );

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow("DB Error");
  });
});
