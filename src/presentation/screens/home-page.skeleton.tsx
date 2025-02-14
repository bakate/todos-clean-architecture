"use client";

import { Card, CardBody } from "@heroui/card";
import { TodoListSkeleton } from "../components/TodoSkeleton";

export function HomePageSkeleton() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="h-10 w-40 bg-gray-200 rounded mb-8 animate-pulse" />

      <div className="grid gap-8 md:grid-cols-[350px,1fr]">
        <div>
          <div className="h-8 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
          <Card>
            <CardBody>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <div className="h-8 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
          <TodoListSkeleton />
        </div>
      </div>
    </main>
  );
}
