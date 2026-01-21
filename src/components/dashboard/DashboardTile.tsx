import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardTileProps {
  title: string;
  count?: number;
  icon: LucideIcon;
  to: string;
  variant?: "default" | "primary";
  description?: string;
}

export function DashboardTile({
  title,
  count,
  icon: Icon,
  to,
  variant = "default",
  description,
}: DashboardTileProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group block p-4 bg-tile border border-tile-border rounded-sm",
        "hover:shadow-md hover:border-primary/30 transition-all duration-200",
        "min-h-[120px] flex flex-col"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            "p-2 rounded",
            variant === "primary" ? "bg-primary/10" : "bg-muted"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5",
              variant === "primary" ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        {count !== undefined && (
          <span className="text-2xl font-light text-foreground">{count}</span>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </Link>
  );
}
