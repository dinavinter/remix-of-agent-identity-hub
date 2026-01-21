# Agent Identity Management - Project Knowledge

## Overview
An IT Admin Console for managing Agent Identities, closely following **SAP Fiori design guidelines**. Built as a prototype for lifecycle management of AI/service agents alongside human users.

---

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with SAP Fiori-inspired design tokens
- **Routing**: React Router DOM v6
- **State Management**: React Context + custom hooks
- **UI Components**: shadcn/ui (Radix primitives)
- **Data**: Mock data (no backend)

---

## Design System

### SAP Fiori Color Palette
All colors defined in `src/index.css` and `tailwind.config.ts`:

| Token | Purpose |
|-------|---------|
| `--shell` | Top header bar (dark blue #354a5f) |
| `--primary` | SAP accent blue (#0a6ed1) |
| `--tile` | Dashboard tile background |
| `--positive` | Success/active states (green) |
| `--negative` | Error/destructive states (red) |
| `--critical` | Warning states (orange) |
| `--informative` | Info states (blue) |

### Typography Classes
- `.fiori-title-1` - Page titles (1.5rem, 600 weight)
- `.fiori-title-2` - Section titles (1.25rem, 600 weight)
- `.fiori-label` - Form labels and metadata

---

## Architecture

### Pages
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Dashboard.tsx` | Home with tile grid |
| `/agents` | `AgentList.tsx` | Agent table with search/CRUD |
| `/agents/:id` | `AgentDetail.tsx` | Full agent metadata view/edit |

### Key Components
```
src/components/
├── layout/
│   ├── ShellHeader.tsx      # SAP-style top nav bar
│   └── NavigationTabs.tsx   # Home, Users, Applications tabs
├── dashboard/
│   └── DashboardTile.tsx    # Clickable metric tiles
└── agents/
    ├── AgentStatusBadge.tsx # Active/Inactive badge
    ├── ProviderBadge.tsx    # SAP, Microsoft, etc. badges
    └── CreateAgentDialog.tsx # Modal for new agents
```

### State Management
```
src/context/AgentContext.tsx  # Global agent state provider
src/hooks/useAgents.ts        # CRUD operations + toast notifications
```

---

## Agent Data Model

Defined in `src/data/mockAgents.ts`:

```typescript
interface Agent {
  // Core Identity
  id: string;
  userName: string;
  displayName: string;
  agentName: string;
  provider: "SAP" | "Microsoft" | "ServiceNow" | "AWS" | "Google" | "Salesforce";
  active: boolean;
  email: string;
  ordId: string;
  description?: string;
  department?: string;

  // Authentication
  loginTime: string;
  failedLoginAttempts: number;
  passwordSetTime: string;
  passwordStatus: "enabled" | "disabled" | "initial";

  // Timestamps
  created: string;
  lastModified: string;

  // Custom Attributes (SCIM)
  resourceType: string;
  version: string;
  location: string;
  schemas: string[];
}
```

---

## CRUD Operations

All operations available via `useAgentContext()`:

| Method | Description |
|--------|-------------|
| `agents` | Array of all agents |
| `getAgent(id)` | Find single agent by ID |
| `createAgent(data)` | Add new agent (auto-generates id, timestamps) |
| `updateAgent(id, updates)` | Partial update agent fields |
| `deleteAgent(id)` | Remove agent with confirmation |
| `toggleAgentStatus(id)` | Toggle active/inactive status |

---

## Provider Branding

Each provider has a distinct color scheme defined in `mockAgents.ts`:

| Provider | Background | Text |
|----------|------------|------|
| SAP | Blue (#0a6ed1) | White |
| Microsoft | Dark (#2f2f2f) | White |
| ServiceNow | Green (#81b532) | White |
| AWS | Orange (#ff9900) | Black |
| Google | Multi-color | Gray |
| Salesforce | Cloud blue (#00a1e0) | White |

---

## UI Patterns

### Dashboard Tiles
- Icon + optional count in header
- Title + description in footer
- Hover state with shadow + primary border accent
- Variant: `default` or `primary` (highlighted)

### Data Tables
- Checkbox column for bulk selection
- Sortable columns (visual only in prototype)
- Row click navigates to detail view
- Action toolbar above table

### Detail View
- Breadcrumb navigation
- Edit/Save/Cancel mode toggle
- Tabbed sections: Personal, Authentication, Timestamps, Custom
- Inline form editing

### Dialogs
- Modal overlay with form validation
- Required field indicators
- Cancel/Submit actions

---

## Mock Data

7 sample agents included:
1. SAP Integration Agent (SAP)
2. Azure AD Sync Agent (Microsoft)
3. ServiceNow ITSM Agent (ServiceNow)
4. AWS Lambda Orchestrator (AWS)
5. Google Workspace Sync (Google)
6. Salesforce CRM Agent (Salesforce)
7. SAP S/4HANA Agent (SAP)

---

## Future Considerations

### Not Yet Implemented
- Backend persistence (currently mock data only)
- Role-based access control
- Activity logging/audit trail
- Bulk import/export (CSV/JSON)
- Advanced filtering and sorting
- Agent authentication configuration
- Real-time status monitoring

### Placeholder Routes
These routes exist in NavigationTabs but are not implemented:
- `/users` - User Management
- `/applications` - Applications & Resources
- `/groups`, `/import`, `/export`, `/schemas` - Dashboard tiles

---

## File Structure Summary

```
src/
├── App.tsx                 # Router + providers setup
├── index.css               # Design tokens + base styles
├── main.tsx                # Entry point
├── components/
│   ├── layout/             # Shell header, navigation
│   ├── dashboard/          # Tile component
│   ├── agents/             # Agent-specific components
│   └── ui/                 # shadcn/ui primitives
├── context/
│   └── AgentContext.tsx    # Global state
├── hooks/
│   ├── useAgents.ts        # CRUD logic
│   └── use-toast.ts        # Notification hook
├── data/
│   └── mockAgents.ts       # Agent interface + mock data
├── pages/
│   ├── Dashboard.tsx       # Home page
│   ├── AgentList.tsx       # Agent table
│   ├── AgentDetail.tsx     # Agent form/view
│   └── NotFound.tsx        # 404 page
└── lib/
    └── utils.ts            # cn() utility
```
