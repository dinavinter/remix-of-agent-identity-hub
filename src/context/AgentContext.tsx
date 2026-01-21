import React, { createContext, useContext } from "react";
import { useAgents } from "@/hooks/useAgents";
import { Agent } from "@/data/mockAgents";

interface AgentContextType {
  agents: Agent[];
  getAgent: (id: string) => Agent | undefined;
  createAgent: (agentData: Omit<Agent, "id" | "created" | "lastModified" | "version">) => Agent;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  toggleAgentStatus: (id: string) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const agentMethods = useAgents();

  return (
    <AgentContext.Provider value={agentMethods}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgentContext() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }
  return context;
}
