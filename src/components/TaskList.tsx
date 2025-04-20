import { useTask } from "@/hooks/useTask";
import { Task } from "./Task/Task";

const TaskList = () => {
  const { data, isLoading, isError, error } = useTask();

  return (
    <>
    {isLoading && <div>Loading...</div>}
    {isError && <div>Error: {error.message}</div>}
    {data && data.map((task: Task) => (
        <Task key={task.id} data={task} />
      ))}
    </>
  );
};

export default TaskList;
