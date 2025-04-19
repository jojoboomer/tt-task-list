import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Button } from "../ui/button";

interface Props {
  disabled?: boolean;
  newComp: boolean;
  edited?: boolean;
  onCancel: () => void;
  onApply: () => void;
}

export const ButtonBar = ({
  disabled = false,
  onCancel,
  onApply,
  newComp,
  edited = false,
}: Props) => {
  const renderLeftButtons = () => (
    <div className="flex flex-1 gap-4">
      <Button disabled={disabled} variant="secondary" className="bg-default">
        <DynamicIcon name="maximize-2" className="size-5 text-secondary" />
        <span className="hidden xl:block">Open</span>
      </Button>
      <div className="space-x-1">
        {[
          { name: "calendar", label: "Today" },
          { name: "unlock", label: "Public" },
          { name: "loader", label: "Highlight" },
          { name: "disc", label: "Estimation", extraClass: "py-2 pr-6 pl-4" },
        ].map(({ name, label, extraClass = "" }) => (
          <Button
            key={name}
            className={`text-tertiary border-border ${extraClass}`}
            disabled={disabled}
            variant="outline"
          >
            <DynamicIcon name={name as IconName} className="size-5" />
            <span className="hidden xl:block">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderRightButtons = () => (
    <div className="space-x-1 xl:inline hidden">
      <Button
        className="bg-default"
        onClick={onCancel}
        variant="secondary"
      >
        Cancel
      </Button>
      <Button onClick={onApply}>
        {newComp ? (edited ? "Add" : "Ok") : "Save"}
      </Button>
    </div>
  );

  const renderMobileButtons = () => (
    <div className="inline xl:hidden">
      {edited ? (
        <Button size="icon" onClick={onApply}>
          <DynamicIcon
            name={newComp ? "plus" : "save"}
            className="size-5"
            color="white"
          />
        </Button>
      ) : (
        <Button size="icon" onClick={onCancel}>
          <DynamicIcon name="x" className="size-5" color="white" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="p-2 transition-all duration-300 flex">
      {renderLeftButtons()}
      {renderRightButtons()}
      {renderMobileButtons()}
    </div>
  );
};
