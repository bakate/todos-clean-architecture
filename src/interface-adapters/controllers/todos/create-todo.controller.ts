import type { CreateTodoUseCase } from "@/src/application/use-cases/todo";
import { InputParseError } from "@/src/entities/errors/common";

import {
  CreateTodoSchema,
  type CreateTodoDTO,
} from "@/src/entities/models/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection";
import { TodoPresenter } from "@/src/interface-adapters/presenters/todo.presenter";
import { inject } from "inversify";

export class CreateTodoController {
  constructor(
    @inject(DI_SYMBOLS.CreateTodoUseCase)
    private readonly createTodoUseCase: CreateTodoUseCase
  ) {}

  async execute(input: CreateTodoDTO) {
    const { data, error: inputParseError } = CreateTodoSchema.safeParse(input);

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    const newTodo = await this.createTodoUseCase.execute(data);
    return TodoPresenter.present(newTodo);
  }
}
