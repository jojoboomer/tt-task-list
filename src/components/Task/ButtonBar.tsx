import { DynamicIcon } from "lucide-react/dynamic";
import { Button } from "../ui/button";

interface Props {
  disabled?: boolean;
  onCancel: () => void;
  onApply: () => void;
}

export const ButtonBar = ({ disabled = false, onCancel, onApply }: Props) => {
  return (
    <div className="p-2 transition-all duration-300 flex">
      {/* Left */}
      <div className="flex flex-1 gap-4">
        <Button
          disabled={disabled}
          variant={"secondary"}
          className="bg-default"
        >
          <DynamicIcon name="maximize-2" className="size-5 text-secondary" />
          Open
        </Button>
        <div className="space-x-1">
          <Button
            className="text-tertiary border-border"
            disabled={disabled}
            variant={"outline"}
          >
            <DynamicIcon name="calendar" className="size-5" />
            Today
          </Button>
          <Button
            className="text-tertiary border-border"
            disabled={disabled}
            variant={"outline"}
          >
            <DynamicIcon name="unlock" className="size-5" />
            Public
          </Button>
          <Button
            className="text-tertiary border-border"
            disabled={disabled}
            variant={"outline"}
          >
            <DynamicIcon name="loader" className="size-5" />
            Highlight
          </Button>
          <Button
            className="text-tertiary border-border py-2 pr-6 pl-4"
            disabled={disabled}
            variant={"outline"}
          >
            <DynamicIcon name="disc" className="size-5" />
            Estimation
          </Button>
        </div>
      </div>
      {/* Right */}
      <div className="space-x-1">
        <Button
          className="hover:cursor-pointer bg-default"
          onClick={onCancel}
          variant={"secondary"}
        >
          Cancel
        </Button>
        <Button className="hover:cursor-pointer" onClick={onApply}>
          Add
        </Button>
      </div>
    </div>
  );
};
