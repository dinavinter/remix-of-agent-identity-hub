import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShellHeader } from "@/components/layout/ShellHeader";
import { NavigationTabs } from "@/components/layout/NavigationTabs";
import { useAgentContext } from "@/context/AgentContext";
import { AgentStatusBadge } from "@/components/agents/AgentStatusBadge";
import { ProviderBadge } from "@/components/agents/ProviderBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Trash2, Search, Filter, Home } from "lucide-react";
import { CreateAgentDialog } from "@/components/agents/CreateAgentDialog";
import { formatDistanceToNow } from "date-fns";
export default function AgentList() {
  const navigate = useNavigate();
  const {
    agents,
    deleteAgent
  } = useAgentContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const filteredAgents = agents.filter(agent => agent.agentName.toLowerCase().includes(searchQuery.toLowerCase()) || agent.userName.toLowerCase().includes(searchQuery.toLowerCase()) || agent.provider.toLowerCase().includes(searchQuery.toLowerCase()) || agent.ordId.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredAgents.map(a => a.id) : []);
  };
  const handleSelectOne = (id: string, checked: boolean) => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  };
  const handleDeleteSelected = () => {
    selectedIds.forEach(id => deleteAgent(id));
    setSelectedIds([]);
    setDeleteDialogOpen(false);
  };
  return <div className="min-h-screen bg-background">
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
              <BreadcrumbPage>Agent Identity</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="fiori-title-1 text-foreground">Agent Identity Management</h1>
            <p className="fiori-label mt-1">
              {agents.length} agents configured
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4 bg-card p-3 rounded border border-border">
          <Button size="sm" onClick={() => setCreateDialogOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add
          </Button>
          <Button variant="outline" size="sm" onClick={() => setDeleteDialogOpen(true)} disabled={selectedIds.length === 0} className="gap-1.5">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <div className="flex-1" />

          <div className="relative w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search agents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 h-8" />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card border border-border rounded overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox checked={selectedIds.length === filteredAgents.length && filteredAgents.length > 0} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>Agent Name</TableHead>
                <TableHead>ORD ID</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map(agent => <TableRow key={agent.id} className="cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/agents/${agent.id}`)}>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <Checkbox checked={selectedIds.includes(agent.id)} onCheckedChange={checked => handleSelectOne(agent.id, !!checked)} />
                  </TableCell>
                  <TableCell className="font-medium text-primary">
                    {agent.agentName}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {agent.ordId}
                  </TableCell>
                  <TableCell>
                    <ProviderBadge provider={agent.provider} />
                  </TableCell>
                  <TableCell className="capitalize text-muted-foreground">
                    {agent.userType}
                  </TableCell>
                  <TableCell>
                    <AgentStatusBadge active={agent.active} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {agent.loginTime ? formatDistanceToNow(new Date(agent.loginTime), {
                  addSuffix: true
                }) : "Never"}
                  </TableCell>
                </TableRow>)}
              {filteredAgents.length === 0 && <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No agents found
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Create Agent Dialog */}
      <CreateAgentDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agents</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedIds.length} selected
              agent(s)? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelected} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
}