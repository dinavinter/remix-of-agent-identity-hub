export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  loginName: string;
  scimId: string;
  globalUserId: string;
  status: "Active" | "Inactive";
  
  // Personal Information
  userId: string;
  validFrom?: string;
  validTo?: string;
  
  // Contact
  telephone?: string;
  mobile?: string;
  
  // Location
  country?: string;
  language?: string;
  locale?: string;
  timezone?: string;
  
  // Address
  street?: string;
  city?: string;
  postalCode?: string;
  countryRegion?: string;
  streetAddress?: string;
  poBox?: string;
  
  // Names
  salutation?: string;
  title?: string;
  displayName?: string;
  
  // Employee Information
  employeeNumber?: string;
  costCenter?: string;
  division?: string;
  department?: string;
  managerDisplayName?: string;
  
  // Company Information
  industry?: string;
  company?: string;
  companyCity?: string;
  companyCountryRegion?: string;
  companyStreetAddress?: string;
  companyStreetAddress2?: string;
  companyStreetAddress3?: string;
  companyRelationshipId?: string;
  
  // Custom Attributes
  customAttributes?: Record<string, string>;
  
  // Timestamps
  created: string;
  lastModified: string;
}

export interface UserGroupMembership {
  userId: string;
  groupId: string;
}

export const mockUsers: User[] = [
  {
    id: "user-john-doe-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@sap.com",
    loginName: "I030730",
    scimId: "d5dd80be-8c9d-492e-80cc-08824cb8cb9e",
    globalUserId: "d5dd80be-8c9d-492e-80cc-08824cb8cb9e",
    status: "Active",
    userId: "P000001",
    validFrom: "2024-01-01",
    country: "Germany",
    language: "en",
    locale: "en-US",
    timezone: "Europe/Berlin",
    city: "Walldorf",
    countryRegion: "Germany",
    displayName: "John Doe",
    department: "Engineering",
    company: "SAP",
    companyCity: "Walldorf",
    companyCountryRegion: "Germany",
    created: "2024-01-15T10:00:00Z",
    lastModified: "2025-01-10T14:30:00Z",
  },
  {
    id: "user-bogdan-vatkov-002",
    firstName: "Bogdan",
    lastName: "Vatkov",
    email: "bogdan.vatkov@sap.com",
    loginName: "I030730",
    scimId: "d5dd80be-8c9d-492e-80cc-08824cb8cb9e",
    globalUserId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    status: "Active",
    userId: "P000002",
    country: "Bulgaria",
    language: "en",
    displayName: "Bogdan Vatkov",
    department: "Development",
    company: "SAP",
    created: "2024-02-10T09:00:00Z",
    lastModified: "2025-01-05T11:00:00Z",
  },
  {
    id: "user-boris-spasov-003",
    firstName: "Boris",
    lastName: "Spasov",
    email: "boris.spasov@sap.com",
    loginName: "I035762",
    scimId: "24e9fbef-c748-4d33-bf76-cb6cf87ad0da",
    globalUserId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    status: "Active",
    userId: "P000003",
    country: "Bulgaria",
    language: "en",
    displayName: "Boris Spasov",
    department: "Product Management",
    company: "SAP",
    created: "2024-03-20T08:30:00Z",
    lastModified: "2024-12-15T16:45:00Z",
  },
  {
    id: "user-petyo-petev-004",
    firstName: "Petyo",
    lastName: "Petev",
    email: "petyo.petev@sap.com",
    loginName: "I024139",
    scimId: "dea7f222-6ce8-42f2-b853-770a2cb4ca67",
    globalUserId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    status: "Active",
    userId: "P000004",
    country: "Bulgaria",
    language: "en",
    displayName: "Petyo Petev",
    department: "Engineering",
    company: "SAP",
    created: "2024-04-10T14:00:00Z",
    lastModified: "2024-11-30T09:15:00Z",
  },
  {
    id: "user-yavor-mladenov-005",
    firstName: "Yavor",
    lastName: "Mladenov",
    email: "yavor.mladenov@sap.com",
    loginName: "I328381",
    scimId: "08e4af1f-519b-4147-96c6-56d2f54aeb1e",
    globalUserId: "d4e5f6a7-b8c9-0123-def1-234567890123",
    status: "Active",
    userId: "P000005",
    country: "Bulgaria",
    language: "en",
    displayName: "Yavor Mladenov",
    department: "Sales",
    company: "SAP",
    created: "2024-05-05T11:00:00Z",
    lastModified: "2024-10-25T13:20:00Z",
  },
  {
    id: "user-dina-vinter-006",
    firstName: "Dina",
    lastName: "Vinter",
    email: "dina.vinter@sap.com",
    loginName: "I347305",
    scimId: "e0a4469b-30a5-424a-a5ba-a6be53ff8f12",
    globalUserId: "e5f6a7b8-c9d0-1234-ef12-345678901234",
    status: "Active",
    userId: "P000006",
    country: "Germany",
    language: "de",
    displayName: "Dina Vinter",
    department: "HR",
    company: "SAP",
    created: "2024-06-15T10:30:00Z",
    lastModified: "2024-09-20T15:00:00Z",
  },
  {
    id: "user-felix-blass-007",
    firstName: "Felix",
    lastName: "Blass",
    email: "felix.blass@sap.com",
    loginName: "D064953",
    scimId: "2c005598-3856-4bb0-bf9f-4c51cf5ac3b0",
    globalUserId: "f6a7b8c9-d0e1-2345-f123-456789012345",
    status: "Active",
    userId: "P000007",
    country: "Germany",
    language: "en",
    displayName: "Felix Blass",
    department: "Finance",
    company: "SAP",
    created: "2024-07-01T09:15:00Z",
    lastModified: "2024-08-30T11:45:00Z",
  },
];

// Mapping of user IDs to their group memberships
export const userGroupMemberships: UserGroupMembership[] = [
  {
    userId: "user-john-doe-001", // John Doe
    groupId: "a8f2c691-4d3e-47b9-8c21-6e5d9f0a3b72", // Nexus - Admin
  },
];

// Helper function to get groups for a user
export function getGroupsForUser(userId: string): string[] {
  return userGroupMemberships
    .filter((m) => m.userId === userId)
    .map((m) => m.groupId);
}
