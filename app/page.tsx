import { getTodos } from "@/src/app/actions/todos";
import { HomePageScreen } from "@/src/presentation/screens/home-page.screen";

export default async function HomePage() {
  const todos = await getTodos();

  return <HomePageScreen initialTodos={todos} />;
}
