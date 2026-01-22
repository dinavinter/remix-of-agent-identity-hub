
export type PolicyActionType = "Allow" | "Deny" | "Ask For Consent";
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
  { value: "user.group", label: "User Group", type: "when" },
  { value: "agent.owner", label: "Agent Owner", type: "when" },
  { value: "agent.createdBy", label: "Agent Created By", type: "when" },
  { value: "owner.consented", label: "Owner Consented", type: "when" },
  { value: "active-orders", label: "Active Orders", type: "when" },
  
  // Where attributes (Resource/Object)
  { value: "region", label: "Region", type: "where" },
  { value: "subaccount", label: "Subaccount", type: "where" },
  { value: "tag", label: "Tag", type: "where" },
  { value: "category", label: "Category", type: "where" },
  { value: "data-sensitivity", label: "Data Sensitivity", type: "where" },
  { value: "data-type", label: "Data Type", type: "where" },
  { value: "server.region", label: "Server Region", type: "where" },
  { value: "server.subaccount", label: "Server Subaccount", type: "where" },
  { value: "id", label: "ID", type: "where" },
];

export const attributeValues: Record<string, string[]> = {
  "user.role": ["admin", "viewer", "editor"],
  "user.group": ["admin", "finance", "hr"],
  "user.location": ["EMEA", "US", "APAC"],
  "agent.owner": ["org:acheme", "org:sap", "user:me"],
  "agent.createdBy": ["sap/ariba", "sap/concur", "internal"],
  "owner.consented": ["true", "false"],
  "active-orders": ["4", "10", "100"],
  
  "region": ["EMEA", "EU", "US", "APAC"],
  "subaccount": ["Production", "Staging", "Global"],
  "tag": ["hr", "finance", "it"],
  "category": ["tier3", "tier2", "tier1", "accessory"],
  "data-sensitivity": ["sensitive", "public", "confidential"],
  "data-type": ["pii", "financial", "technical"],
  "server.region": ["EU", "US", "APAC"],
  "server.subaccount": ["Production", "Staging"],
  "id": ["create-order", "delete-order", "view-products"],
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
    actionType: "Allow",
    resource: {
      type: "Tools",
      server: "ariba-mcp"
    },
    whenConditions: [
      { attribute: "user.group", operator: "=", value: "admin" }
    ],
    whereConditions: [
      { attribute: "category", operator: "=", value: "tier3" }
    ]
  },
  {
    id: "pol-ams-2",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    resource: {
      type: "Tools"
    },
    whenConditions: [
      { attribute: "agent.createdBy", operator: "=", value: "sap/ariba" }
    ],
    whereConditions: [
       { attribute: "server.region", operator: "=", value: "EU" } // Example modification to match context
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
    actionType: "Ask For Consent",
    resource: {
      type: "Tools"
    },
    whenConditions: [
      { attribute: "active-orders", operator: ">", value: "4" }
    ],
    whereConditions: [
      { attribute: "id", operator: "=", value: "create-order" }
    ]
  },
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
