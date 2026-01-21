import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShellHeader } from "@/components/layout/ShellHeader";
import { NavigationTabs } from "@/components/layout/NavigationTabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Plus, Trash2, Settings, ChevronRight } from "lucide-react";
import { mockUsers } from "@/data/mockUsers";

export default function UserList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.loginName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.scimId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
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
                <Link
                  to="/"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Home className="h-3.5 w-3.5" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="fiori-title-1 text-foreground">User Management</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Go
            </Button>
            <Button variant="link" size="sm" className="text-primary">
              Show Filters
            </Button>
            <Button variant="link" size="sm" className="text-primary">
              Import
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground">
              Provision
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <label className="fiori-label block mb-2">Users:</label>
          <Input
            type="text"
            placeholder="Search by User ID, Global User ID, SCIM ID, Email or Login Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-2xl border-primary"
          />
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-lg border">
          {/* Table Header with count and actions */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="fiori-body font-medium">
              Users ({filteredUsers.length} out of {mockUsers.length})
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
              <Button
                variant="link"
                size="sm"
                className="text-muted-foreground"
                disabled={selectedUsers.length === 0}
              >
                Delete
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length === filteredUsers.length
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="fiori-label">First Name</TableHead>
                <TableHead className="fiori-label">Last Name</TableHead>
                <TableHead className="fiori-label">Email</TableHead>
                <TableHead className="fiori-label">Login Name</TableHead>
                <TableHead className="fiori-label">SCIM ID</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="fiori-body">{user.firstName}</TableCell>
                  <TableCell className="fiori-body">{user.lastName}</TableCell>
                  <TableCell className="fiori-body">{user.email}</TableCell>
                  <TableCell className="fiori-body">{user.loginName}</TableCell>
                  <TableCell className="fiori-body font-mono text-xs">
                    {user.scimId}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <p className="fiori-body text-muted-foreground">
                No users found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
