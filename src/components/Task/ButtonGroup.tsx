import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
    className?: string,
    children: ReactNode
}

const ButtonGroup = ({className, children}: Props)  => (
    <div className={cn('flex items-center gap-1',className)}>
        {children}
    </div>
)

export default ButtonGroup;