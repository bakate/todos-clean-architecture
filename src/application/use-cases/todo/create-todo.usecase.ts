import { type TodoRepository } from "@/src/application/repositories/todo.repository.interface";
import { CreateTodoDTO, TodoEntity } from "@/src/entities/models/todo.entity";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";
import { inject, injectable } from "inversify";

@injectable()
export class CreateTodoUseCase {
  constructor(
    @inject(DI_SYMBOLS.TodoRepository)
    private readonly todoRepository: TodoRepository
  ) {}

  async execute(data: CreateTodoDTO): Promise<TodoEntity> {
    // HINT: this is where you'd do authorization checks - is this user authorized to create a todo
    // for example: free users are allowed only 5 todos, throw an UnauthorizedError if more than 5
    return this.todoRepository.create(data);
  }
}
