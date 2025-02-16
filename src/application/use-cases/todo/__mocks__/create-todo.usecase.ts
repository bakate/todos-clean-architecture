import { injectable } from "inversify";
import { CreateTodoDTO, TodoEntity } from "@/src/entities/todo.entity";
import { CreateTodoUseCase } from "../create-todo.usecase";
import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";

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
