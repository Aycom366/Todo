import { create } from "zustand";
import { TasksData } from "~/types";

interface IStore {
  filteredTasks: TasksData[];
  tasks: TasksData[];
  setTasks: (arg: TasksData[]) => void;
  appendToAvailableTask: (arg: TasksData) => void;
  updateTask: (arg: TasksData) => void;
  updateCompletedTask: (arg: number) => void;
  removeTask: (arg: number) => void;

  task: TasksData;
  setTask: (arg: TasksData) => void;
  showTask: boolean;
  setShowTask: (arg: boolean) => void;

  setIsEditingTask: (arg: boolean) => void;
  isEditingTask: boolean;
}

export const useStore = create<IStore>()((set) => ({
  tasks: [],
  filteredTasks: [],
  setTasks: (arg) => set(() => ({ tasks: arg })),
  appendToAvailableTask: (arg) =>
    set((state) => ({ tasks: [...state.tasks, { ...arg }] })),
  updateTask: (arg) =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        if (item.id === arg.id) {
          return arg;
        }
        return item;
      }),
    })),
  updateCompletedTask: (arg) =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        if (item.id === arg) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }),
    })),
  removeTask: (arg) =>
    set((state) => ({
      tasks: state.tasks.filter((item) => item.id !== arg),
    })),

  task: {} as TasksData,
  setTask: (arg) => set(() => ({ task: arg })),
  showTask: false,
  setShowTask: (arg) => set(() => ({ showTask: arg })),

  isEditingTask: false,
  setIsEditingTask: (arg) => set(() => ({ isEditingTask: arg })),
}));
