import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AgentProvider } from "@/context/AgentContext";
import Dashboard from "./pages/Dashboard";
import AgentList from "./pages/AgentList";
import AgentDetail from "./pages/AgentDetail";
import GroupList from "./pages/GroupList";
import ApplicationList from "./pages/ApplicationList";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AgentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<AgentList />} />
            <Route path="/agents/:id" element={<AgentDetail />} />
            <Route path="/groups" element={<GroupList />} />
            <Route path="/applications" element={<ApplicationList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AgentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
