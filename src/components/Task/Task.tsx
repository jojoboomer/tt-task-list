import useParseMessage from "@/hooks/useParseMessage";
import { useMutationUpdateTask } from "@/hooks/useTask";
import useTaskStore from "@/store/tasklist";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AvatarBtn } from "../AvatarBtn";
import RichInput from "../RichInput";
import TaskTitle from "../TaskTitle";
import { Checkbox } from "../ui/checkbox";
import { ButtonBar } from "./ButtonBar";

interface TaskProps {
  data: Task;
}

export const Task = ({ data }: TaskProps) => {
  const [text, setText] = useState<string>(data.title);
  const [checked, setChecked] = useState<boolean>(data.status === "completed");
  const { activeTask, setActiveTask } = useTaskStore();
  const active = activeTask === data.id;
  const parsed = useParseMessage({ text, readOnly: !active });
  const mutation = useMutationUpdateTask();

  const handleMessageChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleCancel = useCallback(() => {
    setText(data.title);
    setActiveTask(null);
  }, [data, setActiveTask]);

  const handleSave = useCallback(() => {
    if(!text) {
      toast("The task title cannot be empty",{
        icon: "⚠️",
        style: {
          width: "250px",
        },
      });
      return
    }
    // We can set all the data in the task, but test only ask for title
    mutation.mutate({ ...data, title: text, status: checked ? "completed" : "pending" });
    setActiveTask(null);
  }, [text, data, setActiveTask, mutation, checked]);

  const handleClick = useCallback(() => {
    if (!active) {
      setActiveTask(data.id);
    }
  }, [active, data.id, setActiveTask]);

  return (
    <div
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
        {/* Test instructions dont ask for Checkbox funcionality */}
        <Checkbox className="size-5" checked={checked} onClick={() => setChecked(!checked)} />
        {active ? (
          <RichInput text={text} onChange={handleMessageChange} />
        ) : (
          <TaskTitle text={parsed} />
        )}
        <AvatarBtn
          visible={active}
          disabled={!text}
          name="John Doe"
        />
      </div>
      {active && (
        <ButtonBar
          disabled={!text}
          onCancel={handleCancel}
          onApply={handleSave}
          newComp={false}
          edited={text !== data.title}
        />
      )}
    </div>
  );
};
