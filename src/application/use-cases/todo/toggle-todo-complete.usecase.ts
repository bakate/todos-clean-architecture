import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { TodoEntity, TodoId } from "@/src/entities/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { inject, injectable } from "inversify";

@injectable()
export class ToggleTodoCompleteUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    protected readonly todoRepository: TodoRepository
  ) {}

  async execute(todoId: TodoId): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error(`Todo with id ${todoId.toString()} not found`);
    }
    const updatedTodo = todo.toggle();
    return this.todoRepository.toggleComplete(updatedTodo);
  }
}
