"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

export function TodoSkeleton() {
  return (
    <Card className="max-w-[400px] animate-pulse">
      <CardHeader>
        <div className="flex items-center gap-2 flex-col">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </CardBody>
      <CardFooter className="gap-2">
        <div className="h-8 bg-gray-200 rounded w-16"></div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </CardFooter>
    </Card>
  );
}

export function TodoListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <TodoSkeleton key={index} />
      ))}
    </div>
  );
}
