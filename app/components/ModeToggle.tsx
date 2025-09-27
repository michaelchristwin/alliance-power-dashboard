import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTheme } from "remix-themes";

export function ModeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === "dark" && <Sun />}
          {theme === "light" && <Moon />}
          {theme === ("system" as any) && <Monitor />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light" as any)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark" as any)}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system" as any)}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
