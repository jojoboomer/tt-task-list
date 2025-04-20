import { queryClient } from "@/lib/queryClient";
import { fetchTasks, insertTask } from "@/supabase/task";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });
};

export const useMutationTask = () => {
  const mutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (task: TaskEntry) => insertTask(task),
    onSuccess: () => {
      // Invalida la consulta de tareas para actualizar la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (_, __, context) => {
      // Revertir en caso de error
      console.log("Error al insertar tarea");
      // if (context?.prev) queryClient.setQueryData(["tasks"], context.prev);
    },
  });
  return mutation;
};