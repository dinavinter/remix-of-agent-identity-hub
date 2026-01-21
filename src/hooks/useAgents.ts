import { useState, useCallback } from "react";
import { Agent, mockAgents } from "@/data/mockAgents";
import { useToast } from "@/hooks/use-toast";

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const { toast } = useToast();

  const getAgent = useCallback(
    (id: string) => agents.find((a) => a.id === id),
    [agents]
  );

  const createAgent = useCallback(
    (agentData: Omit<Agent, "id" | "created" | "lastModified" | "version">) => {
      const newAgent: Agent = {
        ...agentData,
        id: crypto.randomUUID(),
        created: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        version: "v1.0.0",
      };
      setAgents((prev) => [...prev, newAgent]);
      toast({
        title: "Agent Created",
        description: `${newAgent.agentName} has been created successfully.`,
      });
      return newAgent;
    },
    [toast]
  );

  const updateAgent = useCallback(
    (id: string, updates: Partial<Agent>) => {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === id
            ? { ...agent, ...updates, lastModified: new Date().toISOString() }
            : agent
        )
      );
      toast({
        title: "Agent Updated",
        description: "Agent information has been updated successfully.",
      });
    },
    [toast]
  );

  const deleteAgent = useCallback(
    (id: string) => {
      const agent = agents.find((a) => a.id === id);
      setAgents((prev) => prev.filter((a) => a.id !== id));
      toast({
        title: "Agent Deleted",
        description: `${agent?.agentName || "Agent"} has been deleted.`,
        variant: "destructive",
      });
    },
    [agents, toast]
  );

  const toggleAgentStatus = useCallback(
    (id: string) => {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === id
            ? {
                ...agent,
                active: !agent.active,
                lastModified: new Date().toISOString(),
              }
            : agent
        )
      );
      toast({
        title: "Status Updated",
        description: "Agent status has been toggled.",
      });
    },
    [toast]
  );

  return {
    agents,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent,
    toggleAgentStatus,
  };
}
