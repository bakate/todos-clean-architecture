import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";
import { TodoEntity, TodoId } from "@/src/domain/entities/todo.entity";

@injectable()
export class GetTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(id: TodoId): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new Error(`Todo with id ${id.toString()} not found`);
    }

    return todo;
  }
}
