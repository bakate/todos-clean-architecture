import "reflect-metadata";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";
import { Mock, afterEach, beforeEach, describe, expect, it } from "vitest";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { ToggleTodoCompleteUseCase } from "../toggle-todo-complete.usecase";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { testContainer } from "@/src/infrastructure/dependency-injection/container.test";
import { TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("ToggleTodoCompleteUseCase", () => {
  let useCase: ToggleTodoCompleteUseCase;
  let mockTodoId: TodoId;

  let mockTodoRepository: TodoRepository;

  beforeEach(() => {
    const { repository } = setupTest();
    mockTodoRepository = repository;
    useCase = testContainer.get<ToggleTodoCompleteUseCase>(
      DI_SYMBOLS.ToggleTodoCompleteUseCase
    );
    mockTodoId = TodoId.create("123e4567-e89b-12d3-a456-426614174000");
  });
  afterEach(teardownTest);

  it("should toggle completion state of an existing todo", async () => {
    // Arrange
    const todo = TodoEntity.reconstitute({
      id: mockTodoId.toString(),
      title: "Test Todo",
      description: "Test Description",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    (mockTodoRepository.findById as Mock).mockResolvedValue(todo);
    const toggledTodo = todo.toggle();
    (mockTodoRepository.toggleComplete as Mock).mockResolvedValue(toggledTodo);

    // Act
    const result = await useCase.execute(mockTodoId);

    // Assert
    expect(mockTodoRepository.findById).toHaveBeenCalledWith(mockTodoId);
    expect(mockTodoRepository.toggleComplete).toHaveBeenCalledWith(toggledTodo);
    expect(result.completed).toBe(true);
  });

  it("should throw an error if todo does not exist", async () => {
    // Arrange
    (mockTodoRepository.findById as Mock).mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(mockTodoId)).rejects.toThrow(
      `Todo with id ${mockTodoId.toString()} not found`
    );
    expect(mockTodoRepository.toggleComplete).not.toHaveBeenCalled();
  });

  it("should propagate repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    (mockTodoRepository.findById as Mock).mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(mockTodoId)).rejects.toThrow(error);
    expect(mockTodoRepository.toggleComplete).not.toHaveBeenCalled();
  });
});
