import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";
import { CreateTodoDTO, TodoEntity } from "@/src/domain/entities/todo.entity";

@injectable()
export class CreateTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    protected readonly todoRepository: TodoRepository
  ) {}

  async execute(data: CreateTodoDTO): Promise<TodoEntity> {
    // Création de l'entité Todo
    const todo = TodoEntity.create(data);

    // Sauvegarde dans le repository
    return this.todoRepository.create(todo);
  }
}
