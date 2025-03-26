import { inject, injectable } from "inversify";

import type { TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import type { TodoEntity } from "@/src/entities/models/todo.entity";

import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

@injectable()
export class ListTodosUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(): Promise<TodoEntity[]> {
    return this.todoRepository.findAll();
  }
}
