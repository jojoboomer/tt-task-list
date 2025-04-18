import { useEffect, useState } from "react";
import { Task } from "./components/Task/Task";
import { Button } from "./components/ui/button";
import useTaskStore from "./store/tasklist";

function App() {
  const [list, setList] = useState<Task[]>([]);
  const { taskList, addTask, updateTask,clear } = useTaskStore();
  const [activeTask, setActiveTask] = useState<number | "new" | null>(null);

  const saveAction = (data: Task | number) => {
    if (typeof data === "number") {
      updateTask(data as number);
      return
    }
    addTask(data as Task);
    setActiveTask(null);
  };

  const cancelChanges = () => {
    setActiveTask(null);
  };

  const editTask = (taskId: number | "new") => {
    setActiveTask(taskId);
  };

  useEffect(() => {
    setList(taskList);
  }, [activeTask, taskList]);

  return (
    <main className="bg-background w-full h-screen overflow-auto">
      <Button onClick={clear} >Clear</Button>
      <section className="mx-auto my-0 max-w-[1328px]">
        <Task
          isActive={activeTask === "new"}
          onApply={saveAction}
          onCancel={cancelChanges}
          onFocus={editTask}
        />
        {list.map((task: Task) => (
          <Task
            key={task.id}
            data={task}
            isActive={activeTask === task.id}
            onApply={saveAction}
            onCancel={cancelChanges}
            onFocus={editTask}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
