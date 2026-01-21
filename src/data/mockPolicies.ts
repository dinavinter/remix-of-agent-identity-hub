export type PolicyActionType = "Allow" | "Deny" | "Ask For Consent";
export type TargetType = "MCP Tool" | "MCP Server" | "API Endpoint";

export interface PolicyRule {
  id: string;
  agentId: string;
  actionType: PolicyActionType;
  target: string;
  targetType: TargetType;
  whereAttribute: string;
  whereValue: string;
}

export const policyTargetTemplates = [
  { value: "ariba-mcp:po.comment.add", label: "ariba-mcp:po.comment.add", type: "MCP Tool" as TargetType },
  { value: "ariba-mcp:vendor.read", label: "ariba-mcp:vendor.read", type: "MCP Tool" as TargetType },
  { value: "commerce-mcp:products.read", label: "commerce-mcp:products.read", type: "MCP Tool" as TargetType },
  { value: "commerce-mcp:orders.create", label: "commerce-mcp:orders.create", type: "MCP Tool" as TargetType },
  { value: "concur-mcp:expenses.submit", label: "concur-mcp:expenses.submit", type: "MCP Tool" as TargetType },
  { value: "commerce-mcp", label: "commerce-mcp", type: "MCP Server" as TargetType },
  { value: "ariba-mcp", label: "ariba-mcp", type: "MCP Server" as TargetType },
  { value: "concur-mcp", label: "concur-mcp", type: "MCP Server" as TargetType },
  { value: "discovery", label: "Discovery", type: "MCP Tool" as TargetType },
];

export const attributeTypes = [
  { value: "risk-level", label: "risk-level" },
  { value: "access-level", label: "access-level" },
  { value: "createdBy", label: "createdBy" },
  { value: "department", label: "department" },
  { value: "region", label: "region" },
];

export const attributeValues: Record<string, string[]> = {
  "risk-level": ["sensitive", "high", "medium", "low"],
  "access-level": ["authenticated-user", "admin", "viewer", "editor"],
  "createdBy": ["sap:*", "sap:ariba", "sap:concur", "sap:commerce", "external"],
  "department": ["IT", "Finance", "HR", "Sales"],
  "region": ["EMEA", "APAC", "Americas", "Global"],
};

export const mockPolicies: PolicyRule[] = [
  {
    id: "pol-001",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    target: "ariba-mcp:po.comment.add",
    targetType: "MCP Tool",
    whereAttribute: "risk-level",
    whereValue: "sensitive",
  },
  {
    id: "pol-002",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    target: "ariba-mcp:vendor.read",
    targetType: "MCP Tool",
    whereAttribute: "access-level",
    whereValue: "authenticated-user",
  },
  {
    id: "pol-003",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Deny",
    target: "commerce-mcp:products.read",
    targetType: "MCP Tool",
    whereAttribute: "createdBy",
    whereValue: "sap:ariba",
  },
  {
    id: "pol-004",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Ask For Consent",
    target: "ariba-mcp:vendor.read",
    targetType: "MCP Tool",
    whereAttribute: "access-level",
    whereValue: "authenticated-user",
  },
  {
    id: "pol-005",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Deny",
    target: "commerce-mcp",
    targetType: "MCP Server",
    whereAttribute: "createdBy",
    whereValue: "sap:concur",
  },
  {
    id: "pol-006",
    agentId: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    actionType: "Allow",
    target: "concur-mcp:expenses.submit",
    targetType: "MCP Tool",
    whereAttribute: "department",
    whereValue: "Finance",
  },
  {
    id: "pol-007",
    agentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    actionType: "Allow",
    target: "discovery",
    targetType: "MCP Tool",
    whereAttribute: "createdBy",
    whereValue: "sap:*",
  },
];

export function getPoliciesForAgent(agentId: string): PolicyRule[] {
  return mockPolicies.filter((policy) => policy.agentId === agentId);
}
