import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { TodoEntity, TodoId } from "@/src/entities/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { inject, injectable } from "inversify";

@injectable()
export class GetTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    protected readonly todoRepository: TodoRepository
  ) {}

  async execute(id: TodoId): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new Error(`Todo with id ${id.toString()} not found`);
    }

    return todo;
  }
}
