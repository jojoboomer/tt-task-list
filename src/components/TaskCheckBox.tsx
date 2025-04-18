import { PlusSquare } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

export const TaskCheckBox = ({ status }: { status: string }) => {
    if (status) {
      return (
        <Checkbox className="text-primary" />
      )
    }

    return (
      <PlusSquare className="text-primary" size={20} />
    )
  };