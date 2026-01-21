import { useState } from "react";
import { useAgentContext } from "@/context/AgentContext";
import { Agent } from "@/data/mockAgents";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialFormData: Partial<Agent> = {
  agentName: "",
  displayName: "",
  userName: "",
  email: "",
  ordId: "",
  provider: "SAP",
  userType: "agent",
  active: true,
  mailVerified: false,
  loginTime: null,
  failedLoginAttempts: 0,
  passwordSetTime: null,
  passwordStatus: "initial",
  resourceType: "Agent",
  location: "",
  schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  description: "",
  department: "",
};

export function CreateAgentDialog({ open, onOpenChange }: CreateAgentDialogProps) {
  const { createAgent } = useAgentContext();
  const [formData, setFormData] = useState<Partial<Agent>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.agentName?.trim()) {
      newErrors.agentName = "Agent name is required";
    }
    if (!formData.userName?.trim()) {
      newErrors.userName = "Username is required";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.ordId?.trim()) {
      newErrors.ordId = "ORD ID is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const location = `https://${formData.provider?.toLowerCase()}.example.com/scim/agents/${crypto.randomUUID().split("-")[0]}`;
    
    createAgent({
      ...formData,
      location,
    } as Omit<Agent, "id" | "created" | "lastModified" | "version">);
    
    setFormData(initialFormData);
    setErrors({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Add a new agent identity to the system. Fill in the required fields below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="agentName">
              Agent Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="agentName"
              value={formData.agentName || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, agentName: e.target.value }))
              }
              className={errors.agentName ? "border-destructive" : ""}
            />
            {errors.agentName && (
              <p className="text-xs text-destructive">{errors.agentName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={formData.displayName || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, displayName: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userName">
              Username <span className="text-destructive">*</span>
            </Label>
            <Input
              id="userName"
              value={formData.userName || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, userName: e.target.value }))
              }
              className={errors.userName ? "border-destructive" : ""}
            />
            {errors.userName && (
              <p className="text-xs text-destructive">{errors.userName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ordId">
              ORD ID <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ordId"
              value={formData.ordId || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ordId: e.target.value }))
              }
              placeholder="e.g., sap:agent:workflow:v1"
              className={errors.ordId ? "border-destructive" : ""}
            />
            {errors.ordId && (
              <p className="text-xs text-destructive">{errors.ordId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select
              value={formData.provider}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  provider: value as Agent["provider"],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SAP">SAP</SelectItem>
                <SelectItem value="Microsoft">Microsoft</SelectItem>
                <SelectItem value="ServiceNow">ServiceNow</SelectItem>
                <SelectItem value="AWS">AWS</SelectItem>
                <SelectItem value="Google">Google</SelectItem>
                <SelectItem value="Salesforce">Salesforce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, department: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
              placeholder="Brief description of the agent's purpose"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Agent</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
