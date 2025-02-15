import { getTodos, HomePageScreen } from "@/src/presentation/features/todos";

export default async function HomePage() {
  const todos = (await getTodos()) ?? { success: true, data: [] };

  return <HomePageScreen initialTodos={todos} />;
}
