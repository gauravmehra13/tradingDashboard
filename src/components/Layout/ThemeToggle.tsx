import React from "react";
import { Sun, Moon, Laptop, ChevronDown } from "lucide-react";
import type { Theme } from "../../types/theme";
import { useTheme } from "../../hooks/useTheme";
import * as Popover from "@radix-ui/react-popover";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; icon: React.ReactNode }[] = [
    { value: "light", icon: <Sun className="w-5 h-5" /> },
    { value: "dark", icon: <Moon className="w-5 h-5" /> },
    { value: "system", icon: <Laptop className="w-5 h-5" /> },
  ];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          {themes.find((t) => t.value === theme)?.icon}
          <ChevronDown className="w-4 h-4" />
        </button>
      </Popover.Trigger>
      <Popover.Content
        side="bottom"
        align="end"
        sideOffset={10}
        className="w-48 p-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg"
      >
        <div className="flex flex-col gap-1">
          {themes.map(({ value, icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors ${
                theme === value ? "bg-gray-100 dark:bg-gray-900" : ""
              }`}
            >
              {icon}
              <span className="ml-2 capitalize">{value}</span>
            </button>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
} 