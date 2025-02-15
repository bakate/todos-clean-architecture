import "reflect-metadata";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ListTodosUseCase } from "@/src/domain/usecases/todo/list-todos.usecase";
import { setupTest, teardownTest } from "./helpers/setup-test";
import { applicationContainer } from "@/src/infrastructure/dependency-injection/container";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

describe("ListTodosUseCase", () => {
  let useCase: ListTodosUseCase;
  let repository: TodoRepository;

  beforeEach(() => {
    const { repository: repo } = setupTest();
    repository = repo;
    useCase = applicationContainer.get<ListTodosUseCase>(
      DI_SYMBOLS.ListTodosUseCase
    );
  });

  afterEach(teardownTest);

  it("should list all todos successfully", async () => {
    // Arrange
    const todo1 = await repository.create({
      title: "Todo 1",
      description: "Description 1",
    });
    const todo2 = await repository.create({
      title: "Todo 2",
      description: "Description 2",
    });

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([todo1, todo2]));
  });

  it("should return empty array when no todos exist", async () => {
    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toHaveLength(0);
  });

  it("should list todos in correct order", async () => {
    // Arrange
    const todo1 = await repository.create({
      title: "Todo 1",
      description: "Description 1",
    });
    const todo2 = await repository.create({
      title: "Todo 2",
      description: "Description 2",
    });

    // Update todo1 to make it more recent
    await new Promise((resolve) => setTimeout(resolve, 100));
    await repository.update(todo1);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].id.toString()).toBe(todo1.id.toString()); // Most recent should be first
    expect(result[1].id.toString()).toBe(todo2.id.toString());
  });
});
