import { Task, Board } from '../types';

let boards: Board[] = [
  { id: '1', title: 'Заминированный тапок', description: 'Дернуть тапок палкой', createdAt: new Date() },
  { id: '2', title: 'Анекдоты бам-бам-бам', description: 'Анекдоты от деда Бом-Бома', createdAt: new Date() },
];

let tasks: Task[] = [
  {
    id: '1',
    title: 'Рассказать анекдот',
    description: 'Добавить в конце анекдота бам-бам-бам',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Дед Бом-Бом',
    boardId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const fetchBoards = async (): Promise<Board[]> => {
  return [...boards];
};

export const fetchBoardById = async (id: string): Promise<Board | undefined> => {
  return boards.find(board => board.id === id);
};

export const fetchTasks = async (boardId?: string): Promise<Task[]> => {
  if (boardId) {
    return tasks.filter(task => task.boardId === boardId);
  }
  return [...tasks];
};

export const fetchTaskById = async (id: string): Promise<Task | undefined> => {
  return tasks.find(task => task.id === id);
};

export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task | undefined> => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return undefined;

  const updatedTask = {
    ...tasks[taskIndex],
    ...taskData,
    updatedAt: new Date(),
  };
  tasks[taskIndex] = updatedTask;
  return updatedTask;
};
