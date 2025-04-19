/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicIcon } from "lucide-react/dynamic";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface Props {
    icon : any,
    label: string,
    className: string,
}

const ButtonWithIcon = ({
    icon,
    label,
    className,
    variant = "outline",
    disabled,
    onClick,
  } : Props & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) => (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={cn("text-tertiary border-border",className)}
    >
      <DynamicIcon name={icon} className="size-5" />
      <span className="hidden xl:block">{label}</span>
    </Button>
  );

  export default ButtonWithIcon;