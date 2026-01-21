import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const usersAgentsSubItems = [
  { label: "Users", path: "/users" },
  { label: "Agents", path: "/agents" },
  { label: "Groups", path: "/groups" },
];

export function NavigationTabs() {
  const location = useLocation();
  
  // Check if current path matches any of the users/agents sub-items
  const isUsersAgentsActive = usersAgentsSubItems.some(
    (item) => location.pathname === item.path || location.pathname.startsWith(item.path + "/")
  );

  return (
    <nav className="bg-card border-b border-border">
      <div className="flex items-center gap-0 px-4">
        {/* Home Tab */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "px-4 py-3 text-sm font-medium transition-colors relative",
              "hover:text-primary",
              isActive
                ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                : "text-muted-foreground"
            )
          }
        >
          Home
        </NavLink>

        {/* Users, Agents & Authorizations Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "px-4 py-3 text-sm font-medium transition-colors relative flex items-center gap-1 outline-none",
              "hover:text-primary",
              isUsersAgentsActive
                ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                : "text-muted-foreground"
            )}
          >
            Users, Agents & Authorizations
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-card border border-border z-50">
            {usersAgentsSubItems.map((item) => (
              <DropdownMenuItem key={item.path} asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "w-full cursor-pointer",
                      isActive && "text-primary font-medium"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Applications & Resources Tab */}
        <NavLink
          to="/applications"
          className={({ isActive }) =>
            cn(
              "px-4 py-3 text-sm font-medium transition-colors relative",
              "hover:text-primary",
              isActive
                ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                : "text-muted-foreground"
            )
          }
        >
          Applications & Resources
        </NavLink>
      </div>
    </nav>
  );
}
