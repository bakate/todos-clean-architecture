import { z } from "zod";

// Base schema for Todo properties
export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for creating a new Todo
export const CreateTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completed: true,
});

// Schema for updating a Todo
export const UpdateTodoSchema = TodoSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types inferred from the schemas
export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoDTO = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoDTO = z.infer<typeof UpdateTodoSchema>;

// Value Objects
export class TodoId {
  private constructor(private readonly value: string) {}

  static create(value: string): TodoId {
    const parsed = z.string().uuid().safeParse(value);
    if (!parsed.success) {
      throw new Error("Invalid Todo ID");
    }
    return new TodoId(parsed.data);
  }

  toString(): string {
    return this.value;
  }
}

// Todo Entity
export class TodoEntity {
  private constructor(
    private readonly props: Todo,
  ) {}

  static create(props: CreateTodoDTO): TodoEntity {
    const validatedProps = CreateTodoSchema.parse(props);
    
    return new TodoEntity({
      id: crypto.randomUUID(),
      ...validatedProps,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(props: Todo): TodoEntity {
    const validatedProps = TodoSchema.parse(props);
    return new TodoEntity(validatedProps);
  }

  get id(): TodoId {
    return TodoId.create(this.props.id);
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  update(props: UpdateTodoDTO): TodoEntity {
    const validatedProps = UpdateTodoSchema.parse(props);
    
    return new TodoEntity({
      ...this.props,
      ...validatedProps,
      updatedAt: new Date(),
    });
  }

  toggle(): TodoEntity {
    return new TodoEntity({
      ...this.props,
      completed: !this.props.completed,
      updatedAt: new Date(),
    });
  }

  toJSON(): Todo {
    return { ...this.props };
  }
}
