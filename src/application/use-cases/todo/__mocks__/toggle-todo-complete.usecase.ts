import { injectable } from "inversify";
import { TodoEntity, TodoId } from "@/src/entities/todo.entity";
import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { ToggleTodoCompleteUseCase } from "../toggle-todo-complete.usecase";

@injectable()
export class MockToggleTodoCompleteUseCase extends ToggleTodoCompleteUseCase {
  constructor(todoRepository: TodoRepository) {
    super(todoRepository);
  }

  async execute(todoId: TodoId): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error(`Todo with id ${todoId.toString()} not found`);
    }
    const updatedTodo = todo.toggle();
    return this.todoRepository.toggleComplete(updatedTodo);
  }
}
