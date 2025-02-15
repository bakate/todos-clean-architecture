import { injectable } from "inversify";
import { TodoId } from "@/src/domain/entities/todo.entity";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";
import { DeleteTodoUseCase } from "../delete-todo.usecase";

@injectable()
export class MockDeleteTodoUseCase extends DeleteTodoUseCase {
  constructor(todoRepository: TodoRepository) {
    super(todoRepository);
  }

  async execute(todoId: TodoId): Promise<void> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error(`Todo with id ${todoId.toString()} not found`);
    }

    await this.todoRepository.delete(todoId);
  }
}
