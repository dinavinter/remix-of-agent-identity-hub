export interface ApplicationDependency {
  id: string;
  name: string;
  application: string;
  applicationId: string;
  apiName: string;
  apiDescription?: string;
  authorizationContext?: string;
}

export interface Application {
  id: string;
  name: string;
  applicationType: string;
  nameType: string;
  organizationId: string;
  protocolType: string;
  url?: string;
  dependencies: ApplicationDependency[];
  providedApis?: string[];
  createdAt: string;
  modifiedAt: string;
}

export const mockApplications: Application[] = [
  {
    id: "7c4e8f2a-1b3d-4a5e-9f6c-8d2e0a1b3c4d",
    name: "Workflow Automation Agent",
    applicationType: "Bundled",
    nameType: "SAP BTP solution",
    organizationId: "global",
    protocolType: "OpenID Connect",
    url: undefined,
    dependencies: [
      {
        id: "dep-001",
        name: "Principal Propagation",
        application: "Procurement Backend",
        applicationId: "e9f8d7c6-b5a4-3210-fedc-ba9876543210",
        apiName: "Principal Propagation",
        apiDescription: "Principal Propagation: Full Access",
        authorizationContext: "User Context: granted by user",
      },
      {
        id: "dep-002",
        name: "Agentic Access",
        application: "Procurement Backend",
        applicationId: "e9f8d7c6-b5a4-3210-fedc-ba9876543210",
        apiName: "Agentic Access",
        apiDescription: "Agentic Access",
        authorizationContext: "Technical access",
      },
      {
        id: "dep-003",
        name: "Principal Propagation: Read Only",
        application: "Procurement Backend",
        applicationId: "e9f8d7c6-b5a4-3210-fedc-ba9876543210",
        apiName: "Principal Propagation: Read Only",
        apiDescription: "Principal Propagation: Read Only",
        authorizationContext: "User Context: granted by admin",
      },
    ],
    providedApis: [],
    createdAt: "2024-09-15T10:30:00Z",
    modifiedAt: "2025-01-15T14:22:00Z",
  },
  {
    id: "e9f8d7c6-b5a4-3210-fedc-ba9876543210",
    name: "Procurement Backend",
    applicationType: "Bundled",
    nameType: "SAP BTP solution",
    organizationId: "global",
    protocolType: "OpenID Connect",
    url: undefined,
    dependencies: [],
    providedApis: ["Principal Propagation", "Agentic Access"],
    createdAt: "2024-08-20T08:15:00Z",
    modifiedAt: "2025-01-10T11:45:00Z",
  },
];

export const getApplicationById = (id: string): Application | undefined => {
  return mockApplications.find((app) => app.id === id);
};

export const getDependenciesForApplication = (applicationId: string): ApplicationDependency[] => {
  const app = getApplicationById(applicationId);
  return app?.dependencies || [];
};
