import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShellHeader } from "@/components/layout/ShellHeader";
import { NavigationTabs } from "@/components/layout/NavigationTabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  Info,
  ChevronRight,
  X,
  Maximize2,
  Pencil,
  Trash2,
} from "lucide-react";
import { mockApplications, Application } from "@/data/mockApplications";
import { cn } from "@/lib/utils";

export default function ApplicationList() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Auto-select application if appId is provided in URL
  useEffect(() => {
    const appId = searchParams.get("appId");
    if (appId) {
      const app = mockApplications.find((a) => a.id === appId);
      if (app) {
        setSelectedApp(app);
      }
    }
  }, [searchParams]);

  const filteredApplications = mockApplications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <ShellHeader />
      <NavigationTabs />

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Application List */}
        <div className="w-80 border-r border-border flex flex-col bg-card">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="fiori-title-2 text-foreground">Applications</h2>
              <span className="text-muted-foreground text-sm">
                ({filteredApplications.length})
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Bundled Applications Section */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              <div className="px-2 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Bundled Applications
                </h3>
              </div>
              {filteredApplications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={cn(
                    "w-full text-left px-3 py-3 rounded-md transition-colors",
                    "hover:bg-accent",
                    selectedApp?.id === app.id
                      ? "bg-primary/10 border-l-2 border-primary"
                      : ""
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {app.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {app.id}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Application Detail */}
        {selectedApp ? (
          <div className="flex-1 flex flex-col bg-background">
            {/* Detail Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <h2 className="fiori-title-2 text-foreground">{selectedApp.name}</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedApp(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Info Banner */}
            <Alert className="mx-4 mt-4 border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                This application was created from a source application. Some of
                the inherited configurations can't be changed.
              </AlertDescription>
            </Alert>

            {/* Application Metadata */}
            <div className="p-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Application type:</span>{" "}
                <span className="text-foreground">{selectedApp.applicationType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Application ID:</span>{" "}
                <span className="text-foreground font-mono text-xs">{selectedApp.id}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Name Type:</span>{" "}
                <span className="text-foreground">{selectedApp.nameType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">URL:</span>{" "}
                <span className="text-primary">
                  {selectedApp.url || "Home URL not configured"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Organization ID:</span>{" "}
                <span className="text-foreground">{selectedApp.organizationId}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Protocol Type:</span>{" "}
                <span className="text-foreground">{selectedApp.protocolType}</span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="trust" className="flex-1 flex flex-col px-4">
              <TabsList className="w-fit border-b border-border bg-transparent h-auto p-0 rounded-none">
                <TabsTrigger
                  value="trust"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Trust
                </TabsTrigger>
                <TabsTrigger
                  value="authentication"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Authentication and Access
                </TabsTrigger>
                <TabsTrigger
                  value="dependencies"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Dependencies
                </TabsTrigger>
                <TabsTrigger
                  value="provisioning"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Provisioning
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trust" className="flex-1 mt-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-foreground mb-4">Single Sign-On</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          Multitenant Application
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Allow application to be used in multiple tenants.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border-t border-border">
                      <div>
                        <p className="font-medium text-foreground">
                          OpenID Connect Configuration
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Configure trust with a service provider for web-based
                          authentication.
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="authentication" className="flex-1 mt-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-foreground">
                    Authentication Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Configure authentication settings for this application.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="dependencies" className="flex-1 mt-4">
                <div className="rounded-lg border border-border bg-card">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        APIs ({selectedApp.dependencies.length})
                      </h3>
                      <Button variant="link" className="text-primary h-auto p-0">
                        Add
                      </Button>
                    </div>
                    <Alert className="mt-3 border-primary/20 bg-primary/5">
                      <Info className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-sm">
                        List of APIs provided by other Identity Authentication
                        applications that are consumed by this application. A
                        maximum of 20 entries is allowed.
                      </AlertDescription>
                    </Alert>
                  </div>

                  {selectedApp.dependencies.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dependency Name</TableHead>
                          <TableHead>Application</TableHead>
                          <TableHead>API Name</TableHead>
                          <TableHead>API Description</TableHead>
                          <TableHead>Authorization Context</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedApp.dependencies.map((dep) => (
                          <TableRow key={dep.id}>
                            <TableCell className="font-medium">
                              {dep.name}
                            </TableCell>
                            <TableCell>{dep.application}</TableCell>
                            <TableCell>{dep.apiName}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {dep.apiDescription || "-"}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {dep.authorizationContext || "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No dependencies configured for this application.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="provisioning" className="flex-1 mt-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold text-foreground">Provisioning</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Configure provisioning settings for this application.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/20">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Select an application to view details</p>
              <p className="text-sm mt-1">
                Choose an application from the list on the left
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
