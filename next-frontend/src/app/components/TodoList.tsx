"use client";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState("");

  const API_URL = "http://localhost:3001/todos";

  const handleAddTodo = async () => {
    if (!title.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await response.json();

    setTodos([...todos, newTodo]);
    setTitle("");
  };
  const handleToggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !target.completed }),
      });

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          追加
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${todo.completed ? "bg-gray-50" : "bg-white"}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="w-5 h-5 text-blue-600"
            />
            <span
              className={
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-auto px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      {/* 完了済みカウント等の表示もここに追加 */}
    </>
  );
}
