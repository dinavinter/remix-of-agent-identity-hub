import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save } from "lucide-react";
import { PolicyRuleItem } from "./PolicyRuleItem";
import {
  PolicyRule,
  PolicyActionType,
  TargetType,
  getPoliciesForAgent,
  policyTargetTemplates,
  attributeTypes,
  attributeValues,
} from "@/data/mockPolicies";
import { toast } from "sonner";
import { Agent } from "@/data/mockAgents";

interface AgentPoliciesTabProps {
  agent: Agent;
}

export function AgentPoliciesTab({ agent }: AgentPoliciesTabProps) {
  const [policies, setPolicies] = useState<PolicyRule[]>(() =>
    getPoliciesForAgent(agent.id)
  );

  // New policy form state
  const [newActionType, setNewActionType] = useState<PolicyActionType>("Allow");
  const [newTarget, setNewTarget] = useState<string>("");
  const [newWhereAttribute, setNewWhereAttribute] = useState<string>("");
  const [newWhereValue, setNewWhereValue] = useState<string>("");

  const selectedTarget = policyTargetTemplates.find((t) => t.value === newTarget);
  const availableWhereValues = newWhereAttribute
    ? attributeValues[newWhereAttribute] || []
    : [];

  const handleDeleteRule = (id: string) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id));
    toast.success("Policy rule removed");
  };

  const handleUpdateValue = (id: string, newValue: string) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, whereValue: newValue } : p))
    );
    toast.success("Policy value updated");
  };

  const handleAddRule = () => {
    if (!newTarget || !newWhereAttribute || !newWhereValue) {
      toast.error("Please fill in all fields");
      return;
    }

    const newRule: PolicyRule = {
      id: `pol-${Date.now()}`,
      agentId: agent.id,
      actionType: newActionType,
      target: newTarget,
      targetType: selectedTarget?.type || "MCP Tool",
      whereAttribute: newWhereAttribute,
      whereValue: newWhereValue,
    };

    setPolicies((prev) => [...prev, newRule]);
    
    // Reset form
    setNewTarget("");
    setNewWhereAttribute("");
    setNewWhereValue("");
    
    toast.success("Policy rule added");
  };

  const handleSaveAll = () => {
    // In a real app, this would persist to backend
    toast.success(`Saved ${policies.length} policy rules`);
  };

  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">
              AI Agent Policies Management
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Configure access policies for AI agents
            </p>
          </div>
          <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
            <span className="text-sm text-muted-foreground">Current Agent: </span>
            <span className="font-medium text-primary">
              {agent.id.substring(0, 8).toUpperCase()} ({agent.agentName})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Policy Rules List */}
        <div className="space-y-3">
          <Label className="fiori-label">
            Policy Rules ({policies.length}):
          </Label>
          
          {policies.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center border rounded-lg bg-muted/30">
              No policy rules defined for this agent.
            </p>
          ) : (
            <div className="space-y-2">
              {policies.map((rule) => (
                <PolicyRuleItem
                  key={rule.id}
                  rule={rule}
                  onDelete={handleDeleteRule}
                  onUpdateValue={handleUpdateValue}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add New Policy Rule Form */}
        <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
          <Label className="fiori-label font-medium">Add New Policy Rule</Label>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Action Type */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Action Type:</Label>
              <Select
                value={newActionType}
                onValueChange={(v) => setNewActionType(v as PolicyActionType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Allow">Allow</SelectItem>
                  <SelectItem value="Deny">Deny</SelectItem>
                  <SelectItem value="Ask For Consent">Ask For Consent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Target:</Label>
              <Select value={newTarget} onValueChange={setNewTarget}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select from loaded template --" />
                </SelectTrigger>
                <SelectContent>
                  {policyTargetTemplates.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}: {t.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Where Attribute */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Where:</Label>
              <Select
                value={newWhereAttribute}
                onValueChange={(v) => {
                  setNewWhereAttribute(v);
                  setNewWhereValue(""); // Reset value when attribute changes
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-- No constraint --" />
                </SelectTrigger>
                <SelectContent>
                  {attributeTypes.map((attr) => (
                    <SelectItem key={attr.value} value={attr.value}>
                      {attr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Where Value */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">:</Label>
              <Select
                value={newWhereValue}
                onValueChange={setNewWhereValue}
                disabled={!newWhereAttribute}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      newWhereAttribute
                        ? "-- Select value --"
                        : "Select attribute type first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableWhereValues.map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleAddRule} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Policy Rule
            </Button>
            <Button
              onClick={handleSaveAll}
              size="sm"
              variant="secondary"
              className="bg-success text-success-foreground hover:bg-success/90"
            >
              <Save className="h-4 w-4 mr-1" />
              Save All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
