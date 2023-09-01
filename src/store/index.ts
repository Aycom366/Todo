import { startOfDay } from "date-fns";
import { create } from "zustand";

interface IStore {
  selectedDate: Date;
  setSelectedDate: (arg: Date) => void;
  displayingCalender: boolean;
}

export const useStore = create<IStore>()((set) => ({
  selectedDate: startOfDay(new Date()),
  setSelectedDate: (arg) => set(() => ({ selectedDate: arg })),
  displayingCalender: true,
}));
