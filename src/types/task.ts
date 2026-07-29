export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: number; // Milliseconds timestamp
  completedAt?: number | null;
  dueDate?: string; // Format YYYY-MM-DD
}

export interface TaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
}
