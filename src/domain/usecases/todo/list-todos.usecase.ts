import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";
import { TodoEntity } from "@/src/domain/entities/todo.entity";

@injectable()
export class ListTodosUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(): Promise<TodoEntity[]> {
    return this.todoRepository.findAll();
  }
}
