import type { TodoEntity } from "@/src/entities/models/todo.entity";

export type TodoViewModel = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type TodoPresenterResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export class TodoPresenter {
  static toViewModel(entity: TodoEntity): TodoViewModel {
    return {
      id: entity.id.toString(),
      title: entity.title,
      description: entity.description,
      completed: entity.completed,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt?.toISOString(),
    };
  }

  static success<T>(data: T): TodoPresenterResult<T> {
    return {
      success: true,
      data,
    };
  }

  static error(error: unknown): TodoPresenterResult<never> {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }

  static present(entity: TodoEntity): TodoPresenterResult<TodoViewModel> {
    return this.success(this.toViewModel(entity));
  }

  static presentList(
    entities: TodoEntity[],
  ): TodoPresenterResult<TodoViewModel[]> {
    return this.success(entities.map(this.toViewModel));
  }
}
