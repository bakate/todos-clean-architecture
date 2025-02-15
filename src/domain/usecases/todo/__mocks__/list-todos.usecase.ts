import { injectable } from "inversify";
import { TodoEntity } from "@/src/domain/entities/todo.entity";
import { type TodoRepository } from "@/src/domain/repositories/todo.repository";
import { ListTodosUseCase } from "../list-todos.usecase";

@injectable()
export class MockListTodosUseCase extends ListTodosUseCase {
  constructor(todoRepository: TodoRepository) {
    super(todoRepository);
  }

  async execute(): Promise<TodoEntity[]> {
    return this.todoRepository.findAll();
  }
}
