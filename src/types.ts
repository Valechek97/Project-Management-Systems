export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'done';
    assignee: string;
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Board {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
  }
  
  export type TaskFormValues = Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
  };