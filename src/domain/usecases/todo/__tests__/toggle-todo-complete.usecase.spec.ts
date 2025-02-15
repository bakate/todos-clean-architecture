import "reflect-metadata";
import { TodoId } from "@/src/domain/entities/todo.entity";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { ToggleTodoCompleteUseCase } from "../toggle-todo-complete.usecase";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("ToggleTodoCompleteUseCase", () => {
  let useCase: ToggleTodoCompleteUseCase;
  let repository: TodoRepository;

  beforeEach(() => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<ToggleTodoCompleteUseCase>(
      DI_SYMBOLS.ToggleTodoCompleteUseCase
    );
  });

  afterEach(teardownTest);

  it("should toggle completion state of an existing todo", async () => {
    // Arrange
    const todo = await repository.create({
      title: "Test Todo",
      description: "Test Description",
    });

    // Verify initial state
    expect(todo.completed).toBe(false);

    // Act
    const result = await useCase.execute(todo.id);

    // Assert
    expect(result.completed).toBe(true);

    // Verify the todo was actually updated in the repository
    const updatedTodo = await repository.findById(todo.id);
    expect(updatedTodo?.completed).toBe(true);
  });

  it("should throw an error if todo does not exist", async () => {
    // Arrange
    const todoId = TodoId.create(crypto.randomUUID());

    // Act & Assert
    await expect(useCase.execute(todoId)).rejects.toThrow("Todo with id");
  });
});
