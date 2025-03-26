import { inject } from "inversify";
import z from "zod";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { ToggleTodoCompleteUseCase } from "@/src/application/use-cases/todo";
import type { TodoEntity } from "@/src/entities/models/todo.entity";

import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection";
import { TodoPresenter } from "@/src/interface-adapters/presenters/todo.presenter";

export class ToggleTodoCompleteController {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository,
    @inject(DI_SYMBOLS.ToggleTodoCompleteUseCase)
    private readonly toggleTodoCompleteUseCase: ToggleTodoCompleteUseCase,
  ) {}

  async execute(todoId: TodoEntity["id"]) {
    const { error } = z.string().uuid().safeParse(todoId);
    if (error) {
      throw new InputParseError("Id is invalid", { cause: error });
    }

    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      throw new NotFoundError(`Todo with id ${todoId} not found`);
    }

    const updatedTodo = await this.toggleTodoCompleteUseCase.execute(todo);

    return TodoPresenter.present(updatedTodo);
  }
}
