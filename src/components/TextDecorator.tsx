import { DynamicIcon } from "lucide-react/dynamic";
import { Badge } from "./ui/badge";

interface Props {
  children: React.ReactNode;
  component: "badge" | "span";
  className: string;
  key: string;
  icon?: any;
}

export const TextDecorator = ({
  key,
  children,
  component,
  className,
  icon,
}: Props) => {
  if (component === "badge") {
    return <Badge className={className}><DynamicIcon name={icon}/>{children}</Badge>;
  }
  return (
    <span key={key} className={className}>
      {children}
    </span>
  );
};
