import { injectable } from "inversify";

import {
  TodoEntity,
  TodoId,
  UpdateTodoDTO,
} from "@/src/domain/entities/todo.entity";

import { UpdateTodoUseCase } from "../update-todo.usecase";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

@injectable()
export class MockUpdateTodoUseCase extends UpdateTodoUseCase {
  constructor(todoRepository: TodoRepository) {
    super(todoRepository);
  }

  async execute(
    todoId: TodoId,
    updateData: UpdateTodoDTO
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error(`Todo with id ${todoId.toString()} not found`);
    }

    const updatedTodo = todo.update(updateData);
    return this.todoRepository.update(updatedTodo);
  }
}
