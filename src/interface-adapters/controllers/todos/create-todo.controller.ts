import type { CreateTodoUseCase } from "@/src/application/use-cases/todo";
import { InputParseError } from "@/src/entities/errors/common";

import {
  CreateTodoSchema,
  type CreateTodoDTO,
} from "@/src/entities/models/todo.entity";
import { TodoPresenter } from "@/src/interface-adapters/presenters/todo.presenter";

export class CreateTodoController {
  constructor(private readonly createTodoUseCase: CreateTodoUseCase) {}

  async execute(input: CreateTodoDTO) {
    const {
      data,
      error: inputParseError,
      success,
    } = CreateTodoSchema.safeParse(input);
    console.log({ inputParseError, data, success, input });

    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    const newTodo = await this.createTodoUseCase.execute(data);
    return TodoPresenter.present(newTodo);
  }
}
