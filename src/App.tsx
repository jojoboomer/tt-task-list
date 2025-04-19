import { useEffect, useState } from "react";
import { NewTask } from "./components/Task/NewTask";
import { Task } from "./components/Task/Task";
import { Button } from "./components/ui/button";
import useTaskStore from "./store/tasklist";

function App() {
  const [list, setList] = useState<Task[]>([]);
  const { taskList, clear, activeTask } = useTaskStore();

  useEffect(() => {
    setList(taskList);
  }, [activeTask, taskList]);

  return (
    <main className="bg-background w-full h-screen overflow-auto">
      <Button onClick={clear}>Clear</Button>
      <section className="mx-auto my-0 max-w-[1328px]">
        <NewTask active={activeTask == 'new'} />
        {list.map((task: Task) => (
          <Task
            key={task.id}
            data={task}
            active={activeTask === task.id}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
