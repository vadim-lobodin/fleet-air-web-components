"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeSwitcher() {
  const { theme, setTheme, resolved } = useTheme()

  if (!resolved) {
    // Show a loading skeleton or placeholder while theme is resolving
    return <div className="h-6 w-12 bg-muted animate-pulse rounded-md" />;
  }

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-md border border-border bg-background">
      <button
        onClick={() => setTheme("light")}
        className={`p-1 rounded-sm transition-colors ${
          theme === "light"
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
        title="Light theme"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1 rounded-sm transition-colors ${
          theme === "dark"
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
        title="Dark theme"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  )
} 