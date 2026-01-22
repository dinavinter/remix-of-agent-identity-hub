
export type PolicyActionType = "Allow" | "Deny" | "Ask For Consent" | "Invoke Tool";
export type ResourceType = "Tools" | "MCP Server" | "Agent";

export interface ResourceServerFilter {
  createdBy?: string;
}

export interface ResourceDefinition {
  type: ResourceType;
  id?: string | string[];
  server?: string | string[] | ResourceServerFilter;
}

export interface PolicyCondition {
  attribute: string;
  operator: string;
  value: string;
}

export interface PolicyRule {
  id: string;
  agentId: string;
  actionType: PolicyActionType;
  actingAs?: "User" | "Agent" | "Application";
  resource: ResourceDefinition;
  conditions: PolicyCondition[];
}

export const attributeTypes = [
  { value: "region", label: "Region" },
  { value: "subaccount", label: "Subaccount" },
  { value: "tag", label: "Tag" },
  { value: "location", label: "Location" },
  { value: "department", label: "Department" },
  { value: "server.region", label: "Server Region" },
  { value: "server.subaccount", label: "Server Subaccount" },
  { value: "agent.region", label: "Agent Region" },
  { value: "agent.subaccount", label: "Agent Subaccount" },
  { value: "user.location", label: "User Location" },
  { value: "tag:hr", label: "Tag: HR" },
  { value: "data-sensitivity", label: "Data Sensitivity" },
  { value: "data-type", label: "Data Type" },
];

export const attributeValues: Record<string, string[]> = {
  "region": ["EMEA", "EU", "US", "APAC"],
  "subaccount": ["Production", "Staging", "Global", "mcp.subaccount"],
  "location": ["EMEA", "US", "agent.region"],
  "department": ["Finance", "HR", "IT"],
  "server.region": ["EU", "US", "APAC"],
  "server.subaccount": ["Production", "Staging"],
  "agent.region": ["EMEA", "US", "APAC"],
  "agent.subaccount": ["Global", "Regional"],
  "user.location": ["agent.region", "EU", "US"],
  "data-sensitivity": ["sensitive", "public", "confidential", "internal"],
  "data-type": ["pii", "financial", "technical", "business"],
};

export const resourceTypes: ResourceType[] = [
  "Tools",
  "MCP Server",
  "Agent",
];

export const mockPolicies: PolicyRule[] = [
  {
    id: "pol-new-1",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools",
      server: { createdBy: "sap/ariba" }
    },
    conditions: []
  },
  {
    id: "pol-new-2",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Ask For Consent",
    resource: {
      type: "Tools"
    },
    conditions: [
      { attribute: "server.subaccount", operator: "=", value: "Production" }
    ]
  },
  {
    id: "pol-new-3",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools"
    },
    conditions: [
      { attribute: "server.region", operator: "=", value: "EU" }
    ]
  },
  {
    id: "pol-new-4",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Agent"
    },
    conditions: [
      { attribute: "agent.region", operator: "=", value: "EMEA" }
    ]
  },
  {
    id: "pol-new-5",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Agent"
    },
    conditions: [
      { attribute: "agent.subaccount", operator: "=", value: "Global" }
    ]
  },
  {
    id: "pol-new-6",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "MCP Server"
    },
    conditions: [
      { attribute: "tag:hr", operator: "exists", value: "" },
      { attribute: "region", operator: "=", value: "EMEA" }
    ]
  },
  {
    id: "pol-new-7",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    actingAs: "Agent",
    resource: {
      type: "MCP Server"
    },
    conditions: [
      { attribute: "agent.subaccount", operator: "=", value: "mcp.subaccount" }
    ]
  },
  {
    id: "pol-new-8",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    actingAs: "User",
    resource: {
      type: "Agent"
    },
    conditions: [
      { attribute: "user.location", operator: "=", value: "agent.region" }
    ]
  },
  {
    id: "pol-ex-1",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools",
      id: "xyz"
    },
    conditions: []
  },
  {
    id: "pol-ex-2",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools",
      id: ["mcpa:xyz", "mcpb:abc"]
    },
    conditions: []
  },
  {
    id: "pol-ex-3",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools",
      server: "mcp-commerce-products"
    },
    conditions: []
  },
  {
    id: "pol-ex-4",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools",
      server: ["mcp-commerce-products", "mcp-commerce-orders"]
    },
    conditions: []
  },
  {
    id: "pol-consent-1",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Ask For Consent",
    resource: {
      type: "Tools",
      server: { createdBy: "sap/ariba" }
    },
    conditions: [
      { attribute: "data-sensitivity", operator: "=", value: "sensitive" }
    ]
  },
  {
    id: "pol-consent-2",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Ask For Consent",
    resource: {
      type: "Tools",
      server: { createdBy: "sap/ariba" }
    },
    conditions: [
      { attribute: "data-type", operator: "=", value: "pii" }
    ]
  }
];

export function getPoliciesForAgent(agentId: string): PolicyRule[] {
  return mockPolicies.filter((policy) => policy.agentId === agentId);
}
