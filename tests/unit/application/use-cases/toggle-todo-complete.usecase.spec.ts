import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { ToggleTodoCompleteUseCase } from "@/src/application/use-cases/todo/toggle-todo-complete.usecase";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import "reflect-metadata";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setupTest, teardownTest } from "./helpers/setup-test";

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
    const result = await useCase.execute(todo);

    // Assert
    expect(result.completed).toBe(true);

    // Verify the todo was actually updated in the repository
    const updatedTodo = await repository.findById(todo.id);
    expect(updatedTodo?.completed).toBe(true);
  });
});
