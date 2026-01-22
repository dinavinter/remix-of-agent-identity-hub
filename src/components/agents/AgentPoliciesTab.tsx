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
  getPoliciesForAgent,
  resourceTypes,
  ResourceType,
  attributeTypes,
  attributeValues,
  PolicyCondition,
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
  const [newResourceType, setNewResourceType] = useState<ResourceType>("Tools");
  
  // When condition state
  const [newWhenAttr, setNewWhenAttr] = useState<string>("");
  const [newWhenValue, setNewWhenValue] = useState<string>("");
  
  // Where condition state
  const [newWhereAttr, setNewWhereAttr] = useState<string>("");
  const [newWhereValue, setNewWhereValue] = useState<string>("");

  const availableWhenValues = newWhenAttr ? attributeValues[newWhenAttr] || [] : [];
  const availableWhereValues = newWhereAttr ? attributeValues[newWhereAttr] || [] : [];
  
  const whenAttributes = attributeTypes.filter(a => a.type === "when");
  const whereAttributes = attributeTypes.filter(a => a.type === "where");

  const handleDeleteRule = (id: string) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id));
    toast.success("Policy rule removed");
  };

  const handleUpdateValue = (id: string, type: 'when' | 'where', conditionIndex: number, newValue: string) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const conditionsKey = type === 'when' ? 'whenConditions' : 'whereConditions';
          const newConditions = [...p[conditionsKey]];
          if (newConditions[conditionIndex]) {
            newConditions[conditionIndex] = { ...newConditions[conditionIndex], value: newValue };
          }
          return { ...p, [conditionsKey]: newConditions };
        }
        return p;
      })
    );
    toast.success("Policy value updated");
  };

  const handleAddRule = () => {
    const whenConds: PolicyCondition[] = newWhenAttr ? [{
      attribute: newWhenAttr,
      operator: "=",
      value: newWhenValue || "value"
    }] : [];

    const whereConds: PolicyCondition[] = newWhereAttr ? [{
      attribute: newWhereAttr,
      operator: "=",
      value: newWhereValue || "value"
    }] : [];

    const newRule: PolicyRule = {
      id: `pol-${Date.now()}`,
      agentId: agent.id,
      actionType: newActionType,
      resource: {
        type: newResourceType,
      },
      whenConditions: whenConds,
      whereConditions: whereConds
    };

    setPolicies((prev) => [...prev, newRule]);
    
    // Reset form
    setNewWhenAttr("");
    setNewWhenValue("");
    setNewWhereAttr("");
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
              Configure access policies for AI agents using AMS terminology (When/Where)
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
            
            {/* When (Context) */}
            <div className="space-y-2 lg:col-span-2 grid grid-cols-2 gap-2 border-r pr-4">
               <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">When (Context):</Label>
                <Select
                  value={newWhenAttr}
                  onValueChange={(v) => {
                    setNewWhenAttr(v);
                    setNewWhenValue("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-- No context --" />
                  </SelectTrigger>
                  <SelectContent>
                    {whenAttributes.map((attr) => (
                      <SelectItem key={attr.value} value={attr.value}>
                        {attr.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
               </div>
               <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Value:</Label>
                <Select
                  value={newWhenValue}
                  onValueChange={setNewWhenValue}
                  disabled={!newWhenAttr}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Value" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableWhenValues.map((val) => (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
               </div>
            </div>

            {/* Action & Resource */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Decision:</Label>
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

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Resource:</Label>
              <Select value={newResourceType} onValueChange={(v) => setNewResourceType(v as ResourceType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Where (Resource) */}
            <div className="space-y-2 lg:col-span-4 grid grid-cols-4 gap-4 border-t pt-4">
               <div className="col-span-1 flex items-center">
                  <span className="text-sm font-medium text-muted-foreground">Where (Resource Condition):</span>
               </div>
               <div className="col-span-3 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Select
                      value={newWhereAttr}
                      onValueChange={(v) => {
                        setNewWhereAttr(v);
                        setNewWhereValue("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="-- No condition --" />
                      </SelectTrigger>
                      <SelectContent>
                        {whereAttributes.map((attr) => (
                          <SelectItem key={attr.value} value={attr.value}>
                            {attr.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={newWhereValue}
                      onValueChange={setNewWhereValue}
                      disabled={!newWhereAttr}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Value" />
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
