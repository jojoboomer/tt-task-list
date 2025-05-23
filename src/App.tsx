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
    <main className="relative bg-background w-full h-screen overflow-auto text-base">
      <Button className="absolute bottom-0 " onClick={clear}>Clear</Button>
      <section role="list" className="mx-auto my-0 max-w-[1328px]">
        <NewTask />
        {list.map((task: Task) => (
          <Task key={task.id} data={task} />
        ))}
      </section>
    </main>
  );
}

export default App;
