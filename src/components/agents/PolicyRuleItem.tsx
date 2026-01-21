import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import { PolicyRule, PolicyActionType, attributeValues } from "@/data/mockPolicies";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PolicyRuleItemProps {
  rule: PolicyRule;
  onDelete: (id: string) => void;
  onUpdateValue?: (id: string, newValue: string) => void;
}

const actionTypeStyles: Record<PolicyActionType, string> = {
  "Allow": "bg-success/15 text-success border-success/30 hover:bg-success/20",
  "Deny": "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20",
  "Ask For Consent": "bg-info/15 text-info border-info/30 hover:bg-info/20",
};

export function PolicyRuleItem({ rule, onDelete, onUpdateValue }: PolicyRuleItemProps) {
  const [open, setOpen] = useState(false);
  const availableValues = attributeValues[rule.whereAttribute] || [];

  const handleSelectValue = (value: string) => {
    onUpdateValue?.(rule.id, value);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-card border rounded-lg group hover:border-primary/30 transition-colors">
      <span className="text-muted-foreground text-sm font-medium">Where</span>
      
      {/* Attribute Badge (non-editable) */}
      <Badge variant="outline" className="font-mono text-xs px-2 py-1 bg-muted text-muted-foreground border-border">
        {rule.whereAttribute}
      </Badge>

      <span className="text-muted-foreground text-sm">is</span>

      {/* Value Badge (editable with autocomplete) */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Badge 
            variant="outline" 
            className="font-mono text-xs px-2 py-1 bg-warning/10 text-warning-foreground border-warning/30 cursor-pointer hover:bg-warning/20 transition-colors"
          >
            {rule.whereValue}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-popover border z-50" align="start">
          <Command>
            <CommandInput placeholder="Search value..." className="h-9" />
            <CommandList>
              <CommandEmpty>No value found.</CommandEmpty>
              <CommandGroup>
                {availableValues.map((value) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={() => handleSelectValue(value)}
                    className="cursor-pointer"
                  >
                    {value}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        rule.whereValue === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Badge 
        variant="outline" 
        className={`${actionTypeStyles[rule.actionType]} font-medium px-3 py-1`}
      >
        {rule.actionType}
      </Badge>
      
      <Badge variant="secondary" className="font-mono text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20">
        {rule.target}: {rule.targetType}
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
