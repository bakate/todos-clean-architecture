export * from "./create-todo.controller";
export * from "./delete-todo.controller";
export * from "./toggle-todo-complete.controller";
export * from "./update-todo.controller";

export const todoControllersKeys = [
  "CreateTodoController",
  "DeleteTodoController",
  "UpdateTodoController",
  "ToggleTodoCompleteController",
] as const;
