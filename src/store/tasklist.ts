import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  taskList: Task[];
  activeTask: string | "new" | null;
}

interface Actions {
  setActiveTask: (activeTask: string | "new" | null) => void;
  addTask: (newTask: Task) => void;
  updateTask: (updatedTask: Task) => void;
  clear: () => void;
}

const initialState: State = {
  activeTask: null,
  taskList: [],
};

const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      addTask: (newTask: Task) =>
        set((state) => ({ taskList: [...state.taskList, newTask] })),
      updateTask: (updatedTask: Task) =>
        set((state) => ({
          taskList: state.taskList.map((task) =>{
            return task.id === updatedTask.id ? updatedTask : task
          }),
        })),
      setActiveTask: (activeTask: string | "new" | null) =>
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
