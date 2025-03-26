import { inject, injectable } from "inversify";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { TodoEntity } from "@/src/entities/models/todo.entity";

import { NotFoundError } from "@/src/entities/errors/common";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

@injectable()
export class GetTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: TodoEntity["id"]): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new NotFoundError(`Todo with id ${id.toString()} not found`);
    }

    return todo;
  }
}
