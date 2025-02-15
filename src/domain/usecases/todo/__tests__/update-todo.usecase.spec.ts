import "reflect-metadata";
import { describe, it, expect, Mock, beforeEach, afterEach } from "vitest";
import { UpdateTodoUseCase } from "@/src/domain/usecases/todo/update-todo.usecase";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { testContainer } from "@/src/infrastructure/dependency-injection/container.test";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

describe("UpdateTodoUseCase", () => {
  let useCase: UpdateTodoUseCase;
  let mockRepository: any;

  beforeEach(() => {
    const { repository } = setupTest();
    mockRepository = repository;
    useCase = testContainer.get<UpdateTodoUseCase>(DI_SYMBOLS.UpdateTodoUseCase);
  });

  afterEach(teardownTest);

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

    (mockRepository.findById as Mock).mockResolvedValue(existingTodo);
    (mockRepository.update as Mock).mockImplementation(async (todo) => todo);

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

    (mockRepository.findById as Mock).mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(todoId, updateData)).rejects.toThrow(
      "Todo with id"
    );
  });
});
