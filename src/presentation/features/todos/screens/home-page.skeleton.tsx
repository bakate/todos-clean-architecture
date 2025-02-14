"use client";

import { TodoListSkeleton } from "../components/TodoSkeleton";
import { Skeleton } from "@heroui/react";
import { TodoForm } from "../components";

export function HomePageSkeleton() {
  return (
    <main className="container mx-auto py-8 px-4">
      <Skeleton className="w-1/2 rounded-lg" />

      <div className="grid gap-8 md:grid-cols-[350px,1fr]">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
          <TodoForm
            onSubmit={() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 0);
              });
            }}
            submitLabel="Create Todo"
          />
        </div>
        <div>
          <Skeleton className="w-32 h-8 mb-4 rounded-lg" />
          <TodoListSkeleton />
        </div>
      </div>
    </main>
  );
}
