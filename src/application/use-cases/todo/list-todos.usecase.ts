import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { TodoEntity } from "@/src/entities/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { inject, injectable } from "inversify";

@injectable()
export class ListTodosUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    protected readonly todoRepository: TodoRepository
  ) {}

  async execute(): Promise<TodoEntity[]> {
    return this.todoRepository.findAll();
  }
}
