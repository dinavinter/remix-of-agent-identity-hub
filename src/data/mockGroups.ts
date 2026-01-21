export interface Group {
  id: string;
  displayName: string;
  applicationName: string;
  type: "Authorization" | "Role" | "Permission";
  description?: string;
  created: string;
  lastModified: string;
}

export interface AgentGroupMembership {
  agentId: string;
  groupId: string;
}

export const mockGroups: Group[] = [
  {
    id: "a8f2c691-4d3e-47b9-8c21-6e5d9f0a3b72",
    displayName: "Nexus - Admin",
    applicationName: "Nexus",
    type: "Authorization",
    description: "Administrative access for Nexus application",
    created: "2024-08-15T10:00:00Z",
    lastModified: "2025-01-10T14:30:00Z",
  },
  {
    id: "c696a6f9-49eb-4008-9727-a284a5a42afc",
    displayName: "Admin - roles - ias-oms (Consumer)",
    applicationName: "ias-oms (Consumer)",
    type: "Authorization",
    description: "Admin roles for IAS OMS consumer",
    created: "2024-06-01T09:00:00Z",
    lastModified: "2024-12-20T11:00:00Z",
  },
  {
    id: "d9fffb69-37ce-4ee6-b0cf-e6fedf8e59dd",
    displayName: "BasePolicy - dcl - d055990-nodejs-ams-mt (Consumer)",
    applicationName: "d055990-nodejs-ams-mt (Consumer)",
    type: "Authorization",
    description: "Base policy for nodejs application",
    created: "2024-07-10T08:30:00Z",
    lastModified: "2024-11-15T16:45:00Z",
  },
  {
    id: "66d8762b-9d77-48d1-83ca-dd76bba91634",
    displayName: "Helpdesk - roles - ias-oms (Consumer)",
    applicationName: "ias-oms (Consumer)",
    type: "Authorization",
    description: "Helpdesk support roles",
    created: "2024-05-20T14:00:00Z",
    lastModified: "2024-10-30T09:15:00Z",
  },
];

// Mapping of agent IDs to their group memberships
export const agentGroupMemberships: AgentGroupMembership[] = [
  {
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // Workflow Automation Agent
    groupId: "a8f2c691-4d3e-47b9-8c21-6e5d9f0a3b72", // Nexus - Admin
  },
];

// Helper function to get groups for an agent
export function getGroupsForAgent(agentId: string): Group[] {
  const membershipGroupIds = agentGroupMemberships
    .filter((m) => m.agentId === agentId)
    .map((m) => m.groupId);
  
  return mockGroups.filter((g) => membershipGroupIds.includes(g.id));
}
