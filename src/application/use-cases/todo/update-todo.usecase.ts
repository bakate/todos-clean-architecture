import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { TodoEntity, TodoId, UpdateTodoDTO } from "@/src/entities/todo.entity";

@injectable()
export class UpdateTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    protected readonly todoRepository: TodoRepository
  ) {}

  async execute(id: TodoId, data: UpdateTodoDTO): Promise<TodoEntity> {
    // Récupération de la todo existante
    const existingTodo = await this.todoRepository.findById(id);
    if (!existingTodo) {
      throw new Error(`Todo with id ${id.toString()} not found`);
    }

    // Mise à jour de l'entité
    const updatedTodo = existingTodo.update(data);

    // Sauvegarde dans le repository
    return this.todoRepository.update(updatedTodo);
  }
}
