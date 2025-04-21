import { useTask } from "@/hooks/useTask";
import { Task } from "./Task/Task";

const TaskList = () => {
  const { data, isLoading } = useTask();

  return (
    <>
      {isLoading && (
        <div className="w-full p-10 flex items-center justify-center">
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      )}
      {data && data.map((task) => <Task key={task.id} data={task as Task} />)}
    </>
  );
};

export default TaskList;
