import { queryClient } from "@/lib/queryClient";
import { fetchTasks, insertTask, updateTask } from "@/supabase/TaskService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
    networkMode: "offlineFirst",
  });
};

export const useMutationAddTask = () => {
  const mutation = useMutation({
    // mutationKey: ["tasks"],
    mutationFn: (newTask: TaskEntry) => insertTask(newTask),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const prevState = queryClient.getQueryData(["tasks"]) || [];

      queryClient.setQueryData(["tasks"], (oldData?: Task[]): Task[] => {
        const optimisticValue = {
          //temp value
          ...newTask,
          id: `${Math.random()}`,
          created_at: new Date().toISOString(),
        };
        if (oldData == null) return [optimisticValue];
        return [...oldData, optimisticValue];
      });

      return { prevState };
    },
    onError: (error, __, context) => {
      console.error(error);
      queryClient.setQueryData(["tasks"], context?.prevState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    networkMode: "offlineFirst",
  });
  return mutation;
};

export const useMutationUpdateTask = () => {
  const mutation = useMutation({
    // mutationKey: ["tasks"],
    mutationFn: (updatedTask: Task) => updateTask(updatedTask),
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const prevState = queryClient.getQueryData(["tasks"]) || [];

      queryClient.setQueryData(["tasks"], (oldData?: Task[]): Task[] => {
        if (oldData == null) return [updatedTask];
        return oldData.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });

      return { prevState };
    },
    onError: (error, __, context) => {
      console.error(error);
      queryClient.setQueryData(["tasks"], context?.prevState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    networkMode: "offlineFirst",
  });
  return mutation;
};
