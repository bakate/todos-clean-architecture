import { inject } from "inversify";

import type { CreateTodoUseCase } from "@/src/application/use-cases/todo";
import type { CreateTodoDTO } from "@/src/entities/models/todo.entity";

import { InputParseError } from "@/src/entities/errors/common";
import {

  CreateTodoSchema,
} from "@/src/entities/models/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection";
import { TodoPresenter } from "@/src/interface-adapters/presenters/todo.presenter";

export class CreateTodoController {
  constructor(
    @inject(DI_SYMBOLS.CreateTodoUseCase)
    private readonly createTodoUseCase: CreateTodoUseCase,
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
