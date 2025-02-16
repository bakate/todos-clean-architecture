import { injectable } from "inversify";
import { TodoEntity, TodoId } from "@/src/entities/todo.entity";
import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { GetTodoUseCase } from "../get-todo.usecase";

@injectable()
export class MockGetTodoUseCase extends GetTodoUseCase {
  constructor(todoRepository: TodoRepository) {
    super(todoRepository);
  }

  async execute(todoId: TodoId): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error(`Todo with id ${todoId.toString()} not found`);
    }
    return todo;
  }
}
