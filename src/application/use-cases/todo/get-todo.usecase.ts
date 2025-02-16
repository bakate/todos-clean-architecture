import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { NotFoundError } from "@/src/entities/errors/common";
import { TodoEntity } from "@/src/entities/models/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { inject, injectable } from "inversify";

@injectable()
export class GetTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(id: TodoEntity["id"]): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new NotFoundError(`Todo with id ${id.toString()} not found`);
    }

    return todo;
  }
}
