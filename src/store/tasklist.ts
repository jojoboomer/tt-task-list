import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  taskList: Task[];
  activeTask: number | "new" | null;
}

interface Actions {
  setActiveTask: (activeTask: number | "new" | null) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number) => void;
  clear: () => void;
}

const initialState: State = {
  activeTask: null,
  taskList: [
    {
      id: 1,
      title:
        "#Important Write to some_email@gmail.com and tell @natasha about https://staging.alldone.app",
      status: "pending",
      created_at: "",
    },
  ],
};

const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      addTask: (task: Task) =>
        set((state) => ({ taskList: [...state.taskList, task] })),
      updateTask: (taskId: number) =>
        set((state) => ({
          taskList: state.taskList.map((task) =>
            task.id === taskId ? task : { ...task }
          ),
        })),
      setActiveTask: (activeTask: number | "new" | null) =>
        set(() => ({ activeTask })),
      clear: () => set(initialState),
    }),
    {
      name: "tasklist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;
