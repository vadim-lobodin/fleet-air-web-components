"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeSwitcher() {
  const { theme, setTheme, resolved } = useTheme()

  if (!resolved) {
    // Show a loading skeleton or placeholder while theme is resolving
    return <div className="h-6 w-12 bg-muted animate-pulse rounded" />;
  }

  return (
    <div className="inline-flex items-center gap-1 p-0.5 rounded-lg border border-border bg-background">
      <button
        onClick={() => setTheme("light")}
        className={`p-1 rounded-md transition-colors ${
          theme === "light"
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
        title="Light theme"
      >
        <Sun className="h-3 w-3" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1 rounded-md transition-colors ${
          theme === "dark"
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
        title="Dark theme"
      >
        <Moon className="h-3 w-3" />
      </button>
    </div>
  )
} 