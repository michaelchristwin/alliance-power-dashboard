import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setColorScheme, type Color } from "@/server/theme.server";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { applyTheme } from "@/lib/utils";

export function ModeToggle() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (scheme: Color) => {
      return setColorScheme({ data: scheme });
    },
    onMutate: (newScheme) => {
      applyTheme(newScheme);
    },
    onSuccess: () => {
      router.invalidate();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => mutation.mutate("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutation.mutate("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutation.mutate("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
