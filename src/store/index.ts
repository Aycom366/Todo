import { startOfDay } from "date-fns";
import { create } from "zustand";
import { TasksData } from "~/types";

interface IStore {
  selectedDate: Date;
  setSelectedDate: (arg: Date) => void;

  tasks: TasksData[];
  setTasks: (arg: TasksData) => void;
  updateTask: (arg: number) => void;
  removeTask: (arg: number) => void;

  task: TasksData;
  setTask: (arg: TasksData) => void;

  isEditingTask: boolean;
  setIsEditingTask: (arg: boolean) => void;
}

export const useStore = create<IStore>()((set) => ({
  selectedDate: startOfDay(new Date()),
  setSelectedDate: (arg) => set(() => ({ selectedDate: arg })),

  tasks: [],
  setTasks: (arg) => set((state) => ({ tasks: [...state.tasks, { ...arg }] })),
  updateTask: (arg) =>
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

  isEditingTask: false,
  setIsEditingTask: (arg) => set(() => ({ isEditingTask: arg })),
}));
