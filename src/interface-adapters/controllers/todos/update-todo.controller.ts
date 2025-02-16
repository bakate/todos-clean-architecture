import type { UpdateTodoUseCase } from "@/src/application/use-cases/todo";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import z from "zod";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import {
  UpdateTodoSchema,
  type TodoEntity,
  type UpdateTodoDTO,
} from "@/src/entities/models/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection";
import { TodoPresenter } from "@/src/interface-adapters/presenters/todo.presenter";
import { inject } from "inversify";

export class UpdateTodoController {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository,
    @inject(DI_SYMBOLS.UpdateTodoUseCase)
    private readonly updateTodoUseCase: UpdateTodoUseCase
  ) {}

  async execute(todoId: TodoEntity["id"], data: UpdateTodoDTO) {
    const { error } = z.string().uuid().safeParse(todoId);
    if (error) {
      throw new InputParseError("Id is invalid", { cause: error });
    }

    const { error: inputParseError } = UpdateTodoSchema.safeParse(data);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      throw new NotFoundError(`Todo with id ${todoId} not found`);
    }

    const updatedTodo = await this.updateTodoUseCase.execute(todoId, data);
    return TodoPresenter.present(updatedTodo);
  }
}
