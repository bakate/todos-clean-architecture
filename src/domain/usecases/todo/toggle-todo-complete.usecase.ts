import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { TodoEntity, TodoId } from "../../entities/todo.entity";
import { type TodoRepository } from "../../repositories/todo.repository";

@injectable()
export class ToggleTodoCompleteUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(todoId: TodoId): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error(`Todo with id ${todoId.toString()} not found`);
    }
    return this.todoRepository.toggleComplete(todoId);
  }
}
