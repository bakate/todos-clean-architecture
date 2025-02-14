import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";
import { TodoId } from "@/src/domain/entities/todo.entity";

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(id: TodoId): Promise<void> {
    // Vérification que la todo existe
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error(`Todo with id ${id.toString()} not found`);
    }

    // Suppression de la todo
    await this.todoRepository.delete(id);
  }
}
