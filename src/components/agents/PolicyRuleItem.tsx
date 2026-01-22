import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Check, Box, Server, Wrench, User } from "lucide-react";
import { PolicyRule, PolicyActionType, attributeValues, ResourceDefinition, PolicyCondition } from "@/data/mockPolicies";
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
  // TODO: Update handler to support editing specific condition lists (when/where)
  onUpdateValue?: (id: string, type: 'when' | 'where', conditionIndex: number, newValue: string) => void;
}

const actionTypeStyles: Record<PolicyActionType, string> = {
  "Allow": "bg-success/15 text-success border-success/30 hover:bg-success/20",
  "Deny": "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20",
  "Ask For Consent": "bg-info/15 text-info border-info/30 hover:bg-info/20",
  "Invoke Tool": "bg-primary/15 text-primary border-primary/30 hover:bg-primary/20",
};

function ResourceDisplay({ resource }: { resource: ResourceDefinition }) {
  const getIcon = () => {
    switch (resource.type) {
      case "Tools": return <Wrench className="h-3 w-3 mr-1" />;
      case "MCP Server": return <Server className="h-3 w-3 mr-1" />;
      case "Agent": return <User className="h-3 w-3 mr-1" />;
      default: return <Box className="h-3 w-3 mr-1" />;
    }
  };

  const renderDetails = () => {
    if (resource.id) {
      const ids = Array.isArray(resource.id) ? resource.id : [resource.id];
      return (
        <span className="ml-1 text-muted-foreground">
          {ids.length === 1 ? `id: ${ids[0]}` : `ids: [${ids.length}]`}
        </span>
      );
    }
    
    if (resource.server) {
      if (typeof resource.server === 'string') {
        return <span className="ml-1 text-muted-foreground">server: {resource.server}</span>;
      }
      if (Array.isArray(resource.server)) {
        return <span className="ml-1 text-muted-foreground">servers: [{resource.server.length}]</span>;
      }
      if ('createdBy' in resource.server) {
        return <span className="ml-1 text-muted-foreground">created by {resource.server.createdBy}</span>;
      }
    }
    
    return null;
  };

  return (
    <Badge variant="outline" className="font-mono text-xs px-2 py-1 bg-muted text-muted-foreground border-border flex items-center">
      {getIcon()}
      {resource.type}
      {renderDetails()}
    </Badge>
  );
}

function ConditionList({ conditions, type, onUpdateValue }: { conditions: PolicyCondition[], type: 'when' | 'where', onUpdateValue?: (idx: number, val: string) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  if (conditions.length === 0) return null;

  return (
    <>
      <span className="text-muted-foreground text-sm font-medium italic mx-1">{type}</span>
      <div className="flex flex-wrap gap-2">
        {conditions.map((condition, index) => {
          const availableValues = attributeValues[condition.attribute] || [];
          const isEditing = editingIndex === index;

          const handleSelect = (val: string) => {
            onUpdateValue?.(index, val);
            setEditingIndex(null);
          };

          return (
            <div key={index} className="flex items-center gap-1 bg-muted/40 px-2 py-1 rounded border border-transparent hover:border-border transition-colors">
              <span className="font-mono text-xs text-muted-foreground">
                {condition.attribute}
              </span>
              
              <span className="text-xs text-muted-foreground font-bold">
                {condition.operator}
              </span>

              <Popover open={isEditing} onOpenChange={(open) => setEditingIndex(open ? index : null)}>
                <PopoverTrigger asChild>
                  <span 
                    className={cn(
                      "font-mono text-xs font-medium cursor-pointer px-1.5 py-0.5 rounded transition-colors",
                      "bg-warning/10 text-warning-foreground hover:bg-warning/20",
                      !condition.value && condition.operator !== "exists" && "italic text-muted-foreground bg-transparent"
                    )}
                  >
                    {condition.value || (condition.operator === "exists" ? "exists" : "value")}
                  </span>
                </PopoverTrigger>
                {availableValues.length > 0 && (
                  <PopoverContent className="w-[200px] p-0 bg-popover border z-50" align="start">
                    <Command>
                      <CommandInput placeholder="Search value..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No value found.</CommandEmpty>
                        <CommandGroup>
                          {availableValues.map((val) => (
                            <CommandItem
                              key={val}
                              value={val}
                              onSelect={() => handleSelect(val)}
                              className="cursor-pointer"
                            >
                              {val}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  condition.value === val ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
              
              {index < conditions.length - 1 && (
                <span className="text-[10px] text-muted-foreground ml-1 uppercase">and</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export function PolicyRuleItem({ rule, onDelete, onUpdateValue }: PolicyRuleItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-card border rounded-lg group hover:border-primary/30 transition-colors">
      
      {/* When Conditions */}
      <ConditionList 
        conditions={rule.whenConditions} 
        type="when" 
        onUpdateValue={(idx, val) => onUpdateValue?.(rule.id, 'when', idx, val)}
      />

      {/* Action Type */}
      <Badge 
        variant="outline" 
        className={`${actionTypeStyles[rule.actionType]} font-medium px-3 py-1`}
      >
        {rule.actionType}
      </Badge>

      {/* Resource */}
      <ResourceDisplay resource={rule.resource} />

      {/* Where Conditions */}
      <ConditionList 
        conditions={rule.whereConditions} 
        type="where" 
        onUpdateValue={(idx, val) => onUpdateValue?.(rule.id, 'where', idx, val)}
      />

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
