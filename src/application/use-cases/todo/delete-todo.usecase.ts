import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { TodoEntity } from "@/src/entities/models/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(id: TodoEntity["id"]): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
