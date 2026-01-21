import { useState } from "react";
import { Link } from "react-router-dom";
import { ShellHeader } from "@/components/layout/ShellHeader";
import { NavigationTabs } from "@/components/layout/NavigationTabs";
import { mockGroups } from "@/data/mockGroups";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Home, Plus, Trash2, Search, Settings2, ChevronRight } from "lucide-react";

export default function GroupList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const filteredGroups = mockGroups.filter(
    (group) =>
      group.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.applicationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedGroups.length === filteredGroups.length) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(filteredGroups.map((g) => g.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedGroups((prev) =>
      prev.includes(id) ? prev.filter((gId) => gId !== id) : [...prev, id]
    );
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
              <BreadcrumbPage>Groups</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="fiori-title-1 text-foreground">Groups</h1>
          <div className="flex items-center gap-3">
            <Button variant="link" className="text-primary">
              Show Filter Bars
            </Button>
            <Button variant="link" className="text-primary">
              Import
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="fiori-label mb-2 block">Groups:</label>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Group ID, Display Name or Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="border rounded-lg bg-card">
          {/* Table Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
            <span className="fiori-body font-medium">
              Groups ({filteredGroups.length})
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-1" />
                Create
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={selectedGroups.length === 0}
              >
                Delete
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      filteredGroups.length > 0 &&
                      selectedGroups.length === filteredGroups.length
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Display Name</TableHead>
                <TableHead>Application Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Group ID</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((group) => (
                <TableRow
                  key={group.id}
                  className="cursor-pointer hover:bg-muted/30"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={() => toggleSelect(group.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {group.displayName}
                  </TableCell>
                  <TableCell>{group.applicationName}</TableCell>
                  <TableCell>{group.type}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {group.id}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
              {filteredGroups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No groups found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
