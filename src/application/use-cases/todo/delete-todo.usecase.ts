import { inject, injectable } from "inversify";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { TodoEntity } from "@/src/entities/models/todo.entity";

import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(id: TodoEntity["id"]): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
