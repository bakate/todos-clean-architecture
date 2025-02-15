import { injectable } from "inversify";
import { CreateTodoDTO, TodoEntity } from "@/src/domain/entities/todo.entity";
import { CreateTodoUseCase } from "../create-todo.usecase";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";

@injectable()
export class MockCreateTodoUseCase extends CreateTodoUseCase {
  constructor(todoRepository: TodoRepository) {
    super(todoRepository);
  }

  async execute(todoData: CreateTodoDTO): Promise<TodoEntity> {
    if (!todoData.title) {
      throw new Error("Title is required");
    }
    return this.todoRepository.create(todoData);
  }
}
