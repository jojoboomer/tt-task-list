import useParseMessage from "@/hooks/useParseMessage";
import { useState } from "react";
import RichInput from "../RichInput";
import { TaskCheckBox } from "../TaskCheckBox";
import { ButtonBar } from "./ButtonBar";

interface TaskProps {
  data?: Task;
  isActive: boolean;
  onCancel: () => void;
  onApply: (data: Task | number) => void;
  onFocus: (taskId: number | "new") => void;
}

export const Task = ({
  data,
  isActive,
  onCancel,
  onApply,
  onFocus,
}: TaskProps) => {
  const [text, setText] = useState<string>(data?.title || "");
  const parsed = useParseMessage({ text, readOnly: true });

  const handleMessageChange = (newText: string) => {
    setText(newText);
  };

  const handleCancel = () => {
    setText(data?.title || "");
    onCancel();
  };

  const handleAdd = () => {
    console.log(data);
    
    if (data) {
      onApply(data.id);
      return;
    }

    const newTask: Task = {
      id: Math.random(),
      title: text,
      status: "pending",
      created_at: "",
    };
    onApply(newTask);
    setText("");
  };

  const handleClick = () => {
    onFocus(data?.id || "new");
  };

  if (!isActive) {
    return (
      <div
        className="mt-2 hover:cursor-pointer active:opacity-50"
        onClick={handleClick}
      >
        <div className="px-4 py-1 w-full flex items-center gap-2">
          {<TaskCheckBox status={data?.status} />}
          <span className="text-tertiary">
            {parsed ? parsed : "Type to add new task"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-md mt-2 ">
      <div className="px-4 py-1 w-full flex items-center gap-2">
        {<TaskCheckBox status={data?.status} />}
        <RichInput text={text} onChange={handleMessageChange} />
      </div>
      <ButtonBar
        disabled={data === undefined}
        onCancel={handleCancel}
        onApply={handleAdd}
      />
    </div>
  );
};
