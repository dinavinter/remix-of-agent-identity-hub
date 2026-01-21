import { ShellHeader } from "@/components/layout/ShellHeader";
import { NavigationTabs } from "@/components/layout/NavigationTabs";
import { DashboardTile } from "@/components/dashboard/DashboardTile";
import { useAgentContext } from "@/context/AgentContext";
import { mockGroups } from "@/data/mockGroups";
import { mockUsers } from "@/data/mockUsers";
import {
  Users,
  UsersRound,
  Upload,
  Download,
  FileJson,
  Bot,
  AppWindow,
} from "lucide-react";

export default function Dashboard() {
  const { agents } = useAgentContext();
  const activeAgents = agents.filter((a) => a.active).length;

  return (
    <div className="min-h-screen bg-background">
      <ShellHeader />
      <NavigationTabs />

      <main className="p-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="fiori-title-1 text-foreground">Administration Console</h1>
          <p className="fiori-label mt-1">
            Manage users, groups, and identity configurations
          </p>
        </div>

        {/* Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <DashboardTile
            title="User Management"
            count={mockUsers.length}
            icon={Users}
            to="/users"
            description="Manage user accounts"
          />
          <DashboardTile
            title="Groups"
            count={mockGroups.length}
            icon={UsersRound}
            to="/groups"
            description="Organize users into groups"
          />
          <DashboardTile
            title="Import Users"
            icon={Upload}
            to="/import"
            description="Import users from file"
          />
          <DashboardTile
            title="Export Users"
            icon={Download}
            to="/export"
            description="Export user data"
          />
          <DashboardTile
            title="Schemas"
            icon={FileJson}
            to="/schemas"
            description="SCIM schema configuration"
          />
          <DashboardTile
            title="Agent Identity"
            count={agents.length}
            icon={Bot}
            to="/agents"
            variant="primary"
            description={`${activeAgents} active agents`}
          />
        </div>

        {/* Applications & Resources Section */}
        <div className="mt-8">
          <h2 className="fiori-title-2 text-foreground mb-4">Applications & Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <DashboardTile
              title="Applications"
              count={2}
              icon={AppWindow}
              to="/applications"
              description="Manage applications and resources"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
