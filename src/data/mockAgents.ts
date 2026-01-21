export interface Agent {
  id: string;
  userName: string;
  displayName: string;
  agentName: string;
  userType: "agent";
  provider: "SAP" | "Microsoft" | "ServiceNow" | "AWS" | "Google" | "Salesforce";
  active: boolean;
  email: string;
  mailVerified: boolean;
  ordId: string;
  
  // Authentication
  loginTime: string | null;
  failedLoginAttempts: number;
  passwordSetTime: string | null;
  passwordStatus: "enabled" | "disabled" | "initial";
  
  // Timestamps
  created: string;
  lastModified: string;
  
  // Custom Attributes (SCIM)
  resourceType: string;
  version: string;
  location: string;
  schemas: string[];
  
  // Additional metadata
  description?: string;
  department?: string;
  parentApplicationId?: string;
}

export const mockAgents: Agent[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    userName: "SAP_WORKFLOW_AGENT",
    displayName: "Link to parent application",
    agentName: "Workflow Automation Agent",
    userType: "agent",
    provider: "SAP",
    active: true,
    email: "workflow-agent@sap.com",
    mailVerified: true,
    ordId: "sap:agent:workflow:v1",
    loginTime: "2025-01-15T08:30:00Z",
    failedLoginAttempts: 0,
    passwordSetTime: "2024-11-01T10:00:00Z",
    passwordStatus: "enabled",
    created: "2024-10-15T09:00:00Z",
    lastModified: "2025-01-14T14:22:00Z",
    resourceType: "Agent",
    version: "v2.1.0",
    location: "https://accounts.sap.com/scim/agents/a1b2c3d4",
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:sap:cloud:scim:schemas:extension:custom:2.0:User"],
    description: "Handles automated workflow tasks across SAP systems",
    department: "IT Operations",
    parentApplicationId: "7c4e8f2a-1b3d-4a5e-9f6c-8d2e0a1b3c4d"
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    userName: "MS_COPILOT_AGENT",
    displayName: "Microsoft Copilot Integration",
    agentName: "Copilot Integration Agent",
    userType: "agent",
    provider: "Microsoft",
    active: true,
    email: "copilot-agent@microsoft.com",
    mailVerified: true,
    ordId: "ms:agent:copilot:v2",
    loginTime: "2025-01-15T10:15:00Z",
    failedLoginAttempts: 0,
    passwordSetTime: "2024-12-01T08:00:00Z",
    passwordStatus: "enabled",
    created: "2024-11-20T11:30:00Z",
    lastModified: "2025-01-10T09:45:00Z",
    resourceType: "Agent",
    version: "v3.0.1",
    location: "https://graph.microsoft.com/scim/agents/b2c3d4e5",
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    description: "AI-powered assistant for productivity tasks",
    department: "Digital Transformation"
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    userName: "SNOW_ITSM_AGENT",
    displayName: "ServiceNow ITSM Agent",
    agentName: "ITSM Automation Agent",
    userType: "agent",
    provider: "ServiceNow",
    active: true,
    email: "itsm-agent@servicenow.com",
    mailVerified: true,
    ordId: "snow:agent:itsm:v1",
    loginTime: "2025-01-14T16:45:00Z",
    failedLoginAttempts: 1,
    passwordSetTime: "2024-09-15T14:00:00Z",
    passwordStatus: "enabled",
    created: "2024-08-10T08:00:00Z",
    lastModified: "2025-01-12T11:30:00Z",
    resourceType: "Agent",
    version: "v1.8.2",
    location: "https://instance.service-now.com/scim/agents/c3d4e5f6",
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:servicenow:scim:schemas:extension:1.0"],
    description: "Handles IT service management tickets and incidents",
    department: "IT Service Desk"
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-456789012345",
    userName: "AWS_LAMBDA_AGENT",
    displayName: "AWS Lambda Orchestrator",
    agentName: "Lambda Orchestrator Agent",
    userType: "agent",
    provider: "AWS",
    active: false,
    email: "lambda-agent@aws.amazon.com",
    mailVerified: true,
    ordId: "aws:agent:lambda:v1",
    loginTime: "2025-01-10T12:00:00Z",
    failedLoginAttempts: 0,
    passwordSetTime: "2024-10-20T09:30:00Z",
    passwordStatus: "disabled",
    created: "2024-10-01T10:00:00Z",
    lastModified: "2025-01-10T12:05:00Z",
    resourceType: "Agent",
    version: "v1.2.0",
    location: "https://iam.aws.amazon.com/scim/agents/d4e5f6a7",
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    description: "Manages serverless function orchestration",
    department: "Cloud Infrastructure"
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-567890123456",
    userName: "SFDC_EINSTEIN_AGENT",
    displayName: "Salesforce Einstein Bot",
    agentName: "Einstein Analytics Agent",
    userType: "agent",
    provider: "Salesforce",
    active: true,
    email: "einstein-agent@salesforce.com",
    mailVerified: true,
    ordId: "sfdc:agent:einstein:v3",
    loginTime: "2025-01-15T07:00:00Z",
    failedLoginAttempts: 0,
    passwordSetTime: "2024-12-15T11:00:00Z",
    passwordStatus: "enabled",
    created: "2024-06-01T09:00:00Z",
    lastModified: "2025-01-15T07:05:00Z",
    resourceType: "Agent",
    version: "v3.5.0",
    location: "https://login.salesforce.com/scim/agents/e5f6a7b8",
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:salesforce:schemas:extension:einstein:1.0"],
    description: "AI-driven analytics and predictions for CRM",
    department: "Sales Operations"
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-678901234567",
    userName: "GCP_DIALOGFLOW_AGENT",
    displayName: "Google Dialogflow Agent",
    agentName: "Dialogflow Conversational Agent",
    userType: "agent",
    provider: "Google",
    active: true,
    email: "dialogflow-agent@google.com",
    mailVerified: true,
    ordId: "gcp:agent:dialogflow:v2",
    loginTime: "2025-01-15T09:30:00Z",
    failedLoginAttempts: 0,
    passwordSetTime: "2024-11-10T15:00:00Z",
    passwordStatus: "enabled",
    created: "2024-09-20T14:00:00Z",
    lastModified: "2025-01-13T16:20:00Z",
    resourceType: "Agent",
    version: "v2.3.1",
    location: "https://dialogflow.googleapis.com/scim/agents/f6a7b8c9",
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:google:cloud:scim:schemas:dialogflow:1.0"],
    description: "Natural language processing for customer interactions",
    department: "Customer Experience"
  },
  {
    id: "a7b8c9d0-e1f2-3456-abcd-789012345678",
    userName: "SAP_BTP_AGENT",
    displayName: "SAP BTP Integration Agent",
    agentName: "BTP Integration Agent",
    userType: "agent",
    provider: "SAP",
    active: true,
    email: "btp-agent@sap.com",
    mailVerified: true,
    ordId: "sap:agent:btp:v2",
    loginTime: "2025-01-15T06:00:00Z",
    failedLoginAttempts: 0,
    passwordSetTime: "2024-08-01T10:00:00Z",
    passwordStatus: "enabled",
    created: "2024-07-15T08:00:00Z",
    lastModified: "2025-01-14T18:00:00Z",
    resourceType: "Agent",
    version: "v2.0.5",
    location: "https://accounts.sap.com/scim/agents/a7b8c9d0",
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:sap:cloud:scim:schemas:extension:custom:2.0:User"],
    description: "Manages integrations across SAP Business Technology Platform",
    department: "Enterprise Architecture"
  }
];

export const providerColors: Record<Agent["provider"], string> = {
  SAP: "bg-[hsl(207,90%,43%)]",
  Microsoft: "bg-[hsl(207,100%,35%)]",
  ServiceNow: "bg-[hsl(145,63%,35%)]",
  AWS: "bg-[hsl(36,100%,45%)]",
  Google: "bg-[hsl(4,90%,58%)]",
  Salesforce: "bg-[hsl(207,90%,50%)]"
};
