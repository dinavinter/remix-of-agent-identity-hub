import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShellHeader } from "@/components/layout/ShellHeader";
import { NavigationTabs } from "@/components/layout/NavigationTabs";
import { useAgentContext } from "@/context/AgentContext";
import { AgentStatusBadge } from "@/components/agents/AgentStatusBadge";
import { ProviderBadge } from "@/components/agents/ProviderBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Home, Pencil, Trash2, Save, X, Bot, Users } from "lucide-react";
import { format } from "date-fns";
import { Agent } from "@/data/mockAgents";
import { getGroupsForAgent } from "@/data/mockGroups";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgent, updateAgent, deleteAgent, toggleAgentStatus } = useAgentContext();

  const agent = getAgent(id!);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Agent>>({});

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <ShellHeader />
        <NavigationTabs />
        <main className="p-6">
          <p className="text-muted-foreground">Agent not found.</p>
          <Button
            variant="link"
            className="px-0 mt-2"
            onClick={() => navigate("/agents")}
          >
            ← Back to Agent List
          </Button>
        </main>
      </div>
    );
  }

  const handleEdit = () => {
    setFormData({
      agentName: agent.agentName,
      displayName: agent.displayName,
      userName: agent.userName,
      email: agent.email,
      ordId: agent.ordId,
      provider: agent.provider,
      description: agent.description,
      department: agent.department,
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateAgent(agent.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({});
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteAgent(agent.id);
    navigate("/agents");
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return format(new Date(dateStr), "PPpp");
  };

  return (
    <div className="min-h-screen bg-background">
      <ShellHeader />
      <NavigationTabs />

      <main className="p-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 text-primary hover:underline">
                  <Home className="h-3.5 w-3.5" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/agents" className="text-primary hover:underline">
                  Agent Identity
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{agent.agentName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="fiori-title-1 text-foreground">{agent.agentName}</h1>
                <AgentStatusBadge active={agent.active} />
                <ProviderBadge provider={agent.provider} />
              </div>
              {agent.parentApplicationId ? (
                <Link 
                  to={`/applications?appId=${agent.parentApplicationId}`}
                  className="fiori-label mt-1 text-primary hover:underline cursor-pointer"
                >
                  {agent.displayName}
                </Link>
              ) : (
                <p className="fiori-label mt-1">{agent.displayName}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="timestamps">Timestamps</TabsTrigger>
            <TabsTrigger value="custom">Custom Attributes</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Core Identity</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="fiori-label">ORD ID</Label>
                  {isEditing ? (
                    <Input
                      value={formData.ordId || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ordId: e.target.value }))
                      }
                    />
                  ) : (
                    <p className="fiori-body font-mono">{agent.ordId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Agent Name</Label>
                  {isEditing ? (
                    <Input
                      value={formData.agentName || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, agentName: e.target.value }))
                      }
                    />
                  ) : (
                    <p className="fiori-body">{agent.agentName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Display Name</Label>
                  {isEditing ? (
                    <Input
                      value={formData.displayName || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, displayName: e.target.value }))
                      }
                    />
                  ) : (
                    <p className="fiori-body">{agent.displayName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Username</Label>
                  {isEditing ? (
                    <Input
                      value={formData.userName || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, userName: e.target.value }))
                      }
                    />
                  ) : (
                    <p className="fiori-body font-mono">{agent.userName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">User Type</Label>
                  <p className="fiori-body capitalize">{agent.userType}</p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Provider</Label>
                  {isEditing ? (
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
                  ) : (
                    <ProviderBadge provider={agent.provider} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  ) : (
                    <p className="fiori-body">{agent.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Status</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={agent.active}
                      onCheckedChange={() => toggleAgentStatus(agent.id)}
                    />
                    <span className="fiori-body">
                      {agent.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="fiori-label">Department</Label>
                  {isEditing ? (
                    <Input
                      value={formData.department || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, department: e.target.value }))
                      }
                    />
                  ) : (
                    <p className="fiori-body">{agent.department || "N/A"}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="fiori-label">Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      rows={3}
                    />
                  ) : (
                    <p className="fiori-body">{agent.description || "N/A"}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="authentication">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Authentication Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="fiori-label">Email Verified</Label>
                  <p className="fiori-body">
                    {agent.mailVerified ? (
                      <span className="text-success">✓ Verified</span>
                    ) : (
                      <span className="text-warning">✗ Not Verified</span>
                    )}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Password Status</Label>
                  <p className="fiori-body capitalize">{agent.passwordStatus}</p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Password Set Time</Label>
                  <p className="fiori-body">{formatDate(agent.passwordSetTime)}</p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Failed Login Attempts</Label>
                  <p className="fiori-body">{agent.failedLoginAttempts}</p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Last Login</Label>
                  <p className="fiori-body">{formatDate(agent.loginTime)}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timestamps Tab */}
          <TabsContent value="timestamps">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Timestamps</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="fiori-label">Created</Label>
                  <p className="fiori-body">{formatDate(agent.created)}</p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Last Modified</Label>
                  <p className="fiori-body">{formatDate(agent.lastModified)}</p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Last Login</Label>
                  <p className="fiori-body">{formatDate(agent.loginTime)}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Attributes Tab */}
          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">SCIM Attributes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="fiori-label">Resource Type</Label>
                  <p className="fiori-body">{agent.resourceType}</p>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Version</Label>
                  <p className="fiori-body font-mono">{agent.version}</p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="fiori-label">Location</Label>
                  <p className="fiori-body font-mono text-sm break-all">
                    {agent.location}
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="fiori-label">Schemas</Label>
                  <ul className="space-y-1">
                    {agent.schemas.map((schema, idx) => (
                      <li key={idx} className="fiori-body font-mono text-xs break-all">
                        {schema}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label className="fiori-label">Agent UUID</Label>
                  <p className="fiori-body font-mono text-xs">{agent.id}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-medium">Assigned Groups</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Assign
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    Unassign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const agentGroups = getGroupsForAgent(agent.id);
                  if (agentGroups.length === 0) {
                    return (
                      <p className="text-muted-foreground text-sm">
                        No groups assigned to this agent.
                      </p>
                    );
                  }
                  return (
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="w-10">
                              <Checkbox />
                            </TableHead>
                            <TableHead>Display Name</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Application Name</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {agentGroups.map((group) => (
                            <TableRow key={group.id}>
                              <TableCell>
                                <Checkbox />
                              </TableCell>
                              <TableCell className="font-medium">
                                {group.displayName}
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {group.id}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {group.description || "-"}
                              </TableCell>
                              <TableCell>{group.applicationName}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agent</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{agent.agentName}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
