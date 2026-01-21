import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Agent } from "@/data/mockAgents";

interface ProviderBadgeProps {
  provider: Agent["provider"];
  className?: string;
}

const providerStyles: Record<Agent["provider"], string> = {
  SAP: "bg-[hsl(207,90%,43%)] text-white",
  Microsoft: "bg-[hsl(207,100%,35%)] text-white",
  ServiceNow: "bg-[hsl(145,63%,35%)] text-white",
  AWS: "bg-[hsl(36,100%,45%)] text-white",
  Google: "bg-[hsl(4,90%,58%)] text-white",
  Salesforce: "bg-[hsl(207,90%,50%)] text-white",
};

export function ProviderBadge({ provider, className }: ProviderBadgeProps) {
  return (
    <Badge
      className={cn(
        "text-xs font-medium border-0",
        providerStyles[provider],
        className
      )}
    >
      {provider}
    </Badge>
  );
}
