import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { TodoEntity, UpdateTodoDTO } from "@/src/entities/models/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(
    id: TodoEntity["id"],
    data: UpdateTodoDTO
  ): Promise<TodoEntity> {
    return this.todoRepository.update(id, data);
  }
}
