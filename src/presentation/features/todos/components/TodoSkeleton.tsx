"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/react";

export function TodoSkeleton() {
  return (
    <Card className="max-w-[400px] animate-pulse">
      <CardHeader>
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </CardBody>
      <CardFooter className="gap-2">
        <Skeleton className="w-1/2 rounded-lg">
          <div className="h-8 w-1/2 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-1/2 rounded-lg">
          <div className="h-8 w-1/2 rounded-lg bg-default-200" />
        </Skeleton>
      </CardFooter>
    </Card>
  );
}

export function TodoListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-rows-[auto]">
      {Array.from({ length: 7 }).map((_, index) => (
        <TodoSkeleton key={index} />
      ))}
    </div>
  );
}
