import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PolicyRule, PolicyActionType } from "@/data/mockPolicies";

interface PolicyRuleItemProps {
  rule: PolicyRule;
  onDelete: (id: string) => void;
}

const actionTypeStyles: Record<PolicyActionType, string> = {
  "Allow": "bg-success/15 text-success border-success/30 hover:bg-success/20",
  "Deny": "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20",
  "Ask For Consent": "bg-info/15 text-info border-info/30 hover:bg-info/20",
};

export function PolicyRuleItem({ rule, onDelete }: PolicyRuleItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-card border rounded-lg group hover:border-primary/30 transition-colors">
      <Badge 
        variant="outline" 
        className={`${actionTypeStyles[rule.actionType]} font-medium px-3 py-1`}
      >
        {rule.actionType}
      </Badge>
      
      <Badge variant="secondary" className="font-mono text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20">
        {rule.target}: {rule.targetType}
      </Badge>
      
      <span className="text-muted-foreground text-sm">Where</span>
      
      <Badge variant="outline" className="font-mono text-xs px-2 py-1 bg-warning/10 text-warning-foreground border-warning/30">
        {rule.whereAttribute}:{rule.whereValue}
      </Badge>
      
      <div className="flex-1" />
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10"
        onClick={() => onDelete(rule.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
