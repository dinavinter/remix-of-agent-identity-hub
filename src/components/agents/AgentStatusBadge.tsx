import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentStatusBadgeProps {
  active: boolean;
  className?: string;
}

export function AgentStatusBadge({ active, className }: AgentStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-normal",
        active
          ? "bg-success/10 text-success border-success/30"
          : "bg-muted text-muted-foreground border-border",
        className
      )}
    >
      {active ? "Active" : "Inactive"}
    </Badge>
  );
}
