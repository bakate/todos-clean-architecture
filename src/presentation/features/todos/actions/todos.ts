"use server";

import {
  GetTodoUseCase,
  ListTodosUseCase,
  ToggleTodoCompleteUseCase,
} from "@/src/application/use-cases/todo";
import { applicationContainer } from "@/src/infrastructure/dependency-injection";
import { DI_SYMBOLS } from "@/src/infrastructure/dependency-injection/symbols";

import {
  UpdateTodoController,
  type CreateTodoController,
  type DeleteTodoController,
} from "@/src/interface-adapters/controllers/todos";
import {
  TodoPresenter,
  TodoPresenterResult,
  TodoViewModel,
} from "@/src/interface-adapters/presenters/todo.presenter";
import { revalidatePath } from "next/cache";

export async function getTodos(): Promise<
  TodoPresenterResult<TodoViewModel[]>
> {
  try {
    const listTodosUseCase = applicationContainer.get<ListTodosUseCase>(
      DI_SYMBOLS.ListTodosUseCase
    );
    const todos = await listTodosUseCase.execute();
    return TodoPresenter.presentList(todos);
  } catch (error) {
    console.error("[getTodos]", error);
    return TodoPresenter.error(error);
  }
}

export async function getTodoById(id: string) {
  try {
    const getTodoUseCase = applicationContainer.get<GetTodoUseCase>(
      DI_SYMBOLS.GetTodoUseCase
    );
    const todo = await getTodoUseCase.execute(id);
    return TodoPresenter.present(todo);
  } catch (error) {
    console.error("[getTodoById]", error);
    return TodoPresenter.error(error);
  }
}

export async function createTodo(
  formData: FormData
): Promise<TodoPresenterResult<TodoViewModel>> {
  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };

  try {
    const createTodoController = applicationContainer.get<CreateTodoController>(
      DI_SYMBOLS.CreateTodoController
    );

    const todo = await createTodoController.execute(raw);

    revalidatePath("/");
    return todo;
  } catch (error) {
    console.error("[createTodo]", error);
    return TodoPresenter.error(error);
  }
}

export async function updateTodo(
  id: string,
  formData: FormData
): Promise<TodoPresenterResult<TodoViewModel>> {
  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };

  try {
    const updateTodoController = applicationContainer.get<UpdateTodoController>(
      DI_SYMBOLS.UpdateTodoController
    );

    const todo = await updateTodoController.execute(id, raw);
    revalidatePath("/");
    return todo;
  } catch (error) {
    console.error("[updateTodo]", error);
    return TodoPresenter.error(error);
  }
}

export async function deleteTodo(
  id: string
): Promise<TodoPresenterResult<undefined>> {
  try {
    const deleteTodoController = applicationContainer.get<DeleteTodoController>(
      DI_SYMBOLS.DeleteTodoController
    );

    const response = await deleteTodoController.execute(id);
    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("[deleteTodo]", error);
    return TodoPresenter.error(error);
  }
}

export async function toggleTodoComplete(
  todoId: string
): Promise<TodoPresenterResult<TodoViewModel>> {
  try {
    const toggleTodoCompleteUseCase =
      applicationContainer.get<ToggleTodoCompleteUseCase>(
        DI_SYMBOLS.ToggleTodoCompleteUseCase
      );

    const updatedTodo = await toggleTodoCompleteUseCase.execute(todoId);

    revalidatePath("/");
    return TodoPresenter.present(updatedTodo);
  } catch (error) {
    console.error("[toggleTodoComplete]", error);
    return TodoPresenter.error(error);
  }
}
