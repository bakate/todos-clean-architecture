import { inject } from "inversify";
import z from "zod";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { DeleteTodoUseCase } from "@/src/application/use-cases/todo";
import type { TodoEntity } from "@/src/entities/models/todo.entity";

import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection";
import { TodoPresenter } from "@/src/interface-adapters/presenters/todo.presenter";

export class DeleteTodoController {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository,
    @inject(DI_SYMBOLS.DeleteTodoUseCase)
    private readonly deleteTodoUseCase: DeleteTodoUseCase,
  ) {}

  async execute(todoId: TodoEntity["id"]) {
    const { error: inputParseError } = z.string().uuid().safeParse(todoId);

    if (inputParseError) {
      throw new InputParseError("Id is invalid", { cause: inputParseError });
    }

    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      throw new NotFoundError(`Todo with id ${todoId} not found`);
    }

    await this.deleteTodoUseCase.execute(todoId);
    return TodoPresenter.success(undefined);
  }
}
