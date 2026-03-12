import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prisma } from "../lib/prisma";

const app = new Hono();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost"],
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/todos", async (c) => {
  const todos = await prisma.todo.findMany();
  return c.json({ todos });
});

app.post("/todos", async (c) => {
  const { title } = await c.req.json();
  const todo = await prisma.todo.create({
    data: {
      title: title,
    },
  });
  return c.json(todo);
});

app.put("/todos/:id", async (c) => {
  const { id } = c.req.param();
  const paramId = parseInt(id, 10);
  const { completed } = await c.req.json();
  const updateTodo = await prisma.todo.update({
    where: { id: paramId },
    data: { completed: completed },
  });
  return c.json({ updateTodo });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
