
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
  // Context conditions ("When")
  whenConditions: PolicyCondition[];
  // Resource definitions ("Where")
  resource: ResourceDefinition;
  // Resource conditions ("Where")
  whereConditions: PolicyCondition[];
}

export const attributeTypes = [
  // When attributes (Context/Subject)
  { value: "user.role", label: "User Role", type: "when" },
  { value: "user.location", label: "User Location", type: "when" },
  { value: "agent.owner", label: "Agent Owner", type: "when" },
  { value: "owner.consented", label: "Owner Consented", type: "when" },
  
  // Where attributes (Resource/Object)
  { value: "region", label: "Region", type: "where" },
  { value: "subaccount", label: "Subaccount", type: "where" },
  { value: "tag", label: "Tag", type: "where" },
  { value: "category", label: "Category", type: "where" },
  { value: "data-sensitivity", label: "Data Sensitivity", type: "where" },
  { value: "data-type", label: "Data Type", type: "where" },
  { value: "server.region", label: "Server Region", type: "where" },
  { value: "server.subaccount", label: "Server Subaccount", type: "where" },
];

export const attributeValues: Record<string, string[]> = {
  "user.role": ["admin", "viewer", "editor"],
  "user.location": ["EMEA", "US", "APAC"],
  "agent.owner": ["org:acheme", "org:sap", "user:me"],
  "owner.consented": ["true", "false"],
  
  "region": ["EMEA", "EU", "US", "APAC"],
  "subaccount": ["Production", "Staging", "Global"],
  "tag": ["hr", "finance", "it"],
  "category": ["tier3", "tier2", "tier1", "accessory"],
  "data-sensitivity": ["sensitive", "public", "confidential"],
  "data-type": ["pii", "financial", "technical"],
  "server.region": ["EU", "US", "APAC"],
  "server.subaccount": ["Production", "Staging"],
};

export const resourceTypes: ResourceType[] = [
  "Tools",
  "MCP Server",
  "Agent",
];

export const mockPolicies: PolicyRule[] = [
  {
    id: "pol-ams-1",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Invoke Tool",
    resource: {
      type: "Tools",
      server: "ariba-mcp"
    },
    whenConditions: [
      { attribute: "user.role", operator: "=", value: "admin" }
    ],
    whereConditions: [
      { attribute: "category", operator: "=", value: "tier3" }
    ]
  },
  {
    id: "pol-ams-2",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Invoke Tool",
    resource: {
      type: "Tools"
    },
    whenConditions: [
      { attribute: "agent.owner", operator: "=", value: "org:acheme" }
    ],
    whereConditions: [
       { attribute: "region", operator: "=", value: "EMEA" }
    ]
  },
  {
    id: "pol-ams-3",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Ask For Consent",
    resource: {
      type: "Tools"
    },
    whenConditions: [],
    whereConditions: [
      { attribute: "data-sensitivity", operator: "=", value: "sensitive" }
    ]
  },
  {
    id: "pol-ams-4",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Invoke Tool",
    resource: {
      type: "Tools"
    },
    whenConditions: [
      { attribute: "owner.consented", operator: "=", value: "true" }
    ],
    whereConditions: [
      { attribute: "data-sensitivity", operator: "=", value: "sensitive" }
    ]
  },
  // Legacy style migrated to new structure
  {
    id: "pol-legacy-1",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools",
      server: { createdBy: "sap/ariba" }
    },
    whenConditions: [],
    whereConditions: []
  }
];

export function getPoliciesForAgent(agentId: string): PolicyRule[] {
  return mockPolicies.filter((policy) => policy.agentId === agentId);
}
