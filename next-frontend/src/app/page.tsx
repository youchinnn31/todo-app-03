import TodoList from "./components/TodoList";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function getTodos(): Promise<Todo[]> {
  const response = await fetch("http://hono-backend:3000/todos", {
    cache: "no-store",
  });
  const data = await response.json();
  return data.todos;
}

export default async function Home() {
  const initialTodos = await getTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            📝 Todoアプリ
          </h1>
          {/* 「追加・完了」などのユーザー操作が必要な部分は、
            状態管理が必要なため、ここから下を Client Component に切り出します 
          */}
          <TodoList initialTodos={initialTodos} />
        </div>
      </div>
    </div>
  );
}
