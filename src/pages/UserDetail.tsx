import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShellHeader } from "@/components/layout/ShellHeader";
import { NavigationTabs } from "@/components/layout/NavigationTabs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Pencil, User } from "lucide-react";
import { mockUsers, getGroupsForUser } from "@/data/mockUsers";
import { mockGroups } from "@/data/mockGroups";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const user = mockUsers.find((u) => u.id === id);
  const userGroupIds = user ? getGroupsForUser(user.id) : [];
  const userGroups = mockGroups.filter((g) => userGroupIds.includes(g.id));

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <ShellHeader />
        <NavigationTabs />
        <main className="p-6">
          <p className="text-muted-foreground">User not found.</p>
          <Button
            variant="link"
            className="px-0 mt-2"
            onClick={() => navigate("/users")}
          >
            ← Back to User List
          </Button>
        </main>
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

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
              <BreadcrumbLink asChild>
                <Link to="/users" className="text-primary hover:underline">
                  User Management
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{fullName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="fiori-title-1 text-foreground">{fullName}</h1>
              <p className="fiori-label mt-1">
                SCIM ID: {user.scimId.slice(0, 16)}...8cb9e2e3a
              </p>
              <p className="fiori-label">
                User ID: {user.loginName}
              </p>
              <p className="fiori-label">
                Email: {user.email}
              </p>
            </div>
          </div>

          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="personal">Details</TabsTrigger>
            <TabsTrigger value="entitlements">Entitlements</TabsTrigger>
            <TabsTrigger value="user-profile">User Profile</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            {/* Personal Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    HONORS
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    User ID
                  </Label>
                  <p className="fiori-body">{user.userId}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    SCIM ID
                  </Label>
                  <p className="fiori-body font-mono text-xs">{user.scimId}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Global User ID
                  </Label>
                  <p className="fiori-body font-mono text-xs">
                    {user.globalUserId}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    SCIM Id
                  </Label>
                  <p className="fiori-body font-mono text-xs">{user.scimId}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Name
                  </Label>
                  <p className="fiori-body">{user.displayName}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Type
                  </Label>
                  <p className="fiori-body">Employee</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company Relationship
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Valid From
                  </Label>
                  <p className="fiori-body">{user.validFrom || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Valid To
                  </Label>
                  <p className="fiori-body">{user.validTo || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Address
                  </Label>
                  <p className="fiori-body">{user.city || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    ZIP/Postal Code
                  </Label>
                  <p className="fiori-body">{user.postalCode || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Country/Region
                  </Label>
                  <p className="fiori-body">{user.countryRegion || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Street Address
                  </Label>
                  <p className="fiori-body">{user.streetAddress || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Country
                  </Label>
                  <p className="fiori-body">{user.country || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Salutation
                  </Label>
                  <p className="fiori-body">{user.salutation || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Title
                  </Label>
                  <p className="fiori-body">{user.title || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Display Name
                  </Label>
                  <p className="fiori-body">{user.displayName}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Login Name
                  </Label>
                  <p className="fiori-body">{user.loginName}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Telephone
                  </Label>
                  <p className="fiori-body">{user.telephone || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Mobile Phone
                  </Label>
                  <p className="fiori-body">{user.mobile || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Fax
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Email
                  </Label>
                  <p className="fiori-body">{user.email}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Verified
                  </Label>
                  <p className="fiori-body text-success">✓ Verified</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Language
                  </Label>
                  <p className="fiori-body">{user.language || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Time Zone
                  </Label>
                  <p className="fiori-body">{user.timezone || "-"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Employee Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Employee Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Employment Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="fiori-label text-muted-foreground">
                        Employee Number
                      </Label>
                      <p className="fiori-body">{user.employeeNumber || "-"}</p>
                    </div>

                    <div className="space-y-1">
                      <Label className="fiori-label text-muted-foreground">
                        Cost Center
                      </Label>
                      <p className="fiori-body">{user.costCenter || "-"}</p>
                    </div>

                    <div className="space-y-1">
                      <Label className="fiori-label text-muted-foreground">
                        Division
                      </Label>
                      <p className="fiori-body">{user.division || "-"}</p>
                    </div>

                    <div className="space-y-1">
                      <Label className="fiori-label text-muted-foreground">
                        Department
                      </Label>
                      <p className="fiori-body">{user.department || "-"}</p>
                    </div>

                    <div className="space-y-1">
                      <Label className="fiori-label text-muted-foreground">
                        Manager's Display Name
                      </Label>
                      <p className="fiori-body">
                        {user.managerDisplayName || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Industry
                  </Label>
                  <p className="fiori-body">{user.industry || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company
                  </Label>
                  <p className="fiori-body">{user.company || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company City
                  </Label>
                  <p className="fiori-body">{user.companyCity || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company Country/Region
                  </Label>
                  <p className="fiori-body">{user.companyCountryRegion || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company Street Address
                  </Label>
                  <p className="fiori-body">{user.companyStreetAddress || "-"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company Street Address 2
                  </Label>
                  <p className="fiori-body">
                    {user.companyStreetAddress2 || "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company Street Address 3
                  </Label>
                  <p className="fiori-body">
                    {user.companyStreetAddress3 || "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Company Relationship ID
                  </Label>
                  <p className="fiori-body">
                    {user.companyRelationshipId || "-"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Custom Attributes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Custom Attributes
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 1
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 1_2
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 2
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 3
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 4
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 5
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 6
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 6_2
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 7
                  </Label>
                  <p className="fiori-body">-</p>
                </div>

                <div className="space-y-1">
                  <Label className="fiori-label text-muted-foreground">
                    Custom Attribute 8b
                  </Label>
                  <p className="fiori-body">-</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Entitlements Tab */}
          <TabsContent value="entitlements">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  User Entitlements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="fiori-body text-muted-foreground">
                  No entitlements configured for this user.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Profile Tab */}
          <TabsContent value="user-profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  User Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="fiori-body text-muted-foreground">
                  User profile settings and preferences.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Tab */}
          <TabsContent value="legal">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Legal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="fiori-body text-muted-foreground">
                  Legal agreements and compliance information.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="authentication">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Authentication Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="fiori-body text-muted-foreground">
                  Authentication methods and security settings.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Group Memberships
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Assign Groups
                  </Button>
                  <Button size="sm" variant="outline" disabled>
                    Unassign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {userGroups.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead className="fiori-label">
                          Display Name
                        </TableHead>
                        <TableHead className="fiori-label">Group ID</TableHead>
                        <TableHead className="fiori-label">
                          Application
                        </TableHead>
                        <TableHead className="fiori-label">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userGroups.map((group) => (
                        <TableRow key={group.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="fiori-body font-medium">
                            {group.displayName}
                          </TableCell>
                          <TableCell className="fiori-body font-mono text-xs">
                            {group.id}
                          </TableCell>
                          <TableCell className="fiori-body">
                            {group.applicationName}
                          </TableCell>
                          <TableCell className="fiori-body">
                            {group.type}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">
                    This user is not assigned to any groups.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
