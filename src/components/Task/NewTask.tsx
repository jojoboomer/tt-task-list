import { useMutationAddTask } from "@/hooks/useTask";
import useTaskStore from "@/store/tasklist";
import { PlusSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AvatarBtn } from "../AvatarBtn";
import RichInput from "../RichInput";
import TaskTitle from "../TaskTitle";
import { ButtonBar } from "./ButtonBar";

export const NewTask = () => {
  const [text, setText] = useState<string>("");
  const { activeTask, setActiveTask } = useTaskStore();
  const active = activeTask == "new";
  const mutation = useMutationAddTask();

    useEffect(() => {
      if (!active) {
        setText('');
      }
    }, [active]);

  const handleMessageChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleCancel = useCallback(() => {
    setText("");
    setActiveTask(null);
  }, [setActiveTask]);

  const handleAdd = useCallback(() => {
    if(!text) {
      setActiveTask(null);
      return
    }
    mutation.mutate({
      title: text,
      status: "pending",
    });
    setText("");
    setActiveTask(null);
  }, [text, setActiveTask, mutation]);

  const handleClick = useCallback(() => {
    if (!active) {
      setActiveTask("new");
    }
  }, [setActiveTask, active]);

  return (
    <div
      data-testid="new-task"
      onClick={handleClick}
      className={`mt-2 rounded-md ${
        active ? "shadow-md " : "hover:cursor-pointer active:opacity-50"
      }`}
    >
      <div
        className={`px-4 py-1 w-full flex items-center gap-2 rounded-t-md ${
          active ? "border border-gray-300" : ""
        }`}
      >
        <PlusSquare className="text-primary" size={20} />
        {active ? (
          <RichInput text={text} onChange={handleMessageChange} />
        ) : (
          <TaskTitle />
        )}
        <AvatarBtn visible={active} disabled={!text} name="John Doe" />
      </div>
      {active && (
        <ButtonBar
          disabled={!text}
          onCancel={handleCancel}
          onApply={handleAdd}
          newComp={true}
          edited={text !== ""}
        />
      )}
    </div>
  );
};
