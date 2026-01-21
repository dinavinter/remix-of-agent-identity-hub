import { User, HelpCircle, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ShellHeader() {
  return (
    <header className="h-11 bg-shell text-shell-foreground flex items-center justify-between px-3 shadow-sm">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded">
          <span className="text-primary-foreground font-bold text-sm">SAP</span>
        </div>
        <span className="text-sm font-medium">Cloud Identity Services</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-shell-foreground hover:bg-white/10">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-shell-foreground hover:bg-white/10">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-shell-foreground hover:bg-white/10">
          <Settings className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-shell-foreground hover:bg-white/10 rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <span className="font-medium">Admin User</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-muted-foreground text-xs">
              admin@company.com
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
