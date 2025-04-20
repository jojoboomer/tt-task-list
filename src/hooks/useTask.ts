import { queryClient } from "@/lib/queryClient";
import { fetchTasks, insertTask } from "@/supabase/task";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
    networkMode: "offlineFirst",
  });
};

export const useMutationTask = () => {
  const mutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (newTask: TaskEntry) => insertTask(newTask),
    onMutate: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      const prevState = queryClient.getQueryData(["tasks"]) || [];
      const optimisticValue = {
        ...newTask,
        id: `temp_${Date.now()}`, // temp
      };
      queryClient.setQueryData(["tasks"], [{ ...prevState }, optimisticValue]);
      return { prevState };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context?.prevState);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks"], (old) =>
        old.map((task) => (task.id.startsWith("temp_") ? data : task))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    networkMode: "offlineFirst",
  });
  return mutation;
};
